#!/usr/bin/env node
//
// Resolves one domain's edition config out of lib/editions.js (plus any
// untracked editions.local.json) and prints it as shell-assignable lines, so
// scripts/cpanel-deploy.sh can fill in whatever that clone's deploy.conf
// leaves unset. That is what takes a minimum viable deploy.conf down to
// CPANEL_USER and DOMAIN.
//
// WHY A CLI RATHER THAN TEACHING THE NODE CONSUMERS TO READ THE REGISTRY
//
// Because the blast radius is a fraction of the size. Every downstream reader
// of this config is already env-var driven - lib/content-filter.js reads
// CHARACTERS/TOPICS/THREADS, src/_data/site.js reads SITE_NAME/SITE_TITLE/
// SITE_DOMAIN, src/_data/giscus.js reads GISCUS_PROFILE - so resolving in the
// deploy script and exporting the same variables it always exported leaves all
// of them untouched. The alternative, giving each of those its own edition
// fallback, would have meant editing three modules that currently have exactly
// one input each.
//
// Usage:
//   node scripts/resolve-edition.js --domain church-space.site
//   node scripts/resolve-edition.js --domain x --edition pets   # id wins
//   node scripts/resolve-edition.js --domain x --format json    # for humans
//
// Output (shell format) is one KEY='value' per line, single-quoted with any
// embedded quote escaped, safe to `eval`. Only the keys this registry owns are
// printed; CPANEL_USER, ADMIN_EMAIL, ALT_DOMAINS, DEPLOY_PRIMARY, the raw
// GISCUS_*_ID values and CUSTOM_CSS_FILE are never printed because they are
// genuinely machine-specific or secret and stay in deploy.conf.
//
// Exit codes: 0 resolved, 0 with RESOLVED_EDITION='' if the domain is not
// registered (not an error - an unregistered domain simply gets nothing filled
// in and keeps deploy.conf's own values), 1 on a malformed registry.

const path = require("path");
const { editionForDomain, editionFor } = require(path.join(__dirname, "..", "lib", "editions"));

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : "";
}

const domain = arg("domain");
const editionId = arg("edition");
const format = arg("format") || "shell";

// An explicit --edition wins over the domain lookup, mirroring the EDITION env
// var winning over THEME inside the build. It exists so a local preview can ask
// for a branded edition without pretending to be that domain.
const resolved = editionId ? editionFor(editionId) : editionForDomain(domain);

// editionFor() always returns a record (falling back to default), so an
// explicit --edition can never report "unregistered"; only a domain lookup can.
const isRegistered = Boolean(resolved) && (Boolean(editionId) || Boolean(editionForDomain(domain)));

if (format === "json") {
  console.log(JSON.stringify({ registered: isRegistered, edition: resolved || null }, null, 2));
  process.exit(0);
}

function shellQuote(value) {
  return `'${String(value).replace(/'/g, "'\\''")}'`;
}

const out = [];
if (!isRegistered || !resolved) {
  // Deliberately still prints the key, empty. The deploy script tests it to
  // decide whether to log "resolved from registry" or "not registered", and an
  // absent variable and an empty one are easy to confuse in shell.
  out.push("RESOLVED_EDITION=''");
} else {
  const list = (v) => (Array.isArray(v) ? v.join(",") : String(v || ""));
  out.push(`RESOLVED_EDITION=${shellQuote(resolved.id)}`);
  out.push(`RESOLVED_THEME=${shellQuote(resolved.theme || "default")}`);
  out.push(`RESOLVED_THREADS=${shellQuote(list(resolved.threads))}`);
  out.push(`RESOLVED_CHARACTERS=${shellQuote(list(resolved.characters))}`);
  out.push(`RESOLVED_TOPICS=${shellQuote(list(resolved.topics))}`);
  out.push(`RESOLVED_SITE_NAME=${shellQuote(resolved.siteName || "")}`);
  out.push(`RESOLVED_SITE_TITLE=${shellQuote(resolved.siteTitle || "")}`);
  out.push(`RESOLVED_GISCUS_PROFILE=${shellQuote(resolved.giscusProfile || "")}`);
  out.push(`RESOLVED_COMMENTS_ENABLED=${shellQuote(resolved.commentsEnabled === false ? "false" : "true")}`);
}
console.log(out.join("\n"));
