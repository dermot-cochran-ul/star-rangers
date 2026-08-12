#!/usr/bin/env node
//
// scripts/build-photo-catalogue.js
//
// Builds story-bible/own-photography.json: a catalogue of Dermot's OWN
// photographs, so the image pipeline can offer them before reaching for a
// generator.
//
// LOCAL AUTHORING TOOL - not part of the build, not run by `npm test`, not
// touched by CI. Same standing as scripts/image-prompts.js.
//
// WHY THIS EXISTS
//
// story-bible/images.md, Open work 6 tier 3, argues that Dermot's own
// photography should carry far more of this site than it does: an Irish upland
// standing in for an alien world is his own work, claims nothing false, and
// beats a generated image. But nothing in the pipeline could act on that.
// image-prompts.js marks an entry `done` when a file exists and `pending`
// otherwise, and pending has exactly one route out of it: generate. So the
// document recommended reuse while the tool made generation the only path, and
// the site drifted to majority stock photography while its author had thousands
// of unpublished frames on a drive.
//
// This does not decide anything. It builds the list; a person still chooses.
//
// WHY A COMMITTED JSON FILE RATHER THAN READING THE SIBLING REPO LIVE
//
// The photography portfolio is a separate repository. A clone of it may not
// exist beside this one - on a CI runner it certainly does not - so reading it
// at match time would make the pipeline fail depending on what else happens to
// be on the disk. Instead this script reads it when a person runs it, and
// commits the result. The catalogue is a snapshot, and says so; re-run it when
// the portfolio grows.
//
// USAGE
//   node scripts/build-photo-catalogue.js
//   node scripts/build-photo-catalogue.js --photos ../dermot-cochran-photography
//   node scripts/build-photo-catalogue.js --ledger "F:\\CLAUDE\\Folder Context.md"
//   node scripts/build-photo-catalogue.js --dry-run     # print, write nothing

'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const OUT = path.join(REPO_ROOT, 'story-bible', 'own-photography.json');

const DEFAULT_PHOTO_REPOS = [
  path.resolve(REPO_ROOT, '..', 'dermot-cochran-photography'),
  'F:\\CLAUDE\\dermot-cochran-photography',
];
const DEFAULT_LEDGERS = [
  path.resolve(REPO_ROOT, '..', 'Folder Context.md'),
  'F:\\CLAUDE\\Folder Context.md',
];

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
}
const DRY = process.argv.includes('--dry-run');

function firstExisting(candidates) {
  return candidates.find((p) => p && fs.existsSync(p)) || null;
}

// Minimal front-matter reader. gray-matter is a dependency of this repo, but
// keeping this dependency-free means the script also runs against a checkout
// with no node_modules installed.
function frontMatter(file) {
  const txt = fs.readFileSync(file, 'utf8');
  const m = txt.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim().replace(/^"(.*)"$/, '$1');
    if (/^\[.*\]$/.test(v)) v = v.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean);
    out[kv[1]] = v;
  }
  return out;
}

function readPublished(photoRepo) {
  const dir = path.join(photoRepo, 'src', 'photos');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const fm = frontMatter(path.join(dir, f));
      return {
        slug: f.replace(/\.md$/, ''),
        title: fm.title || '',
        category: fm.category || '',
        location: fm.location || '',
        year: fm.year || '',
        album: fm.album || '',
        alt: fm.alt || '',
        image: fm.image || '',
        competitions: Array.isArray(fm.competitions) ? fm.competitions : [],
      };
    })
    .filter((p) => p.title)
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

// Folder Context.md is a hand-kept ledger of the raw camera dumps on F:. Its
// tables vary in column count between sections, so this takes only what every
// row has: a backticked folder name, and the prose describing what is in it.
// Anything it cannot parse is skipped rather than guessed at.
function readLedger(ledgerPath) {
  if (!ledgerPath || !fs.existsSync(ledgerPath)) return [];
  const seen = new Map();
  for (const line of fs.readFileSync(ledgerPath, 'utf8').split(/\r?\n/)) {
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').map((c) => c.trim()).filter((c, i, a) => !(i === 0 || i === a.length - 1));
    if (cells.length < 3) continue;
    const nameCell = cells[0].match(/^`([^`]+)`/);
    if (!nameCell) continue;
    const folder = nameCell[1];
    // The description is the longest remaining cell - the ledger puts prose
    // last in some sections and third in others.
    const description = cells.slice(1).sort((a, b) => b.length - a.length)[0] || '';
    if (description.length < 12) continue;
    const clean = description.replace(/\*\*/g, '').replace(/`/g, '').trim();
    if (!seen.has(folder) || seen.get(folder).description.length < clean.length) {
      seen.set(folder, { folder, description: clean });
    }
  }
  return [...seen.values()].sort((a, b) => a.folder.localeCompare(b.folder));
}

function main() {
  const photoRepo = arg('photos') || firstExisting(DEFAULT_PHOTO_REPOS);
  const ledger = arg('ledger') || firstExisting(DEFAULT_LEDGERS);

  if (!photoRepo || !fs.existsSync(photoRepo)) {
    console.error('build-photo-catalogue: could not find the photography repo.');
    console.error('Pass --photos <path> to the dermot-cochran-photography clone.');
    process.exit(1);
  }

  const publishedPhotos = readPublished(photoRepo);
  const rawFolders = readLedger(ledger);

  const catalogue = {
    note: 'Dermot\'s own photography, catalogued so the image pipeline can offer it before generating. A SNAPSHOT - rebuild with scripts/build-photo-catalogue.js when the portfolio grows.',
    sources: {
      published: path.relative(REPO_ROOT, photoRepo).split(path.sep).join('/') || photoRepo,
      ledger: ledger ? path.basename(ledger) : null,
    },
    publishedPhotos,
    rawFolders,
  };

  console.log(`published photographs: ${publishedPhotos.length}`);
  console.log(`raw folders from the ledger: ${rawFolders.length}`);
  if (!rawFolders.length && ledger) console.log('(ledger found but no rows parsed - check its table format)');
  if (!ledger) console.log('(no Folder Context.md found; published photographs only)');

  if (DRY) { console.log('\n--dry-run: nothing written.'); return; }
  fs.writeFileSync(OUT, JSON.stringify(catalogue, null, 2) + '\n');
  console.log(`\nwrote ${path.relative(REPO_ROOT, OUT).split(path.sep).join('/')}`);
}

main();
