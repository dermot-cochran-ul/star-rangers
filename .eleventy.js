const path = require("path");
const { DateTime } = require("luxon");
const pluginNavigation = require("@11ty/eleventy-navigation");
const { createMarkdownRenderer } = require("./lib/markdown-containers");
const { imageSize } = require("./lib/image-size");
const {
  getContentFilter,
  isCharacterIncluded,
  isChapterIncluded,
  isTopicPageIncluded,
  isThreadIncluded,
  isPrivatelyExcluded,
  privateThreadForPage,
  getRelatedContentUrls
} = require("./lib/content-filter");
const { threadForSeason, DEFAULT_REFERENCE_DOMAIN } = require("./lib/storyline-threads");
const { getEdition, validateEditions, PRESENTATION_MODES } = require("./lib/editions");

// Classifies a content file by where it LIVES (its inputPath), not by its
// `layout` front-matter field. `layout` is itself one of the eleventyComputed
// keys overridden below, so reading `data.layout` from inside a computed
// field's own evaluator is unsafe: Eleventy's computed-data resolution
// doesn't guarantee `layout` has already settled to its ORIGINAL value by
// the time some other field (title, description, ogImage, ...) asks for it
// - it can just as easily see the ALREADY-REWRITTEN "excluded.njk", which
// matches none of the checks below and silently falls through to the final
// `return true`. That mismatch let an excluded page's real title/
// description/image leak into its meta tags even while its body correctly
// showed the placeholder (layout itself, resolved first, was fine - every
// OTHER field reading data.layout afterward wasn't). inputPath is never
// touched by anything in this file, so it can't suffer the same hazard.
// Every content dir's own top-level (and per-season/per-episode) `index.md`
// listing page uses `layout: base.njk`, not a content layout, so those are
// excluded here the same way the timeline check already excluded its own.
function classifyContentPath(inputPath) {
  if (!inputPath || inputPath.endsWith("/index.md")) return null;
  if (inputPath.includes("/characters/")) return "character";
  if (inputPath.includes("/seasons/")) return "chapter";
  if (inputPath.includes("/lore/")) return "lore";
  if (inputPath.includes("/glossary/")) return "glossary";
  if (inputPath.includes("/codex/")) return "codex";
  if (inputPath.includes("/timeline/")) return "timeline";
  if (inputPath.includes("/journal/")) return "journal";
  return null;
}

// Whether a lore/timeline/glossary page earns inclusion either the normal
// way (tag/category match) or because some included character's own bio
// links to it directly - see getRelatedContentUrls's own comment for why
// that second path exists: a character page is already the record of what
// background matters for understanding them.
function isRelatedTopicPageIncluded(data, filter, url) {
  // The relatedUrls fallback below exists to pull in background an INCLUDED
  // character's own bio links to (see getRelatedContentUrls); it must not
  // become a backdoor around a private thread's own veto, so that's checked
  // first and short-circuits the whole thing regardless of relatedUrls.
  if (isPrivatelyExcluded(data, filter)) return false;
  return isTopicPageIncluded(data, filter) || filter.relatedUrls.has(url);
}

// Drives the eleventyComputed override below: decides whether a
// standalone content-leaf page renders its real content or a placeholder.
// Anything outside the 6 filterable content types plus a private thread's
// own landing page (nav/index/structural pages) always passes through.
// Deliberately does NOT short-circuit on `!filter.active` the way it used
// to - a private thread (lib/storyline-threads.js's `private: true`) must
// stay hidden on the unfiltered full-site build too, and each isXIncluded
// call below already applies that veto before its own `!filter.active`
// check, so delegating unconditionally is what makes that work.
function isContentIncluded(data, filter) {
  const inputPath = data.page && data.page.inputPath;
  const url = data.page && data.page.url;
  const kind = classifyContentPath(inputPath);
  if (kind === "character") return isCharacterIncluded(data, filter);
  if (kind === "chapter") return isChapterIncluded(data, filter);
  if (kind === "lore" || kind === "glossary" || kind === "timeline") {
    return isRelatedTopicPageIncluded(data, filter, url);
  }
  if (kind === "codex") return isTopicPageIncluded(data, filter);
  // Journal entries are out-of-character author notes about making the work,
  // not the work. They were falling through to the unconditional `return true`
  // below, so every branded edition published them regardless of its filters -
  // which meant a search for the book's own name could land a reader on the
  // Fellowship of Light or Undercover Pets framing of an essay about naming
  // decisions. Filtered like codex: on a narrowed edition an entry appears only
  // if its tags match, and on the unbranded full site `filter.active` is false
  // so all of them still appear.
  if (kind === "journal") return isTopicPageIncluded(data, filter);
  // A thread's own standalone landing page (src/threads/<id>/index.md)
  // opts into this system via a `threadId` front-matter field, since it's
  // otherwise just a hand-written base.njk page outside the content dirs
  // above - see src/threads/founding-era/index.md for the shape without it.
  if (data.threadId) return isThreadIncluded(data.threadId, filter);
  return true;
}

