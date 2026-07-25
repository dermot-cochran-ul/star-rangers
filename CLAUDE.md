# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

*Star Rangers* is an Eleventy (11ty)-powered interactive science-fantasy novel site. The repo is both the publishing engine (MIT-licensed) and the story content itself (CC BY-NC-ND 4.0, with a Fan Works exception — see `CONTENT-LICENSE.md`). Content and code are deliberately separated so the engine can be forked without implying rights over the story; see `FORKING.md` and the License section of `README.md` for the exact path split.

The site is built from Markdown content with Nunjucks (`.njk`) layouts, rendered by Eleventy 3, and deployed to several independently-branded production domains (plus GitHub Pages) from one codebase — see "Multi-domain deployment" below.

## Commands

```bash
npm install          # install dependencies (Node 20, see .nvmrc)
npm run start         # eleventy --serve, local dev server with live reload
npm run build          # eleventy && pagefind --site _site (full production build incl. search index)
npm test               # node scripts/validate-content.js && eleventy --dryrun
npm run new             # scaffold a new content file (prompts for type, or `-- character`/`-- chapter`/etc.)
npm run generate-themes  # regenerate every src/css/theme-*.css from src/css/main.css
npm run fetch-giscus-ids  # fetch/patch giscus repo+category IDs (see README's giscus section)
```

### Local authoring tools (not part of the build)

These live in `scripts/` but are **not** run by `npm test`, the build, or CI. They exist so recurring authoring chores don't get re-invented each session:

```bash
node scripts/check-internal-links.js    # verify every internal /star-rangers/ link resolves (cross-platform; exits non-zero on failure, so it can be added to npm test if wanted)
```
```powershell
.\scripts\import-image.ps1 -In "$env:USERPROFILE\Downloads\x.png" -Out src\images\characters\y.jpg -MaxEdge 1200
.\scripts\make-codex-cover.ps1 -TitleLines "TITLE","LINE TWO" -Category "SURVEY RECORDS" -Subtitle "..." -Institution "..." -Author "..." -Stamp "OFFICIAL" -Motif rules -Out src\images\codex\z.jpg
```

The two `.ps1` tools are Windows-only (System.Drawing/GDI+), matching the author's environment; `check-internal-links.js` runs anywhere. `check-internal-links.js` catches the failure mode `npm test` structurally cannot: front-matter validation and the Eleventy dry run both pass while a cross-link points at a page that was renamed or never written.

There is no separate unit-test framework or linter script beyond `npm test`, which is two checks: `scripts/validate-content.js` (front-matter schema validation across all Markdown content) and an Eleventy dry-run (catches template/build errors without writing `_site/`). CI (`.github/workflows/ci.yml`) runs `npm test` plus `shellcheck` on `scripts/cpanel-deploy.sh` and `scripts/ensure-node.sh` on every PR.

**Full-text search only works after `npm run build`** — Pagefind indexes the built `_site/` output, so the search box is a no-op under `npm run start`'s dev server.

There's no way to "run a single test" — `validate-content.js` always scans every content file, and `eleventy --dryrun` always builds every page. To iterate on one content file, use `npm run start` and visit that page directly.

## Architecture

### Content pipeline

