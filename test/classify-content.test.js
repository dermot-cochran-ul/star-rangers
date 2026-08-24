// Unit tests for lib/classify-content.js - inputPath classification and the
// whole-page include-or-placeholder decision that eleventyComputed runs for
// every page. Two of these are regression tests for documented real bugs:
// the layout-vs-inputPath hazard (classification must come from the path,
// which these tests pin by construction) and the journal fallthrough that
// once published author notes on every branded edition.
const test = require("node:test");
const assert = require("node:assert/strict");

const {
  classifyContentPath,
  isRelatedTopicPageIncluded,
  isContentIncluded
} = require("../lib/classify-content");
const { getContentFilter } = require("../lib/content-filter");

const FILTER_VARS = ["CHARACTERS", "TOPICS", "THREADS"];

// Same env-roundtrip helper as content-filter.test.js, plus the relatedUrls
// set .eleventy.js attaches after getContentFilter (see its config function).
function filterFor({ characters, topics, threads, relatedUrls } = {}) {
  const saved = FILTER_VARS.map((k) => [k, process.env[k]]);
  try {
    if (characters === undefined) delete process.env.CHARACTERS;
    else process.env.CHARACTERS = characters;
    if (topics === undefined) delete process.env.TOPICS;
    else process.env.TOPICS = topics;
    if (threads === undefined) delete process.env.THREADS;
    else process.env.THREADS = threads;
    const filter = getContentFilter();
    filter.relatedUrls = new Set(relatedUrls || []);
    return filter;
  } finally {
    for (const [k, v] of saved) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
}

function page(inputPath, url, extra = {}) {
  return { page: { inputPath, url }, ...extra };
}

test("classifyContentPath: each content directory maps to its kind", () => {
  assert.equal(classifyContentPath("./src/characters/aldera.md"), "character");
  assert.equal(classifyContentPath("./src/seasons/s01/e01/s01e01c01.md"), "chapter");
  assert.equal(classifyContentPath("./src/lore/planets/drithane.md"), "lore");
  assert.equal(classifyContentPath("./src/glossary/plural-minds.md"), "glossary");
  assert.equal(classifyContentPath("./src/codex/marked-absences.md"), "codex");
  assert.equal(classifyContentPath("./src/timeline/founding.md"), "timeline");
  assert.equal(classifyContentPath("./src/journal/naming.md"), "journal");
});

test("classifyContentPath: index listings, structural pages and missing paths are null", () => {
  assert.equal(classifyContentPath("./src/characters/index.md"), null);
  assert.equal(classifyContentPath("./src/seasons/s01/index.md"), null);
  assert.equal(classifyContentPath("./src/about.md"), null);
  assert.equal(classifyContentPath("./src/threads/founding-era/index.md"), null);
  assert.equal(classifyContentPath(undefined), null);
  assert.equal(classifyContentPath(null), null);
});

test("isContentIncluded: structural pages always pass through, filtered or not", () => {
  const data = page("./src/about.md", "/about/");
  assert.equal(isContentIncluded(data, filterFor({})), true);
  assert.equal(isContentIncluded(data, filterFor({ characters: "tissadelle" })), true);
});

test("isContentIncluded: journal entries filter like codex (the fallthrough regression)", () => {
  const entry = page("./src/journal/naming.md", "/journal/naming/", { tags: ["craft"] });
  // Full site: appears.
  assert.equal(isContentIncluded(entry, filterFor({})), true);
  // Narrowed edition, no tag match: placeholder, never the branded framing.
  assert.equal(isContentIncluded(entry, filterFor({ characters: "barsik" })), false);
  // Narrowed edition that names a matching tag: appears.
  assert.equal(isContentIncluded(entry, filterFor({ topics: "craft" })), true);
});

test("isContentIncluded: a private thread's own landing page obeys threadId opt-in", () => {
  const landing = page("./src/threads/church-space/index.md", "/threads/church-space/", {
    threadId: "church-space"
  });
  assert.equal(isContentIncluded(landing, filterFor({})), false);
  assert.equal(isContentIncluded(landing, filterFor({ threads: "church-space" })), true);
  // An ordinary thread's landing page shows everywhere.
  const ordinary = page("./src/threads/founding-era/index.md", "/threads/founding-era/", {
    threadId: "founding-era"
  });
  assert.equal(isContentIncluded(ordinary, filterFor({})), true);
});

test("isContentIncluded: private pages placeholder on the UNFILTERED build too - no !active shortcut", () => {
  const filter = filterFor({});
  assert.equal(filter.active, false);
  assert.equal(isContentIncluded(page("./src/seasons/s08/e01/s08e01c01.md", "/x/", { season: 8 }), filter), false);
  assert.equal(isContentIncluded(page("./src/lore/hermitage.md", "/x/", { tags: ["church-space"] }), filter), false);
});

test("isRelatedTopicPageIncluded: relatedUrls pulls in an untagged background page", () => {
  const url = "/lore/planets/tir-na-nog/";
  const data = page("./src/lore/planets/tir-na-nog.md", url, { tags: ["celtic-union"] });
  const without = filterFor({ characters: "tissadelle" });
  assert.equal(isContentIncluded(data, without), false);
  const withRelated = filterFor({ characters: "tissadelle", relatedUrls: [url] });
  assert.equal(isContentIncluded(data, withRelated), true);
});

test("isRelatedTopicPageIncluded: relatedUrls is not a backdoor around the private veto", () => {
  const url = "/lore/hermitage/";
  const data = page("./src/lore/hermitage.md", url, { tags: ["church-space"] });
  const filter = filterFor({ characters: "tissadelle", relatedUrls: [url] });
  assert.equal(isRelatedTopicPageIncluded(data, filter, url), false);
  assert.equal(isContentIncluded(data, filter), false);
});

test("isContentIncluded: characters and chapters route to their own predicates", () => {
  const filter = filterFor({ characters: "tissadelle" });
  assert.equal(
    isContentIncluded(page("./src/characters/tissadelle-shepherd.md", "/x/", { id: "tissadelle" }), filter),
    true
  );
  assert.equal(
    isContentIncluded(page("./src/characters/aldera.md", "/x/", { id: "aldera", tags: [] }), filter),
    false
  );
  assert.equal(
    isContentIncluded(
      page("./src/seasons/s01/e01/s01e01c01.md", "/x/", { season: 1, povs: [{ id: "tissadelle" }] }),
      filter
    ),
    true
  );
});