// Drives the eleventyComputed "ogImage" override below: maps a content
// type's own `image` front-matter field (already used by that layout's own
// <img> tag - see e.g. character.njk) to the same images/<dir>/ folder, so
// Open Graph/Twitter Card previews use the same picture as the page itself
// instead of requiring a second, separately-maintained field.
const OG_IMAGE_DIRS = {
  character: "characters",
  lore: "lore",
  codex: "codex",
  glossary: "glossary",
  chapter: "chapters"
};

// Site-wide fallback for any page with no page-specific image (chapters,
// listing pages, etc.) - returned outright rather than left for the
// template to fall back on, since Nunjucks' `default` filter only
// substitutes for `undefined`, not `null`, and would otherwise silently
// pass a null image straight through to the absoluteUrl filter.
const DEFAULT_OG_IMAGE = "/images/hero/home-launch.jpg";

// Describes the fallback hero itself, not the site - it is what a card
// actually shows whenever a page has no image of its own. Written from the
// file (the standing rule in story-bible/images.md), which is why it says
// the planet is *behind* the craft rather than the one being launched from:
// it is a distant crescent in the background, not the surface below.
const DEFAULT_OG_IMAGE_ALT =
  "A shuttle-style spacecraft climbing on a bright exhaust plume and billowing cloud, against a starfield with a blue-and-green crescent planet behind it";

// `included` is threaded through explicitly (rather than relying on
// eleventyComputed's own dependency resolution already having swapped
// data.layout to "excluded.njk" by the time this runs) so an excluded
// page's real portrait/illustration can never leak into its Open Graph/
// Twitter Card preview, regardless of computed-field evaluation order. Keyed
// by classifyContentPath's inputPath-based `kind`, not data.layout, for the
// same reason isContentIncluded is - see that function's own comment.
function computeOgImage(data, included) {
  if (!included) return DEFAULT_OG_IMAGE;
  const dir = OG_IMAGE_DIRS[classifyContentPath(data.page && data.page.inputPath)];
  return dir && data.image ? `/images/${dir}/${data.image}` : DEFAULT_OG_IMAGE;
}

// Alt text for whatever computeOgImage settled on, so a card has a text
// alternative for the same reason the on-page <img> does. Follows the image
// itself rather than the page: once the fallback hero is in use, the page's
// own `image_alt` describes a file that is not in the card, and reusing it
// would caption the wrong picture - the failure mode the July 2026 audit
// found on-page and story-bible/images.md now has a standing rule against.
function computeOgImageAlt(data, ogImage) {
  if (ogImage === DEFAULT_OG_IMAGE) return DEFAULT_OG_IMAGE_ALT;
  return data.image_alt || data.title || undefined;
}

// og:image:width / og:image:height, read from the file itself (lib/image-size.js).
// Worth the read: a platform that knows the dimensions can lay the card out
// before fetching the image. Returns undefined when the file can't be parsed,
// and base.njk then omits both tags - a guessed dimension is worse than none,
// since the platform reserves a box the image doesn't fill.
function computeOgImageSize(ogImage) {
  if (!ogImage) return undefined;
  const size = imageSize(path.join(__dirname, "src", ogImage));
  return size || undefined;
}

