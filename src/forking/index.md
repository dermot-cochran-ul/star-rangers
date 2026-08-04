---
layout: base.njk
title: "Forking This Site"
description: "How to fork the Fian Ilchruinne engine and content to run your own site."
---
<h1 class="page-title">Forking This Site</h1>
<p class="page-intro">
  Fian Ilchruinne is built to be forked two different ways. Which one applies to you changes
  what you keep and what you replace.
</p>

<h2>The two licences</h2>
<p>
  The site engine (Eleventy config, layouts, CSS/JS, deployment scripts) and the story content
  (chapters, characters, lore, glossary, codex, timeline) are licensed separately:
</p>
<ul>
  <li>
    <strong>Engine</strong> — MIT. Reuse it for anything, including a wholly original story with
    no connection to Fian Ilchruinne.
  </li>
  <li>
    <strong>Story content</strong> — CC BY-NC-ND 4.0, with a standing Fan Works Policy exception
    for non-commercial fan fiction, fan art, and fan fiction clones of this site. See the
    <a href="/star-rangers/#license">Licence section</a> on the homepage for the full terms and
    conditions.
  </li>
</ul>
<p>That means two paths:</p>
<ul>
  <li><strong>Path A — an original site, different story entirely.</strong> Keep the engine, delete and replace the content. No connection to Fian Ilchruinne is implied or required.</li>
  <li><strong>Path B — a Fian Ilchruinne fan fiction clone.</strong> Keep the engine and some or all of the existing content, and add your own stories in the same universe — non-commercial and clearly labeled as unofficial fan work.</li>
</ul>

<h2>What's engine vs. content</h2>
<table>
  <thead>
    <tr><th>Keep (engine)</th><th>Replace (Path A) or extend (Path B)</th></tr>
  </thead>
  <tbody>
    <tr><td>Eleventy config, build scripts</td><td>Chapters and storyline threads</td></tr>
    <tr><td>Page layouts</td><td>Characters, timeline</td></tr>
    <tr><td>CSS, JS, images, audio (swap assets, keep the mechanism)</td><td>Lore, glossary, codex</td></tr>
    <tr><td>Data/config mechanism (comment-board values need updating — see below)</td><td>Story bible, prompt notes</td></tr>
  </tbody>
</table>

<h2>Step by step</h2>
<ol>
  <li>
    <strong>Fork the repository</strong> on
    <a href="https://github.com/dermot-r-cochran/star-rangers">GitHub</a>, then locally run
    <code>npm install &amp;&amp; npm start</code> to confirm it builds before changing anything.
  </li>
  <li>
    <strong>Decide Path A or B</strong>, then either delete the content directories above and
    write your own (Path A), or keep what you want and add to it (Path B — check the Fan Works
    Policy conditions as you go). Either way, use the project's content scaffolding command to
    generate each new character, lore, codex, glossary, chapter, or journal entry — it prompts
    for the right fields and validates them against a shared schema, so a typo'd field fails
    with a clear message instead of a silent bad build.
  </li>
  <li>
    <strong>Rebrand.</strong> The site name and title are configurable without code changes —
    they cover the header logo, footer, and browser title. Beyond that, replace every mention of
    Dermot R. Cochran's name and domain throughout the repository with your own identity, since
    nothing about who you are can be inferred automatically.
  </li>
  <li>
    <strong>Fix the path prefix, if you need to.</strong> This project's absolute links are
    rewritten at build time to match wherever you host the fork — a differently-named GitHub
    Pages repo, a custom domain, or local preview at root — with no manual find-and-replace
    needed.
  </li>
  <li>
    <strong>Set up your own comments board</strong>, if you want reader comments at all — create
    your own public GitHub Discussions repo with a matching category structure, and point the
    site's comment configuration at it. This works the same way across local previews, GitHub
    Pages, and any other host, without editing the engine.
  </li>
  <li>
    <strong>Deploy.</strong> The GitHub Actions workflow for GitHub Pages works unmodified once
    you set your own site domain. Any other static host (Netlify, Vercel, Cloudflare Pages, a
    plain bucket) just needs a standard Eleventy build and your own domain set at build time.
    cPanel hosts use a separate deploy config with the same idea — copy the sample, fill in your
    own values.
  </li>
</ol>

<p>
  The repository's own README and the <code>FORKING.md</code> guide in it walk through every one
  of these steps in full technical detail, including exact environment variable names, file paths,
  and commands.
</p>
