---
layout: base.njk
title: "Episode 1"
eleventyComputed:
  description: "Chapters in Season 9, Episode 1 of {{ site.name }}."
permalink: /seasons/s09/e01/
---
<nav class="chapter-breadcrumb" aria-label="Episode location">
  <ol class="breadcrumb" role="list">
    <li><a href="/star-rangers/seasons/">Seasons</a></li>
    <li><a href="/star-rangers/seasons/s09/">Season 9</a></li>
    <li aria-current="page">Episode 1</li>
  </ol>
</nav>

<h1 class="page-title">Season 9 · Episode 1</h1>
<p class="page-intro">
  The first posting. A Deputy arrives on the boundary watch with a service suffix, a kit list and no idea yet which of the things they were trained for will turn out to be the job.
</p>

{% set seasonNumber = "9" %}
{% set episodeNumber = "1" %}
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
