#!/usr/bin/env node
//
// Checks every content file's front matter against lib/content-schema.js
// and fails loudly, file-by-file, instead of letting a missing/malformed
// field surface later as a blank page, a broken sort order, or a cryptic
// Nunjucks error mid-build. Run via `npm test` (before the Eleventy dry
// run) so CI catches it on every pull request.

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { CONTENT_TYPES, TIMELINE_TYPE, CHAPTER_ID_PATTERN, isTimelineEntry, chapterIdFor } = require("../lib/content-schema");
const { privateThreadForPage, checkPrivateThreadSignatureTags } = require("../lib/content-filter");

const SRC_DIR = path.join(__dirname, "..", "src");

const TYPES_BY_LAYOUT = new Map(Object.values(CONTENT_TYPES).map((type) => [type.layout, type]));

// Chapters normally need at least 2 POVs and at least one POV tagged
// "major-character" (see checkChapterConsistency below) - this one chapter
// predates both rules and is a deliberate single-POV scene, not an oversight,
// so it's grandfathered rather than rewritten or promoted around.
const GRANDFATHERED_SINGLE_POV_CHAPTERS = new Set([
  path.join("src", "seasons", "s01", "e00", "s01e00c02.md")
]);

function findMarkdownFiles(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findMarkdownFiles(fullPath));
    } else if (entry.name.endsWith(".md")) {
      results.push(fullPath);
    }
  }
  return results;
}

