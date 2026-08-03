---
layout: base.njk
title: "Home"
description: "Drithane — an interactive science-fantasy novel grounded in speculative cosmology. One canonical history across the Five Layers, multiple Concordants, and multiple points of view."
---
{%- set heroCharacters = collections.characters | charactersByIds(edition.heroCharacterIds) -%}
<section class="home-hero">
  {#- The slideshow is per-edition (lib/editions.js) AND per-deploy: its cast is
      resolved against the FILTERED characters collection, so a narrowed clone
      (deploy.conf's CHARACTERS/TOPICS/THREADS) can drop some hero characters -
      or, if none of the edition's ids survive its filter, all of them. That
      last case used to render nothing at all, leaving the one page every reader
      lands on first with no image on it. The site's own fallback hero stands in
      instead; it is the same file this page already advertises as its
      og:image, so a card and the page now agree. -#}
  {%- if heroCharacters.length %}
  <div class="home-hero__slideshow home-hero__slideshow--n{{ heroCharacters.length }}" aria-hidden="true">{% for character in heroCharacters %}
    <img class="home-hero__slide" src="/star-rangers/images/characters/{{ character.data.image }}" alt="" />{% endfor %}
  </div>
  {%- else %}
  <img class="page-hero-image" src="/star-rangers{{ ogImage }}" alt="{{ ogImageAlt }}" />
  {%- endif %}
  <h1 class="home-hero__title">✦ {{ site.name }}</h1>
  <p class="home-hero__subtitle">
    {{ edition.heroSubtitle | safe }}
    {% if latestLore %} Newest from the record: <a href="/star-rangers{{ latestLore.url }}">{{ latestLore.title }}</a> — {{ latestLore.excerpt }}{% endif %}
  </p>
  <a class="home-hero__cta" href="/star-rangers/seasons/">Begin Reading</a>
</section>

<section aria-label="Site sections">
  <div class="home-sections">
    <a class="home-card" href="/star-rangers/seasons/">
      <span class="home-card__icon" aria-hidden="true">📖</span>
      <h2 class="home-card__title">Seasons &amp; Episodes</h2>
      <p class="home-card__desc">Start with the chapters, then switch viewpoints to see how one canon event is remembered, defended, or denied.</p>
    </a>
    <a class="home-card" href="/star-rangers/characters/">
      <span class="home-card__icon" aria-hidden="true">🧑‍🚀</span>
      <h2 class="home-card__title">Characters</h2>
      <p class="home-card__desc">Meet the officers, constructs, and beings—human and otherwise—whose loyalties keep the frontier intact—or break it.</p>
    </a>
    <a class="home-card" href="/star-rangers/timeline/">
      <span class="home-card__icon" aria-hidden="true">🕰</span>
      <h2 class="home-card__title">Timeline</h2>
      <p class="home-card__desc">Read the fixed sequence of events first. Then trace how later testimony argues over what those events mean.</p>
    </a>
    <a class="home-card" href="/star-rangers/lore/">
      <span class="home-card__icon" aria-hidden="true">🌌</span>
      <h2 class="home-card__title">Lore</h2>
      <p class="home-card__desc">{% if latestLore %}{{ latestLore.excerpt }}{% else %}Map the layers of reality, from history and factions to species, technology, and the cosmology behind them all.{% endif %}</p>
    </a>
    <a class="home-card" href="/star-rangers/glossary/">
      <span class="home-card__icon" aria-hidden="true">📚</span>
      <h2 class="home-card__title">Glossary</h2>
      <p class="home-card__desc">Fix the terms before the arguments begin: institutions, phenomena, titles, and names from across the record.</p>
    </a>
    <a class="home-card" href="/star-rangers/codex/">
      <span class="home-card__icon" aria-hidden="true">🗂</span>
      <h2 class="home-card__title">Codex</h2>
      <p class="home-card__desc">Open the raw paperwork—logs, directives, and archive notes—where memory and authority collide line by line.</p>
    </a>
  </div>
</section>

<section id="license" aria-label="License">
  <h2>Licence</h2>
  <p>Copyright © {{ build.copyrightYears }} Dermot R. Cochran. Some rights reserved.</p>
  <p>
    The text and world-building content of <em>Drithane</em> is licensed under the
    <strong>Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International</strong>
    (<strong>CC BY-NC-ND 4.0</strong>) licence. You are free to share this material — copy and
    redistribute it in any medium or format — for non-commercial purposes only, provided you give
    appropriate credit to Dermot R. Cochran, indicate if any changes were made, and do not
    distribute adapted or derivative versions of the work — with one standing exception:
    non-commercial fan works (fan fiction, fan art, and fan fiction clones of this site) are
    explicitly welcome. See the <a href="/star-rangers/about/">About page</a> and the
    repository's <code>CONTENT-LICENSE.md</code> for the details and conditions.
  </p>
  <p>
    The Eleventy site engine and deployment tooling behind this site are licensed separately,
    under the permissive <strong>MIT</strong> licence — see the
    <a href="https://github.com/dermot-r-cochran/star-rangers">GitHub repository</a> for details.
  </p>
  <details>
    <summary>Full licence text (CC BY-NC-ND 4.0)</summary>
    <h3>Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International Public License</h3>
    <p>
      Creative Commons Corporation ("Creative Commons") is not a law firm and does not provide
      legal services or legal advice. Distribution of Creative Commons public licenses does not
      create a lawyer-client or other relationship. Creative Commons makes its licenses and related
      information available on an "as-is" basis. Creative Commons gives no warranties regarding its
      licenses, any material licensed under their terms and conditions, or any related information.
      Creative Commons disclaims all liability for damages resulting from their use to the fullest
      extent possible.
    </p>
    <p>
      By exercising the Licensed Rights (defined below), You accept and agree to be bound by the
      terms and conditions of this Creative Commons Attribution-NonCommercial-NoDerivatives 4.0
      International Public License ("Public License"). To the extent this Public License may be
      interpreted as a contract, You are granted the Licensed Rights in consideration of Your
      acceptance of these terms and conditions, and the Licensor grants You such rights in
      consideration of benefits the Licensor receives from making the Licensed Material available
      under these terms and conditions.
    </p>
    <h4>Section 1 — Definitions</h4>
    <ol type="a">
      <li><strong>Adapted Material</strong> means material subject to Copyright and Similar Rights that is derived from or based upon the Licensed Material and in which the Licensed Material is translated, altered, arranged, transformed, or otherwise modified in a manner requiring permission under the Copyright and Similar Rights held by the Licensor.</li>
      <li><strong>Copyright and Similar Rights</strong> means copyright and/or similar rights closely related to copyright including, without limitation, performance, broadcast, sound recording, and Sui Generis Database Rights, without regard to how the rights are labelled or categorised.</li>
      <li><strong>Effective Technological Measures</strong> means those measures that, in the absence of proper authority, may not be circumvented under laws fulfilling obligations under Article 11 of the WIPO Copyright Treaty adopted on December 20, 1996, and/or similar international agreements.</li>
      <li><strong>Exceptions and Limitations</strong> means fair use, fair dealing, and/or any other exception or limitation to Copyright and Similar Rights that applies to Your use of the Licensed Material.</li>
      <li><strong>Licensed Material</strong> means the artistic or literary work, database, or other material to which the Licensor applied this Public License.</li>
      <li><strong>Licensed Rights</strong> means the rights granted to You subject to the terms and conditions of this Public License, limited to all Copyright and Similar Rights that apply to Your use of the Licensed Material and that the Licensor has authority to license.</li>
      <li><strong>Licensor</strong> means the individual(s) or entity(ies) granting rights under this Public License.</li>
      <li><strong>NonCommercial</strong> means not primarily intended for or directed towards commercial advantage or monetary compensation.</li>
      <li><strong>Share</strong> means to provide material to the public by any means or process that requires permission under the Licensed Rights, such as reproduction, public display, public performance, distribution, dissemination, communication, or importation.</li>
      <li><strong>Sui Generis Database Rights</strong> means rights other than copyright resulting from Directive 96/9/EC of the European Parliament and of the Council of 11 March 1996 on the legal protection of databases, as amended and/or succeeded.</li>
      <li><strong>You</strong> means the individual or entity exercising the Licensed Rights under this Public License.</li>
    </ol>
    <h4>Section 2 — Scope</h4>
    <p><strong>Licence grant.</strong> Subject to the terms and conditions of this Public License, the Licensor grants You a worldwide, royalty-free, non-sublicensable, non-exclusive, irrevocable licence to:</p>
    <ol type="a">
      <li>reproduce and Share the Licensed Material, in whole or in part, for NonCommercial purposes only; and</li>
      <li>produce and reproduce, but not Share, Adapted Material for NonCommercial purposes only.</li>
    </ol>
    <p><strong>Other rights.</strong> Moral rights are not licensed under this Public License. Patent and trademark rights are not licensed under this Public License. To the extent possible, the Licensor waives any right to collect royalties for NonCommercial exercise of the Licensed Rights.</p>
    <h4>Section 3 — Licence Conditions</h4>
    <p>Your exercise of the Licensed Rights is expressly made subject to the following conditions.</p>
    <p><strong>Attribution.</strong> If You Share the Licensed Material, You must:</p>
    <ol type="a">
      <li>retain identification of the creator(s) of the Licensed Material (Dermot R. Cochran), a copyright notice, a notice referring to this Public License, a disclaimer of warranties, and a URI or hyperlink to the Licensed Material to the extent reasonably practicable;</li>
      <li>indicate if You modified the Licensed Material and retain an indication of any previous modifications; and</li>
      <li>indicate the Licensed Material is licensed under this Public License and include the text of, or the URI or hyperlink to, this Public License.</li>
    </ol>
    <p>For the avoidance of doubt, You do not have permission under this Public License to Share Adapted Material.</p>
    <h4>Section 4 — Sui Generis Database Rights</h4>
    <p>Where the Licensed Rights include Sui Generis Database Rights, the Licensor grants the right to extract, reuse, reproduce, and Share all or a substantial portion of the contents of the database for NonCommercial purposes only, provided You do not Share Adapted Material.</p>
    <h4>Section 5 — Disclaimer of Warranties and Limitation of Liability</h4>
    <p>
      UNLESS OTHERWISE SEPARATELY UNDERTAKEN BY THE LICENSOR, TO THE EXTENT POSSIBLE, THE LICENSOR
      OFFERS THE LICENSED MATERIAL AS-IS AND AS-AVAILABLE, AND MAKES NO REPRESENTATIONS OR WARRANTIES
      OF ANY KIND CONCERNING THE LICENSED MATERIAL, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHER.
      WHERE DISCLAIMERS OF WARRANTIES ARE NOT ALLOWED IN FULL OR IN PART, THIS DISCLAIMER MAY NOT
      APPLY TO YOU.
    </p>
    <p>
      TO THE EXTENT POSSIBLE, IN NO EVENT WILL THE LICENSOR BE LIABLE TO YOU ON ANY LEGAL THEORY
      FOR ANY LOSSES, COSTS, EXPENSES, OR DAMAGES ARISING OUT OF THIS PUBLIC LICENSE OR USE OF THE
      LICENSED MATERIAL. WHERE A LIMITATION OF LIABILITY IS NOT ALLOWED IN FULL OR IN PART, THIS
      LIMITATION MAY NOT APPLY TO YOU.
    </p>
    <h4>Section 6 — Term and Termination</h4>
    <p>
      This Public License applies for the term of the Copyright and Similar Rights licensed here.
      If You fail to comply with this Public License, then Your rights under this Public License
      terminate automatically, but reinstate automatically once the violation is cured within 30
      days of discovery, or upon express reinstatement by the Licensor.
    </p>
    <h4>Sections 7 &amp; 8 — Other Terms and Interpretation</h4>
    <p>
      The Licensor is not bound by any additional or different terms unless expressly agreed.
      If any provision of this Public License is deemed unenforceable it shall be automatically
      reformed to the minimum extent necessary to make it enforceable. No term or condition will be
      waived unless expressly agreed to by the Licensor.
    </p>
    <p>
      Creative Commons is not a party to this Public License.
      Creative Commons may be contacted at <a href="https://creativecommons.org">creativecommons.org</a>.
    </p>
  </details>
</section>