// Drives the eleventyComputed "ogType" override below: "article" for an
// actual content leaf, "website" for everything else (the homepage, and
// every listing/index page). Timeline entries stay "website" here, matching
// the pre-existing behavior - they use layout: base.njk directly, not a
// dedicated article layout.
const ARTICLE_KINDS = new Set(["character", "chapter", "lore", "codex", "glossary", "journal"]);

function computeOgType(data) {
  return ARTICLE_KINDS.has(classifyContentPath(data.page && data.page.inputPath)) ? "article" : "website";
}

// Filing key for a glossary term: its title with any leading article
// dropped, so "The Interval" sorts and files under I rather than T. Standard
// printed-glossary practice, and the reason it is worth the small oddity of
// a heading letter that doesn't match the first character on screen: a
// reader scanning for "Interval" looks under I.
//
// Deliberately NOT used for anything but presentation. `related:` terms
// resolve through glossaryUrl by exact title match (see CLAUDE.md on
// check-related-terms.js: matching is exact, leading articles included), so
// stripping an article here cannot affect which page a related link reaches.
const GLOSSARY_LEADING_ARTICLE = /^(?:the|a|an)\s+/i;

function glossaryAlphaKey(title) {
  return String(title || "").replace(GLOSSARY_LEADING_ARTICLE, "").trim();
}

// Drives the eleventyComputed "referenceDomain" override below: the bare
// domain the "Not included in this edition" placeholder (excluded.njk)
// links a reader to for a page THIS build excludes. Defaults to the
// full-site reference domain, which is a superset of every page ordinary
// CHARACTERS/TOPICS/THREADS narrowing excludes. A private thread is the
// exception - the reference domain excludes it too (it's opt-in on every
// build), so pointing there would just loop back to another placeholder;
// its pages point at the thread's own homeDomain instead, the one clone
// that actually opts it in. Computed for every page but only ever read by
// excluded.njk, so its value on an included page is harmless.
function computeReferenceDomain(data) {
  const thread = privateThreadForPage(data);
  return (thread && thread.homeDomain) || DEFAULT_REFERENCE_DOMAIN;
}

