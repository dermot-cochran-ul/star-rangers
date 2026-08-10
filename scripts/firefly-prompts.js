#!/usr/bin/env node
//
// scripts/firefly-prompts.js
//
// Serves the image prompts already written in story-bible/images.md, one at a
// time, to the clipboard - so generating them in the Firefly web app is paste,
// generate, download, repeat, with nothing retyped and no place lost.
//
// LOCAL AUTHORING TOOL - not part of the build, not run by `npm test`, not
// touched by CI. Same standing as scripts/make-lore-cards.ps1.
//
// WHY IT WORKS THIS WAY: the first version of this script called the Adobe
// Firefly Services API and generated all twenty-three unattended. That path is
// closed - Firefly Services is an enterprise contract, and the Developer
// Console disables the API outright for an account without the entitlement
// ("Your organization does not have a license to access this API"). The
// Firefly *app* included with Creative Cloud is a different product, and it
// offers no multi-prompt batch mode. So a human pastes each prompt. This makes
// that the only manual part.
//
// The parser is unchanged from the API version and is the piece worth keeping:
// if Services access ever appears, restoring unattended generation is a small
// change to a script that already knows what every prompt is.
//
// images.md STAYS THE SOURCE OF TRUTH. This script parses it and never writes
// to it. There is deliberately no separate queue file to drift out of sync -
// edit a prompt there and re-run.
//
// THE LOOP
//
//   node scripts/firefly-prompts.js              # what's pending, served, done
//   node scripts/firefly-prompts.js --next       # next prompt -> clipboard
//   <paste into Firefly, generate, download>
//   node scripts/firefly-prompts.js --next       # and again, 23 times
//   .\scripts\firefly-file.ps1 -WhatIf           # pair downloads to targets
//   .\scripts\firefly-file.ps1                   # resize, file, branch
//
// --next records what it served, in order, to firefly-out/progress.json
// (gitignored). That order is what scripts/firefly-file.ps1 pairs your
// downloads against, oldest to newest - which is why serving is tracked at all
// rather than just printed.
//
// USAGE
//   node scripts/firefly-prompts.js [--list]     # default: status of all entries
//   node scripts/firefly-prompts.js --next       # serve the next pending one
//   node scripts/firefly-prompts.js --only arilon
//   node scripts/firefly-prompts.js --all        # print every prompt, change nothing
//   node scripts/firefly-prompts.js --reset [name]   # un-serve one, or all
//   node scripts/firefly-prompts.js --no-clipboard   # print instead of copying
//
// An entry counts as DONE when its target file exists under src/images/, so
// the queue empties itself as work lands and needs no marking.

'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..');
const IMAGES_MD = path.join(REPO_ROOT, 'story-bible', 'images.md');
const IMAGES_DIR = path.join(REPO_ROOT, 'src', 'images');
const OUT_DIR = path.join(REPO_ROOT, 'firefly-out');
const PROGRESS = path.join(OUT_DIR, 'progress.json');

// Which images.md section maps to which images/ subdirectory. A section not
// listed here is not a source of image-model work.
const SECTION_TARGETS = [
  { match: /^###\s*\d+\.\s*Missing portraits/i, dir: 'characters' },
  { match: /^###\s*\d+\.\s*Missing lore illustrations/i, dir: 'lore' },
];

function parseArgs(argv) {
  const opts = { mode: 'list', only: null, reset: undefined, clipboard: true };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--list') opts.mode = 'list';
    else if (a === '--next') opts.mode = 'next';
    else if (a === '--all') opts.mode = 'all';
    else if (a === '--only') { opts.mode = 'only'; opts.only = String(argv[++i] || '').trim(); }
    else if (a === '--reset') { opts.mode = 'reset'; opts.reset = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : null; }
    else if (a === '--no-clipboard') opts.clipboard = false;
    else if (a === '--help' || a === '-h') { printUsage(); process.exit(0); }
    else { console.error(`unknown option: ${a}\n`); printUsage(); process.exit(1); }
  }
  return opts;
}

function printUsage() {
  const src = fs.readFileSync(__filename, 'utf8');
  const start = src.indexOf('// USAGE');
  const end = src.indexOf('// An entry counts as DONE');
  console.log(src.slice(start, end).replace(/^\/\/ ?/gm, ''));
}

// ---------------------------------------------------------------------------
// Parsing images.md.
//
// The shape every entry already uses, and the only shape this recognises:
//
//   - **`naomi-kestrel.jpg`** - prose description, possibly several lines
//     > The prompt, one blockquote, ending with an orientation sentence.
//
// A bullet with no blockquote under it is not image-model work - that is how
// the nine generator title cards exclude themselves without being listed
// anywhere, since make-lore-cards.ps1 letters those with a font engine.
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

    // Walk forward to the blockquote, stopping at the next bullet - so a
    // description running several lines still finds its prompt, and an entry
    // with no prompt does not steal the next one's.
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

    // `file` may carry a subdirectory - three lore entries are filed under
    // universes/ and planets/. `rel` keeps that; `key` flattens it into one
    // collision-free identifier used by the progress file and by
    // firefly-file.ps1.
    // Orientation is stated in the prompt's closing sentence, but the Firefly
    // app takes aspect ratio from a dropdown that defaults to Auto - so the
    // prompt text alone will not reliably shape the output. Parsed out here so
    // serve() can say which setting to pick before pasting.
    const orientation = /portrait orientation/i.test(prompt) ? 'Portrait'
      : /landscape orientation/i.test(prompt) ? 'Landscape'
      : currentDir === 'characters' ? 'Portrait' : 'Landscape';

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
      targetRel: `src/images/${currentDir}/${file}`.replace(/\\/g, '/'),
      maxEdge: currentDir === 'characters' ? 1200 : 1600,
    });
  }
  return entries;
}

