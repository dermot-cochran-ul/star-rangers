---
layout: base.njk
title: "Journal"
eleventyComputed:
  description: "Notes from behind {{ site.name }} — the reasoning, wrong turns, and small decisions that don't fit in the story itself."
---
<img class="page-hero-image" src="/star-rangers/images/hero/journal-notebook.jpg" alt="An open journal on a wooden desk, headed &quot;Author's Journal&quot; in cursive above a dated handwritten entry, with an ink bottle behind it" />
<nav class="chapter-breadcrumb" aria-label="Page location">
  <ol class="breadcrumb" role="list">
    <li><a href="/star-rangers/story-engine/">Story Engine</a></li>
    <li aria-current="page">Journal</li>
  </ol>
</nav>
<h1 class="page-title">Journal</h1>
<p class="page-intro">
  This is out-of-character. Everything else on this site is {{ site.name }}'s own record of itself — the Journal is
  Dermot R. Cochran's, about it: naming decisions, worldbuilding rationale, and the odd fragment of process worth
  keeping in public rather than only in a private notes file. If you're looking for the story, start with
  <a href="/star-rangers/seasons/">Seasons</a> instead.
</p>

{% set entries = collections.journalEntries | reverse %}
{% if entries.length %}
<div class="codex-grid">
{% for entry in entries %}
<a class="codex-card" href="/star-rangers{{ entry.url }}">
<p class="codex-card__category">{{ entry.date | postDate }}</p>
<h3 class="codex-card__title">{{ entry.data.title }}</h3>
{% if entry.data.description %}
<p class="codex-card__institution">{{ entry.data.description }}</p>
{% endif %}
</a>
{% endfor %}
</div>
{% else %}
<p class="page-intro">No journal entries published yet.</p>
{% endif %}
