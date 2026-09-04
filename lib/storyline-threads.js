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
// `tier` (optional; one of lib/editions.js's TIER_ORDER) GATES a thread to a
// reading tier: every page belonging to it - its chapters (by season), any
// character/lore/codex/glossary/timeline entry tagged with its id, its own
// /threads/<id>/ landing page and its entry in the /threads/ listing - is
// hidden on every build whose edition sits BELOW that tier, including the
// unfiltered canonical site, GitHub Pages, local dev and any third-party
// fork (all of which resolve the default edition, at the general tier). On a
// build at or above the tier the thread is ordinary content, included unless
// a filter narrows it out. lib/content-filter.js applies the gate through
// lib/editions.js's tierVisible, the same predicate that gates a
// `::: pov <id> tier=...` block; the two cannot disagree.
//
// Declared here on the thread and nowhere else: there is no per-page `tier`
// front-matter flag for whole pages (a chapter's `povs:` entries carry one
// for individual blocks, which is a different thing), so a "gated page" is
// always a page that belongs to a gated thread - by season, by tag/category,
// or by an explicit `threadId` - never a page that declares itself gated.
//
// HISTORY. Until 2026-09-04 this was `private: true`: opt-in inclusion, the
// thread hidden everywhere unless a build NAMED it in CHARACTERS/TOPICS/
// THREADS, on the reasoning that church-space belonged to one pair of
// domains. The tier ladder of 2026-09-03 made the truer statement "it
// belongs to the contemplative tier", and Dermot ruled the same day-after
// that tier gating replace privacy. Every domain kept exactly the page set it
// had: the contemplative editions already named the thread in their filters,
// and the default edition sits at the general tier. What retired with the
// flag: the "excluded unless named in" case in the filter, and the validator's
// public-to-gated link boundary (a general-tier page linking into the thread
// now gets the ordinary excluded placeholder, like any other narrowed link).
// What stayed, re-purposed: `homeDomain` and `signatureTags` below.
//
// `homeDomain` (required on a gated thread; the registry test asserts it) is
// the bare domain where this thread's pages DO live - a domain at the
// thread's own tier. It exists so the "Not included in this edition"
// placeholder (src/_includes/excluded.njk) can point a reader at a domain
// that actually has the page. A gated thread's page is excluded on every
// build below its tier, the default full-site build included; without this
// the placeholder would send readers to fianilchruinne.com (the default
// reference domain), which sits at the general tier and excludes it too - a
// self-referential loop. With it, an excluded church-space page links to
// church-space.site instead. Ordinary excluded pages have no homeDomain and
// keep pointing at DEFAULT_REFERENCE_DOMAIN, the full-site superset that has
// them. (Deriving this from the tier's ranking host was considered and not
// done: the contemplative tier has two families, and the Communion's thread
// should send a reader to the Communion's door.)

