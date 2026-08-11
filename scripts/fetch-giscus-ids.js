#!/usr/bin/env node
//
// Fetches the giscus repo/category IDs from GitHub's GraphQL API in one
// call, instead of clicking through giscus.app's wizard once per category.
// The target repo and the category names to look up both come from
// src/_data/giscus.js itself (not hardcoded here), so this stays correct
// if that file's categories ever change.
//
// Usage:
//   GITHUB_TOKEN=ghp_xxx node scripts/fetch-giscus-ids.js                     # print only, default repo
//   GITHUB_TOKEN=ghp_xxx node scripts/fetch-giscus-ids.js --write             # print + patch giscus.js
//   GITHUB_TOKEN=ghp_xxx node scripts/fetch-giscus-ids.js --repo owner/name   # a DIFFERENT comments repo
//
// --repo targets a comments repo other than giscus.js's own default (e.g.
// Star-Rangers/churchspace-site-comments for a domain with its own separate
// forum - see src/_data/giscus.js's GISCUS_REPO comment and TECHNICAL-README.md's
// "Discussion forum" section). It only ever prints - never --write, since
// giscus.js's default is a single shared repo and a non-default one's IDs
// belong in that clone's own deploy.conf (GISCUS_REPO_ID/GISCUS_CATEGORY_*_ID),
// not committed here.
//
// Needs a GitHub personal access token in GITHUB_TOKEN (or GH_TOKEN) -
// GitHub's GraphQL API requires authentication even for public repos. A
// classic token with no scopes checked is enough to read a public repo's
// Discussions; create one at https://github.com/settings/tokens.

const fs = require("fs");
const path = require("path");

const GISCUS_DATA_PATH = path.join(__dirname, "..", "src", "_data", "giscus.js");

const QUERY = `
  query($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      discussionCategories(first: 25) {
        nodes { id name }
      }
    }
  }
`;

async function main() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) {
    console.error(
      "Missing GITHUB_TOKEN (or GH_TOKEN).\n" +
      "Create one at https://github.com/settings/tokens (classic, no scopes\n" +
      "needed to read a public repo's Discussions) and re-run:\n" +
      "  GITHUB_TOKEN=ghp_xxx node scripts/fetch-giscus-ids.js [--write]"
    );
    process.exitCode = 1;
    return;
  }

  const giscusConfig = require(GISCUS_DATA_PATH)();
  const repoFlagIndex = process.argv.indexOf("--repo");
  const repoOverride = repoFlagIndex !== -1 ? process.argv[repoFlagIndex + 1] : null;
  if (repoFlagIndex !== -1 && !repoOverride) {
    console.error("--repo needs a value, e.g. --repo Star-Rangers/churchspace-site-comments");
    process.exitCode = 1;
    return;
  }
  const targetRepo = repoOverride || giscusConfig.repo;
  const [owner, name] = targetRepo.split("/");

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "star-rangers-fetch-giscus-ids"
    },
    body: JSON.stringify({ query: QUERY, variables: { owner, name } })
  });

  const json = await response.json();
  if (json.errors) {
    console.error("GitHub GraphQL API returned errors:", JSON.stringify(json.errors, null, 2));
    process.exitCode = 1;
    return;
  }

  const repository = json.data && json.data.repository;
  if (!repository) {
    console.error(`Repository ${owner}/${name} not found, not public yet, or not accessible with this token.`);
    process.exitCode = 1;
    return;
  }

  console.log(`repo:   ${targetRepo}`);
  console.log(`repoId: ${repository.id}`);
  console.log("");
  console.log("Discussion categories found:");
  for (const node of repository.discussionCategories.nodes) {
    console.log(`  ${node.name} -> ${node.id}`);
  }

  const wantedNames = Object.values(giscusConfig.categories).map((c) => c.name);
  const foundNames = new Set(repository.discussionCategories.nodes.map((n) => n.name));
  const missing = wantedNames.filter((wanted) => !foundNames.has(wanted));
  if (missing.length) {
    console.log("");
    console.log(`Not created on GitHub yet (see TECHNICAL-README.md's "Discussion forum" setup steps): ${missing.join(", ")}`);
  }

  if (repoOverride) {
    console.log("");
    console.log("--repo given: not patching src/_data/giscus.js (that file's default is a single");
    console.log("shared repo). Paste these values into that clone's own deploy.conf instead:");
    console.log(`  GISCUS_REPO=${targetRepo}`);
    console.log(`  GISCUS_REPO_ID=${repository.id}`);
    for (const [key, cat] of Object.entries(giscusConfig.categories)) {
      const node = repository.discussionCategories.nodes.find((n) => n.name === cat.name);
      console.log(`  GISCUS_CATEGORY_${key.toUpperCase()}_ID=${node ? node.id : "REPLACE_WITH_CATEGORY_ID"}`);
    }
  } else if (process.argv.includes("--write")) {
    writeIdsIntoGiscusData(repository);
  } else {
    console.log("");
    console.log("Re-run with --write to patch these values straight into src/_data/giscus.js.");
  }
}

function writeIdsIntoGiscusData(repository) {
  const before = fs.readFileSync(GISCUS_DATA_PATH, "utf8");
  let text = before;

  text = text.replace(/repoId:\s*"[^"]*"/, `repoId: "${repository.id}"`);

  // Only fills in the id for a category block whose name already matches
  // one GitHub returned - never adds/removes/renames a category key, since
  // giscus.js's own categories map (not the API response) is this file's
  // source of truth for which page types get comments at all.
  for (const node of repository.discussionCategories.nodes) {
    const escapedName = node.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(name:\\s*"${escapedName}",\\s*id:\\s*)"[^"]*"`);
    text = text.replace(pattern, `$1"${node.id}"`);
  }

  if (text === before) {
    console.log("\nNothing changed - IDs may already be up to date, or no category names matched yet.");
    return;
  }

  fs.writeFileSync(GISCUS_DATA_PATH, text);
  console.log(`\nWrote fetched IDs into ${path.relative(process.cwd(), GISCUS_DATA_PATH)}.`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
