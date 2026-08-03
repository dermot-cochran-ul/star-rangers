---
layout: base.njk
title: "Season 2"
eleventyComputed:
  description: "Episodes and chapters in Season 2 of {{ site.name }}."
permalink: /seasons/s02/
---
<nav class="chapter-breadcrumb" aria-label="Season location">
  <ol class="breadcrumb" role="list">
    <li><a href="/star-rangers/seasons/">Seasons</a></li>
    <li aria-current="page">Season 2</li>
  </ol>
</nav>

<h1 class="page-title">Season 2</h1>
<p class="page-intro">
  Away from Threshold Station and the Marsh Causeway, the Orbital Habitats Compact runs its own ordinary business — until an "ordinary" referral turns out to need a task force built for exactly this. Season 2 follows Commander Kai Larsen's Orbital Five-O.
</p>
<p class="thread-badge">Part of <a href="/star-rangers/threads/{{ (2 | threadForSeason).id }}/">{{ (2 | threadForSeason).name }}</a></p>

{% set seasonNumber = "2" %}
{% set hasSeasonChapters = false %}
{% set currentEpisode = "" %}
{% for chapter in collections.chapters %}
  {% if (chapter.data.season ~ "") == seasonNumber %}
    {% if not hasSeasonChapters %}{% set hasSeasonChapters = true %}{% endif %}
    {% set episodeValue = chapter.data.episode ~ "" %}
    {% if episodeValue != currentEpisode %}
      {% if currentEpisode %}</ul></div>{% endif %}
      {% set currentEpisode = episodeValue %}
      <div class="season-block">
        <h2 class="season-block__title">
          <a href="/star-rangers/seasons/s02/e{{ chapter.data.episode | zeroPad }}/">Episode {{ chapter.data.episode }}</a>
        </h2>
        <ul class="chapter-list" role="list">
    {% endif %}
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
{% if hasSeasonChapters %}
  </ul></div>
{% else %}
  <p class="page-intro">No chapters published yet for this season.</p>
{% endif %}
