#!/usr/bin/env node
//
// Checks that every internal /star-rangers/... link in src/ and lib/ resolves
// to a real page or asset. Catches the failure mode `npm test` doesn't:
// front-matter validation and the Eleventy dry run both pass happily while a
// cross-link points at a page that was renamed or never written.
//
// Cross-platform, no dependencies. Run directly:
//     node scripts/check-internal-links.js
//
// Not currently wired into `npm test`. It exits non-zero on failure, so it can
// be added to the test script or CI if you want link rot to break the build.
//
// Nunjucks-templated hrefs (containing "{{") are skipped: they are computed at
// build time and cannot be resolved statically.

const fs = require("fs");
const path = require("path");

const REPO = path.join(__dirname, "..");
const PREFIX = "/star-rangers/";

// Both roots that hold authored content with links in it. src/ is the obvious
// one; lib/ earns its place because per-domain copy lives in lib/editions.js -
// the homepage hero taglines, which used to sit inline in src/index.md and
// silently left this script's coverage when they moved.
//
// Scanning by ROOT rather than keeping a hand-list of exceptions is the point.
// The first version of this fix was exactly that list, and a list of
// exceptions is a thing that goes stale: the next file with authored links
// outside src/ would not have been added to it, and nobody would have noticed,
// which is the same failure this whole script exists to catch.
const SCAN_ROOTS = ["src", "lib"];

// `.js` is included so lib/editions.js is covered. Verified safe rather than
// assumed: src/js/pov.js and src/js/search.js contain no /star-rangers/
// strings at all, and lib/content-filter.js's three occurrences are in
// comments and a regex literal - none of them href/src/markdown-link shaped,
// so linkRe cannot match them.
//
// One consequence worth knowing: an ILLUSTRATIVE url written as href="..." in
// a code comment now gets checked like a real one. That is arguably a feature -
// it caught a made-up example in lib/editions.js's own comments the day this
// landed - but if a comment genuinely needs a fake path, describe it in prose
// rather than quoting it in attribute form.
const SCAN_EXT = /\.(md|njk|html|js)$/;

const ASSET_DIRS = ["images/", "audio/", "video/", "css/", "js/", "static/"];
const ASSET_EXT = /\.(jpg|jpeg|png|gif|svg|webp|ico|m4a|wav|mp3|mp4|webm|css|js|xml|json|pdf|txt)$/i;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

// Two distinct file lists, and keeping them apart matters. `srcFiles` is what
// the set of real PAGES is derived from, and only src/ produces pages - a
// path.relative(SRC, ...) on a lib/ file would yield "../lib/..." and invent a
// page that does not exist. `scanFiles` is what gets READ for links, across
// every root.
const SRC = path.join(REPO, "src");
const srcFiles = walk(SRC);
const scanFiles = SCAN_ROOTS.flatMap((root) => walk(path.join(REPO, root)));

// Every URL Eleventy will emit from a markdown file:
//   src/lore/foo.md        -> /star-rangers/lore/foo/
//   src/lore/index.md      -> /star-rangers/lore/
//   src/index.md           -> /star-rangers/
const pages = new Set();
for (const file of srcFiles) {
  if (!file.endsWith(".md")) continue;
  let rel = path.relative(SRC, file).replace(/\\/g, "/").replace(/\.md$/, "");
  if (rel === "index") rel = "";
  else if (rel.endsWith("/index")) rel = rel.slice(0, -"/index".length);
  pages.add(PREFIX + (rel ? rel + "/" : ""));
}

const linkRe = /\]\((\/star-rangers\/[^)\s]*)\)|(?:href|src)="(\/star-rangers\/[^"]*)"/g;

const problems = [];
let checked = 0;
let skipped = 0;

let filesScanned = 0;

for (const file of scanFiles) {
  if (!SCAN_EXT.test(file)) continue;
  filesScanned++;
  const text = fs.readFileSync(file, "utf8");
  const where = path.relative(REPO, file).replace(/\\/g, "/");
  let m;
  while ((m = linkRe.exec(text)) !== null) {
    let url = (m[1] || m[2]).trim();
    if (url.includes("{{") || url.includes("{%")) { skipped++; continue; }
    url = url.split("#")[0].split("?")[0];
    if (!url) continue;
    checked++;

    const rel = url.slice(PREFIX.length);
    const isAsset = ASSET_DIRS.some((d) => rel.startsWith(d)) || ASSET_EXT.test(url);
    if (isAsset) {
      if (!fs.existsSync(path.join(SRC, rel))) {
        problems.push(`${where} -> missing asset ${url}`);
      }
      continue;
    }

    const normalized = url.endsWith("/") ? url : url + "/";
    if (!pages.has(normalized)) {
      problems.push(`${where} -> missing page ${url}`);
    }
  }
}

// Counts files actually READ, not files walked. The previous wording divided by
// every file under src/, images and audio included, so the figure was always
// larger than the number of files that could contain a link in the first place.
console.log(
  `Internal link check: ${checked} links across ${filesScanned} scanned files ` +
  `in ${SCAN_ROOTS.join("/, ")}/ (${skipped} templated links skipped).`
);

if (problems.length) {
  console.error(`\n${problems.length} broken link(s):\n`);
  for (const p of problems) console.error("  " + p);
  process.exitCode = 1;
} else {
  console.log("All internal links resolve.");
}
