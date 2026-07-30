---
layout: base.njk
title: "About the Author"
description: "About Dermot R. Cochran, creator of Star Rangers."
---
<img class="page-hero-image" src="/star-rangers/images/hero/about-writer.jpg" alt="A writer working at a desk at night" />
<h1 class="page-title">About the Author</h1>
<p class="page-intro">
  Dermot R. Cochran is a Senior Machine Learning Engineer based in Dublin, Ireland.
</p>

<h2>How this site is built</h2>
<p>
  Star Rangers is a static site built with <a href="https://www.11ty.dev/">Eleventy</a>.
  Content lives as Markdown and Nunjucks templates in this repository's <code>src/</code>
  directory; <code>npm run build</code> runs Eleventy to compile it into the static
  <code>_site/</code> output, <code>npm run start</code> serves it locally with live
  reload, and <code>npm test</code> runs an Eleventy dry-run build in CI on every pull
  request, alongside a ShellCheck pass over the deployment scripts.
</p>

<h2>How this site is written</h2>
<p>
  The words on this site have been drafted and edited with the help of more than one tool over
  time, and the split is worth naming honestly. The early version of the site leaned on
  <a href="https://github.com/features/copilot">GitHub Copilot</a> and Microsoft 365 Copilot for
  scaffolding and template work; some of the Codex's in-universe documentary passages were refined in
  <a href="https://www.sudowrite.com/">Sudowrite</a>. That last part became a problem once a
  Sudowrite draft and the committed file drifted out of sync and neither could be trusted as
  authoritative — so the repository is now the single source of truth, and everything reconciles to
  it. <a href="https://claude.com/claude-code">Claude Code</a> does most of the current editing and
  organizing work directly against the repository, running the schema validation and dry-run build
  before anything is committed and helping keep the lore, Codex, glossary, and story bible consistent
  with each other. There's a fuller account of how that came to be in the
  <a href="/star-rangers/journal/two-copies-forty-seconds-apart/">Journal</a>.
</p>

<h2 id="fan-works">Fan fiction</h2>
<p>
  Want to write your own stories in the Star Rangers universe? Post them on
  <a href="https://archiveofourown.org/">Archive of Our Own</a> or
  <a href="https://www.wattpad.com/">Wattpad</a> rather than here — tag them
  something like "Star Rangers (Dermot R. Cochran)" so other readers can find
  them, and feel free to link your work in the
  <a href="https://github.com/Star-Rangers/sciencefiction-site-comments/discussions">comments</a>'
  Fan Creations category.
</p>
<p>
  <strong>Translations count as fan works too.</strong> English is the canonical text, so a
  translation into another language is a derivative reading rather than authoritative canon —
  which makes it exactly the kind of non-commercial fan work the licence's Fan Works Policy
  welcomes, not something the main site can vouch for line by line. Post one the same way
  (AO3 or Wattpad, tagged and clearly marked an unofficial translation) and link it in the
  Fan Creations category so readers in that language can find it. One note for translators:
  the story's coined in-universe terms — names and technical vocabulary like <em>Kieme</em> —
  are canon as spelled, not ordinary words to render, so a faithful translation leaves them
  intact. For a casual read in another
  language, your browser's built-in translate feature works on every page — automatically, and
  just as unofficially.
</p>
<p>
  Prefer to run your own site instead of posting to an existing platform? Fan fiction clones
  of this site are explicitly allowed and supported, non-commercially and clearly labeled as
  unofficial — see the <a href="/star-rangers/#license">Licence section</a>'s Fan Works Policy
  and the <a href="/star-rangers/forking/">Forking This Site</a> guide for how to fork this
  repository and reuse some or all of the existing content.
</p>

<h2>How this site is deployed</h2>
<p>
  Two deployments run from this repository. A GitHub Actions workflow builds the site
  with Eleventy on every push to <code>main</code> and publishes the result to
  <a href="https://dermot-r-cochran.github.io/star-rangers/">GitHub Pages</a>. Separately,
  cPanel-hosted clones of the site pull updates via cPanel's Git Version Control feature,
  driven by <code>.cpanel.yml</code> and <code>scripts/cpanel-deploy.sh</code>, which build
  the site with Eleventy and copy it into <code>public_html</code>. Each clone's identity —
  its palette, its wording, and whether it narrows the content to a subset — is resolved
  from a registry in the repository by domain name, so a clone's own untracked
  <code>deploy.conf</code> need only name the account and the domain. What that registry
  may hold is deliberately limited: it carries framing, never facts. The lore, the
  glossary and the chapters are identical on every domain, and a narrowed clone shows a
  subset of one record rather than a variant of it.
</p>
