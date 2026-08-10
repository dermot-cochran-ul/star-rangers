#!/usr/bin/env node
//
// scripts/firefly-generate.js
//
// Batch driver for the image prompts already written in
// story-bible/images.md, against the Adobe Firefly Services API.
//
// LOCAL AUTHORING TOOL - not part of the build, not run by `npm test`, not
// touched by CI, same standing as scripts/make-lore-cards.ps1. It needs
// credentials the repository does not and must not contain.
//
// WHY THIS EXISTS: the prompts are already written. Open work 1 carries
// eleven character portraits and Open work 5 carries ten lore images, each a
// bullet naming its target file with the prompt in a blockquote under it,
// composed to the standing rules (era stated, lettering banned, sheen named
// rather than substance). Generating them meant pasting twenty-one prompts
// into a browser one at a time and hand-filing the results. That is a
// mechanical derivation from a file that already exists, which is exactly the
// argument make-lore-cards.ps1 and generate-themes.js were written on.
//
// images.md STAYS THE SOURCE OF TRUTH. This script parses it and never
// writes to it. There is deliberately no separate queue file to drift out of
// sync - edit the prompt in images.md and re-run.
//
// WHAT IT DOES NOT DO, ON PURPOSE:
//
//   - It does not resize, and it does not file anything into src/images/.
//     Choosing which of four variations is the one is a judgement, and so is
//     whether a generation is usable at all. Pick one, then put it through
//     scripts/import-image.ps1 at the conventional size (~1200px portraits,
//     ~1600px lore).
//   - It does not touch front matter. `image`/`image_alt` are added by hand
//     after looking at the file, because alt text describes what the image
//     ACTUALLY SHOWS and cannot be derived from the prompt that asked for it.
//   - It does not commit, and nothing it produces should be merged without
//     Dermot's review. New portraits and new lore images are the repo's
//     "draft it and stop" tier.
//   - It does not generate the nine institution/faction title cards. Those go
//     through scripts/make-lore-cards.ps1, because a font engine spells
//     correctly and an image model does not. They have no blockquote prompt
//     in images.md, so this parser skips them by construction rather than by
//     a list that could go stale.
//
// CREDENTIALS: never in this repository - it is public. Either
//
//   export FIREFLY_SERVICES_CLIENT_ID=...  FIREFLY_SERVICES_CLIENT_SECRET=...
//
// or copy scripts/firefly.local.json.sample to scripts/firefly.local.json
// (gitignored, same convention as deploy.conf and giscus.local.json) and put
// them there. Env wins over the file.
//
// USAGE
//   node scripts/firefly-generate.js                 # dry run: parse and list, no API calls
//   node scripts/firefly-generate.js --go            # generate everything still missing
//   node scripts/firefly-generate.js --go --only naomi-kestrel,jeeves
//   node scripts/firefly-generate.js --go --all      # include targets that already exist
//   node scripts/firefly-generate.js --go --variations 2
//   node scripts/firefly-generate.js --go --out F:/CLAUDE/firefly-out
//
// DRY RUN IS THE DEFAULT for a reason: a mis-parse should be visible before
// it is expensive. Read the listing, then add --go.

'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const IMAGES_MD = path.join(REPO_ROOT, 'story-bible', 'images.md');
const IMAGES_DIR = path.join(REPO_ROOT, 'src', 'images');

const IMS_TOKEN_URL = 'https://ims-na1.adobelogin.com/ims/token/v3';
const IMS_SCOPES = 'openid,AdobeID,session,additional_info,read_organizations,firefly_api,ff_apis';
const FIREFLY_GENERATE_URL = 'https://firefly-api.adobe.io/v3/images/generate';

// Firefly V3 accepts a fixed set of sizes. These two are the portrait and
// landscape shapes the prompts ask for; every prompt in images.md ends by
// stating its orientation, which is what selects between them. If the API
// rejects a size its error body is printed verbatim rather than swallowed -
// see callFirefly() - so a wrong constant here is a legible failure, not a
// silent one.
const SIZES = {
  portrait: { width: 1792, height: 2304 },
  landscape: { width: 2304, height: 1792 },
};

