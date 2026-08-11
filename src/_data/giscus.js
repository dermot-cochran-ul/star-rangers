const fs = require("fs");
const path = require("path");

// Config for the giscus comment widget (see src/_includes/base.njk), which
// stores every page's comment thread as a GitHub Discussion. Deliberately
// points at a separate, public comments-only repo rather than this source
// repo, so reader/fan discussion never mixes with dev-facing Discussions
// here and stays stable across any rename/fork/transfer of this repo.
// giscus needs the numeric repo/category IDs (not just names) - get them by
// installing the giscus app on that repo and running its config wizard at
// https://giscus.app, then paste the generated data-repo-id/data-category-id
// pairs in below. See TECHNICAL-README.md's "Discussion forum" section for the full
// category setup this maps onto.
//
// Two mechanisms let a cPanel clone point at a DIFFERENT comments repo than
// the shared default, so a domain whose readers shouldn't share a Discussions
// board with the main site's gets its own:
//
//   1. GISCUS_PROFILE=<name> selects one of the project's OWN registered
//      comment repos below (GISCUS_PROFILES) with a single key - so a
//      deploy.conf doesn't have to paste all six repo/category IDs. This is
//      how the project's own domains pick a board: unset (or "default") for
//      the full-site/reference domains (sciencefiction.site, starquest.*),
//      "church-space" for church-space.site/.online and their Fellowship of
//      Light addon domains.
//   2. GISCUS_REPO/GISCUS_REPO_ID/GISCUS_CATEGORY_{CHARACTERS,LORE,EPISODES,
//      JOURNAL}_ID set a repo explicitly. This is the escape hatch for a
//      THIRD-PARTY FORK pointing at its OWN comments repo (one that isn't a
//      registered profile here) - each key overrides just the matching field
//      of the selected profile, so a fork can also start from a profile and
//      change only what differs.
//
// scripts/cpanel-deploy.sh exports all of these from deploy.conf the same way
// it does THEME/SITE_NAME/etc (see that script and sample-deploy.conf). Every
// clone left fully unset shares the one default board, which is what keeps
// community discussion in one place.

// The project's own official comment repos, keyed by profile name. A fork
// adding its own board can register it here too (then select it with
// GISCUS_PROFILE), or just use the explicit GISCUS_REPO/* keys above.
const GISCUS_PROFILES = {
  // Full site + main reference domains: sciencefiction.site, starquest.site,
  // starquest.online.
  default: {
    repo: "Star-Rangers/sciencefiction-site-comments",
    repoId: "R_kgDOTXRNGg",
    categories: {
      characters: "DIC_kwDOTXRNGs4DBHee",
      lore: "DIC_kwDOTXRNGs4DBIwv",
      episodes: "DIC_kwDOTXRNGs4DBIw2",
      journal: "DIC_kwDOTXRNGs4DBMgM"
    }
  },
  // church-space.site/.online and their Fellowship of Light addon domains.
  "church-space": {
    repo: "Star-Rangers/churchspace-site-comments",
    repoId: "R_kgDOTX8w3A",
    categories: {
      characters: "DIC_kwDOTX8w3M4DBNUs",
      lore: "DIC_kwDOTX8w3M4DBNU7",
      episodes: "DIC_kwDOTX8w3M4DBNU0",
      journal: "DIC_kwDOTX8w3M4DBMgc"
    }
  }
};

const CATEGORY_LABELS = {
  characters: "Characters",
  lore: "Lore & Worldbuilding",
  episodes: "Episodes Discussion",
  journal: "Journal"
};

// A THIRD-PARTY FORK can point comments at its own repo WITHOUT editing this
// (engine) file or running the fetch script that patches it: drop an untracked
// giscus.local.json in the repo root (copy sample-giscus.local.json, fill in
// your repo + IDs). It's read here if present and becomes the fork's default
// board across every build path - `npm start`, GitHub Pages, and any cPanel
// deploy that doesn't select a GISCUS_PROFILE - the same "untracked local file
// + tracked sample" pattern as deploy.conf. It's gitignored, so a fork's own
// comment-repo settings never collide with an upstream merge. Precedence:
// GISCUS_PROFILE (a registered profile) wins if set, else this local file, else
// the built-in default profile; individual GISCUS_* env vars still override
// single fields on top of whichever base is chosen.
const LOCAL_CONFIG_PATH = path.join(__dirname, "..", "..", "giscus.local.json");

function loadLocalProfile() {
  let raw;
  try {
    raw = fs.readFileSync(LOCAL_CONFIG_PATH, "utf8");
  } catch (err) {
    if (err.code === "ENOENT") return null; // absent is the normal case
    throw err;
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(`giscus.js: giscus.local.json is not valid JSON - ${err.message}`);
  }
  const cats = parsed.categories || {};
  const missing = ["repo", "repoId"].filter((k) => !parsed[k])
    .concat(["characters", "lore", "episodes", "journal"].filter((k) => !cats[k]).map((k) => `categories.${k}`));
  if (missing.length) {
    throw new Error(
      `giscus.js: giscus.local.json is missing required field(s): ${missing.join(", ")}. ` +
      `See sample-giscus.local.json for the expected shape.`
    );
  }
  return {
    repo: parsed.repo,
    repoId: parsed.repoId,
    categories: {
      characters: cats.characters,
      lore: cats.lore,
      episodes: cats.episodes,
      journal: cats.journal
    }
  };
}

module.exports = function () {
  const profileName = process.env.GISCUS_PROFILE;
  // An unknown profile name is almost certainly a deploy.conf typo - fail the
  // build loudly rather than silently falling back to the default board (which
  // would quietly route, say, church-space's comments to the main site's
  // repo). Same loud-failure spirit as cpanel-deploy.sh's other checks.
  if (profileName && !Object.prototype.hasOwnProperty.call(GISCUS_PROFILES, profileName)) {
    throw new Error(
      `giscus.js: unknown GISCUS_PROFILE "${profileName}" - registered profiles: ` +
      `${Object.keys(GISCUS_PROFILES).join(", ")}. For a repo that isn't a registered ` +
      `profile, set GISCUS_REPO/GISCUS_REPO_ID/GISCUS_CATEGORY_*_ID explicitly instead.`
    );
  }
  const profile = profileName
    ? GISCUS_PROFILES[profileName]
    : (loadLocalProfile() || GISCUS_PROFILES.default);
  return {
    repo: process.env.GISCUS_REPO || profile.repo,
    repoId: process.env.GISCUS_REPO_ID || profile.repoId,
    categories: {
      characters: { name: CATEGORY_LABELS.characters, id: process.env.GISCUS_CATEGORY_CHARACTERS_ID || profile.categories.characters },
      lore: { name: CATEGORY_LABELS.lore, id: process.env.GISCUS_CATEGORY_LORE_ID || profile.categories.lore },
      episodes: { name: CATEGORY_LABELS.episodes, id: process.env.GISCUS_CATEGORY_EPISODES_ID || profile.categories.episodes },
      journal: { name: CATEGORY_LABELS.journal, id: process.env.GISCUS_CATEGORY_JOURNAL_ID || profile.categories.journal }
    }
  };
};
