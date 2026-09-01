# Testing Strategy

How this repository is tested, what each layer exists to catch, and how to
extend it. Mechanics live here; the authority rules they serve live in
`CLAUDE.md` ("Authority and review boundary").

## The governing principle

**The gates prove structure, not judgement.** Everything below can show that a
page is well-formed, uniquely identified, fully resolved, and that the engine's
logic behaves as pinned. Nothing in the toolchain can show that a sentence is
*true in this world*, in the house voice, or safe to be bound by later — that
review is Dermot's and is deliberately not automated. The test suite's job is
to make the mechanical failures impossible so the human review is spent only on
the judgement calls.

Two corollaries shape what gets tested first:

- **Privacy is the highest-stakes logic in the repo.** A regression in
  `lib/content-filter.js` doesn't break a build — it ships a private thread's
  pages (church-space) on every public domain, or silently empties a production
  edition. That module gets the densest regression coverage.
- **Every documented real bug becomes a test.** The layout-vs-inputPath hazard
  and the journal fallthrough were both real incidents; both are now pinned in
  `test/classify-content.test.js` so they cannot recur unnoticed.

## Layer 1 — unit tests (`test/`, `node:test`, no dependencies)

Run all: `node --test test/*.test.js` · one suite: `node --test test/content-filter.test.js`

- **`test/content-filter.test.js`** pins the narrowing/private-thread truth
  tables as executable statements of the asymmetry: *ordinary content is
  included unless a filter narrows it out; private content is excluded unless a
  build names it in.* It covers the no-filter build, narrowed builds that do
  and don't name church-space, opt-in via each of CHARACTERS/TOPICS/THREADS,
  season-membership exclusion, the signature-tag tripwire, and the
  `relatedUrls` bio-link walk (run against the real `src/characters` corpus).
- **`test/classify-content.test.js`** pins `classifyContentPath`,
  `isRelatedTopicPageIncluded` and `isContentIncluded`
  (`lib/classify-content.js`, extracted verbatim from `.eleventy.js` on
  2026-08-24 precisely so they could be tested without booting Eleventy),
  including the two regression tests above and the proof that `relatedUrls` is
  not a backdoor around the private veto.

- **`test/markdown-containers.test.js`** (added 2026-08-27) pins the
  scene/POV rendering, above all the **fence-length rule**: a 5-colon
  `::::: scene` wrapper must not be closed early by a nested 3-colon
  `::: pov` block's closing fence. That behaviour lives in
  markdown-it-container, not in this repo's code, so a dependency bump that
  changed it would silently corrupt scene splitting for every chapter —
  `src/_data/scenePovPages.js` parses the same token stream. Also pinned:
  the emitted `data-scene`/`data-pov`/`aria-label` attributes,
  HTML-escaping of the info strings, standalone pov blocks (the implicit
  single scene), and that an invalid info string renders as plain text.
- **`test/storyline-threads.test.js`** (added 2026-08-27) pins
  `threadForSeason` (every registered season to its thread, the
  `UNSORTED_THREAD` fallback for unclaimed seasons, numeric matching for
  string input) and the registry invariants the privacy machinery assumes:
  no season claimed by two threads, unique thread ids, and every private
  thread naming a `homeDomain` distinct from the default reference domain.
- **`test/image-size.test.js`** (added 2026-08-27) pins the JPEG/PNG header
  parser's "null rather than guess" contract with hand-built buffers:
  dimensions read from a PNG IHDR and from a JPEG SOF behind a skipped
  APP0 segment, and null for truncated files, malformed segment lengths,
  missing SOF markers, zero dimensions, non-images, unreadable paths —
  plus the by-path memoisation.

The filter tests deliberately use the **real** `lib/storyline-threads.js`
registry, not fixtures: church-space being the only private thread is itself a
documented decision, and a registry change that breaks these expectations
should be noticed, not absorbed (the registry-invariant suite above makes the
same point structurally).

## Layer 2 — structural gates (`npm test`)

In order after the unit suite:

