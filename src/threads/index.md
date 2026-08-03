---
layout: base.njk
title: "Storyline Threads"
eleventyComputed:
  description: "The independent storylines that group {{ site.name }}'s seasons — each thread is its own narrative, told in parallel with the others."
permalink: /threads/
---
<img class="page-hero-image" src="/star-rangers/images/hero/timeline-clock.jpg" alt="A vintage clock face" />
<h1 class="page-title">Storyline Threads</h1>
<p class="page-intro">
  A season number marks a position in the setting's timeline, not a shared protagonist. <em>{{ site.name }}</em> runs independent storylines in parallel — each thread below is a self-contained narrative with its own cast, gathering the seasons that carry it. See <a href="/star-rangers/seasons/">Seasons &amp; Episodes</a> to read chapter by chapter within a thread.
</p>

{% set threads = storylineThreads %}
{% if threads.length %}
<div class="codex-grid">
  {% for thread in threads %}
  <a class="codex-card" href="/star-rangers/threads/{{ thread.id }}/">
    <p class="codex-card__category">
      {% for season in thread.seasons %}Season {{ season }}{% if not loop.last %}, {% endif %}{% endfor %}
    </p>
    <h2 class="codex-card__title">{{ thread.name }}</h2>
    <p style="font-size:0.9rem;color:var(--color-text-muted);margin-top:0.5rem;font-family:var(--font-ui)">
      {{ thread.description }}
    </p>
  </a>
  {% endfor %}
</div>
{% else %}
<p class="page-intro">No storyline threads defined yet.</p>
{% endif %}
