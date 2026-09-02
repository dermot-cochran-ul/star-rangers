// Shared CHARACTERS/TOPICS/THREADS content filtering (see .cpanel.yml for
// the full deploy.conf-driven explanation). Used by .eleventy.js for the
// existing whole-page inclusion checks, and by src/_data/scenePovPages.js
// for the finer-grained per-scene, per-character POV page inclusion.
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { threadForSeason, STORYLINE_THREADS } = require("./storyline-threads");

function parseFilterList(envValue) {
  return String(envValue || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

function getContentFilter() {
  const characters = parseFilterList(process.env.CHARACTERS);
  const topics = parseFilterList(process.env.TOPICS);
  const threads = parseFilterList(process.env.THREADS);
  return {
    characters,
    threads,
    // Tags conventionally embed character slugs too (e.g. a timeline entry
    // tagged "aldera"), so CHARACTERS also participates in tag matching.
    // THREADS joins the same set so a lore/timeline/glossary/codex entry
    // explicitly tagged with a thread id (e.g. "founding-era") is pulled in
    // the same way a TOPICS match would be, on top of the season-membership
    // check isSeasonInIncludedThread does below for chapters specifically.
    tagMatches: new Set([...characters, ...topics, ...threads]),
    active: characters.length > 0 || topics.length > 0 || threads.length > 0
  };
}

// A thread flagged `private: true` in lib/storyline-threads.js is hidden on
// EVERY build - including the unfiltered "full site" build where
// CHARACTERS/TOPICS/THREADS are all unset - unless that build's own
// CHARACTERS/TOPICS/THREADS explicitly names the thread's id. This is the
// inverse of the narrowing filter below: narrowing takes an otherwise-full
// site down to a subset; a private thread hides its content from every
// build except the one(s) that opt in by id, so e.g. a church-space-only
// character, chapter, or thread page never leaks onto sciencefiction.site,
// GitHub Pages, or any other domain that never asks for it.
function isThreadIncluded(threadId, filter) {
  const thread = STORYLINE_THREADS.find((t) => t.id === threadId);
  if (!thread || !thread.private) return true;
  return filter.tagMatches.has(thread.id);
}

// The private storyline thread a page belongs to (via its own season, its
// tags/category, or an explicit `threadId` front-matter field - the same
// membership signals isPrivatelyExcluded checks), or null if it belongs to
// no private thread. Filter-INDEPENDENT: it answers "which private thread is
// this?", not "should this build hide it?" - so a page whose thread the
// current build opted into still resolves here. Used by .eleventy.js to
// point an excluded page's placeholder at that thread's own homeDomain,
// which (unlike the default reference domain) actually has the page.
function privateThreadForPage(data) {
  const isPrivate = (threadId) => {
    const thread = STORYLINE_THREADS.find((t) => t.id === threadId);
    return thread && thread.private ? thread : null;
  };
  if (data.season !== undefined && data.season !== null) {
    const bySeason = isPrivate(threadForSeason(data.season).id);
    if (bySeason) return bySeason;
  }
  const candidates = Array.isArray(data.tags) ? data.tags.map((t) => String(t).toLowerCase()) : [];
  if (data.category) candidates.push(String(data.category).toLowerCase());
  if (data.threadId) candidates.push(String(data.threadId).toLowerCase());
  for (const c of candidates) {
    const byTag = isPrivate(c);
    if (byTag) return byTag;
  }
  return null;
}

// Private = OPT-IN inclusion, the inverse of everything else in this file.
// Ordinary content is included unless a filter narrows it out; private
// content is excluded unless a build names it in. The distinguishing case is
// the no-filter build: with CHARACTERS/TOPICS/THREADS all unset, every
// ordinary page ships and every private page still does not. That asymmetry
// is why privacy lives in the thread registry rather than in deploy.conf -
// deploy.conf can only express "narrow this build", never "this content is
// off by default everywhere".
//
// True if a page belongs to a private thread this build hasn't opted into -
// via its own season (chapters, through threadForSeason), its tags/category
// (characters, lore, glossary, codex, timeline - the same fields
// hasMatchingTag reads), or an explicit `threadId` front-matter field (a
// thread's own standalone landing page under src/threads/<id>/). Checked
// regardless of filter.active, and before the normal narrowing checks below,
// since a private thread must stay hidden on the unfiltered full-site build
// too, not just on a narrowed one. A build opts a private thread in by
// naming its id in CHARACTERS/TOPICS/THREADS (all folded into
// filter.tagMatches), exactly as isThreadIncluded checks.
function isPrivatelyExcluded(data, filter) {
  const thread = privateThreadForPage(data);
  return thread ? !filter.tagMatches.has(thread.id) : false;
}

function hasMatchingTag(data, filter) {
  if (!filter.tagMatches.size) return false;
  const tags = Array.isArray(data.tags) ? data.tags.map((t) => String(t).toLowerCase()) : [];
  const category = data.category ? String(data.category).toLowerCase() : null;
  return tags.some((t) => filter.tagMatches.has(t)) || (category !== null && filter.tagMatches.has(category));
}

function hasMatchingPov(data, filter) {
  if (!filter.characters.length) return false;
  const povs = Array.isArray(data.povs) ? data.povs : [];
  return povs.some((p) => filter.characters.includes(String((p && p.id) || "").toLowerCase()));
}

const CHARACTERS_DIR = path.join(__dirname, "..", "src", "characters");

function isCharacterIncluded(data, filter) {
  if (isPrivatelyExcluded(data, filter)) return false;
  if (!filter.active) return true;
  return filter.characters.includes(String(data.id || "").toLowerCase()) || hasMatchingTag(data, filter);
}

// A chapter's own season, not its tags, is what identifies which storyline
// thread it belongs to (see lib/storyline-threads.js) - a chapter never
// needs its own `thread` front matter field, since thread membership is
// season-level, the same way title/description are season-level rather
// than repeated per chapter.
function isSeasonInIncludedThread(data, filter) {
  if (!filter.threads.length) return false;
  return filter.threads.includes(threadForSeason(data.season).id);
}

function isChapterIncluded(data, filter) {
  if (isPrivatelyExcluded(data, filter)) return false;
  if (!filter.active) return true;
  return hasMatchingPov(data, filter) || hasMatchingTag(data, filter) || isSeasonInIncludedThread(data, filter);
}

function isTopicPageIncluded(data, filter) {
  if (isPrivatelyExcluded(data, filter)) return false;
  if (!filter.active) return true;
  return hasMatchingTag(data, filter);
}

// Per-character granularity for the individual scene/POV pages: unlike
// isChapterIncluded (any matching POV pulls in the whole chapter, tags
// included), a single character's own POV page is real content only when
// THAT CHARACTER is on this build - named in CHARACTERS, or (since
// 2026-09-02) carrying a tag the build's TOPICS/THREADS match on their own
// character page, which is the same test isCharacterIncluded applies to the
// page a "View from" button sits beside. A chapter's tags still cannot grant
// a POV page: they identify the chapter, not the witness.
//
// Until 2026-09-02 only CHARACTERS could grant one, on the reasoning that a
// topic does not identify a specific character. True of the chapter's tags;
// not true of the character's own. The consequence surfaced on
// undercover-pets.com, which narrows by TOPICS and THREADS and names no
// CHARACTERS: every one of its 57 "View from" pages rendered as a "Not
// included in this edition" placeholder, Barsik's included, on the domain
// whose reader profile is built around following one animal's viewpoint.
//
// `characterData` is the character's own front matter; when omitted it is
// looked up by id from src/characters/ (cached), so the scene-POV builder
// needs no extra plumbing and tests can pass a hand-built page.
function isCharacterPovIncluded(characterId, filter, chapterData, characterData) {
  if (chapterData && isPrivatelyExcluded(chapterData, filter)) return false;
  if (!filter.active) return true;
  const id = String(characterId || "").toLowerCase();
  if (filter.characters.includes(id)) return true;
  const data = characterData === undefined ? characterDataById(id) : characterData;
  return data ? isCharacterIncluded(data, filter) : false;
}

let characterDataCache = null;

// Front matter of every character page, keyed by its `id` (the value POV
// blocks and `povs:` use), falling back to the filename slug for a page
// with no id. Read once per process: the scene-POV builder asks for every
// POV of every chapter, and the corpus does not change under a build.
function characterDataById(id) {
  if (!characterDataCache) {
    characterDataCache = new Map();
    let files = [];
    try {
      files = fs.readdirSync(CHARACTERS_DIR).filter((f) => f.endsWith(".md"));
    } catch {
      files = [];
    }
    for (const file of files) {
      const { data } = matter(fs.readFileSync(path.join(CHARACTERS_DIR, file), "utf8"));
      const key = String(data.id || file.replace(/\.md$/, "")).toLowerCase();
      if (!characterDataCache.has(key)) characterDataCache.set(key, data);
    }
  }
  return characterDataCache.get(String(id || "").toLowerCase()) || null;
}

// Matches an in-repo link target like /star-rangers/lore/planets/aspenar/
// or /star-rangers/glossary/plural-minds/ anywhere in a character's raw
// markdown body - deliberately not anchored to `[text](...)` syntax alone,
// since a stray `href="..."` would carry the same meaning.
const RELATED_LINK_PATTERN = /\/star-rangers\/(lore|timeline|glossary)\/[a-z0-9-/]+/gi;

// A character's own bio is already the site's best record of which lore,
// timeline, and glossary entries matter for understanding them - every
// character page in this repo cross-links its relevant background rather
// than restating it. So when a CHARACTERS-filtered deploy narrows the site
// to a handful of characters, this walks each included character's raw
// markdown for exactly those links and returns the set of lore/timeline/
// glossary page URLs (site-relative, no /star-rangers prefix, matching
// Eleventy's own `item.url`) that deploy should carry along even though
// nothing tagged them for that character explicitly.
function getRelatedContentUrls(filter) {
  const urls = new Set();
  if (!filter.active || !filter.characters.length) return urls;

  let files;
  try {
    files = fs.readdirSync(CHARACTERS_DIR).filter((f) => f.endsWith(".md"));
  } catch {
    return urls;
  }

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CHARACTERS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    if (!isCharacterIncluded(data, filter)) continue;

    for (const match of content.matchAll(RELATED_LINK_PATTERN)) {
      urls.add(match[0].replace(/^\/star-rangers/, ""));
    }
  }

  return urls;
}

// Flags a page that carries one of a private thread's hand-curated
// `signatureTags` (lib/storyline-threads.js) without also carrying the
// thread's own id tag - the missing-tag failure mode `isPrivatelyExcluded`
// can't detect on its own, since it only hides what's already tagged.
// Returns [{ threadId, signatureTag }] problems, empty if none. Takes a
// page's already-parsed front matter data; the caller (validate-content.js)
// supplies the relativePath for reporting.
function checkPrivateThreadSignatureTags(data) {
  const problems = [];
  const tags = Array.isArray(data.tags) ? data.tags.map((t) => String(t).toLowerCase()) : [];
  if (!tags.length) return problems;

  for (const thread of STORYLINE_THREADS) {
    if (!thread.private || !Array.isArray(thread.signatureTags)) continue;
    if (tags.includes(thread.id)) continue; // already correctly tagged
    for (const signature of thread.signatureTags) {
      if (tags.includes(signature)) {
        problems.push({ threadId: thread.id, signatureTag: signature });
      }
    }
  }
  return problems;
}

module.exports = {
  parseFilterList,
  getContentFilter,
  hasMatchingTag,
  hasMatchingPov,
  isSeasonInIncludedThread,
  isThreadIncluded,
  privateThreadForPage,
  isPrivatelyExcluded,
  isCharacterIncluded,
  isChapterIncluded,
  isTopicPageIncluded,
  isCharacterPovIncluded,
  characterDataById,
  checkPrivateThreadSignatureTags,
  getRelatedContentUrls
};