| Gate | Catches |
| --- | --- |
| `scripts/check-changelog.js` | released sections missing/rewritten (two release records were destroyed this way once) |
| `scripts/check-changelog-coverage.js` | **warns only, never fails** — content pages the changelog never mentions by path, slug or title. The mirror image of the gate above: that one catches history being destroyed, this one catches history never being written. Deliberately not a gate — see below |
| `scripts/validate-content.js` | front-matter schema violations, id/filename mismatches, duplicate `comment_id`s, the image bookkeeping (missing targets, unreferenced files, byte-identical duplicates, layout-emitted URLs), each edition's hero cast |
| `scripts/check-internal-links.js` | a cross-link to a page renamed or never written — schema and dry run both pass on those |
| `scripts/check-related-terms.js` | a `related:` term that silently falls back to `/glossary/`; warns (without failing) on duplicated page titles |
| `scripts/sync-version.js --check` | README/package.json version drift |
| `eleventy --dryrun` | template and build errors, without writing `_site/` |

The gates don't subdivide — `validate-content.js` always scans everything. To
iterate on one content file, use `npm run start` and visit the page.

### Why changelog coverage warns instead of failing

Added 2026-09-01, after an audit of all 674 first-parent commits on `main`
found **24 content pages that had shipped without ever being mentioned in the
changelog** — eight glossary entries, eight timeline entries, four codex, three
lore, one journal. `scripts/`, `lib/` and `test/` were fully covered, which
says something about the shape of the failure: engine work is usually the point
of its PR, while a supporting glossary or timeline entry rides along with
whatever the PR was really about, and it is the passenger that gets forgotten.

It could have been a gate, and deliberately isn't. **Whether a change deserves
a changelog line is a judgement**, and the authority boundary in `CLAUDE.md`
keeps judgement out of what a gate may decide — the toolchain can prove a page
is well-formed, not that it is worth a reader's attention. And the obvious gate
— *a PR touching `src/` must touch `CHANGELOG.md`* — is **satisfiable by a junk
line**, which would manufacture the appearance of coverage without the
substance. That is the same failure this project already names in
`check-changelog.js`'s own header: a check that passes for the wrong reason is
worse than no check.

**The condition for keeping it: the count normally reads zero.** The backlog was
filed as a changelog entry *before* the script was wired into `npm test`,
because a warning that never reaches zero is noise people learn to skip past. If
it is ever allowed to sit at a permanent nonzero number, retire it rather than
tolerating it — the same rule `sync-version.js` states about its own anchor.

## Layer 3 — CI-only gates (`.github/workflows/ci.yml`)

- **Theme sync and contrast**: `generate-themes` → `git diff --exit-code
  src/css` (a hand-edited `theme-*.css` fails; `main.css` is the source of
  truth) → `check-contrast.js` (WCAG 2.2 AA on the pairs `main.css` actually
  composes; `solarized` exempt, stated in the script). This lives in CI rather
  than `npm test` because it is only correct *after* regeneration, and CI can
  guarantee that ordering where a local convention can't.
- **Shared-scripts identity**: diffs `deploy-lib.sh`, `mail-lib.sh`,
  `ensure-node.sh` and `cpanel-autopull.sh` against
  `dermot-cochran-photography`'s `main`. Pre-existing drift fails; a PR that is
  itself changing a shared script warns only, since the identical edit lands in
  the sibling as its own PR and one of the two has to merge first. (Its first
  run caught real drift: the 15 August gap-alert default had never reached the
  sibling.)
- **ShellCheck** (`--severity=warning`) over all five deploy scripts.

## Deliberately not automated

- Anything requiring judgement about the world: canon consistency, house
  voice, tone. `scripts/list-canon-facts.js` exists as an *informational* aid
  for the spoiler test — never a gate.
- The Windows-only `.ps1` image tools.

## Extending

- **New content-bearing field or page type** → check whether it must
  participate in the `isXIncluded` predicates (`lib/content-filter.js`) and
  `classifyContentPath` (`lib/classify-content.js`), *and add the truth-table
  rows to `test/content-filter.test.js` in the same change* — otherwise it
  silently always/never ships under a narrowed deploy.
- **New checker script** → decide its home by ordering dependencies: no
  prerequisites → `npm test`; depends on another script having run →
  CI, sequenced in one step, per the contrast precedent.
- **A bug found in production or review** → its regression test lands in the
  same PR as the fix.

## Known open items

- "Commissioned Standing" is a duplicated page title (`src/glossary/` and
  `src/lore/`); `check-related-terms.js` warns on it every run until one page
  is retitled — a content decision, not a tooling one.
