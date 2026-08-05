# Fian Ilchruinne

The stars call us forward with hope: protect what is good, and learn what is true.

*Fian Ilchruinne* is an Eleventy-powered interactive science-fantasy novel. It begins with a station clock that has held a false reading for eleven years. From there, the project opens into a contested history of memory, duty, institutions, and the fragile civic lights that survive at the edge of the known world.

## Synopsis

Threshold Station keeps logging the same impossible discrepancy, and the people sent to investigate it do not agree on what the record means. *Fian Ilchruinne* follows navigators, wardens, witnesses, analysts, and guardians as they try to keep public order intact while old archives, folded space, and living memory refuse to align.

The story moves across stations, causeways, archives, and boundary zones in the long afterlight of empire. As viewpoints converge, the question sharpens: who gets to name the truth when history itself has started to slip?

## Site sections

- **Seasons & Episodes** (`/seasons/`) — Read the canon in story order, grouped by storyline thread, then shift POV within chapters to watch one event survive conflicting witnesses.
- **Threads** (`/threads/`) — Browse the independent storylines that group the seasons — each thread is a self-contained narrative with its own cast.
- **Characters** (`/characters/`) — Track the people, beings, constructs, and entities carrying the story forward.
- **Timeline** (`/timeline/`) — Follow the confirmed order of events apart from when the narrative chooses to reveal them.
- **Lore** (`/lore/`) — Step outside the story for the cosmology, institutions, and systems that shape the setting.
- **Glossary** (`/glossary/`) — Fix the meaning of in-universe terms, titles, and concepts when language itself is contested.
- **Codex** (`/codex/`) — Read the primary sources: logs, reports, directives, and records that may clarify the truth or bury it.
- **Journal** (`/journal/`) — Out-of-character: Dermot R. Cochran's own notes on the reasoning, wrong turns, and small decisions behind the story, kept alongside About as the site's two non-diegetic sections.

## Discussion forum (giscus)