// Which images.md section maps to which images/ subdirectory. A section not
// listed here is not a source of Firefly work.
const SECTION_TARGETS = [
  { match: /^###\s*\d+\.\s*Missing portraits/i, dir: 'characters' },
  { match: /^###\s*\d+\.\s*Missing lore illustrations/i, dir: 'lore' },
];

function parseArgs(argv) {
  const opts = { go: false, all: false, variations: 4, only: null, out: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--go') opts.go = true;
    else if (a === '--all') opts.all = true;
    else if (a === '--variations') opts.variations = parseInt(argv[++i], 10);
    else if (a === '--only') opts.only = String(argv[++i]).split(',').map((s) => s.trim()).filter(Boolean);
    else if (a === '--out') opts.out = argv[++i];
    else if (a === '--help' || a === '-h') { printUsage(); process.exit(0); }
    else { console.error(`unknown option: ${a}\n`); printUsage(); process.exit(1); }
  }
  if (!Number.isInteger(opts.variations) || opts.variations < 1 || opts.variations > 4) {
    console.error('--variations must be an integer 1-4');
    process.exit(1);
  }
  return opts;
}

function printUsage() {
  const src = fs.readFileSync(__filename, 'utf8');
  const start = src.indexOf('// USAGE');
  const end = src.indexOf('// DRY RUN IS THE DEFAULT');
  console.log(src.slice(start, end).replace(/^\/\/ ?/gm, ''));
}

// ---------------------------------------------------------------------------
// Parsing images.md.
//
// The shape every entry already uses, and the only shape this recognises:
//
//   - **`naomi-kestrel.jpg`** - prose description, possibly several lines
//     > The prompt, one blockquote line, ending with an orientation sentence.
//
// A bullet with no blockquote under it is not Firefly work - that is how the
// nine generator title cards exclude themselves without being listed.
// ---------------------------------------------------------------------------
function parseEntries(markdown) {
  const lines = markdown.split(/\r?\n/);
  const entries = [];
  let currentDir = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (/^###\s/.test(line)) {
      const hit = SECTION_TARGETS.find((s) => s.match.test(line));
      currentDir = hit ? hit.dir : null;
      continue;
    }
    if (/^##\s/.test(line)) { currentDir = null; continue; }
    if (!currentDir) continue;

    const m = line.match(/^\s*[-*]\s+\*\*`([^`]+\.jpg)`\*\*/);
    if (!m) continue;
    const file = m[1];

    // Walk forward to the blockquote, stopping at the next bullet or a blank
    // line that is followed by another bullet - so a bullet whose description
    // runs several lines still finds its prompt, and one with no prompt at
    // all does not steal the next entry's.
    let prompt = null;
    for (let j = i + 1; j < lines.length; j++) {
      const l = lines[j];
      if (/^\s*[-*]\s+\*\*`/.test(l)) break;
      if (/^#{2,}\s/.test(l)) break;
      const q = l.match(/^\s*>\s?(.+)$/);
      if (q) {
        const parts = [q[1].trim()];
        for (let k = j + 1; k < lines.length; k++) {
          const cont = lines[k].match(/^\s*>\s?(.*)$/);
          if (!cont) break;
          if (cont[1].trim()) parts.push(cont[1].trim());
        }
        prompt = parts.join(' ');
        break;
      }
    }
    if (!prompt) continue;

    const orientation = /portrait orientation/i.test(prompt) ? 'portrait'
      : /landscape orientation/i.test(prompt) ? 'landscape'
      : currentDir === 'characters' ? 'portrait' : 'landscape';

    // `file` may carry a subdirectory - three lore entries are filed under
    // universes/ and planets/. `rel` keeps that (it is where the image
    // belongs); `key` flattens it into one collision-free output-directory
    // name, because joining a slashed slug into the output path would nest a
    // second copy of the subdirectory under itself.
    const rel = file.replace(/\.jpg$/i, '');
    entries.push({
      file,
      rel,
      base: path.posix.basename(rel),
      key: `${currentDir}-${rel}`.replace(/[/\\]/g, '-'),
      dir: currentDir,
      prompt,
      orientation,
      target: path.join(IMAGES_DIR, currentDir, file),
    });
  }
  return entries;
}

