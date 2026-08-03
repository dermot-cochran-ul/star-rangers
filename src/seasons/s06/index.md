---
layout: base.njk
title: "Season 6"
eleventyComputed:
  description: "Episodes and chapters in Season 6 of {{ site.name }}."
permalink: /seasons/s06/
---
<nav class="chapter-breadcrumb" aria-label="Season location">
  <ol class="breadcrumb" role="list">
    <li><a href="/star-rangers/seasons/">Seasons</a></li>
    <li aria-current="page">Season 6</li>
  </ol>
</nav>

<h1 class="page-title">Season 6</h1>
<p class="page-intro">
  Threshold Station logs the Last Stand as a confirmed loss: boundary contained, one Line Captain unaccounted for. The Oversight Council wants a clean incident report and a hero's citation. High Captain Wender wants the version Shepherd would have accepted. And somewhere the station's instruments can register but not name, a stalled thing that used to be a person keeps generating a self out of the only material it has left. Season 6 follows what closes a file, and what refuses to.
</p>
<p class="thread-badge">Part of <a href="/star-rangers/threads/{{ (6 | threadForSeason).id }}/">{{ (6 | threadForSeason).name }}</a></p>

{% set seasonNumber = "6" %}
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
          <a href="/star-rangers/seasons/s06/e{{ chapter.data.episode | zeroPad }}/">Episode {{ chapter.data.episode }}</a>
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