Every character, lore, glossary, codex, episode, chapter/scene, and journal page carries a comment thread powered by [giscus](https://giscus.app), which stores each thread as a GitHub Discussion rather than a third-party comment service. Comments live in a separate, dedicated **`Star-Rangers/sciencefiction-site-comments`** repo — not this one — so reader/fan discussion never mixes with this repo's own dev-facing Discussions, and the comment history stays put across any future rename, fork, or transfer of this source repo. That repo must be public (giscus reads it unauthenticated) and needs no content of its own beyond Discussions being enabled. Config lives in `src/_data/giscus.js`; the embed itself is in `src/_includes/base.njk`, gated on the `comments`/`commentsCategory` front matter that `character.njk`, `lore-entry.njk`, `codex.njk`, `glossary-entry.njk`, `chapter.njk`, `scene-pov.njk`, and `journal-entry.njk` each set (listing/index pages don't opt in, so they stay comment-free).

Four of the comments repo's Discussion categories are mapped to page types (giscus creates one discussion per page, lazily, the first time someone comments):

| Category | Format | Pages |
| --- | --- | --- |
| **Characters** | Announcement (locked) | `/characters/*` |
| **Lore & Worldbuilding** | Announcement (locked) | `/lore/*`, `/glossary/*`, `/codex/*` |
| **Episodes Discussion** | Announcement (locked) | `/seasons/**` (chapters and per-POV scenes) |
| **Journal** | Announcement (locked) | `/journal/*` |

Characters/lore/glossary/codex/journal pages map by `pathname` — their URL never changes once created, so pathname is a safe permanent identity. Chapters and per-POV scene pages don't have that guarantee: episodes get renumbered in place to keep story chronology in order (see `CHANGELOG.md`'s "renumbered" entries), which reassigns a URL like `/seasons/s00/e02/s00e02c01/` to different content entirely. Mapping those by pathname would silently attach an existing discussion to whatever content now lives at that URL, losing the original page's comment context. Chapters instead map by `data-mapping="specific"` on a permanent `comment_id` front-matter field (required — see `lib/content-schema.js`), independent of the `id`/URL derived from season/episode/chapter; scene pages derive their own term from their parent chapter's `comment_id` plus scene/character (`src/scene-pov.njk`'s `eleventyComputed`). `comment_id` is set once (`npm run new -- chapter` generates it from the title) and must never be regenerated — if a chapter is renumbered, its `comment_id` moves with it so its discussion thread stays attached to the same content, while whatever content takes over the vacated slot gets its own fresh `comment_id`. `scripts/validate-content.js` fails the build if two chapters ever collide on the same `comment_id`.

Locking these to "Announcement" format means only the giscus GitHub App can start new discussions in them, so they only ever fill up with real page threads instead of off-topic posts. Five more categories exist for open community discussion, unrelated to any specific page:

| Category | Format |
| --- | --- |
| **Announcements** | Announcement |
| **General** | Open discussion |
| **Q&A** | Question / Answer |
| **Theories & Predictions** | Open discussion |
| **Fan Creations** | Open discussion |

**Fan Creations** is for links and discussion, not hosting: full fan fiction belongs on [AO3](https://archiveofourown.org/) or [Wattpad](https://www.wattpad.com/), not in this repo or its Discussions — see the About page's "Fan fiction" section for the pointer given to readers.

### A second, separate forum for one domain

`src/_data/giscus.js`'s repo/repoId/category IDs are all overridable per cPanel clone via `GISCUS_REPO`, `GISCUS_REPO_ID`, and `GISCUS_CATEGORY_CHARACTERS_ID`/`GISCUS_CATEGORY_LORE_ID`/`GISCUS_CATEGORY_EPISODES_ID`/`GISCUS_CATEGORY_JOURNAL_ID` in that clone's `deploy.conf` (or `ALT_<id>_GISCUS_*` for an `ALT_DOMAINS` entry) — see the keys table below. This is for a domain whose readers shouldn't share a Discussions board with the main site's, not routine customization: every clone left unset shares the one default repo above, which is what keeps community discussion in one place. The church-space.site/.online deployment (see `THREADS` and the private "Church Space" thread below) is the current example — it uses its own **`Star-Rangers/churchspace-site-comments`** repo, set up exactly like the default one:

1. Create the public `Star-Rangers/churchspace-site-comments` repo and enable Discussions on it, the same as step 1-2 above.
2. Create the same 9 categories in it (Characters, Lore & Worldbuilding, Episodes Discussion, Journal, Announcements, General, Q&A, Theories & Predictions, Fan Creations).
3. Install the [giscus app](https://github.com/apps/giscus) on it.
4. Fetch its IDs with `GITHUB_TOKEN=ghp_xxx node scripts/fetch-giscus-ids.js --repo Star-Rangers/churchspace-site-comments` — `--repo` targets a non-default comments repo and only ever prints (never `--write`, since that patches `src/_data/giscus.js`'s own default). These five values are already registered as the **`church-space`** profile in `giscus.js`'s `GISCUS_PROFILES`, so a church-space deploy just sets `GISCUS_PROFILE=church-space` (or `ALT_<id>_GISCUS_PROFILE=church-space`) — one key instead of six — see `sample-deploy.conf`'s church-space example block. If the repo is ever rotated, re-fetch and update that profile's IDs in `giscus.js`.

**Third-party forks** that just want their own board (not one of the project's registered profiles) don't need to touch `giscus.js` or `deploy.conf` at all: copy `sample-giscus.local.json` to `giscus.local.json` (gitignored) and fill in your repo + category IDs. It's read at build time and becomes your fork's default board on every build path — `npm start`, GitHub Pages, and any cPanel deploy that doesn't select a `GISCUS_PROFILE`. A registered `GISCUS_PROFILE`, and individual `GISCUS_*` env vars, still take precedence over it, so per-domain overrides keep working. Because it's gitignored, your comment-repo settings never conflict with an upstream merge.

### One-time setup

1. Create the public `Star-Rangers/sciencefiction-site-comments` repo (README-only is fine — it exists purely to host Discussions).
2. In that repo's Settings → General → Features, enable **Discussions**.
3. In its Discussions tab, use the categories gear icon to create the 9 categories above (GitHub seeds a few defaults like "Ideas"/"Polls" — rename or delete those rather than leaving stragglers).
4. Install the [giscus app](https://github.com/apps/giscus) on that repo (not this one).
5. Get the repo ID and the four category IDs one of two ways:
   - **Script** (fetches all five in one call): `GITHUB_TOKEN=ghp_xxx npm run fetch-giscus-ids -- --write`, using a [personal access token](https://github.com/settings/tokens) (classic, no scopes needed to read a public repo's Discussions). This patches `src/_data/giscus.js` directly — see `scripts/fetch-giscus-ids.js`'s header comment for options. Drop `--write` to just print the values first.
   - **giscus.app wizard**: visit [giscus.app](https://giscus.app), enter `Star-Rangers/sciencefiction-site-comments`, choose **pathname** as the page ↔ discussion mapping, and select **Characters** as the category — the generated snippet includes a `data-repo-id` (same for every category) and a `data-category-id` (specific to Characters). Repeat just the category-selection step for **Lore & Worldbuilding**, **Episodes Discussion**, and **Journal** to get their category IDs too, then paste all five values into `src/_data/giscus.js` by hand, replacing the `REPLACE_WITH_*` placeholders.

Until step 5 is done, the comment widgets render but won't load (giscus rejects placeholder IDs), so it's safe to ship the templates ahead of finishing setup.

### Turning comments off for a specific build

`COMMENTS_ENABLED` (read via `process.env` in `.eleventy.js`, defaulting to `true`) suppresses the widget on every page for that build, regardless of the per-page `comments`/`commentsCategory` front matter above. Two builds set it explicitly:

- **GitHub Pages** (`.github/workflows/deploy.yml`) sets it `false` — Pages serves under `/star-rangers/`, unlike the root-served cPanel domains giscus's pathname mapping actually targets, so leaving it on there would just create a second, disconnected set of discussions for the same pages.
- Any cPanel clone can opt out the same way with the `COMMENTS_ENABLED` (or `ALT_<id>_COMMENTS_ENABLED`) `deploy.conf` key above — useful for a staging/preview domain that shouldn't collect public comments at all.

## Current story content

Grouped by storyline thread — see [Site sections](#site-sections) and `lib/storyline-threads.js` for what a thread is.

**Tissadelle Shepherd's Arc**

- **Season 1**
  - Episode 1
    - `S01E01C01` — *Arrival at the Threshold Station*
    - `S01E01C02` — *The Forty-Second Discrepancy*
  - Episode 2
    - `S01E02C01` — *The Broken Causeway*
- **Season 3**
  - Episode 1
    - `S03E01C01` — *Filed Under Noise*
- **Season 5**
  - Episode 2
    - `S05E02C01` — *What the Hill Keeps*

## Release notes

Current version: **1.15.0**. See [`CHANGELOG.md`](./CHANGELOG.md) for the full version history — lore/canon changes, deployment features, and fixes are all tracked there under [Semantic Versioning](https://semver.org/).

### Cutting a release

The "Current version" line above went stale twice by hand (it read `1.5.0` through both the 1.6.0 and 1.7.0 releases) and then again through 1.11.0, 1.12.0 and 1.13.0, despite this list previously calling it out as "the step that gets missed". **It is no longer a step** — `scripts/sync-version.js` writes it from `package.json`, and `npm test` fails if the two disagree. What remains:

1. Bump the version with `npm version X.Y.Z --no-git-tag-version`. This updates `package.json`, **both `version` fields in `package-lock.json`**, and — via the `version` lifecycle hook — the "Current version" line above. Editing `package.json` by hand skips all of that; it is how the lockfile sat at `1.8.0` through the 1.9.0 release.
2. In `CHANGELOG.md`, rename `[Unreleased]` to `[X.Y.Z] - YYYY-MM-DD`, add a short summary paragraph, and open a fresh empty `[Unreleased]` above it.
3. Merge, then **tag from a local clone** at the release's merge commit: `git tag vX.Y.Z <sha> && git push origin --tags`. The GitHub-automation path used for most changes here cannot publish `refs/tags/*`, so tagging is always a local step.

If the README is ever restructured so the "Current version" line no longer matches `Current version: **X.Y.Z**`, `sync-version.js` **fails loudly in both modes** rather than passing on a line it can no longer find — a check that silently succeeds once its anchor moves is worse than no check. Retire the script and its two `package.json` hooks together, or restore the line.

`MINOR` covers backward-compatible additions (a new chapter, lore or glossary entry, a new `deploy.conf` key, a new theme); `PATCH` covers fixes with no new surface area. Nothing has yet required a `MAJOR` bump.

## License

This repository carries two separate licences, so the engine can be freely forked without implying any rights over the story itself:

- **Code** (`.eleventy.js`, `lib/`, `src/_includes/`, `src/css/`, `src/js/`, `scripts/`, and everything else not listed below): **MIT** — see [`LICENSE`](./LICENSE). Fork it, run it for your own site, adapt it freely.
- **Story content** (`src/seasons/`, `src/threads/`, `src/characters/`, `src/timeline/`, `src/lore/`, `src/glossary/`, `src/codex/`, `story-bible/`, `prompts/`): **CC BY-NC-ND 4.0** — see [`CONTENT-LICENSE.md`](./CONTENT-LICENSE.md). Share it non-commercially with attribution, but don't redistribute adapted/derivative versions of *Star Rangers* itself — **except** non-commercial fan works (fan fiction, fan art, and fan fiction clones of this repo), which `CONTENT-LICENSE.md`'s Fan Works Policy explicitly permits.

If you fork this repo to run your own **original** interactive fiction site, replace everything under the content paths above with your own writing before publishing. If you're forking it as a **Star Rangers fan work** instead, see the Fan Works Policy — you can keep some or all of the existing content, non-commercially and clearly labeled as unofficial.

See **[`FORKING.md`](./FORKING.md)** for the full step-by-step guide either way — rebranding, the `/star-rangers/` path prefix, setting up your own comments repo, and deployment.

## Contributing and support

Forks are welcome and need no permission; **third-party pull requests aren't accepted**, and forks are unsupported. Reader and fan questions are welcome in the [discussion forum](#discussion-forum-giscus), triaged as time allows. See **[`CONTRIBUTING.md`](./CONTRIBUTING.md)** for the reasoning and the details.

## Local development

```bash
npm install
npm run start
```

## Search

Full-text search across every page is powered by [Pagefind](https://pagefind.app/), which indexes the built `_site/` output — `npm run build` runs `eleventy && pagefind --site _site`, so search only works after a real build, not under `npm start`'s dev server (the search box just does nothing there, since there's no index yet). The search box lives in the header (`src/_includes/base.njk`); its logic is a small hand-rolled script, `src/js/search.js`, using Pagefind's JS API directly rather than its prebuilt `pagefind-ui` widget, so it could be styled to match the site's own dark theme (see `main.css`'s `/* --- Search --- */` section) instead of overriding another package's bundled CSS.

Only `<main data-pagefind-body>`'s content is indexed — breadcrumbs, "back to X" footers, pagination, and the comments widget all carry `data-pagefind-ignore` so they don't pollute every single page's indexed text with the same nav boilerplate. `data-pagefind-bundle` on the search widget carries the same `/star-rangers/` prefix as every other internal link (see `SITE_PATH_PREFIX` above), so it's rewritten automatically for cPanel and for forks.

## RSS/Atom feed and social previews

`src/feed.njk` renders an Atom feed at `/feed/feed.xml`, autodiscoverable via a `<link rel="alternate">` tag in `base.njk`'s `<head>`. It lists the 20 most recently *published* chapters (newest first) from the `recentChapters` collection — a real-world `date` (`YYYY-MM-DD`) front-matter field, distinct from a chapter's in-universe `timestamp` string, since a feed reader needs to know when something was actually released, not when its story events occur. `npm run new -- chapter` sets `date` automatically to the day the file is created; the 13 chapters that predate this feature were backfilled from each file's own first git commit date.

Every page also carries Open Graph and Twitter Card meta tags (`base.njk`'s `<head>`), so links shared on Discord/Reddit/etc. get a title, description, and image preview instead of a bare URL. The image is computed per page type (`.eleventy.js`'s `eleventyComputed.ogImage`) from the same `image` field each layout's own `<img>` tag already uses — no second field to maintain — falling back to the homepage's hero image for chapters and listing pages, which have no single obvious picture of their own.

## Adding content

`npm run new` scaffolds a new character, lore entry, codex entry, glossary entry, chapter, or journal entry — it prompts for each type's required fields and writes the file with the correct front-matter shape, so you don't need to memorize a layout's exact fields by hand:

```bash
npm run new                # prompts for which type too
npm run new -- character    # skips straight to that type's prompts
```

(Timeline entries aren't covered — they use `layout: base.njk` with hand-written HTML in the body rather than a dedicated layout, so there's no single shape to scaffold; copy an existing one instead.)

`npm run test` (see below) runs `scripts/validate-content.js` first, which checks every content file's front matter against `lib/content-schema.js` — the same schema `npm run new` scaffolds from — and fails with a clear per-file message (missing field, non-numeric season/episode/chapter, a chapter's `id` disagreeing with its filename, etc.) instead of a blank page or a cryptic Nunjucks error surfacing later.

## Build and validation

```bash
npm run build
npm run test
```

## cPanel deployment config for local clones

The cPanel deployment recipe (`.cpanel.yml`, via `scripts/cpanel-deploy.sh`) can read optional per-clone settings from an untracked `deploy.conf` file in the repo root. The script's site-agnostic machinery (log capture, the deploy-log notification emails, `deploy-logs/` persistence) lives in `scripts/deploy-lib.sh`, which is kept byte-identical with the same file in the `dermot-cochran-photography` repository (like `scripts/ensure-node.sh`) — change it in one repo, copy it verbatim to the other. This repo deploys to several production domains from separate cPanel Git Version Control clones (one clone per domain, all pulling the same branch) — `deploy.conf` is how one clone tells the shared build/deploy script which domain, theme, and content scope it's responsible for.

These production domains are hosted on [iFastNet](https://ifastnet.com/portal/aff.php?aff=29941) cPanel hosting — if you're setting up your own fork's cPanel deploy and don't already have a host, that's a referral link for this project.

### Setup

1. In your local clone, copy one of the two tracked templates into place (the copy is untracked/gitignored, since it's specific to one clone/domain — never commit a real `deploy.conf`):
   - `cp sample-deploy-minimal.conf deploy.conf` — the two-line form: `CPANEL_USER` and `DOMAIN`. For a domain registered in [`lib/editions.js`](./lib/editions.js) that's the whole configuration, since everything that makes up the domain's identity (`THEME`/`EDITION`, `CHARACTERS`/`TOPICS`/`THREADS`, `SITE_NAME`/`SITE_TITLE`, `COMMENTS_ENABLED`, `GISCUS_PROFILE`) is resolved from that registry by domain for any key the file leaves unset.
   - `cp sample-deploy.conf deploy.conf` — the full template, documenting every key inline. Copy this one if the clone needs the keys that stay machine-side and are never resolved from the registry (`ADMIN_EMAIL`, the raw `GISCUS_*_ID` values, `CUSTOM_CSS_FILE`, `DEPLOY_PRIMARY`, and `ALT_DOMAINS` with its `ALT_<id>_*` keys), or needs to override what the registry would otherwise fill in.

   For a domain **not** registered in `lib/editions.js` (an independent host, or a fork), the lookup resolves nothing and every unset key falls back to the plain defaults below — so set what the clone needs explicitly in `deploy.conf`. `EDITION=<id>` alone borrows a registered edition's homepage copy and flourishes, but nothing else: branding (`SITE_NAME`/`SITE_TITLE`) and the content filter (`CHARACTERS`/`TOPICS`/`THREADS`) are filled from the registry only when the *domain* resolves, so set those keys too if you want them. The cleaner route is registering the domain in an untracked `editions.local.json`, which re-points an existing edition (or declares a new one) so the two-line form works for your domain exactly as it does for a registered one — [`FORKING.md`](./FORKING.md)'s "Taking an edition to your own domain" section is the walkthrough.
2. Edit `deploy.conf` with values for that clone. Every key is optional; a commented-out or missing key falls back to its default. Example, showing every key at once:

```bash
CPANEL_USER=sciencef
THEME=default
DOMAIN=fianilchruinne.com
SITE_NAME=Fian Ilchruinne
SITE_TITLE=Fian-ilchruinne
CHARACTERS=aldera,elvira
TOPICS=boundary,detective-agency
THREADS=tissadelle-arc
ADMIN_EMAIL=admin@example.com
CUSTOM_LORE_FILE=/home/sciencef/custom-lore/exclusive-entry.md
CUSTOM_CSS_FILE=/home/sciencef/custom-lore/tweaks.css
COMMENTS_ENABLED=true
```

3. Push to that clone's branch as normal (or trigger cPanel's deploy) — `scripts/cpanel-deploy.sh` sources `deploy.conf` on every run, so no separate reload step is needed.

### Keys

| Key | Default | Purpose |
|---|---|---|
| `CPANEL_USER` | `sciencef` | Deployment destination: `/home/<CPANEL_USER>/public_html/`. |
| `THEME` | `default` | CSS theme — see "Available themes" below. |
| `DOMAIN` | `fianilchruinne.com` | Bare domain this clone serves (no scheme, no path, no trailing slash — e.g. `undercover-pets.com`). |
| `SITE_NAME` | `Fian Ilchruinne` | Brand name shown in the header logo, footer, and homepage heading. |
| `SITE_TITLE` | `Fian-ilchruinne` | Text used in every page's browser `<title>` tag. |
| `CHARACTERS` | *(unset — full site)* | Comma-separated character `id`s that narrow the deployed content. |
| `TOPICS` | *(unset — full site)* | Comma-separated tag/category values that narrow the deployed content. |
| `THREADS` | *(unset — full site)* | Comma-separated storyline thread `id`s (see [`lib/storyline-threads.js`](./lib/storyline-threads.js)) that narrow the deployed content to the seasons those threads cover. |
| `ADMIN_EMAIL` | `admin@<DOMAIN>` | Address notified after every deploy attempt, success or failure. **The defaulted address must actually exist on the server** (cPanel forwarder or mailbox) — the local MTA accepts mail for a hosted domain and silently discards it if the address doesn't exist, which is undetectable from the script, so a wrong guess means failures go unreported. When changing a clone's `DOMAIN`, create the forwarder for the new `admin@` first or set `ADMIN_EMAIL` explicitly. The deploy log warns when the default is in use; full logs always persist in `deploy-logs/` regardless. |
| `CUSTOM_LORE_FILE` | *(unset — no extra page)* | Path to a clone-exclusive lore markdown file. |
| `CUSTOM_CSS_FILE` | *(unset — no extra CSS)* | Path to a clone-exclusive CSS file, appended after the theme. |
| `COMMENTS_ENABLED` | `true` | Set `false` to build this clone with the [giscus comment widget](#discussion-forum-giscus) turned off entirely (e.g. a staging/preview domain). |
| `SITE_NOINDEX` | `false` | Set `true` to build a **non-indexed testing/staging domain**: robots.txt becomes `Disallow: /`, every page carries a `noindex, nofollow` meta, and canonicals are suppressed — so a test (sub)domain serving the full site can't compete with the canonical domain in search. A throwaway test subdomain is three keys: `DOMAIN=<test subdomain>`, `SITE_NOINDEX=true`, `COMMENTS_ENABLED=false`, plus an `ADMIN_EMAIL` that really exists. deploy.conf-only on purpose — testing domains don't belong in `lib/editions.js`. |
| `GISCUS_PROFILE` | *(unset — `default` profile)* | Select one of the project's own registered comment repos (`GISCUS_PROFILES` in `src/_data/giscus.js`) with one key instead of the six below: `default` (fianilchruinne.com/sciencefiction.site, starquest.*) or `church-space` (church-space.site/.online + the Fellowship of Light addon domains). An unknown name fails the build. |
| `GISCUS_REPO` | *(unset — profile's repo)* | Third-party escape hatch: point this clone's comment widget at a repo that isn't a registered profile — see [A second, separate forum for one domain](#a-second-separate-forum-for-one-domain). Overrides just this field of the selected profile. |
| `GISCUS_REPO_ID` | *(unset — profile's repo ID)* | That repo's numeric ID, from `fetch-giscus-ids.js --repo` or the giscus.app wizard. Required if `GISCUS_REPO` is set. |
| `GISCUS_CATEGORY_CHARACTERS_ID` | *(unset — shared default's ID)* | That repo's "Characters" category ID. Required if `GISCUS_REPO` is set. |
| `GISCUS_CATEGORY_LORE_ID` | *(unset — shared default's ID)* | That repo's "Lore & Worldbuilding" category ID. Required if `GISCUS_REPO` is set. |
| `GISCUS_CATEGORY_EPISODES_ID` | *(unset — shared default's ID)* | That repo's "Episodes Discussion" category ID. Required if `GISCUS_REPO` is set. |
| `GISCUS_CATEGORY_JOURNAL_ID` | *(unset — shared default's ID)* | That repo's "Journal" category ID. Required if `GISCUS_REPO` is set. |
| `DEPLOY_PRIMARY` | `true` | Set `false` to skip deploying to `/home/<CPANEL_USER>/public_html/` entirely — for an account whose `public_html` is reserved for something else (or left parked) and should only serve one or more `ALT_DOMAINS` below. |

If `deploy.conf` is missing entirely, every key falls back to its default above — that's `CPANEL_USER=sciencef`, `THEME=default`, `DOMAIN=fianilchruinne.com`, `SITE_NAME=Fian Ilchruinne`/`SITE_TITLE=Fian-ilchruinne`, the full unfiltered site (no `CHARACTERS`/`TOPICS`/`THREADS` narrowing), a deploy-log email to `admin@fianilchruinne.com`, no custom lore/CSS, comments on, and the shared default giscus repo.

### `ALT_DOMAINS` — deploying more than one domain from one clone

The keys above describe one clone's *primary* domain, deployed to `/home/<CPANEL_USER>/public_html/`. A clone can optionally also deploy additional domains from that same checkout — useful when those domains share the same cPanel account as the primary domain (e.g. addon domains), instead of needing a whole separate clone per domain the way the "several production domains from separate clones" model above does.

Each alt domain deploys to a sibling folder under the same `$HOME`, at the same level as `public_html/` — typically that addon domain's own document root, created via cPanel's own addon domain setup before it's added here.

```bash
ALT_DOMAINS="altsite1 altsite2 altsite3 altsite4"

ALT_altsite1_DIR=altsite1_html
ALT_altsite1_DOMAIN=altsite1.example
ALT_altsite1_THEME=pets
ALT_altsite1_SITE_NAME=Alt Site One
ALT_altsite1_CHARACTERS=aldera,elvira
ALT_altsite1_THREADS=tissadelle-arc
ALT_altsite1_ADMIN_EMAIL=admin@altsite1.example

ALT_altsite2_DIR=altsite2_html
ALT_altsite2_DOMAIN=altsite2.example
ALT_altsite2_THEME=default
```

(rename/duplicate the block per domain — placeholder ids, not tied to any real production domain)

| Key | Default | Purpose |
|---|---|---|
| `ALT_DOMAINS` | *(unset — primary domain only)* | Space-separated list of short ids (letters/digits/underscore, can't start with a digit). Each id needs its own `ALT_<id>_*` keys below. |
| `ALT_<id>_DIR` | *(required)* | Sibling folder name under `$HOME` this domain deploys to — `/home/<CPANEL_USER>/<ALT_<id>_DIR>/`. Must already exist. |
| `ALT_<id>_DOMAIN` | *(required)* | Same purpose as `DOMAIN` above, for this domain. |
| `ALT_<id>_THEME` | `default` | Same as `THEME` above, for this domain. |
| `ALT_<id>_CHARACTERS` | *(unset — full site)* | Same as `CHARACTERS` above, for this domain. |
| `ALT_<id>_TOPICS` | *(unset — full site)* | Same as `TOPICS` above, for this domain. |
| `ALT_<id>_THREADS` | *(unset — full site)* | Same as `THREADS` above, for this domain. |
| `ALT_<id>_SITE_NAME` | `Star Rangers` | Same as `SITE_NAME` above, for this domain. |
| `ALT_<id>_SITE_TITLE` | `Star Rangers` | Same as `SITE_TITLE` above, for this domain. |
| `ALT_<id>_ADMIN_EMAIL` | `admin@<ALT_<id>_DOMAIN>` | Same as `ADMIN_EMAIL` above, for this domain — added to the one deploy-log email's recipient list, alongside `ADMIN_EMAIL`, rather than sent separately. |
| `ALT_<id>_CUSTOM_LORE_FILE` | *(unset — no extra page)* | Same as `CUSTOM_LORE_FILE` above, for this domain. |
| `ALT_<id>_CUSTOM_CSS_FILE` | *(unset — no extra CSS)* | Same as `CUSTOM_CSS_FILE` above, for this domain. |
| `ALT_<id>_COMMENTS_ENABLED` | `true` | Same as `COMMENTS_ENABLED` above, for this domain. |
| `ALT_<id>_GISCUS_REPO` | *(unset — shared default repo)* | Same as `GISCUS_REPO` above, for this domain. |
| `ALT_<id>_GISCUS_REPO_ID` | *(unset — shared default's ID)* | Same as `GISCUS_REPO_ID` above, for this domain. |
| `ALT_<id>_GISCUS_CATEGORY_CHARACTERS_ID` | *(unset — shared default's ID)* | Same as `GISCUS_CATEGORY_CHARACTERS_ID` above, for this domain. |
| `ALT_<id>_GISCUS_CATEGORY_LORE_ID` | *(unset — shared default's ID)* | Same as `GISCUS_CATEGORY_LORE_ID` above, for this domain. |
| `ALT_<id>_GISCUS_CATEGORY_EPISODES_ID` | *(unset — shared default's ID)* | Same as `GISCUS_CATEGORY_EPISODES_ID` above, for this domain. |

`DIR` and `DOMAIN` are the only two required per-domain keys — every other `ALT_<id>_*` key is optional and defaults exactly the way its unprefixed counterpart does. `scripts/cpanel-deploy.sh` runs one complete, independent Eleventy build + rsync per domain (the primary domain, then each `ALT_DOMAINS` entry in turn), sharing only the one `npm ci`-installed `node_modules/` — each domain gets its own theme, content filter, and branding even though they all come from one checkout, the same as separate clones would.

A listed alt domain that's misconfigured — an invalid id, a missing `ALT_<id>_DIR`/`ALT_<id>_DOMAIN`, or an `ALT_<id>_DIR` folder that doesn't actually exist yet — fails loudly for that domain (a `FAIL` line in the log, and the run's overall exit status), the same philosophy `CUSTOM_LORE_FILE`/`CUSTOM_CSS_FILE` already use elsewhere in this file, rather than silently skipping it. That failure does **not** stop the primary domain, or any other `ALT_DOMAINS` entry in the same run, from still deploying — every domain gets its own independent attempt, and the run's final per-domain results are listed at the end of the deploy log.

If this account's `public_html` shouldn't get a copy of the site at all — only the addon domain(s) listed in `ALT_DOMAINS` — set `DEPLOY_PRIMARY=false`. That combination (`DEPLOY_PRIMARY=false` with `ALT_DOMAINS` also unset/empty) fails the run loudly rather than quietly deploying nothing, since it would otherwise look like a successful deploy that did nothing at all.

#### `THEME` and available themes

`THEME=default` keeps `src/css/main.css` as-is. Any other value uses `src/css/theme-<THEME>.css` when that file exists in the repo; otherwise deployment falls back to `src/css/main.css`. Every theme file is generated from `main.css` by `scripts/generate-themes.js` (`npm run generate-themes`), which swaps in only that theme's palette (`:root` custom properties, the five `.pov-block--<character>` colors, and `.character-badge--status-active`) and keeps everything else byte-for-byte in sync with `main.css` — run it after any structural change to `main.css` to re-propagate that change to every theme, and edit that script's `THEMES` registry to add a new theme or adjust an existing palette.

| Theme | Kind | Description |
|---|---|---|
| `fellowship` | domain re-skin | Warm, luminous gold/parchment palette (fellowshipoflight.org). |
| `pets` | domain re-skin | Warm, friendly orange/cream palette (undercover-pets.com). |
| `starquest` | domain re-skin | Deep-space navy with neon teal accents (starquest.site/.online). |
| `church-space` | domain re-skin | Candlelit stone and stained-glass palette (church-space.site/.online). |
| `light` | standard | Light/day mode — the site's only non-dark option. |
| `high-contrast` | standard | Maximal-contrast black/white/yellow, for low-vision accessibility. |
| `sepia` | standard | Warm parchment/e-reader tone for long reading sessions. |
| `solarized` | standard | Ethan Schoonover's Solarized Dark palette. |

#### `CHARACTERS`, `TOPICS`, and `THREADS`

Comma-separated, case-insensitive lists that narrow the deployed site to content related to the listed characters, topics, and/or storyline threads:

- `CHARACTERS` matches character page `id`s and chapter POV character `id`s.
- `TOPICS` matches page `tags` (and `category`, where present), across every content type including character pages.
- `THREADS` matches a storyline thread `id` from the registry in [`lib/storyline-threads.js`](./lib/storyline-threads.js) — currently `founding-era`, `tissadelle-arc`, and `church-space` (see the site's own [Threads](src/threads/) section, which groups seasons the same way). A chapter is included if its `season` front matter falls under a listed thread's seasons; a thread `id` also participates in tag matching, so a lore/timeline/glossary/codex entry can opt in by carrying the thread `id` as a tag.
- A thread registered with `private: true` (currently just `church-space`) is the exception to "leaving all three unset deploys the full, unfiltered site" below: it stays hidden — its chapters, any character/lore/codex/glossary/timeline entry tagged with its id, its own `/threads/<id>/` landing page, and its entry in the `/threads/` listing — on **every** build, including the unfiltered one, unless that build's own `CHARACTERS`/`TOPICS`/`THREADS` explicitly names it. It's for content meant for one domain (or a few) rather than every production clone — `church-space` is written for church-space.site/.online and carries explicit Christian and evangelical themes not part of the main published canon, so it never appears on fianilchruinne.com, sciencefiction.site, GitHub Pages, or any other clone that doesn't ask for it by setting `THREADS=church-space` (see `sample-deploy.conf`'s church-space example block). A private thread also carries a `homeDomain` (e.g. `church-space.site`) naming the clone that *does* opt it in — used only by the "not included" placeholder below, so an excluded private-thread page links to a domain that actually has it rather than back to the reference domain (which hides it too). Visibility across the boundary is **one-way**: a private-thread page may link out to public pages freely, but a public page must not hardcode a link *into* a private-thread page (on any build that hasn't opted the thread in, that target is just the placeholder) — `npm test` enforces this and fails on any public→private link.
- `CHARACTERS` also participates in tag matching, since tags conventionally embed character slugs (e.g. a timeline entry tagged `aldera`) — so a page is included if it matches `CHARACTERS`, `TOPICS`, or `THREADS` by any of the above.
- `CHARACTERS` also pulls in any lore, timeline, or glossary entry that an included character's own bio links to directly, even if nothing tags it for that character — a character's bio is already the site's record of which background matters for understanding them, so a `CHARACTERS`-filtered deploy carries that background along automatically instead of requiring every relevant entry to be tagged by hand.
- Excluded pages still build at their normal URL as a minimal "not included in this edition" placeholder, instead of being omitted, so links to them never 404. The placeholder links the reader to the same path on the domain that actually has the page: the full-site reference domain (`fianilchruinne.com`, the `DEFAULT_REFERENCE_DOMAIN` in [`lib/storyline-threads.js`](./lib/storyline-threads.js)) for ordinary excluded pages, or a private thread's own `homeDomain` for its pages — since the reference domain excludes a private thread too, and linking there would just loop back to another placeholder.
- Section index/listing pages (Characters, Lore, Codex, Glossary, Timeline, Seasons/Episodes, Threads) always build, just with fewer items listed.
- Leaving all three unset/empty deploys the full, unfiltered site (the default).

#### `DOMAIN`

The bare domain this clone actually serves. It's exported as `SITE_DOMAIN` for the Eleventy build and consumed by `src/_data/site.js`, which `src/robots.njk` and `src/sitemap.njk` use to render `robots.txt`'s `Sitemap:` line and every `<loc>` in `sitemap.xml` with that clone's own domain — both files are generated at build time rather than copied statically, specifically so each of this repo's several production domains gets a correct, working sitemap reference instead of all of them sharing one hardcoded host. The GitHub Pages build never sets `SITE_DOMAIN`, so it falls back to the GH Pages URL itself.

#### `SITE_NAME` and `SITE_TITLE`

Let a clone brand itself independently of the shared repo default (`Star Rangers`):

- `SITE_NAME` is exported for the Eleventy build and consumed by `src/_data/site.js`, which `src/_includes/base.njk` uses for the header logo text and the footer's site name.
- `SITE_TITLE` is likewise consumed by `src/_data/site.js`, and used by `src/_includes/base.njk` for every page's browser `<title>` tag (as the `<title> | <SITE_TITLE>` suffix, or standalone on the home page).
- Kept as two separate keys, rather than one, so a clone can put a different string in the tab title than in its on-page branding — most clones will just set both to the same value.

#### `ADMIN_EMAIL`

An email is sent to it after **every** deployment attempt — success or failure — with a `SUCCESS`/`FAILURE` subject (including the cPanel account and a timestamp) and the full build+deploy log as the body, so failures are visible without having to check cPanel's own UI. Sent via local `mail`(1), falling back to `/usr/sbin/sendmail` if `mail` isn't installed. If not set explicitly, it defaults to `admin@<DOMAIN>` (e.g. `admin@sciencefiction.site`) rather than hardcoding a real address in this public repo. This is best-effort only: if no mail command is available, or sending itself fails, the deployment's own outcome is unaffected.

#### `CUSTOM_LORE_FILE` and `CUSTOM_CSS_FILE`

Let one clone carry a small amount of domain-exclusive content without touching the shared repo:

- `CUSTOM_LORE_FILE` is a path to a clone-local, untracked markdown file with valid lore-entry front matter (`layout: lore-entry.njk`, `title`, `category`, etc. — see any file under `src/lore/` for the shape). If set, `scripts/cpanel-deploy.sh` copies it into `src/lore/custom/` before the build, so it becomes one extra lore page unique to this clone (builds at `/lore/custom/<filename-without-extension>/`), then removes it again once the build has read it — the clone's working tree never carries leftover untracked content between deploys, and nothing is ever committed to the shared repo. Because it inherits `lore-entry.njk`'s layout like any other lore page, it gets giscus comments the same way too, in the shared "Lore & Worldbuilding" pool (see [Discussion forum (giscus)](#discussion-forum-giscus)) — keyed by its own `/lore/custom/<filename>/` path, so give each clone's `CUSTOM_LORE_FILE` a domain-unique basename (as `sample-deploy.conf`'s examples already do) unless you'd actually want two clones' exclusive entries sharing one comment thread.
- `CUSTOM_CSS_FILE` is a path to a clone-local, untracked CSS file. If set, its contents are appended to the deployed `css/main.css` after the `THEME` stylesheet, so a clone can tweak a handful of things — a color, a font — without needing a whole new `theme-<name>.css` in the shared repo. Because it loads last, its rules can override the theme's.
- Both fail the deploy loudly (not silently) if set to a path that doesn't exist, so a typo can't ship a build silently missing the content the clone owner expected.

## Creative tooling

- Repository-aligned master prompt: [`prompts/star-rangers-universe-engine.md`](./prompts/star-rangers-universe-engine.md)
