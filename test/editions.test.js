// Pins lib/editions.js's readingPlan contract. The failure it guards is
// quiet: src/start/index.md resolves `startThreadId` against the build's own
// filtered chapters, so a plan naming a thread the edition excludes renders
// "Begin here" with nothing under it and the page merely looks unfinished.
// validateEditions refuses that at config time; these tests pin the rule
// with hand-built editions rather than the live registry, so a registry
// change can't make the guard vacuous.
const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("path");

const { DEFAULT_EDITION, allEditions, validateEditions, validateReadingPlan } = require("../lib/editions");

const REPO = path.join(__dirname, "..");

const goodPlan = () => ({
  startThreadId: "undercover-pets",
  intro: "Start here.",
  begin: "Press Next.",
  howToRead: "Read it straight through.",
  shelves: { characters: "Who everyone is." },
  more: "Other stories."
});

const edition = (overrides) => ({ ...DEFAULT_EDITION, id: "test", ...overrides });

test("the live registry validates, including every readingPlan it carries", () => {
  validateEditions({ audioDir: path.join(REPO, "src", "audio"), cssDir: path.join(REPO, "src", "css") });
});

test("the default edition carries no readingPlan - Sen's note is the site-wide plan", () => {
  assert.equal(DEFAULT_EDITION.readingPlan, null);
});

test("a null or absent readingPlan is fine", () => {
  validateReadingPlan(edition({ readingPlan: null }));
  validateReadingPlan(edition({}));
});

test("an unfiltered edition may start on any registered thread", () => {
  validateReadingPlan(edition({ readingPlan: goodPlan() }));
});

test("a narrowed edition must name its start thread in its own threads", () => {
  validateReadingPlan(edition({ threads: ["undercover-pets"], readingPlan: goodPlan() }));
  assert.throws(
    () => validateReadingPlan(edition({ threads: ["orbital-five-o"], readingPlan: goodPlan() })),
    /not in this edition's own threads/
  );
  // Topic-only narrowing is still narrowing: a chapter is included by season
  // membership, and a topic tag can't stand in for that.
  assert.throws(
    () => validateReadingPlan(edition({ topics: ["undercover-pets.com"], readingPlan: goodPlan() })),
    /not in this edition's own threads/
  );
});

test("an unregistered start thread is refused", () => {
  assert.throws(
    () => validateReadingPlan(edition({ readingPlan: { ...goodPlan(), startThreadId: "no-such-thread" } })),
    /not a registered thread/
  );
});

test("every text field must be a non-empty string", () => {
  for (const field of ["intro", "begin", "howToRead", "more"]) {
    assert.throws(
      () => validateReadingPlan(edition({ readingPlan: { ...goodPlan(), [field]: "  " } })),
      new RegExp(`readingPlan\\.${field} must be a non-empty string`),
      field
    );
  }
});

test("shelves are keyed by the sections /start/ renders, nothing else", () => {
  assert.throws(
    () => validateReadingPlan(edition({ readingPlan: { ...goodPlan(), shelves: { journal: "x" } } })),
    /unknown section "journal"/
  );
  assert.throws(
    () => validateReadingPlan(edition({ readingPlan: { ...goodPlan(), shelves: ["x"] } })),
    /shelves must be an object/
  );
  assert.throws(
    () => validateReadingPlan(edition({ readingPlan: { ...goodPlan(), shelves: { lore: "" } } })),
    /shelves\.lore must be a non-empty string/
  );
});

test("the pets edition is the one that carries a plan today, and it starts on its own thread", () => {
  const pets = allEditions().find((e) => e.id === "pets");
  assert.ok(pets && pets.readingPlan, "pets edition has a readingPlan");
  assert.equal(pets.readingPlan.startThreadId, "undercover-pets");
  assert.ok(pets.threads.includes("undercover-pets"));
});
