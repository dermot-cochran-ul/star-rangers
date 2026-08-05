// Canonical registry of storyline threads and the season numbers each one
// covers - see story-bible/story-bible-summary.md's "Narrative Structure -
// Multiple Independent Storylines" section for the concept this formalizes.
//
// "Thread" here is strictly the MACRO concept: an independent storyline that
// groups whole seasons, with an id, a /threads/ landing page, and deploy-time
// filtering. The other thing the story bible once also called a "thread" -
// two parallel storylines running inside a SINGLE season and meeting at a
// convergence point - is now called a **strand** (Strand A / Strand B), and
// has no representation in this file or anywhere else in the engine. If you
// are looking for where strands are registered: nowhere. They are prose.
// See that section's "Terminology: thread vs. strand" table.
// Single source of truth, consumed both by the site's season/thread
// grouping (src/_data/storylineThreads.js re-exports STORYLINE_THREADS,
// .eleventy.js exposes threadForSeason as a template filter) and by
// deploy.conf's THREADS filter (lib/content-filter.js).
//
// `private: true` (optional, defaults falsy) marks a thread as opt-in only -
// meaning inclusion by naming, rather than the inclusion-by-default every
// other page gets when a build sets no filter at all. Declared here on the
// thread and nowhere else: there is no per-page `private` front-matter flag,
// so a "private page" is always a page that belongs to a private thread
// (by season, by tag/category, or by an explicit `threadId`), never a page
// that declares itself private. Details:
// lib/content-filter.js's isThreadIncluded hides every page belonging to it
// - its chapters (by season), any character/lore/codex/glossary/timeline
// entry tagged with its id, and its own /threads/<id>/ landing page - on
// EVERY build, including the unfiltered "full site" one, unless that
// build's own deploy.conf CHARACTERS/TOPICS/THREADS explicitly names the
// thread's id. This is the opposite of what an ordinary (non-private)
// thread's id does when named there: for those, THREADS just narrows an
// otherwise-full site down to a subset. Use `private: true` for a thread
// meant for exactly one domain (or a small set of them) rather than every
// production clone - e.g. church-space.site/.online's own storyline, kept
// out of fianilchruinne.com, GitHub Pages, and every other clone by
// default.
//
// `homeDomain` (optional, private threads only) is the bare domain where
// this thread's pages DO live - the one clone that opts into it. It exists
// so the "Not included in this edition" placeholder (src/_includes/
// excluded.njk) can point a reader at a domain that actually has the page.
// A private thread's page is excluded on every OTHER build, including the
// default full-site build; without this the placeholder would send readers
// to fianilchruinne.com (the default reference domain), which also excludes
// it - a self-referential loop, since that domain never opts the thread in
// either. With it, an excluded church-space page links to church-space.site
// instead. Ordinary (non-private) excluded pages have no homeDomain and keep
// pointing at DEFAULT_REFERENCE_DOMAIN, the full-site superset that has them.

// The bare domain of the full, unfiltered "reference" site - the superset a
// narrowed clone's excluded pages point back to. Every non-private page
// exists here, so it's the right target for anything excluded by ordinary
// CHARACTERS/TOPICS/THREADS narrowing; a private thread overrides it with
// its own homeDomain (see above), since this domain excludes it too.
const DEFAULT_REFERENCE_DOMAIN = "fianilchruinne.com";

