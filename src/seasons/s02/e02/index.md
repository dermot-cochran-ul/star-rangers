---
layout: base.njk
title: "Episode 2"
eleventyComputed:
  description: "Chapters in Season 2, Episode 2 of {{ site.name }}."
permalink: /seasons/s02/e02/
---
<nav class="chapter-breadcrumb" aria-label="Episode location">
  <ol class="breadcrumb" role="list">
    <li><a href="/star-rangers/seasons/">Seasons</a></li>
    <li><a href="/star-rangers/seasons/s02/">Season 2</a></li>
    <li aria-current="page">Episode 2</li>
  </ol>
</nav>

<h1 class="page-title">Season 2 · Episode 2</h1>
<p class="page-intro">
  While Five-O follows the crates to Halcyon, Eden's quieter anomaly goes up two chains at once: a corridor
  that won't agree with itself about its own length, a door the deck plans are maintained not to hold, and a
  Safety Corps rotation officer whose remit stops one noun short of the thing she can't resist doing.
</p>

{% set seasonNumber = "2" %}
{% set episodeNumber = "2" %}
{% set hasEpisodeChapters = false %}
<ul class="chapter-list" role="list">
{% for chapter in collections.chapters %}
  {% if (chapter.data.season ~ "") == seasonNumber and (chapter.data.episode ~ "") == episodeNumber %}
    {% if not hasEpisodeChapters %}{% set hasEpisodeChapters = true %}{% endif %}
    <li class="chapter-list__item">
      <a href="/star-rangers{{ chapter.url }}">
        <span class="chapter-list__code">{{ chapter.data.id | upper }}</span>
        <span class="chapter-list__title">{{ chapter.data.title }}</span>
        {% if chapter.data.location %}
        <span class="chapter-list__loc">{{ chapter.data.location }}</span>
        {% endif %}
      </a>
    </li>
  {% endif %}
{% endfor %}
</ul>
{% if not hasEpisodeChapters %}
  <p class="page-intro">No chapters published yet for this episode.</p>
{% endif %}
