---
layout: base.njk
title: "Codex"
eleventyComputed:
  description: "In-universe documents, edicts, logs, and annotated records from {{ site.name }}."
---
<img class="page-hero-image" src="/star-rangers/images/hero/codex-documents.jpg" alt="A stack of official documents in files" />
<h1 class="page-title">Codex</h1>
<p class="page-intro">
  A logbook, an edict, a clipped archive note—this is where the world speaks in its own paperwork. These are primary sources. Read them closely, because some are incomplete, biased, or built to mislead.
</p>

{% set codexEntries = collections.codex %}
{% if codexEntries.length %}
<div class="codex-grid">
{% for entry in codexEntries %}
<a class="codex-card" href="/star-rangers{{ entry.url }}">
{% if entry.data.image %}
<img class="codex-card__thumb" src="/star-rangers/images/codex/{{ entry.data.image }}" alt="{{ entry.data.image_alt | default(entry.data.title) }}" />
{% endif %}
{% if entry.data.category %}
<p class="codex-card__category">{{ entry.data.category }}</p>
{% endif %}
<h2 class="codex-card__title">{{ entry.data.title }}</h2>
{% if entry.data.institution %}
<p class="codex-card__institution">{{ entry.data.institution }}</p>
{% endif %}
</a>
{% endfor %}
</div>
{% else %}
<p class="page-intro">No codex entries published yet.</p>
{% endif %}
