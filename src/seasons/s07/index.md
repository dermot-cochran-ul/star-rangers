---
layout: base.njk
title: "Season 7"
description: "Episodes and chapters in Season 7 of Drithane."
permalink: /seasons/s07/
---
<nav class="chapter-breadcrumb" aria-label="Season location">
  <ol class="breadcrumb" role="list">
    <li><a href="/star-rangers/seasons/">Seasons</a></li>
    <li aria-current="page">Season 7</li>
  </ol>
</nav>

<h1 class="page-title">Season 7</h1>
<p class="page-intro">
  Naming the Line. The climax is not a fight. It is Wender, Syra, and Shepherd — from inside, once contact holds — naming precisely what happened at Dock Seven, because precision is the only thing that starves a story kept open on purpose. What reaches Shepherd across the boundary is not a rescue and not a miracle: it reads, to every instrument pointed at it, as a levril — working strictly inside the limits its kind has always worked inside — and it echoes, without ever quite proving, the something a holy woman met at a thorn well eight centuries ago and was honest enough never to fully name. Season 7 follows what help looks like when nobody is allowed to decide what her story means except her.
</p>
<p class="thread-badge">Part of <a href="/star-rangers/threads/{{ (7 | threadForSeason).id }}/">{{ (7 | threadForSeason).name }}</a></p>

{% set seasonNumber = "7" %}
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
          <a href="/star-rangers/seasons/s07/e{{ chapter.data.episode | zeroPad }}/">Episode {{ chapter.data.episode }}</a>
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