function readProgress() {
  if (!fs.existsSync(PROGRESS)) return { served: [] };
  try {
    const j = JSON.parse(fs.readFileSync(PROGRESS, 'utf8'));
    return { served: Array.isArray(j.served) ? j.served : [] };
  } catch (err) {
    console.error(`could not parse ${PROGRESS}: ${err.message}`);
    process.exit(1);
  }
}

function writeProgress(progress) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(PROGRESS, JSON.stringify(progress, null, 2));
}

// Best-effort: a clipboard that isn't available is not a failure, because the
// prompt is printed either way and pasting from the terminal still works.
function toClipboard(text) {
  const candidates = process.platform === 'win32'
    ? [['clip.exe', []], ['clip', []]]
    : process.platform === 'darwin'
      ? [['pbcopy', []]]
      : [['xclip', ['-selection', 'clipboard']], ['xsel', ['--clipboard', '--input']]];

  for (const [cmd, args] of candidates) {
    const r = spawnSync(cmd, args, { input: text });
    if (!r.error && r.status === 0) return cmd;
  }
  return null;
}

function serve(entry, opts, progress) {
  console.log(`\n${entry.targetRel}`);
  // Aspect ratio is a dropdown in the Firefly app and defaults to Auto, which
  // will not read the orientation sentence at the end of the prompt. Set it
  // before pasting, or a portrait comes back landscape and the crop is lost.
  console.log(`  Firefly:  set Aspect ratio to ${entry.orientation}  (the prompt alone will not do it)`);
  console.log(`  Filed at: ${entry.maxEdge}px long edge — generate large, this resizes on the way in\n`);
  console.log(entry.prompt);
  console.log('');

  if (opts.clipboard) {
    const via = toClipboard(entry.prompt);
    if (via) console.log(`Copied to clipboard (${via}). Paste into Firefly, generate, download.`);
    else console.log('No clipboard tool found — copy the prompt above by hand.');
  }

  if (!progress.served.includes(entry.key)) {
    progress.served.push(entry.key);
    writeProgress(progress);
  }
  const n = progress.served.indexOf(entry.key) + 1;
  console.log(`Served #${n}. firefly-file.ps1 pairs your ${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'}-oldest download with this.`);
}

function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(IMAGES_MD)) {
    console.error(`missing ${IMAGES_MD}`);
    process.exit(1);
  }

  const entries = parseEntries(fs.readFileSync(IMAGES_MD, 'utf8'));
  if (!entries.length) {
    console.error('parsed no prompts from story-bible/images.md — the format may have changed.');
    process.exit(1);
  }

  const progress = readProgress();
  const status = (e) => fs.existsSync(e.target) ? 'done'
    : progress.served.includes(e.key) ? 'served'
    : 'pending';

  if (opts.mode === 'reset') {
    if (opts.reset === null) {
      progress.served = [];
      writeProgress(progress);
      console.log('Cleared the whole served list.');
    } else {
      const want = opts.reset.replace(/\.jpg$/i, '');
      const hit = entries.find((e) => [e.rel, e.base, e.key].includes(want));
      if (!hit) { console.error(`no prompt matching '${opts.reset}'`); process.exit(1); }
      const before = progress.served.length;
      progress.served = progress.served.filter((k) => k !== hit.key);
      writeProgress(progress);
      console.log(progress.served.length < before ? `Un-served ${hit.key}.` : `${hit.key} was not served.`);
      console.log('Note: this shifts the pairing order for everything after it — re-check with firefly-file.ps1 -WhatIf.');
    }
    return;
  }

  if (opts.mode === 'all') {
    for (const e of entries) console.log(`\n### ${e.targetRel}  [${e.maxEdge}px]\n\n${e.prompt}`);
    console.log(`\n${entries.length} prompt(s). Nothing changed.`);
    return;
  }

  if (opts.mode === 'only') {
    const want = opts.only.replace(/\.jpg$/i, '');
    const hit = entries.find((e) => [e.rel, e.base, e.key].includes(want));
    if (!hit) {
      console.error(`no prompt matching '${opts.only}'. Try --list.`);
      process.exit(1);
    }
    serve(hit, opts, progress);
    return;
  }

  if (opts.mode === 'next') {
    const next = entries.find((e) => status(e) === 'pending');
    if (!next) {
      const served = entries.filter((e) => status(e) === 'served').length;
      console.log('Nothing pending.');
      if (served) console.log(`${served} served and not yet filed — run .\\scripts\\firefly-file.ps1 -WhatIf`);
      return;
    }
    serve(next, opts, progress);
    return;
  }

  // --list (default)
  const counts = { done: 0, served: 0, pending: 0 };
  console.log(`${entries.length} prompt(s) in story-bible/images.md\n`);
  for (const e of entries) {
    const s = status(e);
    counts[s]++;
    const mark = s === 'done' ? '[done]   ' : s === 'served' ? '[served] ' : '[pending]';
    console.log(`  ${mark} ${e.targetRel}`);
  }
  console.log(`\n${counts.done} done, ${counts.served} served, ${counts.pending} pending.`);
  if (counts.pending) console.log('Next: node scripts/firefly-prompts.js --next');
  else if (counts.served) console.log('Next: .\\scripts\\firefly-file.ps1 -WhatIf');
}

main();