const STORYLINE_THREADS = [
  {
    id: "founding-era",
    name: "Founding Era",
    description:
      "The years that made the Star Rangers both necessary and possible, under the last stretch of Military Space Command rule - before the Charter, and before Threshold Station's drift had a name.",
    seasons: [0]
  },
  {
    id: "tissadelle-arc",
    name: "Tissadelle Shepherd's Arc",
    description:
      "The chronological spine of the published series - Cadet to Principal to Line Captain to the Last Stand, and what the Last Stand leaves behind - carried across Seasons 1, 3, 5, 6, and 7. Seasons 2 and 4 carry the storylines that don't run through her: Undercover Pets and Orbital Five-O.",
    seasons: [1, 3, 5, 6, 7]
  },
  {
    id: "undercover-pets",
    name: "Undercover Pets",
    description:
      "The Undercover Pets Detective Agency and the animals around it - Agent Barsik's working file, trainee Bubochka's exercises, and the specimen the record still cannot classify, carried across Season 2's Eden and Drithane episodes.",
    seasons: [2]
  },
  {
    id: "orbital-five-o",
    name: "Orbital Five-O",
    description:
      "The Governor's Investigative Task Force - Commander Kai Larsen closing the jurisdictional gap none of the five self-governing Compact habitats could close alone, answering to Governor Petra Voss directly and bypassing the Compact's slower consultative councils.",
    // Season 4 assigned 2026-08-05, Dermot's decision, hours after Season 2
    // was reassigned to undercover-pets: Seasons 2 and 4 were always the
    // slots reserved for storylines that don't run through Tissadelle, and
    // this fills the second of them. First chapter: S04E01C01.
    seasons: [4]
  },
  {
    id: "church-space",
    name: "Church Space",
    // NOT a parallel storyline in the ordinary sense, despite living in a
    // registry of them - this description was corrected 2026-07-25 to match
    // the author's intent. Since 2026-08-05 the thread does carry chapters
    // (Season 8), but they are overlay narrative - devotional reading kept
    // beside the shared record - alongside the lore, codex entries, a
    // character, a journal entry, and the thread's own landing page and FAQ.
    //
    // That list is a shape, not an inventory - it went stale once already by
    // being read as one (the journal entry was missing from it until
    // 2026-07-29). Don't maintain a count here. The authoritative answer is
    // always the corpus itself: every page in this thread carries the
    // "church-space" tag, except the two pages under src/threads/church-space/,
    // which acquire it from their `threadId` instead (see privateThreadForPage
    // in lib/content-filter.js). So `grep -rl church-space src` is the query,
    // and the only durable claim worth making in a comment is the one below -
    // that no chapters are among them.
    //
    // It is an OVERLAY: an optional
    // devotional reading of the same reality every other domain shows,
    // concentrated on the spiritual layer, opted into per domain. It rides
    // the thread registry because tag-based membership plus `private: true`
    // is exactly the machinery an overlay needs - not because it is a
    // storyline. See story-bible-summary.md's canon-status table ("Overlay")
    // for the status it carries: not canon, and not codex either.
    description:
      "An optional overlay for the church-space.site/.online deployment: commentary reading the same reality through an explicitly Christian and evangelical lens, concentrated on the spiritual layer. Not part of the main published canon, and not a separate storyline - the events are the same events. Hidden everywhere else - see this file's own `private` field comment above.",
    // Season 8 assigned 2026-08-05 with the thread's first chapter
    // (S08E01C01, The Night Office), under Dermot's same-session direction
    // to create additional seasons as needed. The overlay reading of the
    // note above still governs: church-space chapters are devotional
    // narrative beside the shared record, never load-bearing for it, and
    // they carry no canon_facts. Season membership is also what hides them:
    // threadForSeason(8) -> this thread -> private, so an S8 chapter is
    // excluded on every build that doesn't opt in, with no per-page tagging
    // needed (the s08 season/episode index pages use `threadId` for the
    // same effect, since index pages carry no season front matter).
    seasons: [8],
    private: true,
    // Where church-space pages actually live - the clone that opts this
    // thread in (THREADS=church-space). See DEFAULT_REFERENCE_DOMAIN /
    // `homeDomain` comments above: excluded.njk links here rather than to
    // fianilchruinne.com, which excludes this thread too.
    homeDomain: "church-space.site",
    // Hand-curated tags that, in practice, only ever appear on pages that
    // also carry the "church-space" tag itself - used by
    // scripts/validate-content.js's checkPrivateThreadSignatureTags to catch
    // the failure mode `private: true` can't catch on its own: a new
    // lore/character/codex page written for this thread that forgets the
    // "church-space" tag, and so silently ships on every public domain
    // instead of staying hidden (isPrivatelyExcluded has nothing to match
    // on without the tag).
    //
    // Deliberately hand-curated, NOT auto-derived from "tags that happen to
    // co-occur with church-space today" - a concept like "kieme" is shared
    // cosmology (also tagged on public pages like cosmic-cascade.md), so
    // auto-derivation would false-positive on it. Add a tag here only when
    // introducing a new church-space-exclusive institution/concept/character
    // slug (e.g. a new hermitage, a new Communion office) that has no
    // legitimate reason to appear untagged on a public page.
    signatureTags: ["communion-of-the-called", "cnoc-na-mbeach", "christianity"]
  }
];

// A season whose number isn't claimed by any registered thread yet (e.g. a
// freshly published Season 2/4 before someone assigns it) falls back to
// this rather than disappearing from groupings or crashing template code.
const UNSORTED_THREAD = {
  id: "unsorted",
  name: "Unsorted",
  description: "Seasons published before being assigned to a storyline thread."
};

function threadForSeason(seasonNumber) {
  const n = Number(seasonNumber);
  return STORYLINE_THREADS.find((thread) => thread.seasons.includes(n)) || UNSORTED_THREAD;
}

module.exports = { STORYLINE_THREADS, UNSORTED_THREAD, DEFAULT_REFERENCE_DOMAIN, threadForSeason };
