// Unit tests for lib/content-filter.js - the CHARACTERS/TOPICS/THREADS
// narrowing predicates and the private-thread opt-in veto. This is the one
// module where a logic regression has a privacy consequence (a private
// thread's pages shipping on every public domain), so the governing
// asymmetry gets pinned here as executable truth tables:
//
//   ordinary content is INCLUDED unless a filter narrows it out;
//   private content is EXCLUDED unless a build names it in.
//
// The tests run against the real lib/storyline-threads.js registry rather
// than a fixture one, deliberately: church-space being the only private
// thread is itself a documented decision (CLAUDE.md), and a registry change
// that broke these expectations should be noticed, not absorbed.
const test = require("node:test");
const assert = require("node:assert/strict");

const {
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
  checkPrivateThreadSignatureTags,
  getRelatedContentUrls
} = require("../lib/content-filter");

const FILTER_VARS = ["CHARACTERS", "TOPICS", "THREADS"];

// Builds a filter through the real env-var parse path, then restores the
// environment, so tests exercise getContentFilter itself rather than a
// hand-built object that could drift from the production shape.
function filterFor({ characters, topics, threads } = {}) {
  const saved = FILTER_VARS.map((k) => [k, process.env[k]]);
  try {
    if (characters === undefined) delete process.env.CHARACTERS;
    else process.env.CHARACTERS = characters;
    if (topics === undefined) delete process.env.TOPICS;
    else process.env.TOPICS = topics;
    if (threads === undefined) delete process.env.THREADS;
    else process.env.THREADS = threads;
    return getContentFilter();
  } finally {
    for (const [k, v] of saved) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
}

test("parseFilterList: empty, undefined and whitespace inputs give an empty list", () => {
  assert.deepEqual(parseFilterList(undefined), []);
  assert.deepEqual(parseFilterList(""), []);
  assert.deepEqual(parseFilterList(" , ,, "), []);
});

test("parseFilterList: trims, lowercases and drops empty segments", () => {
  assert.deepEqual(parseFilterList(" Tissadelle, ALDERA ,rook-7,"), ["tissadelle", "aldera", "rook-7"]);
});

test("getContentFilter: no env vars means an inactive filter", () => {
  const filter = filterFor({});
  assert.equal(filter.active, false);
  assert.equal(filter.tagMatches.size, 0);
});

test("getContentFilter: any of the three vars activates the filter and all three feed tagMatches", () => {
  const filter = filterFor({ characters: "tissadelle", topics: "eden", threads: "founding-era" });
  assert.equal(filter.active, true);
  for (const t of ["tissadelle", "eden", "founding-era"]) {
    assert.ok(filter.tagMatches.has(t), `tagMatches should contain ${t}`);
  }
});

// ---------------------------------------------------------------------------
// The asymmetry, half one: ordinary content on the unfiltered full-site build.
// ---------------------------------------------------------------------------

test("no filter: an ordinary character, chapter and topic page all ship", () => {
  const filter = filterFor({});
  assert.equal(isCharacterIncluded({ id: "aldera", tags: ["star-rangers"] }, filter), true);
  assert.equal(isChapterIncluded({ season: 1, povs: [{ id: "tissadelle" }] }, filter), true);
  assert.equal(isTopicPageIncluded({ tags: ["cosmology"] }, filter), true);
});

// ---------------------------------------------------------------------------
// The asymmetry, half two: private content is excluded until named in.
// church-space is the registry's one private thread (season 8).
// ---------------------------------------------------------------------------

test("no filter: a church-space-tagged page is still excluded", () => {
  const filter = filterFor({});
  assert.equal(isTopicPageIncluded({ tags: ["church-space", "lore"] }, filter), false);
  assert.equal(isCharacterIncluded({ id: "brother-daire", tags: ["church-space"] }, filter), false);
});

test("no filter: a season-8 chapter is excluded by season membership alone, no tag needed", () => {
  const filter = filterFor({});
  assert.equal(isChapterIncluded({ season: 8 }, filter), false);
});

test("THREADS=church-space opts the private thread in: tag, season and landing page all ship", () => {
  const filter = filterFor({ threads: "church-space" });
  assert.equal(isTopicPageIncluded({ tags: ["church-space"] }, filter), true);
  assert.equal(isChapterIncluded({ season: 8 }, filter), true);
  assert.equal(isThreadIncluded("church-space", filter), true);
});

test("naming church-space in CHARACTERS or TOPICS opts it in too (all three fold into tagMatches)", () => {
  for (const key of ["characters", "topics"]) {
    const filter = filterFor({ [key]: "church-space" });
    assert.equal(isPrivatelyExcluded({ tags: ["church-space"] }, filter), false, `via ${key}`);
  }
});

test("a narrowed build that never names church-space keeps it hidden - narrowing is not opting in", () => {
  const filter = filterFor({ characters: "tissadelle", topics: "eden" });
  assert.equal(isTopicPageIncluded({ tags: ["church-space", "eden"] }, filter), false);
  assert.equal(isChapterIncluded({ season: 8, povs: [{ id: "tissadelle" }] }, filter), false);
});

test("isThreadIncluded: a non-private thread is included on every build, named or not", () => {
  assert.equal(isThreadIncluded("founding-era", filterFor({})), true);
  assert.equal(isThreadIncluded("founding-era", filterFor({ threads: "tissadelle-arc" })), true);
  // An unknown thread id is not private, so it passes through too.
  assert.equal(isThreadIncluded("no-such-thread", filterFor({})), true);
});

test("privateThreadForPage: resolves by season, tag, category and threadId; null for ordinary pages", () => {
  assert.equal(privateThreadForPage({ season: 8 }).id, "church-space");
  assert.equal(privateThreadForPage({ tags: ["Church-Space"] }).id, "church-space");
  assert.equal(privateThreadForPage({ category: "church-space" }).id, "church-space");
  assert.equal(privateThreadForPage({ threadId: "church-space" }).id, "church-space");
  assert.equal(privateThreadForPage({ season: 1, tags: ["star-rangers"] }), null);
  assert.equal(privateThreadForPage({}), null);
});

test("privateThreadForPage is filter-independent: it answers which thread, not whether to hide", () => {
  // Even a build that opted in still resolves the thread (excluded.njk uses
  // this to point at the thread's homeDomain).
  assert.equal(privateThreadForPage({ season: 8 }).homeDomain, "church-space.site");
});

// ---------------------------------------------------------------------------
// Ordinary narrowing.
// ---------------------------------------------------------------------------

test("CHARACTERS narrows characters by id or tag, case-insensitively", () => {
  const filter = filterFor({ characters: "Tissadelle" });
  assert.equal(isCharacterIncluded({ id: "TISSADELLE" }, filter), true);
  assert.equal(isCharacterIncluded({ id: "aldera", tags: ["tissadelle"] }, filter), true);
  assert.equal(isCharacterIncluded({ id: "aldera", tags: ["cascade"] }, filter), false);
});

test("chapters earn inclusion by POV, tag, or thread membership - and by nothing else", () => {
  const byPov = filterFor({ characters: "tissadelle" });
  assert.equal(isChapterIncluded({ season: 1, povs: [{ id: "tissadelle" }] }, byPov), true);
  assert.equal(isChapterIncluded({ season: 1, povs: [{ id: "aldera" }] }, byPov), false);

  const byThread = filterFor({ threads: "tissadelle-arc" });
  assert.equal(isChapterIncluded({ season: 5, povs: [] }, byThread), true);
  assert.equal(isChapterIncluded({ season: 2, povs: [] }, byThread), false);

  const byTag = filterFor({ topics: "eden" });
  assert.equal(isChapterIncluded({ season: 2, tags: ["eden"] }, byTag), true);
});

test("hasMatchingTag matches tags and category; inactive filter matches nothing", () => {
  const filter = filterFor({ topics: "eden" });
  assert.equal(hasMatchingTag({ tags: ["EDEN"] }, filter), true);
  assert.equal(hasMatchingTag({ category: "Eden" }, filter), true);
  assert.equal(hasMatchingTag({ tags: ["mara"] }, filter), false);
  assert.equal(hasMatchingTag({ tags: ["eden"] }, filterFor({})), false);
});

test("hasMatchingPov tolerates malformed povs entries", () => {
  const filter = filterFor({ characters: "tissadelle" });
  assert.equal(hasMatchingPov({ povs: [null, {}, { id: "TISSADELLE" }] }, filter), true);
  assert.equal(hasMatchingPov({ povs: "not-a-list" }, filter), false);
});

test("isSeasonInIncludedThread: THREADS only, via the season's registered thread", () => {
  const filter = filterFor({ threads: "undercover-pets" });
  assert.equal(isSeasonInIncludedThread({ season: 2 }, filter), true);
  assert.equal(isSeasonInIncludedThread({ season: 3 }, filter), false);
  assert.equal(isSeasonInIncludedThread({ season: 2 }, filterFor({ characters: "barsik" })), false);
});

// The POV page follows the CHARACTER, not the chapter. `characterData` is
// passed explicitly here so the truth table does not depend on what the
// live corpus happens to tag; `null` means "no character page at all".
test("isCharacterPovIncluded: CHARACTERS grants a POV page outright", () => {
  assert.equal(isCharacterPovIncluded("tissadelle", filterFor({ characters: "tissadelle" }), undefined, null), true);
  assert.equal(isCharacterPovIncluded("aldera", filterFor({ characters: "tissadelle" }), undefined, null), false);
  assert.equal(isCharacterPovIncluded("anyone", filterFor({}), undefined, null), true);
});

test("isCharacterPovIncluded: a TOPICS/THREADS build grants a POV page when the character's OWN page is included", () => {
  const pets = filterFor({ topics: "undercover-pets.com", threads: "undercover-pets" });
  const barsik = { id: "barsik", tags: ["cat", "undercover-pets.com"] };
  const larsen = { id: "larsen", tags: ["human", "orbital-five-o"] };
  assert.equal(isCharacterPovIncluded("barsik", pets, undefined, barsik), true);
  assert.equal(isCharacterPovIncluded("larsen", pets, undefined, larsen), false);
  // The chapter's tags never stand in for the witness's: no character page,
  // no POV page, however the chapter itself is included.
  assert.equal(isCharacterPovIncluded("tissadelle", filterFor({ topics: "tissadelle" }), undefined, null), false);
});

test("isCharacterPovIncluded looks the character up by id when no data is passed (Aldera regression)", () => {
  // Aldera's page was tagged `pets` rather than `undercover-pets.com` until
  // 2026-09-02, so her Season 1 chapters shipped on the children's domain
  // while her page and every "View from Aldera" button dead-ended.
  const pets = filterFor({ topics: "undercover-pets.com", threads: "undercover-pets" });
  assert.equal(isCharacterPovIncluded("aldera", pets), true);
  assert.equal(isCharacterPovIncluded("no-such-character", pets), false);
});

test("isCharacterPovIncluded applies the private veto through the chapter's data", () => {
  const filter = filterFor({ characters: "tissadelle" });
  assert.equal(isCharacterPovIncluded("tissadelle", filter, { season: 8 }), false);
});

// ---------------------------------------------------------------------------
// The signature-tag tripwire and the related-content walk.
// ---------------------------------------------------------------------------

test("checkPrivateThreadSignatureTags flags a signature tag missing its thread tag", () => {
  const problems = checkPrivateThreadSignatureTags({ tags: ["cnoc-na-mbeach", "lore"] });
  assert.equal(problems.length, 1);
  assert.deepEqual(problems[0], { threadId: "church-space", signatureTag: "cnoc-na-mbeach" });
});

test("checkPrivateThreadSignatureTags stays quiet when the thread tag is present, or there are no tags", () => {
  assert.deepEqual(checkPrivateThreadSignatureTags({ tags: ["cnoc-na-mbeach", "church-space"] }), []);
  assert.deepEqual(checkPrivateThreadSignatureTags({ tags: [] }), []);
  assert.deepEqual(checkPrivateThreadSignatureTags({}), []);
});

test("getRelatedContentUrls: empty without an active CHARACTERS filter", () => {
  assert.equal(getRelatedContentUrls(filterFor({})).size, 0);
  assert.equal(getRelatedContentUrls(filterFor({ topics: "eden" })).size, 0);
});

test("getRelatedContentUrls: an included character's bio links come along, site-relative", () => {
  // Integration against the real src/characters corpus: Tissadelle's page
  // links its background, so a tissadelle-narrowed deploy carries it.
  const urls = getRelatedContentUrls(filterFor({ characters: "tissadelle" }));
  assert.ok(urls.size > 0, "expected at least one related URL from the bio");
  for (const url of urls) {
    assert.ok(!url.startsWith("/star-rangers/"), `URL should be site-relative: ${url}`);
    assert.match(url, /^\/(lore|timeline|glossary)\//);
  }
});