function isBlank(value) {
  if (value === undefined || value === null) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

// Returns a list of human-readable problem strings for one file - empty
// if it's clean. Takes the already-parsed front matter data plus which
// schema (a CONTENT_TYPES entry, or the standalone TIMELINE_TYPE) applies.
function checkAgainstSchema(data, schema) {
  const problems = [];

  for (const field of schema.required) {
    if (isBlank(data[field])) {
      problems.push(`missing required field "${field}"`);
    }
  }

  for (const field of schema.numeric || []) {
    if (!isBlank(data[field]) && !Number.isFinite(Number(data[field]))) {
      problems.push(`field "${field}" must be a number, got ${JSON.stringify(data[field])}`);
    }
  }

  return problems;
}

function checkChapterConsistency(inputPath, data, relativePath, characterTagsById) {
  const problems = [];
  if (isBlank(data.season) || isBlank(data.episode) || isBlank(data.chapter)) return problems;

  const expectedId = chapterIdFor(data.season, data.episode, data.chapter);
  if (!isBlank(data.id) && data.id !== expectedId) {
    problems.push(`"id" is "${data.id}" but season/episode/chapter (${data.season}/${data.episode}/${data.chapter}) imply "${expectedId}"`);
  }

  const filenameMatch = path.basename(inputPath, ".md").match(CHAPTER_ID_PATTERN);
  if (filenameMatch && expectedId !== path.basename(inputPath, ".md")) {
    problems.push(`filename implies "${path.basename(inputPath, ".md")}" but front matter season/episode/chapter imply "${expectedId}" - one of them is wrong`);
  }

  if (Array.isArray(data.povs)) {
    data.povs.forEach((pov, index) => {
      if (!pov || isBlank(pov.id) || isBlank(pov.label)) {
        problems.push(`povs[${index}] needs both an "id" and a "label"`);
      }
    });

    if (data.povs.length < 2 && !GRANDFATHERED_SINGLE_POV_CHAPTERS.has(relativePath)) {
      problems.push(`needs at least 2 "povs" entries, found ${data.povs.length}`);
    }

    // Only enforced when at least one POV id resolves to an actual
    // character file - a POV who has no dedicated page (a chapter-only
    // figure) can't be classified either way, so a chapter built entirely
    // from such figures isn't held to this check.
    const resolvedTags = data.povs
      .map((pov) => pov && characterTagsById.get(pov.id))
      .filter(Boolean);
    if (resolvedTags.length > 0 && !resolvedTags.some((tags) => tags.includes("major-character"))) {
      problems.push(`povs resolve to character page(s) but none is tagged "major-character" - promote one, or add a major POV`);
    }
  }

  return problems;
}

// Builds an id -> tags[] map from every character file, so
// checkChapterConsistency can tell whether a chapter's POVs include a
// character tagged "major-character" without re-reading files itself.
function loadCharacterTagsById() {
  const charactersDir = path.join(SRC_DIR, "characters");
  const map = new Map();
  for (const filePath of findMarkdownFiles(charactersDir)) {
    const { data } = matter(fs.readFileSync(filePath, "utf8"));
    if (data.layout === CONTENT_TYPES.character.layout && !isBlank(data.id)) {
      map.set(data.id, data.tags || []);
    }
  }
  return map;
}

// Filename slugs (basename without .md) of every actual codex entry, so a
// character's `known_codex` list can be checked for typos/dead references.
function loadCodexSlugs() {
  const codexDir = path.join(SRC_DIR, "codex");
  return new Set(
    findMarkdownFiles(codexDir)
      .map((filePath) => path.basename(filePath, ".md"))
      .filter((slug) => slug !== "index")
  );
}

function checkKnownCodex(data, codexSlugs) {
  const problems = [];
  for (const slug of data.known_codex || []) {
    if (!codexSlugs.has(slug)) {
      problems.push(`known_codex entry "${slug}" doesn't match any file in src/codex/`);
    }
  }
  return problems;
}

// The site-relative URL a content file builds to (matching Eleventy's own
// item.url, no /star-rangers prefix): an explicit `permalink` if the file
// sets one, else derived from its path under src/ the way Eleventy derives
// it by default (drop .md, collapse a trailing /index to the dir).
function urlForContentFile(filePath, data) {
  if (data.permalink) {
    const p = String(data.permalink);
    return p.startsWith("/") ? p : `/${p}`;
  }
  let rel = "/" + path.relative(SRC_DIR, filePath).split(path.sep).join("/");
  rel = rel.replace(/\.md$/, "").replace(/\/index$/, "/");
  if (!rel.endsWith("/")) rel += "/";
  return rel;
}

// Enforces the one-way visibility boundary between public and private
// storyline threads. A private thread (lib/storyline-threads.js `private:
// true`) is hidden on every build that doesn't opt into it - including the
// full site - so a PUBLIC page that hardcodes a link INTO a private-thread
// page produces a dead end there: the target renders the "not included in
// this edition" placeholder (src/_includes/excluded.njk) rather than the
// real page. The reverse direction is fine - a private page is only ever
// seen on a clone that opted its thread in, where the public pages it links
// to exist too - so this flags only public -> private links, letting a
// private page link out to public ones freely. Returns grouped problems in
// the same shape as the schema checks below.
function checkPrivateThreadLinkBoundary(files) {
  const pages = files.map((filePath) => {
    const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
    return {
      filePath,
      content,
      isPrivate: Boolean(privateThreadForPage(data)),
      urlPath: urlForContentFile(filePath, data).replace(/\/$/, "")
    };
  });

  const privatePaths = pages.filter((p) => p.isPrivate).map((p) => p.urlPath);
  const results = [];
  if (!privatePaths.length) return results;

  for (const page of pages) {
    if (page.isPrivate) continue;
    const problems = [];
    for (const priv of privatePaths) {
      // A link target of the private page's URL, with or without this
      // project's own /star-rangers Pages prefix, anchored on the trailing
      // slash so /lore/foo/ can't spuriously match /lore/foo-bar/.
      const escaped = priv.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (new RegExp(`(?:/star-rangers)?${escaped}/`).test(page.content)) {
        problems.push(
          `links into private-thread page ${priv}/ - a public page must not link into a private thread ` +
          `(private threads may link out to public pages, not the reverse; see lib/storyline-threads.js)`
        );
      }
    }
    if (problems.length) {
      results.push({ relativePath: path.relative(process.cwd(), page.filePath), label: "private-thread link boundary", problems });
    }
  }
  return results;
}

function main() {
  const files = findMarkdownFiles(SRC_DIR);
  const fileProblems = [];
  // comment_id -> relativePath of the first chapter seen with it - a
  // collision means two chapters would share one giscus discussion thread,
  // silently mixing their comments (see comment_id's own doc in
  // lib/content-schema.js for why it must stay unique and permanent).
  const commentIdOwners = new Map();
  const characterTagsById = loadCharacterTagsById();
  const codexSlugs = loadCodexSlugs();

  for (const filePath of files) {
    const relativePath = path.relative(process.cwd(), filePath);
    const { data } = matter(fs.readFileSync(filePath, "utf8"));

    let schema = TYPES_BY_LAYOUT.get(data.layout);
    let isChapter = schema === CONTENT_TYPES.chapter;

    if (!schema && isTimelineEntry(filePath)) {
      schema = TIMELINE_TYPE;
    }

    if (!schema) continue; // Not a recognized content-leaf type - nothing to check.

    const problems = checkAgainstSchema(data, schema);
    if (isChapter) problems.push(...checkChapterConsistency(filePath, data, relativePath, characterTagsById));
    if (schema === CONTENT_TYPES.character) problems.push(...checkKnownCodex(data, codexSlugs));
    for (const { threadId, signatureTag } of checkPrivateThreadSignatureTags(data)) {
      problems.push(
        `tagged "${signatureTag}" (a "${threadId}" signature tag - see lib/storyline-threads.js) but missing ` +
        `the "${threadId}" tag itself - likely meant to be private-thread content that's about to leak onto every public domain`
      );
    }

    if (isChapter && !isBlank(data.comment_id)) {
      const owner = commentIdOwners.get(data.comment_id);
      if (owner) {
        problems.push(`comment_id "${data.comment_id}" is already used by ${owner} - each chapter needs its own`);
      } else {
        commentIdOwners.set(data.comment_id, relativePath);
      }
    }

    if (problems.length) {
      fileProblems.push({ relativePath, label: schema.label, problems });
    }
  }

  fileProblems.push(...checkPrivateThreadLinkBoundary(files));

  if (fileProblems.length === 0) {
    console.log(`Content validation passed (${files.length} files checked).`);
    return;
  }

  console.error(`Content validation failed in ${fileProblems.length} file(s):\n`);
  for (const { relativePath, label, problems } of fileProblems) {
    console.error(`${relativePath} (${label}):`);
    for (const problem of problems) {
      console.error(`  - ${problem}`);
    }
  }
  process.exitCode = 1;
}

main();
