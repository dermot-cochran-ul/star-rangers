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
- `src/glossary/telearch.md`: Telearchs "**coordinate responses**."

These predate the timeless doctrine. Options: (a) add one clarifying sentence to
the "Creation, Not Command" section — e.g. a timeless stratum's "activity"
*manifests in* time as lawful correction without being a sequence of events *for*
the stratum (the river-and-banks reading, extended); (b) re-attribute the
Etheric-layer maintenance work in `physics-comparison.md` downward to Mediarchs
and Celestials, who are nearer the temporal threshold (Mediarchs) or inside it
(Celestials). Note `physics-comparison.md` predates the Mediarch tier entirely and
never mentions it — force/entropy maintenance is arguably now Mediarch work by
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
  Cascade, migration guide) agree, Mediarchs included.
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

---

## Resolutions (applied 2026-07-24, same day)

- **#1 — fixed (option a):** both passages reworded to "a little over a century";
  the Jehu comparison now notes the span is "almost exactly the four generations
  the captain's house was granted," which sharpens rather than weakens it.
- **#2 — resolved (Dermot's ruling):** the Solar System Concordant is a
  **standards compact founded 2543 UCSD with the Tycho Accords** — not a
  government; the continuing body of shared civil law (personhood, AI, cyborg,
  navigation) that every regime since has enforced and none has owned. New lore
  entry `src/lore/solar-system-concordant.md`; three-senses disambiguation added
  to `glossary/concordant.md`; first mention in `ai-safety-kernel.md` now links.
  **Superseded 2026-07-28 — the name went instead of the disambiguation.** Keeping
  the borrowed word meant keeping the ambiguity and managing it in prose forever,
  which is the thing the canonical glossary exists to stop. The compact is now the
  **Solar System Concord**, restyled in-universe in 2790 UCSD; the entry moved to
  `src/lore/solar-system-concord.md`, and *Concordant* is once again the zone and
  nothing else. Pre-2790 documents keep the founding name by date rather than by
  exception — the 2723 charter preamble in `formation-of-star-rangers.md` is the
  one such instance in the corpus, and is deliberate.
- **#3 — fixed (both options):** clarifying "corollary for readers of the
  operational record" paragraph added to Creation, Not Command (timeless mandates
  manifest in time without being events for the stratum); `physics-comparison.md`
  maintenance re-attributed to Mediarchs/Celestials/Levrils inside
  timeless-defined mandates.
- **#4 — fixed:** "decades before" in the Twelve Sultans entry; Veritas
  commission now explicitly "nearly a century and a half after the guns went
  quiet," with the delay motivated (records readable without the war's politics).

## Addendum: Copilot-legacy pass (2026-07-24, per Dermot's request)

Dermot's verdict on the baseline tools: "almost nothing else from Sudowrite or
Copilot can be safely reused." Swept the six files whose last commit was the
Copilot bot. Findings and actions:

- `glossary/ftl-mechanics.md` — **rewritten.** Out-of-character register ("not
  canon-valid" — a fourth-wall leak in an in-universe glossary); now in house
  voice with a worked example. Substance unchanged: two lawful channels only.
- `timeline/2340-usc-sssa-established.md` — **two canon errors fixed.** (1) USIS
  "maintained independence through the Coherence Wars" 163 years before they
  began → now the 2130s–40s CE climate-crisis/coastal-fragmentation decades,
  which land immediately before the USC's founding and fit the SSSA's
  independence story better anyway. (2) "UCSD is anchored to the USC's founding"
  is flatly contradicted by `universal-cosmic-stardate.md` (UCSD = CE + 200,
  epoch kept, count renamed) → replaced with the correct fact, framed as a
  misreading the Archive corrects in print.
- `timeline/pre-usc-cable-warden-programme.md` — **mixed-era dates labeled.**
  The entry quoted bare years in two different reckonings in one sentence.
  All years now labeled CE with UCSD equivalents, consistent with
  `subsea-cable-drones.md` (founding ~2041 CE, releases 2190–2280 CE, final
  tranche 2724 UCSD). Undefined "Phase A" periodization removed.
- `timeline/pre-usc-ul-standards-international.md` — **light touch.** The UL
  lineage and seven-century arithmetic verify correctly under CE+200; years now
  labeled, undefined "Phase A/B transition" timestamp replaced.
- `timeline/pre-usc-civilisation-comparison-codified.md` — **chronology
  impossibility fixed.** Was framed as pre-USC/USC-era scholarship analyzing the
  29th century (its own future) and "shaping" a 2340 charter with it. Reframed:
  two-era comparison is USC-era scholarship; the third column is a present-era
  extension; the SSSA *anticipated* the framework's conclusion in practice and
  is cited by it retrospectively. Founding-mandate bullet corrected to match.
  (Filename's "pre-usc-" prefix left as-is to preserve the URL.)
- `timeline/year-0-survey-team-arrives.md` — **clean.** Content verifies against
  year-zero lore and the S01 chapters; dry register suits a timeline stub.

**New convention surfaced by this pass, now applied:** bare pre-spaceflight
years in the pre-USC cluster are CE; institutional-era years are UCSD; where
both appear, label both (per `universal-cosmic-stardate.md`'s CE+200 rule).
`subsea-cable-drones.md` and `crisis-centuries-terran-wildlife.md` still use
bare CE years internally consistent with this reading — fine as-is, but any
future edit touching them should add labels.
