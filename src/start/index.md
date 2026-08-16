---
layout: base.njk
title: "Reading Plan"
eleventyComputed:
  description: "A guided path through {{ site.name }} — where to begin, how a chapter works, what to keep beside you, and where to branch out."
permalink: /start/
---
<img class="page-hero-image" src="/star-rangers/images/hero/home-launch.jpg" alt="A shuttle-style spacecraft climbing on a bright exhaust plume and billowing cloud, against a starfield with a blue-and-green crescent planet behind it" />
<h1 class="page-title">The Reading Plan</h1>
<p class="page-intro">
  <em>{{ site.name }}</em> is one canonical history told by many witnesses, and the site around it is a reference shelf, not a queue — you don't need any of the shelf before you begin. This page is the short version of how to read: start at the spine, learn how a chapter works, keep the glossary within reach, and branch out when a parallel storyline calls to you. Prefer to browse on your own terms? <a href="/star-rangers/seasons/">Seasons &amp; Episodes</a> lists every chapter.
</p>

{% set allChapters = collections.chapters %}
{% set spineFirst = null %}
{% for chapter in allChapters %}
  {% if not spineFirst and (chapter.data.season | threadForSeason).id == "tissadelle-arc" %}
    {% set spineFirst = chapter %}
  {% endif %}
{% endfor %}
{% if not spineFirst and allChapters.length %}{% set spineFirst = allChapters[0] %}{% endif %}

<section class="thread-section" aria-labelledby="plan-step-1">
  <h2 class="thread-section__title" id="plan-step-1">1 · Start with the spine</h2>
  <p class="thread-section__description">
    The <a href="/star-rangers/threads/tissadelle-arc/">Tissadelle Shepherd's Arc</a> is the chronological spine of the published series — Cadet to Principal to Line Captain to the Last Stand, and what the Last Stand leaves behind. Everything else on the site either runs parallel to it or is reference for it, so it is the right first read.
  </p>
  {% if spineFirst %}
  <p class="thread-section__description">
    Begin here. The <em>Next</em> link at the foot of each chapter walks the whole record in season order — which can hand you across to the parallel storylines where their seasons fall, and back to the spine after each. To stay with the spine alone, read down <a href="/star-rangers/threads/tissadelle-arc/">its thread page's chapter list</a> instead. Both paths are intended; neither spoils the other.
  </p>
  <ul class="chapter-list" role="list">
    <li class="chapter-list__item">
      <a href="/star-rangers{{ spineFirst.url }}">
        <span class="chapter-list__code">{{ spineFirst.data.id | upper }}</span>
        <span class="chapter-list__title">{{ spineFirst.data.title }}</span>
        {% if spineFirst.data.location %}
        <span class="chapter-list__loc">{{ spineFirst.data.location }}</span>
        {% endif %}
      </a>
    </li>
  </ul>
  {% else %}
  <p class="thread-section__description">
    This edition of the site carries no chapters from the spine — see <a href="/star-rangers/seasons/">Seasons &amp; Episodes</a> for what it does carry, and pick up the path at step 4.
  </p>
  {% endif %}
</section>

<section class="thread-section" aria-labelledby="plan-step-2">
  <h2 class="thread-section__title" id="plan-step-2">2 · Read a chapter the way it's built</h2>
  <p class="thread-section__description">
    A chapter shows one event through several characters' points of view, each withholding what the others supply. Read it straight through the first time. Then use the <em>View from</em> buttons at the top of the chapter to filter to a single character, or the <em>Read scene-by-scene</em> list at the bottom to hold one scene still and walk it through each witness in turn. Nothing is hidden from a straight read — the switching is there for when you want to know what a particular character actually saw.
  </p>
</section>

<section class="thread-section" aria-labelledby="plan-step-3">
  <h2 class="thread-section__title" id="plan-step-3">3 · Keep the reference shelf beside you</h2>
  <p class="thread-section__description">
    When a term, a place, or a name stops you, the shelf answers without spoiling what's ahead — and its sections don't all carry the same authority:
  </p>
  <ul class="thread-section__description">
    <li><a href="/star-rangers/glossary/">Glossary</a> — institutions, phenomena, titles, and names, fixed before the arguments begin. The fastest answer to "what is that?"</li>
    <li><a href="/star-rangers/lore/">Lore</a> — the record's settled voice: history, factions, species, technology, and the cosmology behind them. Ground you can trust as flatly true.</li>
    <li><a href="/star-rangers/characters/">Characters</a> — who's who, and whose eyes you've been reading through.</li>
    <li><a href="/star-rangers/atlas/">Atlas</a> — where everything is.</li>
    <li><a href="/star-rangers/codex/">Codex</a> — the world's own paperwork: primary sources with named authors, some incomplete, biased, or built to mislead. Read closely; unlike lore, a codex entry can be wrong.</li>
  </ul>
</section>

{% set branchThreads = [] %}
{% for thread in storylineThreads %}
  {% if thread.id != "tissadelle-arc" %}
    {% set firstInThread = null %}
    {% for chapter in allChapters %}
      {% if not firstInThread and (chapter.data.season | threadForSeason).id == thread.id %}
        {% set firstInThread = chapter %}
      {% endif %}
    {% endfor %}
    {% if firstInThread %}
      {% set branchThreads = (branchThreads.push({ thread: thread, first: firstInThread }), branchThreads) %}
    {% endif %}
  {% endif %}
{% endfor %}
{% if branchThreads.length %}
<section class="thread-section" aria-labelledby="plan-step-4">
  <h2 class="thread-section__title" id="plan-step-4">4 · Branch out by storyline</h2>
  <p class="thread-section__description">
    A season number marks a position in the setting's timeline, not a shared protagonist: the other <a href="/star-rangers/threads/">storyline threads</a> run in parallel to the spine, each self-contained with its own cast. Pick them up in any order, between seasons of the spine or after it.
  </p>
  {% for branch in branchThreads %}
  <div class="season-block">
    <h3 class="season-block__title">
      <a href="/star-rangers/threads/{{ branch.thread.id }}/">{{ branch.thread.name }}</a>
    </h3>
    <p class="thread-section__description">{{ branch.thread.description }}{% if branch.thread.id == "founding-era" %} As the prequel, it reads just as well before the spine as after its opening season.{% endif %}</p>
    <ul class="chapter-list" role="list">
      <li class="chapter-list__item">
        <a href="/star-rangers{{ branch.first.url }}">
          <span class="chapter-list__code">{{ branch.first.data.id | upper }}</span>
          <span class="chapter-list__title">{{ branch.first.data.title }}</span>
          {% if branch.first.data.location %}
          <span class="chapter-list__loc">{{ branch.first.data.location }}</span>
          {% endif %}
        </a>
      </li>
    </ul>
  </div>
  {% endfor %}
</section>
{% endif %}

<section class="thread-section" aria-labelledby="plan-step-5">
  <h2 class="thread-section__title" id="plan-step-5">5 · Go deeper into the record</h2>
  <p class="thread-section__description">
    Once the story has hold of you, the record argues with itself in the places built for it. The <a href="/star-rangers/timeline/">Timeline</a> keeps the official sequence — confirmed fact first, while chapters dispute motive, memory, and meaning. The <a href="/star-rangers/codex/">Codex</a> is where those disputes leave paperwork. And the <a href="/star-rangers/story-engine/">Story Engine</a> steps outside the world entirely: craft notes on how the record is built. New chapters arrive on the <a href="{{ '/feed/feed.xml' | absoluteUrl(site.url) }}">Atom feed</a>.
  </p>
</section>
