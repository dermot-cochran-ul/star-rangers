---
layout: base.njk
title: "Characters"
description: "Profiles of every named character, being, and entity in Drithane."
---
<img class="page-hero-image" src="/star-rangers/images/hero/characters-astronaut.jpg" alt="An astronaut in orbit near a space station" />
<h1 class="page-title">Characters</h1>
<p class="page-intro">
  These are the named lives inside the record: officers, civilians, constructs, beings, and entities whose choices keep the frontier functioning or force it to change. Species labels reflect canonical classification—not how characters name themselves or one another.
</p>

{% set chars = collections.characters %}
{% if chars.length %}
<div class="codex-grid">
  {% for char in chars %}
  <a class="codex-card" href="/star-rangers{{ char.url }}">
    {% if char.data.image %}
    <img class="codex-card__thumb" src="/star-rangers/images/characters/{{ char.data.image }}" alt="{{ char.data.image_alt | default(char.data.title) }}" />
    {% endif %}
    <p class="codex-card__category">{{ char.data.species | default("Unknown") }}{% if char.data.role %} · {{ char.data.role }}{% endif %}</p>
    <h2 class="codex-card__title">{{ char.data.title }}</h2>
    {% if char.data.aliases and char.data.aliases.length %}
    <p style="font-size:0.8rem;color:var(--color-text-muted);margin-top:0.25rem;font-family:var(--font-ui)">
      aka {{ char.data.aliases | join(", ") }}
    </p>
    {% endif %}
  </a>
  {% endfor %}
</div>
{% else %}
<p class="page-intro">No character profiles published yet.</p>
{% endif %}
