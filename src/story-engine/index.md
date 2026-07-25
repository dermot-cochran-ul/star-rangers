---
layout: base.njk
title: "Story Engine"
description: "How Star Rangers is built — the out-of-character section: the Journal's process notes, and the working vocabulary behind seasons, threads, scenes, and the Codex."
permalink: /story-engine/
---
<img class="page-hero-image" src="/star-rangers/images/hero/about-writer.jpg" alt="A writer working at a desk at night" />
<h1 class="page-title">Story Engine</h1>
<p class="page-intro">
  Everything else on this site is <em>Star Rangers</em>' record of itself, written from inside its own world.
  This section is not. The Story Engine is where the machinery shows: how the story is put together, what its
  working words mean, and why particular decisions went the way they did. If you came for the story, start with
  <a href="/star-rangers/seasons/">Seasons</a> — nothing here is needed to read it.
</p>
<p class="page-intro">
  Nothing in this section spoils anything. The planning notes that <em>would</em> — outlines, unwritten endings,
  what a given mystery turns out to be — stay unpublished by deliberate policy, and always will.
</p>

<h2>The Journal</h2>
<p>
  Dated notes from behind the story: naming decisions, worldbuilding rationale, wrong turns worth keeping, and
  the odd fragment of process that belongs in public rather than in a private notes file.
</p>

{% set entries = collections.journalEntries | reverse %}
{% if entries.length %}
<div class="codex-grid">
{% for entry in entries %}
<a class="codex-card" href="/star-rangers{{ entry.url }}">
<p class="codex-card__category">{{ entry.date | postDate }}</p>
<h3 class="codex-card__title">{{ entry.data.title }}</h3>
{% if entry.data.description %}
<p style="font-size:0.9rem;color:var(--color-text-muted);margin-top:0.5rem;font-family:var(--font-ui)">
  {{ entry.data.description }}
</p>
{% endif %}
</a>
{% endfor %}
</div>
<p><a href="/star-rangers/journal/">All journal entries →</a></p>
{% else %}
<p>No journal entries published yet.</p>
{% endif %}

<h2>How the story is put together</h2>
<p>
  A short orientation to the structural words this site uses about itself. These are craft terms, not in-universe
  ones — for the vocabulary the <em>setting</em> uses, see the
  <a href="/star-rangers/glossary/">Glossary</a>, which is a different kind of reference entirely.
</p>

<h3>Seasons, episodes, chapters</h3>
<p>
  A season number marks a position in the setting's timeline, not a release order and not a shared protagonist.
  Some season numbers are deliberately unwritten, held open for storylines that do not run through the current
  cast. Chapters nest inside episodes, and episodes inside seasons.
</p>

<h3>Storyline threads</h3>
<p>
  A <a href="/star-rangers/threads/">thread</a> is an independent storyline that gathers whole seasons — its own
  cast, its own concerns, readable start to finish without the others. The Founding Era and the present-day
  Threshold Station story are separate threads that happen to share a universe.
</p>

<h3>Scenes and points of view</h3>
<p>
  A chapter is built from scenes, and a scene is built from points of view — the same minutes written two or three
  times over, once per character present. Each version is a whole page in its own right, so a chapter can be read
  straight through, or one character at a time, or the same scene compared across everyone who was standing in it.
  What one viewpoint leaves out is usually the point.
</p>

<h3>Lore, Glossary, and Codex — three different promises</h3>
<p>
  <a href="/star-rangers/lore/">Lore</a> and the <a href="/star-rangers/glossary/">Glossary</a> state settled fact:
  the ground a reader can trust as flatly true, kept internally consistent on purpose. The
  <a href="/star-rangers/codex/">Codex</a> makes a narrower promise. Every codex document is written by a named
  person or office inside the world — an incident report, a hymn, a doctrinal working paper, a hagiography — and it
  is not canon. It is that source's account, and it may be partial, self-serving, devotional, or simply wrong. What
  it must be is <em>true to whoever wrote it</em>: something that person could have known, written the way they
  would have written it. Where the record contradicts itself, the contradiction is filed in the Codex under
  somebody's name rather than smoothed out of the Lore.
</p>

<h2>About the site itself</h2>
<p>
  For who writes it, how it is built, and what you may do with it, see
  <a href="/star-rangers/about/">About</a> — which also carries the
  <a href="/star-rangers/about/#fan-works">fan works policy</a> and the licence terms for the story and the engine
  behind it.
</p>
