---
layout: base.njk
title: "Glossary"
eleventyComputed:
  description: "Definitions of every term, name, and concept used in {{ site.name }}."
---
<img class="page-hero-image" src="/star-rangers/images/hero/glossary-book.jpg" alt="An open old book" />
<h1 class="page-title">Glossary</h1>
<p class="page-intro">
  Words fail first when a frontier starts to slip. This glossary fixes the terms used across the record. If a term carries rival meanings in-universe, the confirmed canonical sense appears first.
</p>

{% set terms = collections.glossary %}
{% if terms.length %}
<nav class="glossary-alpha" aria-label="Alphabetical index">
  {% set letters = [] %}
  {% for term in terms %}
    {% set firstLetter = term.data.title | glossaryAlphaLetter %}
    {% if firstLetter not in letters %}
      {% set letters = letters.concat([firstLetter]) %}
      <a href="#letter-{{ firstLetter }}">{{ firstLetter }}</a>
    {% endif %}
  {% endfor %}
</nav>

<dl class="glossary-list">
  {% set currentLetter = "" %}
  {% for term in terms %}
    {% set firstLetter = term.data.title | glossaryAlphaLetter %}
    {% if firstLetter != currentLetter %}
      {% set currentLetter = firstLetter %}
      <div class="glossary-letter-anchor" id="letter-{{ currentLetter }}">
        <h2 class="glossary-letter">{{ currentLetter }}</h2>
      </div>
    {% endif %}
    <div class="glossary-list__item">
      <dt class="glossary-list__term">
        <a href="/star-rangers{{ term.url }}">{{ term.data.title }}</a>
        {% if term.data.category %}
        <span class="character-badge" style="margin-left:0.5rem">{{ term.data.category }}</span>
        {% endif %}
      </dt>
      {% if term.data.short %}
      <dd class="glossary-list__def">{{ term.data.short }}</dd>
      {% endif %}
    </div>
  {% endfor %}
</dl>
{% else %}
<p class="page-intro">No glossary entries published yet.</p>
{% endif %}