// ---------------------------------------------------------------------------
// Credentials. Env first, then the untracked local file. Never a default,
// never a prompt - a missing credential is an error with instructions.
// ---------------------------------------------------------------------------
function loadCredentials() {
  let id = process.env.FIREFLY_SERVICES_CLIENT_ID || '';
  let secret = process.env.FIREFLY_SERVICES_CLIENT_SECRET || '';

  if (!id || !secret) {
    const local = path.join(__dirname, 'firefly.local.json');
    if (fs.existsSync(local)) {
      try {
        const j = JSON.parse(fs.readFileSync(local, 'utf8'));
        id = id || j.clientId || '';
        secret = secret || j.clientSecret || '';
      } catch (err) {
        throw new Error(`could not parse ${local}: ${err.message}`);
      }
    }
  }

  if (!id || !secret) {
    throw new Error(
      'no Firefly credentials.\n' +
      '  Either export FIREFLY_SERVICES_CLIENT_ID and FIREFLY_SERVICES_CLIENT_SECRET,\n' +
      '  or copy scripts/firefly.local.json.sample to scripts/firefly.local.json\n' +
      '  and fill it in. That file is gitignored - this repository is public and\n' +
      '  must never contain either value.'
    );
  }
  return { id, secret };
}

async function getAccessToken({ id, secret }) {
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: id,
    client_secret: secret,
    scope: IMS_SCOPES,
  });

  const res = await fetch(IMS_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`IMS token request failed (${res.status}):\n${text}`);
  }
  let json;
  try { json = JSON.parse(text); } catch { throw new Error(`IMS returned non-JSON:\n${text}`); }
  if (!json.access_token) throw new Error(`IMS response had no access_token:\n${text}`);
  return json.access_token;
}

async function callFirefly(token, clientId, entry, variations) {
  const size = SIZES[entry.orientation];
  const payload = {
    prompt: entry.prompt,
    numVariations: variations,
    size,
  };

  const res = await fetch(FIREFLY_GENERATE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-api-key': clientId,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  if (!res.ok) {
    // Printed whole rather than summarised: Firefly's 4xx bodies name the
    // offending field (a rejected size, a prompt tripping a content filter),
    // and that detail is the entire value of the failure.
    throw new Error(`Firefly returned ${res.status} for ${entry.file}:\n${text}`);
  }
  try { return JSON.parse(text); } catch { throw new Error(`Firefly returned non-JSON for ${entry.file}:\n${text}`); }
}

