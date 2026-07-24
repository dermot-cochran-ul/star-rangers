# Canon Consistency Audit — 2026-07-24

Out-of-character working notes (like the prose-authorship audit). First systematic
sweep of the corpus for contradictions, terminology drift, chronology errors, and
link rot. Run against main at the close of the Cascade-expansion merge (PR #165),
302 content files.

**Method:** full-corpus grep sweeps against the migration guide's terminology law,
a link-integrity script over every internal `/star-rangers/...` href, extraction and
cross-checking of every UCSD date, and targeted reads of every file touching the
Cascade hierarchy, the governance-era sequence (USC → Imperium → MSC → SSDC/Rangers),
and dragon classification.

---

## 1. Hard contradiction — MSC lifespan (needs a decision)

The dated record fixes the MSC's span at **~114 years** (Imperium ends 2609
per `src/lore/the-imperium.md`; Consolidation Accords 2722 and Star Rangers
charter 2723 per `src/lore/formation-of-star-rangers.md` and the timeline).
`src/lore/the-imperium.md` itself agrees: "The Star Rangers, founded **a century
after** the Imperium's end."

Two files instead claim **two centuries**:

- `src/lore/military-space-command.md` (intro): "governing authority of the Solar
  System for approximately two centuries before the founding of the Star Rangers."
- `src/codex/jehu-among-the-comparanda.md` ("The Founder's Word"): "It was granted
  its span — some two centuries, where the captain's house was granted four
  generations."

**Not affected** (these measure Imperium's fall → the 2826 present, which *is*
~two centuries, and are correct): `ilse-korvain.md`, `the-unbroken-command.md`,
`the-imperium.md` closing paragraph.

**Fix options:** (a) minimal — reword both passages to "a little over a century"
(the Jehu comparison arguably *improves*: a shorter span sharpens the
four-generations parallel); (b) invasive — re-date the Imperium's end to ~2520s,
which contradicts the Tycho Accords date (2543) and is not recommended.

## 2. Undefined entity — the "Solar System Concordant" polity (needs a decision)

"Concordant" now carries a **third sense** in the corpus, unrecorded by the
glossary or migration guide: a **political entity** — "the Solar System
Concordant," "Concordant-wide personhood standards," "the Concordant period,"
"a Concordant ethics board." Found in 12 files (`ai-safety-kernel.md`,
`cyborg.md`, `plural-minds.md`, `smart-pet.md`, `jeeves.md`, `reeves.md`,
`arilon.md`, `formation-of-star-rangers.md`, `frontier-transformation-protocols.md`,
`military-space-command.md`, `saltmere.md`, `bramble-and-the-backwards-key.md`).

Two problems:

- **No lore entry or founding date exists** for the polity, despite it being the
  apparent present-day (2826) governing framework.
- **Chronology strain:** `ai-safety-kernel.md` has "the Concordant's post-war AI
  governance commission" producing the Veritas Report in **2689** and the Kernel
  Accords ratified in **2694** — squarely inside the MSC's governing era
  (2609–2722). Either the Concordant polity coexisted with (or contained) the MSC,
  or the Kernel material predates the institution it's attributed to. Nothing on
  record explains which.

**Recommendation:** a short lore entry (or a paragraph in an existing one) defining
the polity — name origin (presumably the Concordant Zone the Solar System sits in),
founding date, and relationship to the MSC/SSDC/Rangers sequence — plus one
disambiguation line in `glossary/concordant.md`. Until then, every reader (and
every future AI session) has to guess.

## 3. Doctrinal tension — timeless Telearchs doing time-flavored work

The new timelessness canon ("every stratum above the Celestials is timeless and
eternal; commands are temporal events") sits awkwardly against older passages that
give Telearchs ongoing, sequential activity:

- `src/lore/physics-comparison.md`: "Telearchs and Levrils perform **ongoing
  maintenance**" (l.26); "Telearchs **prevent** catastrophic entropy spirals"
  (l.103); "used by Telearchs for universe **diagnostics**" (l.148).
- `src/lore/cosmic-cascade.md` (Telearch effects): "**Delayed** but consistent
  correction of illegal cross-boundary manipulations."
- `src/glossary/telerarch.md`: Telearchs "**coordinate responses**."

These predate the timeless doctrine. Options: (a) add one clarifying sentence to
the "Creation, Not Command" section — e.g. a timeless stratum's "activity"
*manifests in* time as lawful correction without being a sequence of events *for*
the stratum (the river-and-banks reading, extended); (b) re-attribute the
Etheric-layer maintenance work in `physics-comparison.md` downward to Dynarchs
and Celestials, who are nearer the temporal threshold (Dynarchs) or inside it
(Celestials). Note `physics-comparison.md` predates the Dynarch tier entirely and
never mentions it — force/entropy maintenance is arguably now Dynarch work by
definition.

## 4. Soft chronology flags

- `src/lore/ai-safety-kernel.md`: the Veritas commission (2689) is called
  "post-war" but sits **146 years** after the Coherence Wars ended (2543).
  Possibly intentional (an institutional descriptor), but "retrospective" or a
  clause acknowledging the gap would read less like an error. Interacts with
  finding #2.
- `src/codex/the-twelve-sultans-of-ai.md`: "a full century before the last of the
  twelve Sultans left the record" — the gap from the wars' end (2543) to the
  Imperium's end (2609) is 66 years; "a full century" only works measured from the
  wars' start. Suggest "decades before." (This one is mine, from this week.)

## 5. Clean checks (verified, no action)

- **Link integrity:** 1,477 internal links across 315 files all resolve
  (26 apparent breaks are Nunjucks template placeholders, not real links).
- **Legacy terminology:** zero stragglers outside their defining/disambiguating
  files — "High(er) Celestials," "Grand Demiurge," "Holy Triumvirate,"
  "Telerarch" spelling, "plural Concordant," "Concordant-equivalent governance,"
  governance-sense "Concordant."
- **Hierarchy chain:** all three canonical renderings (lore Cascade, glossary
  Cascade, migration guide) agree, Dynarchs included.
- **Dragon classification:** every dragon reference corpus-wide correctly treats
  dragons as Levrils, never monsters (incl. `turquoise-dove.md`'s Higher
  Levril/Dragon rank distinction, used correctly).
- **Founding-era chronology:** 2712 (Eden fold route) → 2714 (Patience First) →
  2718 → 2719 (Consolidation Hearing) → 2722 (Accords) → 2723 (charter) —
  consistent across lore, codex, and timeline files.
- **Present-era anchor:** year 0 = 2826 UCSD; all year-minus-N timeline files,
  the 2826 archive-pass references (Sen, Redline Protocol), Korvain's 2819, and
  the Jehu filing (2831) are mutually consistent.
- **Governing-body ordinals:** USC "first" / MSC "third" consistent; Coherence
  Wars 2503–2543 ("forty years," "three billion dead") consistent across all
  quotations of the Krast line.

---

*Suggested order of attack: #1 is a two-file reword once you pick option (a) or
(b). #2 is the most load-bearing — it blocks clean reasoning about every
2680s–2820s institutional reference. #3 resolves with one paragraph of doctrine.
#4 are one-line rewords.*
