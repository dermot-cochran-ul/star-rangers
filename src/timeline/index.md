---
layout: base.njk
title: "Timeline"
description: "The canonical sequence of events in Drithane — one fixed history."
---
<img class="page-hero-image" src="/star-rangers/images/hero/timeline-clock.jpg" alt="A vintage clock face" />
<h1 class="page-title">Timeline</h1>
<p class="page-intro">
  This is the official sequence: what happened, when it happened, and where the record still holds. Chapters may dispute motive, memory, or meaning. This timeline keeps to confirmed fact first.
</p>

{% set events = collections.timelineEvents %}
{% if events.length %}
<div class="timeline" role="list" aria-label="Canonical timeline">
  {% for event in events %}
  <div class="timeline-event" role="listitem">
    <span class="timeline-event__time">{{ event.data.timestamp | default("Unknown") }}</span>
    <div class="timeline-event__content">
      <h2 class="timeline-event__title">
        <a href="/star-rangers{{ event.url }}" style="color:inherit;text-decoration:none;">{{ event.data.title }}</a>
      </h2>
      {% if event.data.summary %}
      <p class="timeline-event__desc">{{ event.data.summary }}</p>
      {% endif %}
    </div>
  </div>
  {% endfor %}
</div>
{% else %}
<p class="page-intro">No timeline events recorded yet.</p>
{% endif %}