Every content type (character, lore entry, codex entry, glossary entry, chapter, journal entry) has **one schema, one source of truth**: `lib/content-schema.js`'s `CONTENT_TYPES` registry. Both `scripts/validate-content.js` (fails the build on a malformed file) and `scripts/new-content.js` (`npm run new`, scaffolds a new file) read from it, so they can't drift apart. Timeline entries are the one exception — they use `layout: base.njk` with hand-written HTML in the body rather than a dedicated layout/schema entry (`TIMELINE_TYPE` in the same file covers validation only; there's no scaffold for them).

Content lives under `src/` by type: `src/characters/`, `src/seasons/s<NN>/e<NN>/s<NN>e<NN>c<NN>.md` (chapters), `src/lore/` (with subdirs `planets/`, `universes/`, `worldwrights/`, plus a standalone `glossary/canonical-glossary-and-migration-guide.md` reference doc that is *not* part of the `glossary` collection), `src/glossary/` (the actual glossary-entry collection), `src/codex/`, `src/timeline/`, `src/journal/`, `src/threads/`. (A root-level `lore/` staging directory existed until commit `668d7bc` — "remove superseded root-level lore drafts". Don't recreate it; drafts belong in `story-bible/`.)

Key chapter front-matter fields (see `lib/content-schema.js` for the full/authoritative list):
- `id` (`s<NN>e<NN>c<NN>`) is *derived* from `season`/`episode`/`chapter` — `validate-content.js` fails the build if they disagree, or if the filename doesn't match.
- `comment_id` is a **separate, permanent** identity for the giscus discussion thread, deliberately decoupled from `id`. Chapters get renumbered in place to keep story chronology consistent (see CHANGELOG's "renumbered" entries), which reassigns a URL like `/seasons/s00/e02/...` to different content — `comment_id` moves with the *content*, not the slot, so existing comment threads don't get silently reattached to something else. Set once by `npm run new -- chapter`; never regenerate it. `validate-content.js` fails the build on any `comment_id` collision across chapters.
- `date` (real-world `YYYY-MM-DD`, publication date) is distinct from `timestamp` (an in-universe free-text string) — `date` drives the Atom feed and is set automatically by `npm run new`.
- `povs: [{id, label}, ...]` lists which characters' viewpoints a chapter contains.

Chapter bodies use two custom markdown-it containers (`lib/markdown-containers.js`, shared by `.eleventy.js` and `src/_data/scenePovPages.js`):
- `::::: scene N` ... `:::::` — an optional scene wrapper (5 colons is convention; must be more colons than any nested `:::pov` block so markdown-it-container's fence-length rule can't close the scene early on a nested `:::` line). A chapter with no scene wrapper is treated as one implicit scene.
- `::: pov <character-id>` ... `:::` — one character's viewpoint within a scene.

`src/_data/scenePovPages.js` parses this token stream (not the rendered HTML) to flatten every `(chapter, scene, character)` combination into its own paginated page via `src/scene-pov.njk`, so readers can follow one character's POV in isolation or compare how different POVs render the same scene.

### Multi-domain deployment & content filtering

This repo deploys to **several independently-branded production domains** (cPanel Git Version Control clones) plus GitHub Pages, all from the same branch/build. Two mechanisms drive this:

1. **`deploy.conf`** (untracked, copied from `sample-deploy.conf`) — per-clone config read by `scripts/cpanel-deploy.sh`: domain, theme, site name/title, content narrowing (`CHARACTERS`/`TOPICS`/`THREADS`), comments on/off, custom lore/CSS files, and giscus repo overrides. A single clone can also fan out to multiple `ALT_DOMAINS` (addon domains sharing the same cPanel account). See `README.md`'s "cPanel deployment config" section — it's the authoritative reference for every key; don't duplicate it here.
2. **`THEME`** — `src/css/main.css` is the source of truth; `scripts/generate-themes.js` (`npm run generate-themes`) mechanically derives every `src/css/theme-<name>.css` from it by swapping only the palette variables. **Always run this after editing `main.css`'s structural CSS** (not just palette) so every theme stays byte-for-byte in sync outside its palette — editing a `theme-*.css` file directly will be overwritten.

`lib/content-filter.js` implements `CHARACTERS`/`TOPICS`/`THREADS` narrowing (env vars, set by `cpanel-deploy.sh` from `deploy.conf`) plus `private: true` thread hiding. Key behaviors:
- A **narrowed** build (`deploy.conf` sets `CHARACTERS`/`TOPICS`/`THREADS`) still builds every page at its normal URL — excluded pages render an "excluded.njk" placeholder rather than disappearing, so no link ever 404s.
- A **private thread** (`lib/storyline-threads.js`, currently `church-space`) is hidden on *every* build, including the default unfiltered "full site" build, unless a build explicitly opts in by naming the thread's id. This is the inverse of normal narrowing.
- `.eleventy.js`'s `eleventyComputed` override drives inclusion — it classifies a page by `inputPath` (`classifyContentPath`), **not** by `data.layout`, because `layout` is itself one of the fields being overridden and its resolution order isn't guaranteed relative to other computed fields (see the long comment at the top of `.eleventy.js` — this bit was a real, subtle bug).
- `lib/storyline-threads.js` (`STORYLINE_THREADS`) is the single registry of storyline threads and which season numbers belong to each; `threadForSeason()` is the canonical season→thread lookup, exposed as an Eleventy filter and consumed by both the `/threads/` site section and the deploy-time filter.

If you add a new content-bearing field or page type, check whether it needs to participate in `isCharacterIncluded`/`isChapterIncluded`/`isTopicPageIncluded`/`isThreadIncluded` (`lib/content-filter.js`) and `classifyContentPath` (`.eleventy.js`) — otherwise it'll silently always/never be included under a narrowed deploy.

### Giscus comments

Comments are GitHub Discussions (via giscus) in a **separate repo** (`Star-Rangers/sciencefiction-site-comments`), not this one, so reader discussion never mixes with this repo's dev-facing Discussions. Config is `src/_data/giscus.js`; the embed is in `src/_includes/base.njk`, gated per-page by `comments`/`commentsCategory` front matter that each content layout sets. Chapters/scene-POV pages map to a discussion via the permanent `comment_id` (see above); everything else maps by pathname. `COMMENTS_ENABLED=false` (set by the GitHub Pages workflow, since Pages serves under `/star-rangers/` and pathname mapping would otherwise create a disconnected discussion set) suppresses the widget entirely regardless of front matter. Full setup/mapping details are in `README.md`'s "Discussion forum (giscus)" section — read that before touching anything giscus-related.

Which comments *repo* a build uses is resolved in `giscus.js` in this order: an explicit `GISCUS_PROFILE=<name>` (one of the project's own registered boards in that file's `GISCUS_PROFILES` — currently `default` and `church-space`; an unknown name fails the build) wins; else an untracked, gitignored `giscus.local.json` at the repo root (template: `sample-giscus.local.json`) if present — the third-party-fork path, read on *every* build (local/Pages/cPanel) so a fork points comments at its own repo without editing engine code; else the built-in `default` profile. Individual `GISCUS_REPO`/`GISCUS_REPO_ID`/`GISCUS_CATEGORY_*_ID` env vars still override single fields on top of whichever base is chosen. `scripts/cpanel-deploy.sh` threads all of these (incl. `GISCUS_PROFILE`) through per-domain from `deploy.conf`; see `sample-deploy.conf` and README for the deploy-facing view.

### Site structure (`.eleventy.js`)

- Input dir `src/`, output `_site`, includes `_includes`, data `_data`. Markdown/HTML/data template engine is all Nunjucks.
- Collections (`characters`, `chapters`, `recentChapters`, `lore`, `codex`, `glossary`, `journalEntries`, `timelineEvents`) are defined here and each applies the relevant content-filter check — this is the one place that decides what appears in a listing page.
- `chapters` sorts by season/episode/chapter (story order); `recentChapters` sorts by real-world `date` (newest first) and feeds the Atom feed (`src/feed.njk`).
- Open Graph/Twitter meta (`ogImage`, `ogType`) is computed per page here from each layout's own `image` field rather than a duplicate field — see `computeOgImage`/`computeOgType`.
- `SITE_PATH_PREFIX` env var lets a fork rewrite the ~200 hardcoded `/star-rangers/` absolute links (this project's own GitHub Pages subpath) to a different prefix at build time, via an `addTransform`. Don't hand-edit those links for a fork; set the env var instead.

## Content authoring conventions

- Prefer `npm run new` over hand-writing front matter — it scaffolds the correct shape per `lib/content-schema.js` and, for chapters, sets `date` and generates `comment_id` automatically.
- Never regenerate an existing chapter's `comment_id`, even when renumbering — see "Content pipeline" above.
- Timeline entries (`src/timeline/*.md`) have no scaffold; copy an existing one's front matter (`title`, `sort_order`, both required) and hand-write the HTML body.
- **Lore/codex boundary — always move inconsistencies or contradictions into the Codex, away from Lore.** Lore (`src/lore/`) and the glossary (`src/glossary/`) state settled, internally-consistent, hard-SF-leaning fact — the ground a reader can trust as flatly true. Any contested, paradoxical, devotional, or otherwise self-contradicting reading belongs in the Codex (`src/codex/`), filed as some named in-universe source's *account* or working paper rather than the Archive's single settled voice. When you notice two lore/glossary pages disagreeing (or one page arguing with itself), the fix is to relocate the contested material to the Codex and leave lore consistent — not to pick a winner inside lore. See the *"Sorting Doctrine Out of Lore"* journal entry and `story-bible/`'s editorial note for the worked precedent.
- License boundary: everything under `src/seasons/`, `src/threads/`, `src/characters/`, `src/timeline/`, `src/lore/`, `src/glossary/`, `src/codex/`, `story-bible/`, `prompts/` is CC BY-NC-ND 4.0 story content, not MIT code — see `CONTENT-LICENSE.md` before assuming you can treat it like ordinary source.
- `CHANGELOG.md` follows Keep a Changelog + SemVer; update it under `[Unreleased]` for any lore/canon change, deploy feature, or fix worth noting to a reader of the changelog (this project has never needed a MAJOR bump — everything so far has been additive/backward-compatible).
- `story-bible/` holds authorial planning notes, not published content — useful for canon intent, never rendered. Currently: `story-bible-summary.md`, `narrative-gaps-checklist.md` and `tissadelle-arc-s6-7.md` (narrative planning); `prose-needs-your-voice.md` and `prose-needs-review.md` (authorship provenance from git history); `canon-consistency-audit-2026-07.md` (contradiction/terminology/chronology sweep, with its resolutions recorded inline); `image-audit-2026-07.md`, `portraits-needed.md`, `firefly-replacement-prompts.md`, `manual-photo-edits.md` (image status and prompts). **These are status documents and they go stale** — two claims in them were found false on 2026-07-24 (an image "shuffle" that never happened, and a "zero S6–7 chapters exist" line contradicted by six existing files). Verify against the repo before acting on any of them, and correct the note rather than working around it.
- **Terminology is law, and `src/lore/glossary/canonical-glossary-and-migration-guide.md` is where it lives.** Renaming or splitting a cosmological term means updating that file's canonical-terms list *and* adding a legacy→canonical row to its migration map, then sweeping the corpus for the old phrasing — not just editing the one page that prompted it. Recent worked example: "Concordant" was carrying both a region and a governing mind, and the governance sense became **Universal Authority** across a dozen files in one pass.
- **Images:** live in `src/images/<characters|lore|codex|hero>/`, ~1600px long edge for lore/hero and ~1200px for portraits, JPG (quality ~85). `image_alt` must describe what the image *actually shows* — the July 2026 audit found many alt texts describing an image the file no longer contained. Codex entries use designed title cards, not photographs; regenerate those with `scripts/make-codex-cover.ps1` rather than an image generator, which cannot spell.
- **Prose authorship:** Dermot writes the narrative first drafts (chapters, story beats, character arcs). Lore, glossary, codex and timeline entries drafted in the established house voice at his direction are welcome; unprompted narrative prose is not. See `story-bible/prose-needs-your-voice.md` for which files have never had a commit from him.
- **Tone:** the setting may be unsettling but must not tip into horror — hint at the dark fact rather than depicting it. This applies to prose and to image prompts alike (a cyber-revenant portrait showing exposed throat machinery was rejected on exactly this line; the approved version sealed the collar and left one silver seam).

## Before committing

Run `npm test` (schema validation + Eleventy dry-run) — CI enforces this on every PR and it catches most content mistakes (bad front matter, id/filename mismatches, duplicate `comment_id`s) before they become a broken build or a lost comment thread. If you touched `scripts/cpanel-deploy.sh` or `scripts/ensure-node.sh`, also expect `shellcheck --severity=warning` to run in CI.
