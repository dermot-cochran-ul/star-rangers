---
layout: base.njk
title: "Undercover Pets"
description: "The Undercover Pets Detective Agency storyline thread — Smart Pets stationed exactly where nobody looks twice, and the paperwork that hides them in plain sight."
permalink: /threads/undercover-pets/
---
<nav class="chapter-breadcrumb" aria-label="Thread location">
  <ol class="breadcrumb" role="list">
    <li><a href="/star-rangers/threads/">Threads</a></li>
    <li aria-current="page">Undercover Pets</li>
  </ol>
</nav>

<h1 class="page-title">Undercover Pets</h1>
<p class="page-intro">
  The Undercover Pets Detective Agency stations <a href="/star-rangers/glossary/smart-pet/">Smart Pets</a> exactly where its own doctrine says they belong: in postings where nobody looks twice at a cat on a desk. A mascot gets left alone with the paperwork — and at Eden Space Habitat, the paperwork is the point. Agent <a href="/star-rangers/characters/agent-barsik/">Barsik</a> has read most of it first; trainee <a href="/star-rangers/characters/bubochka/">Bubochka</a> is learning to read a filed log for what a form's <em>absence</em> implies as much as for what it says.
</p>
<p class="page-intro">
  This is the thread of small warm things and what they notice — training exercises that look like sitting very still, working files on a specimen the record still cannot classify, and the animals the agency has no use for and has noticed anyway. It runs beneath the habitat's official policing, not against it: Superintendent <a href="/star-rangers/characters/rasa-oyelaran/">Oyelaran</a>'s bureau carries the caseload, and the agency's animals appear on her books as livestock, which is exactly the point.
</p>

{% set threadId = "undercover-pets" %}
{% set allChapters = collections.chapters %}
{% set multiSeason = (allChapters | seasonsInThread(threadId) | length) > 1 %}
{% set hasThreadChapters = false %}
{% set currentSeason = -1 %}
{% for chapter in allChapters %}
  {% if (chapter.data.season | threadForSeason).id == threadId %}
    {% if not hasThreadChapters %}{% set hasThreadChapters = true %}{% endif %}
    {% if chapter.data.season != currentSeason %}
      {% if currentSeason != -1 %}</ul></div>{% endif %}
      {% set currentSeason = chapter.data.season %}
      <div class="season-block">
        {% if multiSeason %}
        <h2 class="season-block__title">
          <a href="/star-rangers/seasons/s{{ currentSeason | zeroPad }}/">{{ currentSeason | seasonLabel }}</a>
        </h2>
        {% endif %}
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
{% if hasThreadChapters %}
  </ul></div>
{% else %}
  <p class="page-intro">No chapters published yet for this thread.</p>
{% endif %}
