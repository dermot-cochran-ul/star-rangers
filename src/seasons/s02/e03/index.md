---
layout: base.njk
title: "Episode 3"
eleventyComputed:
  description: "Chapters in Season 2, Episode 3 of {{ site.name }}."
permalink: /seasons/s02/e03/
---
<nav class="chapter-breadcrumb" aria-label="Episode location">
  <ol class="breadcrumb" role="list">
    <li><a href="/star-rangers/seasons/">Seasons</a></li>
    <li><a href="/star-rangers/seasons/s02/">Season 2</a></li>
    <li aria-current="page">Episode 3</li>
  </ol>
</nav>

<h1 class="page-title">Season 2 · Episode 3</h1>
<p class="page-intro">
  A Survey Corps follow-up team accepts Drithane's hospitality for a crossing night, and the delegation's
  manifest carries one courtesy animal — a trainee whose first off-station exercise is to learn how a world
  watches its own sky, and who finds that a cover which works by being ignored works differently on a planet
  where everyone looks twice.
</p>

{% set seasonNumber = "2" %}
{% set episodeNumber = "3" %}
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