// Documented V3 shape is { outputs: [ { seed, image: { url } } ] }. The
// fallback scan exists because a shape change should degrade to "downloaded
// something and told you where it came from", not to a crash - the raw
// response is written alongside the images either way.
function extractOutputs(json) {
  if (Array.isArray(json && json.outputs)) {
    const mapped = json.outputs
      .map((o) => ({ url: o && o.image && o.image.url, seed: o && o.seed }))
      .filter((o) => o.url);
    if (mapped.length) return mapped;
  }
  const urls = new Set();
  JSON.stringify(json).replace(/"(https:\/\/[^"]+)"/g, (_, u) => { urls.add(u); return _; });
  return [...urls].map((url) => ({ url, seed: undefined }));
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download failed (${res.status}) for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return buf.length;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(IMAGES_MD)) {
    console.error(`missing ${IMAGES_MD}`);
    process.exit(1);
  }

  let entries = parseEntries(fs.readFileSync(IMAGES_MD, 'utf8'));
  if (!entries.length) {
    console.error('parsed no prompts from story-bible/images.md - the format may have changed.');
    process.exit(1);
  }

  const parsedCount = entries.length;
  if (opts.only) {
    // Matched against any of the three names an entry answers to, so
    // `--only si-gaoithe` works as well as `universes/si-gaoithe`.
    const want = new Set(opts.only.map((s) => s.replace(/\.jpg$/i, '')));
    const names = (e) => [e.rel, e.base, e.key];
    entries = entries.filter((e) => names(e).some((n) => want.has(n)));
    const missing = [...want].filter((w) => !entries.some((e) => names(e).includes(w)));
    if (missing.length) {
      console.error(`--only named ${missing.length} slug(s) with no prompt in images.md: ${missing.join(', ')}`);
      process.exit(1);
    }
  }

  const done = entries.filter((e) => fs.existsSync(e.target));
  if (!opts.all) entries = entries.filter((e) => !fs.existsSync(e.target));

  console.log(`Parsed ${parsedCount} prompt(s) from story-bible/images.md.`);
  if (done.length) {
    console.log(`${done.length} already present in src/images/ ${opts.all ? '(included: --all)' : '(skipped)'}.`);
  }
  console.log(`${entries.length} to generate:\n`);
  for (const e of entries) {
    const s = SIZES[e.orientation];
    console.log(`  ${e.dir}/${e.file}  [${e.orientation} ${s.width}x${s.height}]`);
    console.log(`    ${e.prompt.slice(0, 150)}${e.prompt.length > 150 ? '…' : ''}\n`);
  }

  if (!entries.length) { console.log('Nothing to do.'); return; }

  if (!opts.go) {
    console.log(`Dry run. ${entries.length} entr(ies) x ${opts.variations} variation(s) would be generated.`);
    console.log('Re-run with --go to call the API.');
    return;
  }

  const creds = loadCredentials();
  const outRoot = path.resolve(opts.out || path.join(REPO_ROOT, 'firefly-out'));
  fs.mkdirSync(outRoot, { recursive: true });

  console.log(`Authenticating…`);
  const token = await getAccessToken(creds);
  console.log(`Output: ${outRoot}\n`);

  const manifest = [];
  let failures = 0;

  for (const entry of entries) {
    const dir = path.join(outRoot, entry.key);
    fs.mkdirSync(dir, { recursive: true });
    process.stdout.write(`${entry.file} … `);

    try {
      const json = await callFirefly(token, creds.id, entry, opts.variations);
      fs.writeFileSync(path.join(dir, 'response.json'), JSON.stringify(json, null, 2));

      const outputs = extractOutputs(json);
      if (!outputs.length) throw new Error('response contained no image URL (see response.json)');

      const saved = [];
      for (let i = 0; i < outputs.length; i++) {
        const dest = path.join(dir, `${entry.base}-${i + 1}.jpg`);
        const bytes = await download(outputs[i].url, dest);
        saved.push({ file: path.relative(outRoot, dest).replace(/\\/g, '/'), seed: outputs[i].seed, bytes });
      }
      console.log(`${saved.length} variation(s)`);

      manifest.push({
        key: entry.key,
        file: entry.file,
        // Where the chosen variation belongs once picked. scripts/firefly-file.ps1
        // reads this rather than re-deriving it.
        target: `src/images/${entry.dir}/${entry.file}`.replace(/\\/g, '/'),
        maxEdge: entry.dir === 'characters' ? 1200 : 1600,
        orientation: entry.orientation,
        size: SIZES[entry.orientation],
        prompt: entry.prompt,
        outputs: saved,
      });
    } catch (err) {
      failures++;
      console.log('FAILED');
      console.error(`  ${err.message}\n`);
      manifest.push({ file: entry.file, error: String(err.message) });
    }
  }

  // Seeds are the reason this file matters: a generation you liked can be
  // reproduced, and one you didn't can be re-rolled deliberately rather than
  // by chance. The prompt is recorded beside them so the manifest still means
  // something after images.md has moved on.
  const manifestPath = path.join(outRoot, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({ generated: manifest }, null, 2));

  console.log(`\nManifest: ${manifestPath}`);
  console.log('Next: pick one variation each, then');
  console.log('  .\\scripts\\import-image.ps1 -In <chosen> -Out src\\images\\<dir>\\<file> -MaxEdge <1200 portraits | 1600 lore>');
  console.log('then add image/image_alt by hand, describing what the file actually shows.');

  if (failures) {
    console.error(`\n${failures} of ${entries.length} failed.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`\nfirefly-generate: ${err.message}`);
  process.exit(1);
});