// The bare domain of the full, unfiltered "reference" site - the superset a
// narrowed clone's excluded pages point back to. Every page below or at the
// general tier exists here, so it's the right target for anything excluded
// by ordinary CHARACTERS/TOPICS/THREADS narrowing; a thread gated above the
// general tier overrides it with its own homeDomain (see above), since this
// domain excludes it too.
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
    // Plain register on purpose (2026-09-01, Dermot's direction): this line
    // is shown on /threads/ and in the Reading Plan on the children's domain,
    // and until then read at grade 14 beside chapters written at grade 7.
    description:
      "The Undercover Pets Detective Agency and the animals around it. Agent Barsik is a cat who reads the paperwork first. Bubochka is a rabbit still in training. And there is a small warm creature nobody can put a name to. Season 2, on Eden Space Habitat and the planet Drithane.",
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
    id: "young-star-rangers",
    name: "Young Star Rangers",
    description:
      "The Corps from the bottom rung - Cadets and Deputies in their first field postings, the Field Officers the Corps hands them to, and the year in which a raw Deputy learns what the rank most civilians mean by a Star Ranger actually does all day.",
    // Registered 2026-09-03 at Dermot's direction (story-bible/intake-2026-09-03.md,
    // sixth direction, readings confirmed the same day): the young-adult tier's
    // second thread, beside Orbital Five-O - cadets and Deputies inside the
    // Corps rather than a Governor's task force. Season 9 is its first and only
    // season for now; no chapter yet. The young Deputy of the third direction
    // is its natural protagonist, and 2826 - Shepherd's cadet year on Eden - is
    // its guest window (fourth direction).
    seasons: [9]
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
    // which acquire it from their `threadId` instead (see gatedThreadForPage
    // in lib/content-filter.js). So `grep -rl church-space src` is the query,
    // and the only durable claim worth making in a comment is the one below -
    // that no chapters are among them.
    //
    // It is an OVERLAY: an optional
    // devotional reading of the same reality every other domain shows,
    // concentrated on the spiritual layer, carried by the contemplative
    // tier. It rides the thread registry because tag-based membership plus
    // a `tier` gate is exactly the machinery an overlay needs - not because
    // it is a storyline. See story-bible-summary.md's canon-status table
    // ("Overlay") for the status it carries: not canon, and not codex either.
    description:
      "An optional overlay for the contemplative reading tier - fellowshipoflight.org and church-space.site: commentary reading the same reality through an explicitly Christian and evangelical lens, concentrated on the spiritual layer. Not part of the main published canon, and not a separate storyline - the events are the same events. Absent on every edition below that tier - see this file's own `tier` field comment above.",
    // Season 8 assigned 2026-08-05 with the thread's first chapter
    // (S08E01C01, The Night Office), under Dermot's same-session direction
    // to create additional seasons as needed. The overlay reading of the
    // note above still governs: church-space chapters are devotional
    // narrative beside the shared record, never load-bearing for it, and
    // they carry no canon_facts. Season membership is also what hides them:
    // threadForSeason(8) -> this thread -> tier gate, so an S8 chapter is
    // excluded on every build that doesn't opt in, with no per-page tagging
    // needed (the s08 season/episode index pages use `threadId` for the
    // same effect, since index pages carry no season front matter).
    seasons: [8],
    // Gated to the contemplative tier (Dermot's ruling, 2026-09-04; `private:
    // true` until then - see the HISTORY note above). Visible on
    // fellowshipoflight.org, fellowshipoflight.site and church-space.site,
    // whose editions sit at that tier; absent on every build below it.
    tier: "contemplative",
    // Where church-space pages actually live - a domain at the thread's own
    // tier. See DEFAULT_REFERENCE_DOMAIN / `homeDomain` comments above:
    // excluded.njk links here rather than to fianilchruinne.com, which sits
    // at the general tier and excludes this thread too.
    homeDomain: "church-space.site",
    // THE BOARD FOLLOWS THE THREAD, NOT THE DOMAIN (Dermot's ruling,
    // 2026-09-04, story-bible/intake-2026-09-04.md, seventh message: "pick
    // the board per page"). Every page in this thread carries its comment
    // widget on the Communion's own board (the `church-space` profile in
    // src/_data/giscus.js), on whichever domain renders it; every other page
    // on the same domain uses the build's board, which for the contemplative
    // editions is now the shared pool. Until this ruling the board was chosen
    // per BUILD (`giscusProfile` on the edition), which was fine while the
    // contemplative editions carried only this thread and became a split
    // conversation the day the tier ladder (2026-09-03) gave them the whole
    // main sequence: a Season 1 chapter on fellowshipoflight.org showed a
    // second, empty thread on the Communion board instead of the one the same
    // chapter carries everywhere else. The Communion board held no discussion
    // at all when the switch was made (measured the same day), so nothing was
    // orphaned. Resolved by .eleventy.js's `giscusBoard`, through
    // threadForPage in lib/content-filter.js - the same membership signals
    // the tier gate reads.
    giscusProfile: "church-space",
    // Hand-curated tags that, in practice, only ever appear on pages that
    // also carry the "church-space" tag itself - used by
    // scripts/validate-content.js's checkGatedThreadSignatureTags to catch
    // the failure mode the tier gate can't catch on its own: a new
    // lore/character/codex page written for this thread that forgets the
    // "church-space" tag, and so silently ships on every general-tier
    // domain instead of staying above the gate (isTierExcluded has nothing
    // to match on without the tag).
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