module.exports = function(eleventyConfig) {
  const contentFilter = getContentFilter();
  // See getRelatedContentUrls's own comment: pulls in whatever lore,
  // timeline, and glossary pages the included characters' own bios link to,
  // on top of the existing tag/category matching below.
  contentFilter.relatedUrls = getRelatedContentUrls(contentFilter);

  // Mirrors the CHARACTERS/TOPICS pattern above: deploy.conf's THEME value
  // (see scripts/cpanel-deploy.sh) is exported to this Node process so
  // templates can vary copy per deployment target, not just swap CSS.
  // Falls back to "default" for any build that never sets THEME (local
  // dev, CI, GitHub Pages).
  eleventyConfig.addGlobalData("theme", String(process.env.THEME || "default").trim().toLowerCase());

  // Per-domain copy and flourishes (lib/editions.js). Separate from `theme`
  // above, which is now only a palette name again: `theme` was carrying both
  // jobs, and several domains share one palette, so it could not express a
  // per-domain tagline. Resolved from EDITION, falling back to THEME so the
  // untracked deploy.conf on every live clone keeps working unchanged - see
  // that file's MIGRATION SAFETY note before renaming any id.
  // Throws on a duplicate id or a themeAudio file that isn't in src/audio/ -
  // see validateEditions for why those two in particular need checking here
  // rather than by check-internal-links.js.
  validateEditions({
    audioDir: path.join(__dirname, "src", "audio"),
    cssDir: path.join(__dirname, "src", "css")
  });
  eleventyConfig.addGlobalData("edition", getEdition());

  // The presentation-mode registry, for the reader-side switcher in base.njk.
  // Exposed as data rather than hardcoded in the template so the control and
  // lib/editions.js cannot list different modes - the failure would be a button
  // that sets an attribute no CSS matches, which looks like nothing happening.
  // The id list is separate because the inline <head> script needs it as a JSON
  // array to validate a stored value against, and Nunjucks has no keys filter.
  eleventyConfig.addGlobalData("presentationModes", PRESENTATION_MODES);
  eleventyConfig.addGlobalData("presentationModeIds", Object.keys(PRESENTATION_MODES));

  // Same pattern as THEME above, but a plain on/off switch: lets a build
  // suppress the giscus comment widget entirely (see src/_includes/base.njk)
  // without touching the per-page comments/commentsCategory front matter
  // that decides which page *types* would otherwise carry it. Defaults on;
  // the GitHub Pages workflow sets COMMENTS_ENABLED=false because its
  // /star-rangers/-prefixed URLs would otherwise create a second, redundant
  // set of pathname-mapped discussions alongside the cPanel domains'.
  eleventyConfig.addGlobalData("commentsEnabled", String(process.env.COMMENTS_ENABLED || "true").trim().toLowerCase() !== "false");

  // Forker-facing override for the ~200 layout/content files that hardcode
  // "/star-rangers/" in absolute links (this project's own GitHub Pages
  // URL - see the NOTE in .cpanel.yml for why: Eleventy's own pathPrefix
  // stays "/" throughout this config, so every absolute href needs that
  // segment written out by hand for GitHub Pages' /star-rangers/
  // project-site subpath to resolve at all). Forking this repo under a
  // different name/host means setting SITE_PATH_PREFIX once instead of
  // hand-editing every file it appears in. Unset (this project's own
  // local/CI/GitHub Pages builds never set it) leaves output byte-for-byte
  // unchanged, and cPanel builds don't need it either -
  // scripts/cpanel-deploy.sh already strips this same prefix with its own
  // post-build sed step, independently of this.
  const sitePathPrefix = process.env.SITE_PATH_PREFIX;
  if (sitePathPrefix && sitePathPrefix !== "/star-rangers/") {
    eleventyConfig.addTransform("rewriteSitePathPrefix", function (content, outputPath) {
      if (outputPath && /\.(html|css|js|xml|txt)$/.test(outputPath)) {
        // Only where /star-rangers/ is a ROOT-RELATIVE path - preceded by a
        // quote or an opening paren, which is how every href, src, srcset and
        // CSS url() begins. This was an unanchored split/join, and that is a
        // bug with a real precedent: the identical pattern in
        // scripts/cpanel-deploy.sh rewrote the substring inside an ABSOLUTE
        // url too, so the About page's link to
        // https://dermot-r-cochran.github.io/star-rangers/ was served as
        // https://dermot-r-cochran.github.io/ on every cPanel domain. The
        // character before /star-rangers/ in an absolute url belongs to the
        // host; anchoring on the delimiter is what tells the two apart.
        return content.replace(/(["'(])\/star-rangers\//g, `$1${sitePathPrefix}`);
      }
      return content;
    });
  }

  // Wires up the :::pov / :::::scene custom containers used in chapter
  // content (see lib/markdown-containers.js) - without this, markdown-it
  // has no idea what those fences mean and renders them as literal text.
  eleventyConfig.setLibrary("md", createMarkdownRenderer());

  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/audio": "audio" });
  eleventyConfig.addPassthroughCopy({ "src/video": "video" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/static/.htaccess": ".htaccess" });
  // /favicon.ico at the site root, in addition to the <link rel="icon"> tags in
  // base.njk. Browsers honour those tags; Google's favicon crawler, feed
  // readers, link-preview generators and bookmark managers request the
  // conventional root path first or as a fallback, and were getting a 404 -
  // which leaves a stale cached icon with nothing to be replaced by. Multi-size
  // ICO (16/32/48) embedding the same PNG bytes src/images/icons already ships.
  eleventyConfig.addPassthroughCopy({ "src/static/favicon.ico": "favicon.ico" });
  // robots.txt is no longer a static passthrough file - src/robots.njk
  // renders it so its Sitemap line can carry the right absolute domain
  // per deploy target (see src/_data/site.js and scripts/cpanel-deploy.sh).
  eleventyConfig.addPassthroughCopy({ "src/static/.well-known": ".well-known" });

  // Nunjucks' own built-in `slice` filter splits an array into N groups
  // (Jinja2's "columnize" behavior) rather than taking the first N items,
  // so the Atom feed (src/feed.njk) needs its own "first N" filter instead.
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLLL d, yyyy");
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISODate();
  });

  eleventyConfig.addFilter("absoluteUrl", function(path, base = "https://dermot-r-cochran.github.io/star-rangers/") {
    if (!path) return base;
    if (/^https?:\/\//i.test(path)) return path;
    return new URL(path.replace(/^\/+/, ""), base).toString();
  });

  eleventyConfig.addFilter("zeroPad", (num) => String(num).padStart(2, "0"));

  // Reader-facing label for a season number. Season 0 is the prequel
  // Founding Era, presented by its thread name rather than as "Season 0"
  // (see lib/storyline-threads.js's `founding-era` thread, seasons: [0]);
  // every other season reads as "Season N". URLs, ids, and the
  // season/episode/chapter schema are unaffected - this is display only.
  eleventyConfig.addFilter("seasonLabel", (seasonNumber) =>
    Number(seasonNumber) === 0 ? "Founding Era" : `Season ${seasonNumber}`
  );

  // Groups a chapter/season under its storyline thread - see
  // lib/storyline-threads.js. Always returns a thread object (falling back
  // to the shared "Unsorted" placeholder), never null, so templates never
  // need their own default-handling for an unassigned season.
  eleventyConfig.addFilter("threadForSeason", (seasonNumber) => threadForSeason(seasonNumber));

  // Distinct season numbers (sorted) that have at least one published
  // chapter in the given thread id. Templates use its length to decide
  // whether a thread's season-block titles are worth rendering: a thread
  // showing a single season just repeats its own heading in the block
  // title (most visibly the Founding Era, whose one season's label IS the
  // thread name), so they suppress the title when the length is 1.
  eleventyConfig.addFilter("seasonsInThread", (chapters, threadId) => {
    const seen = new Set();
    for (const chapter of chapters || []) {
      if (threadForSeason(chapter.data.season).id === threadId) {
        seen.add(Number(chapter.data.season));
      }
    }
    return [...seen].sort((a, b) => a - b);
  });

  // The letter a glossary term files under, for src/glossary/index.md's A-Z
  // jump bar and letter headings. Shares glossaryAlphaKey with the collection
  // sort above so the heading a term appears under is always the letter it
  // was sorted by.
  eleventyConfig.addFilter("glossaryAlphaLetter", (title) =>
    (glossaryAlphaKey(title).charAt(0) || "").toUpperCase()
  );

  eleventyConfig.addFilter("glossaryUrl", function(term, glossaryCollection, loreCollection) {
    const match =
      (glossaryCollection || []).find((item) => item.data.title === term) ||
      (loreCollection || []).find((item) => item.data.title === term);
    return `/star-rangers${match ? match.url : "/glossary/"}`;
  });

  // For the Atom feed (src/feed.njk) - formats a chapter's real-world
  // `date` (see lib/content-schema.js) as an RFC 3339 timestamp.
  eleventyConfig.addFilter("dateToRfc3339", (dateObj) => DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO());

  // Groups the flat scenePovPages global data (src/_data/scenePovPages.js)
  // back into per-scene lists of characters for one chapter, so chapter.njk
  // can link out to each scene's individual per-character pages.
  eleventyConfig.addFilter("scenesForChapter", (pages, chapterId) => {
    const byScene = new Map();
    for (const p of pages || []) {
      if (p.chapterId !== chapterId) continue;
      if (!byScene.has(p.sceneNumber)) byScene.set(p.sceneNumber, []);
      byScene.get(p.sceneNumber).push(p);
    }
    return Array.from(byScene.entries())
      .sort((a, b) => Number(a[0]) - Number(b[0]) || a[0].localeCompare(b[0]))
      .map(([number, characters]) => ({ number, characters }));
  });

  // Drives chapter.njk's previousChapter/nextChapter pagination links - the
  // immediate neighbor in the already-sorted "chapters" collection (see
  // that collection's own definition below), which reads as one continuous
  // publication order across episode and season boundaries alike, the same
  // way a season/episode index's own chapter list already reads. Returns
  // null past either end, and naturally skips anything CHARACTERS/TOPICS/
  // THREADS filtering has excluded, since the collection itself already
  // omits those chapters - no dead links to hidden content.
  eleventyConfig.addFilter("previousChapterIn", (chapters, id) => {
    const index = (chapters || []).findIndex((c) => c.data.id === id);
    return index > 0 ? chapters[index - 1] : null;
  });
  eleventyConfig.addFilter("nextChapterIn", (chapters, id) => {
    const index = (chapters || []).findIndex((c) => c.data.id === id);
    return index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : null;
  });

  // Same neighbor-lookup pattern as previousChapterIn/nextChapterIn, for
  // journal-entry.njk's own prev/next links - matched by url rather than a
  // dedicated id field, since journal entries don't have (or need) one.
  eleventyConfig.addFilter("previousJournalEntryIn", (entries, url) => {
    const index = (entries || []).findIndex((e) => e.url === url);
    return index > 0 ? entries[index - 1] : null;
  });
  eleventyConfig.addFilter("nextJournalEntryIn", (entries, url) => {
    const index = (entries || []).findIndex((e) => e.url === url);
    return index >= 0 && index < entries.length - 1 ? entries[index + 1] : null;
  });

  // Resolves a curated, ordered list of character ids (e.g. the home page
  // hero slideshow's per-theme cast) against the already content-filtered
  // "characters" collection - an id excluded by this deploy's own
  // CHARACTERS/TOPICS/THREADS narrowing (see lib/content-filter.js) simply
  // isn't in that collection and is silently skipped here, the same way a
  // typo'd id would be, rather than needing its own separate filtering pass.
  // Front matter can carry an absent, empty or whitespace-only value and all
  // three mean "no image"; only the first is falsy on its own.
  const isBlankValue = (v) => v === undefined || v === null || String(v).trim() === "";

  eleventyConfig.addFilter("charactersByIds", (characters, ids) =>
    (ids || [])
      .map((id) => (characters || []).find((c) => c.data.id === id))
      .filter(Boolean)
  );

  // Pages that actually have a picture. Kept separate from charactersByIds
  // rather than folded into it: that filter answers "which characters are
  // these ids", which a future caller may want for a list of names, and a
  // resolver that silently drops entries for a reason in its own name is the
  // kind of surprise that costs an afternoon.
  //
  // Added 2026-08-21 for the homepage hero. An edition's heroCharacterIds may
  // name a character with no `image:` - 24 of the 76 character pages have
  // none - and the slideshow rendered that as <img src=".../characters/">,
  // a request for the directory itself. Elvira is in the DEFAULT cast, so
  // every domain but undercover-pets.com was serving one broken slide of six
  // on the one page every reader lands on first. Silent, because a hero slide
  // is aria-hidden and decorative: nothing announces it and the crossfade
  // simply showed a gap where a portrait should be.
  eleventyConfig.addFilter("withImages", (pages) =>
    (pages || []).filter((p) => p && p.data && !isBlankValue(p.data.image))
  );

  // Same resolve-by-id pattern as charactersByIds, but codex entries have no
  // `id` front-matter field (see lib/content-schema.js) - matched by
  // fileSlug instead, which is what a character's `known_codex` list stores.
  eleventyConfig.addFilter("codexByIds", (codexEntries, slugs) =>
    (slugs || [])
      .map((slug) => (codexEntries || []).find((c) => c.fileSlug === slug))
      .filter(Boolean)
  );

  // The current version of every page that is part of a version chain, for
  // src/version-latest.njk to build its /latest/ aliases from.
  //
  // A chain member declares `version_of` (the original's URL). The one with no
  // `superseded_by` is the current text. A page nobody has superseded is not in
  // a chain at all and gets no alias — its own URL is already current.
  //
  // This is a collection rather than a `pagination.before` filter in the
  // template's front matter, because that field has to be a real function and
  // YAML front matter cannot carry one — declaring it there silently filters
  // nothing, paginates the whole site, and every stub collides on one permalink.
  eleventyConfig.addCollection("versionChainCurrent", (collectionApi) =>
    collectionApi.getAll()
      .filter((item) => item.data.version_of && !item.data.superseded_by)
  );

  eleventyConfig.addCollection("characters", (collectionApi) =>
    collectionApi.getAll()
      .filter((item) => item.data.layout === "character.njk")
      .filter((item) => isCharacterIncluded(item.data, contentFilter))
  );

  eleventyConfig.addCollection("codex", (collectionApi) =>
    collectionApi.getAll()
      .filter((item) => item.data.layout === "codex.njk")
      .filter((item) => isTopicPageIncluded(item.data, contentFilter))
  );

  eleventyConfig.addCollection("lore", (collectionApi) =>
    collectionApi.getAll()
      .filter((item) => item.data.layout === "lore-entry.njk")
      .filter((item) => isRelatedTopicPageIncluded(item.data, contentFilter, item.url))
  );

  eleventyConfig.addCollection("chapters", (collectionApi) =>
    collectionApi
      .getAll()
      .filter((item) => item.data.layout === "chapter.njk")
      .filter((item) => isChapterIncluded(item.data, contentFilter))
      .sort((a, b) =>
        Number(a.data.season) - Number(b.data.season) ||
        Number(a.data.episode) - Number(b.data.episode) ||
        Number(a.data.chapter) - Number(b.data.chapter)
      )
  );

  // Every chapter, UNFILTERED - the one chapter collection that ignores
  // CHARACTERS/TOPICS/THREADS and private threads alike. Feeds the permanent
  // citation aliases in src/chapter-aliases.njk and nothing else.
  //
  // It has to be unfiltered so an external citation of /c/<comment_id>/ never
  // 404s on a narrowed clone. That is the same promise excluded.njk already
  // makes at a chapter's ordinary URL: the page still builds, as a placeholder
  // pointing at a domain that does have it. An alias that vanished on the
  // domains which narrow would break exactly the links this feature exists to
  // keep alive. It discloses nothing new either - the placeholder already sits
  // at the chapter's normal URL on every domain.
  //
  // Filtered by inputPath rather than by `layout`, because layout is rewritten
  // to "excluded.njk" for a hidden chapter (see the comment at the top of this
  // file); testing it here would silently drop precisely the chapters this
  // collection exists to cover.
  eleventyConfig.addCollection("allChapters", (collectionApi) =>
    collectionApi
      .getAll()
      .filter((item) => classifyContentPath(item.inputPath) === "chapter")
      .sort((a, b) =>
        Number(a.data.season) - Number(b.data.season) ||
        Number(a.data.episode) - Number(b.data.episode) ||
        Number(a.data.chapter) - Number(b.data.chapter)
      )
  );

  // Same "chapters" set, newest real-world `date` first rather than story
  // order - what the Atom feed (src/feed.njk) actually wants to announce.
  eleventyConfig.addCollection("recentChapters", (collectionApi) =>
    collectionApi
      .getAll()
      .filter((item) => item.data.layout === "chapter.njk")
      .filter((item) => isChapterIncluded(item.data, contentFilter))
      .sort((a, b) => b.date - a.date)
  );

  // Out-of-character author's notes (src/journal/), not subject to
  // CHARACTERS/TOPICS/THREADS narrowing - see classifyContentPath's
  // "journal" case falling through to isContentIncluded's unconditional
  // `return true`, the same way the About page always shows regardless of
  // a narrowed deploy. Sorted oldest-first so journal-entry.njk's
  // previousChapterIn/nextChapterIn-style neighbor lookup reads in
  // publication order; journal/index.md reverses it for newest-first display.
  eleventyConfig.addCollection("journalEntries", (collectionApi) =>
    collectionApi
      .getAll()
      .filter((item) => item.data.layout === "journal-entry.njk")
      .sort((a, b) => a.date - b.date)
  );

  // Alphabetical by title, with leading articles ignored: "The Interval"
  // files under I, where a reader looks for it, rather than under T. Both
  // the order and the letter headings come from glossaryAlphaKey (see its
  // definition above) so they cannot disagree - which they did before this
  // sort existed, and visibly. src/glossary/index.md builds an A-Z jump bar
  // and a letter heading per group by walking this collection and emitting a
  // heading whenever the first letter changes from the previous entry. That
  // is correct for a sorted list and nonsense for an unsorted one: the
  // collection inherited getAll()'s own order, so letters alternated back
  // and forth (44 headings for 53 terms, 13 letters appearing more than
  // once) and the jump bar - which is deduplicated - anchored each letter to
  // its FIRST occurrence, leaving every later group unreachable from it.
  // Four of the five N terms could not be reached by clicking N.
  //
  // Only this page depends on the order; the other two consumers use
  // `| length` (src/llms.njk) and a title lookup (glossaryUrl), both
  // order-independent.
  eleventyConfig.addCollection("glossary", (collectionApi) =>
    collectionApi.getAll()
      .filter((item) => item.data.layout === "glossary-entry.njk")
      .filter((item) => isRelatedTopicPageIncluded(item.data, contentFilter, item.url))
      .sort((a, b) =>
        glossaryAlphaKey(a.data.title).localeCompare(
          glossaryAlphaKey(b.data.title), "en", { sensitivity: "base" }
        )
      )
  );

  eleventyConfig.addCollection("timelineEvents", (collectionApi) =>
    collectionApi
      .getAll()
      .filter((item) => item.inputPath.includes("/timeline/") && !item.inputPath.endsWith("/index.md"))
      .filter((item) => isRelatedTopicPageIncluded(item.data, contentFilter, item.url))
      .sort((a, b) => Number(a.data.sort_order) - Number(b.data.sort_order))
  );

  // Excluded content-leaf pages still build at their normal URL (so links
  // to them never 404) but render a placeholder instead of their real
  // content: swap the layout to one that doesn't emit `content`, and
  // replace the title so it doesn't leak into <title>/meta. Self-referencing
  // computed data (data.layout/data.title resolve to the original
  // frontmatter value here) is Eleventy's standard "draft" pattern; this is
  // a no-op whenever contentFilter.active is false.
  eleventyConfig.addGlobalData("eleventyComputed", {
    layout: (data) => (isContentIncluded(data, contentFilter) ? data.layout : "excluded.njk"),
    title: (data) => (isContentIncluded(data, contentFilter) ? data.title : "Not included in this edition"),
    // Falls back to `undefined` (not a placeholder string) so base.njk's
    // `{{ description | default(site.description) }}` renders the same
    // generic site description an ordinary description-less page already
    // gets, instead of announcing "there's hidden content here" via a
    // second placeholder string in the page's own meta tags.
    description: (data) => (isContentIncluded(data, contentFilter) ? data.description : undefined),
    ogImage: (data) => computeOgImage(data, isContentIncluded(data, contentFilter)),
    ogImageAlt: (data) =>
      computeOgImageAlt(data, computeOgImage(data, isContentIncluded(data, contentFilter))),
    ogImageSize: (data) =>
      computeOgImageSize(computeOgImage(data, isContentIncluded(data, contentFilter))),
    ogType: (data) => computeOgType(data),
    // Only read by excluded.njk (see computeReferenceDomain) - the domain a
    // reader is sent to for a page this build hides. A private thread's
    // excluded page points at its own homeDomain instead of the default
    // reference domain, so it never loops back to another placeholder.
    referenceDomain: (data) => computeReferenceDomain(data),
    // A hidden page still returns HTTP 200 with a real placeholder body -
    // that IS the design, so no cross-link ever 404s - which means without
    // this a narrowed clone publishes up to a few hundred indexable "Not
    // included in this edition" pages. sitemap.xml already omits them (it
    // filters on layout != "excluded.njk"), but a crawler following the
    // internal links the placeholders exist to keep alive never consults a
    // sitemap. `follow` rather than `nofollow` deliberately: the one useful
    // thing on a placeholder is its link out to the reference domain, and
    // that should still be traversed. Emitted by base.njk only when set, so
    // an ordinary page gets no robots tag at all and any page may still opt
    // in via its own `robots` front matter. Driven off isContentIncluded
    // rather than data.layout for the reason documented at the top of this
    // file - by the time this evaluator runs, data.layout may already read
    // "excluded.njk" for an INCLUDED page's sibling and cannot be trusted.
    robots: (data) => (isContentIncluded(data, contentFilter) ? data.robots : "noindex, follow")
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
