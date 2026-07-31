# Forking this repository

This repo is built to be forked two different ways. Pick one before you start replacing content — it changes what you keep.

Forking needs no permission and is actively encouraged. The one condition, and the reasoning behind it, is in [`CONTRIBUTING.md`](./CONTRIBUTING.md): a fork must be self-contained, because this project can't take on pull requests or support forks.

## The two licences (read this part first)

- **Engine** (`.eleventy.js`, `lib/`, `src/_includes/`, `src/css/`, `src/js/`, `scripts/`): **MIT** — see [`LICENSE`](./LICENSE). Reuse it for anything, including a wholly original story with no connection to Drithane.
- **Story content** (`src/seasons/`, `src/threads/`, `src/characters/`, `src/timeline/`, `src/lore/`, `src/glossary/`, `src/codex/`, `story-bible/`, `prompts/`): **CC BY-NC-ND 4.0**, with an explicit **Fan Works Policy** exception for non-commercial fan fiction, fan art, and fan fiction clones of this site — see [`CONTENT-LICENSE.md`](./CONTENT-LICENSE.md) for the exact conditions.

That means:

- **Path A — an original site, different story entirely.** Keep the engine, delete/replace the content. No connection to Drithane is implied or required.
- **Path B — a Drithane fan fiction clone.** Keep the engine *and* some or all of the existing content, and add your own stories in the same universe. Must stay non-commercial and clearly labeled as unofficial fan work — see `CONTENT-LICENSE.md`'s Fan Works Policy for the full conditions.

Both paths start the same way below; they only diverge at "replace or extend the content."

## What's engine vs. content

| Keep (engine) | Replace (Path A) or extend (Path B) |
|---|---|
| `.eleventy.js`, `lib/`, `scripts/` | `src/seasons/`, `src/threads/` |
| `src/_includes/` (layouts) | `src/characters/`, `src/timeline/` |
| `src/css/`, `src/js/`, `src/images/`, `src/audio/` (swap assets, keep the mechanism) | `src/lore/`, `src/glossary/`, `src/codex/` |
| `src/_data/` (mechanism; `giscus.js`'s *values* need updating — see below) | `story-bible/`, `prompts/` |

## Step by step

1. **Fork the repo**, then locally: `npm install && npm start` to confirm it builds before changing anything.
2. **Decide Path A or B**, then either delete the content directories above and write your own (Path A), or keep what you want and add to it (Path B — check `CONTENT-LICENSE.md`'s conditions as you go). Either way, use `npm run new` to scaffold each new character/lore/codex/glossary entry, chapter, or journal entry — it prompts for the right fields instead of you having to copy an example file and guess which parts matter (see README's "Adding content" section). `npm test` validates front matter against the same schema, so a typo'd field fails with a clear message instead of a silent bad build.
3. **Rebrand.** `SITE_NAME`/`SITE_TITLE` (env vars, or `deploy.conf` keys — see README's cPanel section) already cover the header logo, footer, and browser `<title>`, no code changes needed. Beyond that, search this repo for `dermot-r-cochran` and `sciencefiction.site` and replace them with your own identity — they're hardcoded in `README.md`, `src/about/index.md`, `src/index.md`, and `package.json`'s `repository`/`bugs`/`homepage` fields, since nothing about *who you are* can be inferred automatically. One `sciencefiction.site` reference is functional rather than cosmetic: `DEFAULT_REFERENCE_DOMAIN` in `lib/storyline-threads.js` is the full-site domain that a narrowed deploy's "not included in this edition" placeholder links back to — set it to your own full-site domain (and any private thread's `homeDomain` there likewise) if you run narrowed clones.
4. **Fix the path prefix, if you need to.** This project hardcodes `/star-rangers/` in absolute links throughout layouts *and* content (~200 files) because Eleventy's own `pathPrefix` stays `/` here — see the comment above `SITE_PATH_PREFIX` in `.eleventy.js` for why. Set `SITE_PATH_PREFIX` (e.g. `/my-fork/` for a differently-named GitHub Pages repo, or `/` for local preview at root or a custom domain) and every occurrence gets rewritten at build time — no manual find/replace needed, including the search box's Pagefind bundle path (see README's "Search" section). You don't need this for cPanel deploys; see step 6.
5. **Set up your own comments repo**, if you want giscus comments at all (see README's "Discussion forum (giscus)" section for the full walkthrough):
   - Create your own public `<you>/<your-comments-repo>`, enable Discussions, create the same category structure (or your own).
   - Copy `sample-giscus.local.json` to `giscus.local.json` (gitignored) and fill in your repo + category IDs. This points comments at your board on **every** build path — `npm start`, GitHub Pages, and cPanel — without editing the engine's `src/_data/giscus.js` or fighting an upstream merge. Run `GITHUB_TOKEN=ghp_xxx node scripts/fetch-giscus-ids.js --repo <you>/<your-comments-repo>` to print the five values to paste in.
   - *(Alternatives:* for a cPanel-only fork you can instead set the `GISCUS_*` keys in `deploy.conf`; or, maintaining a long-lived fork, edit `giscus.js`'s `GISCUS_PROFILES` directly and re-run the fetch with `--write`. The local file is simplest and works everywhere.*)*
6. **Deploy.**
   - **GitHub Pages**: `.github/workflows/deploy.yml` works unmodified. Set two repository variables (Settings → Secrets and variables → Actions → Variables) rather than editing the workflow: `SITE_PATH_PREFIX`, if you needed it in step 4, and **`SITE_DOMAIN`** (e.g. `you.github.io/your-repo`, no scheme or trailing slash). `SITE_DOMAIN` matters because it defaults to *this* project's own Pages URL — leave it unset and your `sitemap.xml`, `robots.txt`, and Atom feed will all advertise `dermot-r-cochran.github.io/star-rangers` instead of your fork. Comments are force-disabled on Pages (`COMMENTS_ENABLED=false` in the workflow) because pathname-mapped giscus threads under a `/your-repo/` subpath would be disconnected; if you serve the fork from a root-level custom domain and want comments, drop that env line and set up `giscus.local.json` (step 5).
   - **Any other static host** (Netlify, Vercel, Cloudflare Pages, a plain bucket): run `npm run build` and publish `_site/`. Set `SITE_PATH_PREFIX=/` (step 4) if you serve at the domain root, and `SITE_DOMAIN=your-domain.com` at build time so the sitemap/robots/feed absolute URLs are yours, not this project's. `giscus.local.json` (step 5) is read at build the same as on any other path. None of these are tested by this project, but they use only the standard Eleventy build — no cPanel-specific machinery.
   - **cPanel**: copy `sample-deploy.conf` to `deploy.conf` and fill in your own values (see README's cPanel section for the full key reference) — or `sample-deploy-minimal.conf`, which is the same file cut down to `CPANEL_USER` and `DOMAIN`. Your domain won't be in `lib/editions.js`, so nothing gets resolved from that registry and the build falls back to its own defaults; set whatever you need explicitly in `deploy.conf`, or register your domain in an untracked `editions.local.json` (step 5's pattern, template `sample-editions.local.json`). You don't need `SITE_PATH_PREFIX` here at all — `scripts/cpanel-deploy.sh` already rewrites the hardcoded `/star-rangers/` prefix to `/` as part of every cPanel deploy, regardless of fork, so cPanel targets just work unmodified. Need a cPanel host? This project's own domains run on [iFastNet](https://ifastnet.com/portal/aff.php?aff=29941) (referral link).
