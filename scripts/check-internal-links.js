#!/usr/bin/env node
//
// Checks that every internal /star-rangers/... link in src/ resolves to a real
// page or asset. Catches the failure mode `npm test` doesn't: front-matter
// validation and the Eleventy dry run both pass happily while a cross-link
// points at a page that was renamed or never written.
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
const SRC = path.join(REPO, "src");
const PREFIX = "/star-rangers/";

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

const allFiles = walk(SRC);

// Every URL Eleventy will emit from a markdown file:
//   src/lore/foo.md        -> /star-rangers/lore/foo/
//   src/lore/index.md      -> /star-rangers/lore/
//   src/index.md           -> /star-rangers/
const pages = new Set();
for (const file of allFiles) {
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

for (const file of allFiles) {
  if (!/\.(md|njk|html)$/.test(file)) continue;
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

console.log(
  `Internal link check: ${checked} links across ${allFiles.length} files ` +
  `(${skipped} templated links skipped).`
);

if (problems.length) {
  console.error(`\n${problems.length} broken link(s):\n`);
  for (const p of problems) console.error("  " + p);
  process.exitCode = 1;
} else {
  console.log("All internal links resolve.");
}
