# Images — conventions, open work, prompts

One living document for every image concern. **Replaces four overlapping notes**
(`image-audit-2026-07.md`, `portraits-needed.md`, `firefly-replacement-prompts.md`,
`manual-photo-edits.md`) that drifted out of sync with each other and with the
repo — two of their claims were found false on inspection, so they were retired
in favour of this. Planning note; not rendered on the site.

**Verify before trusting.** Anything here is a snapshot. Check the repo (or run
the commands in "Auditing" below) before acting on a status line, and correct
the line rather than working around it.

---

## Conventions

| | |
|---|---|
| Location | `src/images/<characters\|lore\|codex\|hero>/` |
| Lore & hero | ~1600px long edge, JPG quality ~85 |
| Character portraits | ~1200px long edge (real files vary widely; not enforced) |
| Codex entries | designed dark-gradient **title cards**, not photographs |
| `image_alt` | must describe what the file *actually shows* |

**House style for people:** role-appropriate, slightly cinematic, in-world
setting, professional wardrobe. Not contemporary glamour or lifestyle shoots.
**AIs and non-corporeal beings** get an abstract emblem/interface rather than a
face (precedent: Reeves = *"A laptop displaying a face-recognition hologram"*;
the Eden Warden = *"A facial recognition system interface"*).

**Tone line:** unsettling is fine, horror is not — hint at the dark fact rather
than depicting it. A cyber-revenant portrait showing exposed throat machinery
was rejected on exactly this line; the approved version sealed the collar and
left one silver seam at the temple.

**Art is illustrative; the prose is canon.** Lore images are impressions of a
place, not schematics of it, and they are allowed to be technically wrong where
the entry is right — `lore/the-imperium.jpg` is a real modern skyscraper
standing in for a monolithic tower, and the New London render (see Open work 4)
shows rings that could not rotate as drawn. When art and entry disagree, **the
entry wins and the art stays**: don't rewrite settled prose to match a picture,
and don't file the divergence as a defect. The one hard requirement is
unchanged — `image_alt` describes what the file actually shows, so an
impressionistic image gets impressionistic alt text rather than the spec.

### Tools

```powershell
.\scripts\import-image.ps1 -In "$env:USERPROFILE\Downloads\x.png" -Out src\images\characters\y.jpg -MaxEdge 1200
.\scripts\make-codex-cover.ps1 -TitleLines "TITLE","LINE TWO" -Category "SURVEY RECORDS" -Subtitle "..." -Institution "..." -Author "..." -Stamp "OFFICIAL" -Motif rules -Out src\images\codex\z.jpg
```

Codex covers go through the generator, never an image model — the font engine
spells correctly and image models do not. Motifs: `rules`, `dissolution`, `none`.

**Working through the Open-work prompts.** Two local authoring tools — not in
the build, not run by CI — that remove everything around the generating.
`scripts/image-prompts.js` reads the prompts out of *this file*;
`scripts/image-file.ps1` resizes and files the results.

**The generated path** (preferred — unattended):

```bash
export GEMINI_API_KEY=…                                  # aistudio.google.com/apikey
node scripts/image-prompts.js --generate --only arilon    # always try one first
node scripts/image-prompts.js --generate                  # then the rest
```
```powershell
.\scripts\image-file.ps1 -WhatIf                          # then file them
.\scripts\image-file.ps1 -Pick "lore-arilon=2"            # variation 2 for one of them
```

**The clipboard path**, for the one image worth nudging by hand in an app — a
browser will always beat an API for that:

```bash
node scripts/image-prompts.js --next     # next prompt -> clipboard, with its aspect ratio
```
*paste, generate, download — then `--next` again*
```powershell
.\scripts\image-file.ps1 -From "$env:USERPROFILE\Downloads" -WhatIf
```

**Why Gemini and not Firefly Services.** Adobe sells API access to Firefly as
an enterprise contract; the Developer Console disables it outright without the
entitlement (*"Your organization does not have a license to access this
API"*), and the Firefly app bundled with Creative Cloud has no multi-prompt
batch mode. Gemini sells the same class of model self-serve — and Nano Banana
is one of the models the Firefly app itself offers — so the unattended path is
available without an enterprise agreement. The key is gitignored and must stay
that way; this repo is public. See `scripts/gemini.local.json.sample`.

**This file stays the source of truth** — the scripts parse it and never write
to it, and there is deliberately no separate queue file to drift out of sync.
Edit a prompt here and re-run. An entry is picked up only if it is a bullet
naming a `` `file.jpg` `` in bold with the prompt in a blockquote under it,
which is how the nine generator title cards below exclude themselves without
being listed anywhere.

In the generated path there is nothing to pair: every image lands under a key
naming its target, and `-Pick` chooses the variation. In the clipboard path
pairing is **positional** — `--next` records the order it served, and
downloads are taken oldest-first — so **run `-WhatIf` first**: a re-roll you
saved twice, or a prompt you skipped, puts the pairing off by one from that
point on. `-Map` overrides any pair that is wrong.

### Settings the prompt text cannot set

- **Aspect ratio is a request field, not prose.** The orientation sentence at
  the end of each prompt does *not* drive it — in the Firefly app it is a
  dropdown defaulting to Auto, which will happily return a landscape portrait.
  The scripts set it from the prompt's stated orientation (3:4 portraits,
  16:9 lore, matching the four 1600×900 lore images already in the repo), and
  `--next` prints which to choose by hand.
- **Generate large.** `import-image.ps1` resizes on the way in (~1200px
  portraits, ~1600px lore), so 2K costs nothing and leaves room to crop. 4K
  only costs more.
- **Reference images** are the only lever for making a *set* look like a set —
  worth reaching for on the character portraits, where twelve separately
  generated faces otherwise share no house style. The Firefly app takes up to
  six; the scripts do not use them yet.
- **Model choice is a decision, not a default.** Models differ in what they
  are trained on and in the terms attached to their output, and these images
  publish on public domains under `CONTENT-LICENSE.md`.

Neither script writes front matter: `image_alt` describes what the file
*actually shows* and cannot be derived from the prompt that asked for it.
Neither merges anything — new portraits and lore images are the repo's *draft
it and stop* tier.

### Prompt craft (learned the hard way)

- **Name the sheen, not the substance.** "Stone-textured skin" for a Basaltborn
  produced a golem; describing basalt *iridescence* on chitin produced the
  character.
- **Ban lettering explicitly** ("no readable text, no insignia, plain unmarked
  folders") or you get gibberish name tapes — and once, an entire NYPD squad
  room with `NYC POLICE` case files.
- **State the era**, or the setting defaults to contemporary Earth.
- Small text artifacts can be fixed in-session with a targeted select-and-blur
  rather than a re-roll (worked on a garbled flight-suit name tape).

### Auditing

```bash
# alt text vs. front matter, all content types
grep -rn "image_alt" src/ --include="*.md"
```
```powershell
# every image's real dimensions
Add-Type -AssemblyName System.Drawing; Get-ChildItem src\images -Recurse -Include *.jpg,*.png | ForEach-Object { $i=[System.Drawing.Image]::FromFile($_.FullName); "{0,-52} {1}x{2}" -f $_.Name,$i.Width,$i.Height; $i.Dispose() }
```
To check whether an image matches its description, **read the file** — the July
2026 audit's one false finding came from reasoning about filenames instead.

---

## Open work

### 1. Missing portraits (11 pages)

None block a build — `character.njk` renders cleanly without an image. Prompts
below are ready to paste; add `image`/`image_alt` after generating.

**Humans**

- **`naomi-kestrel.jpg`** — junior field investigator, Eden Civil Investigations;
  reads telemetry, manifests and comm chatter "as one continuous sentence."
  > Cinematic portrait of a young woman analyst in a dim habitat operations room, upper body, focused expression lit by the glow of data readouts, practical dark uniform, science-fiction space-station interior, muted teal-and-amber palette, professional, no glamour styling. Portrait orientation.

- **`rosalind-vey.jpg`** — tactical specialist, Eden Civil Investigations;
  ex-habitat tactical response, treats a scene as a room that might still be dangerous.
  > Cinematic portrait of a composed woman in a practical tactical-response jumpsuit aboard a space habitat, upper body, alert and unbothered expression, subdued corridor lighting, science-fiction setting, desaturated palette, professional, no glamour styling. Portrait orientation.

- **`tamsin-reyes.jpg`** — undercover specialist; "whoever a room needs her to
  be," craft not instinct. Deliberately forgettable.
  > Cinematic portrait of a woman with a neutral, unreadable expression in understated civilian clothing, upper body, softly lit habitat interior, science-fiction setting, muted palette, deliberately ordinary and approachable rather than striking, professional, no glamour styling. Portrait orientation.

- **`lorien-the-wanderer.jpg`** — freelance survey-and-salvage captain of the
  *Restless Verge*; weathered but disciplined.
  > Cinematic portrait of a weathered independent starship captain, woman, upper body, wearing a worn flight jacket in the cockpit of a stripped-down long-range courier ship, self-reliant expression, warm instrument lighting, science-fiction frontier setting, gritty realistic palette, professional. Portrait orientation.

- **`osric-fenholt.jpg`** — Historical (2558–2621); Imperium-era Belt
  compliance clerk, "The Honest Man of the Directorate." Period, not modern.
  > Cinematic portrait of a plain, serious middle-aged male bureaucrat in a severe archaic administrative uniform of a fallen space empire, upper body, seated at a paperwork desk, unremarkable and precise demeanor, muted sepia-and-grey period palette, dim archival lighting, historical science-fiction, no heroism or grandeur. Portrait orientation.

- **`wendell-albercombe.jpg`** — Detective Inspector, Eden; carries the boring
  caseload, complains constantly, solves cases over dinner. Suits the noir register.
  > Cinematic noir portrait of a rumpled, world-weary male detective inspector in a slightly worn coat aboard a space habitat, upper body, tired but sharp expression, low-key dramatic lighting, science-fiction detective setting, desaturated palette, professional. Portrait orientation.

- **`asteria-the-sage.jpg`** — retired Star Captain, now leads a local
  Fellowship of Light chapter on a quiet planet. Deliberately spare page; a
  portrait should read as retirement, not command.
  > Cinematic portrait of a serene older woman in simple contemplative robes standing at the doorway of a modest stone chapter house on a quiet rural world, upper body, weathered and amused expression, soft overcast daylight, science-fiction pastoral setting, muted natural palette, dignified and unhurried, no uniform, no insignia. Portrait orientation.

- **`galen.jpg`** — Star Rangers liaison officer at a Celtic Union shuttle gate;
  minor character, correct and quietly decent.
  > Cinematic portrait of a mid-career Star Rangers liaison officer in a plain service uniform standing at a planetary shuttle gate, upper body, courteous professional expression, overcast daylight through a terminal window, science-fiction setting, muted palette, no insignia lettering. Portrait orientation.

**Alien**

- **`sethka-ru.jpg`** — Serephine Dunekin long-range scout. **Must read as
  clearly non-human** — light-scattering eye membranes, water-conservative
  build (the earlier mistake was a human in a headwrap).
  > Cinematic portrait of a non-human humanoid alien long-range scout, upper body, with pale nictitating light-scattering eye membranes and lean desert-adapted features, wearing lightweight respiratory filtration gear, alien science-fiction reconnaissance outfit, cold high-UV desert-world lighting, otherworldly palette, clearly extraterrestrial anatomy, professional concept-art style. Portrait orientation.

**AIs & non-corporeal — abstract emblem, no face**

- **`jeeves.jpg`** — domestic-companion AI, Eden; kitchen-and-gossip competence.
  > Abstract emblematic image representing a domestic household artificial intelligence: a warm stylized interface glyph over a tidy kitchen/hearth motif, soft ambient glow, minimalist science-fiction UI aesthetic, no human face, muted warm palette. Portrait orientation.

- **`reeves-eden.jpg`** — investigative-support AI, Eden bureau; same model as
  Threshold's Reeves, distinct enough to read as a separate deployment.
  > Abstract emblematic image of an investigative-support artificial intelligence: a holographic evidence-analysis interface and case-file glyphs projected above a terminal, cool blue science-fiction UI aesthetic, no human face, clean and analytical. Portrait orientation.

- **`turquoise-dove.jpg`** — a Higher Levril known only by the turquoise
  iridescence of her dimensional signature. A field signature, not a dragon.
  > Abstract ethereal image of a meta-dimensional presence known only by its harmonic signature: a gentle turquoise-and-verdigris iridescent field of light, coral-shallow blue-green tones, no defined creature shape, soft non-threatening luminosity, science-fiction otherworldly abstraction. Portrait orientation.

### 2. Lightroom / Photoshop — Dermot's hands only

No spot-heal, upscaler, or compositing exists in-session. Dimensions
re-measured 2026-07-24.

**The dust spot (priority).** `lore/archipelago-palm-avenue.jpg` (1600×1200) —
sensor-dust blemish in the sky at ~53% across, 40% down; the known main-body
Tamron artifact. Same heal recipe as the Kenya 2025 raws. Worth re-checking
other sky-heavy frames from that body while in there.

**Under-spec, needs Super Resolution** (content is correct, files are small):

| File | Current |
|---|---|
| `characters/tissadelle-shepherd.jpg` | 768×1022 — major character, do first |
| `characters/agent-barsik.jpg` | 512×1024 |
| `characters/bubochka.jpg`, `bubochka-alert.jpg` | 512×1024 |
| `characters/aldera/field-photo-03.jpg`, `-04.jpg` | 512×1120 |
| `lore/prismere-*` / `prismeri-*` — **11 files** | all 768×1152 |

The Prismere block is internally consistent; upscale all eleven or none, since
a half-upscaled series looks worse than a uniformly small one.

**Softness** — may be re-shoots rather than edits; sharpening only goes so far
on zoom-smear: `lore/highland-summit-snowfields.jpg`,
`lore/highland-rock-spires.jpg`, `lore/boirinn-uplands-waterfall.jpg` (all
zoom-smeared), `lore/moorhen-wetland.jpg` (mild motion blur on the bird). This
set now doubles as Órla Shepherd's home landscape, so it earns attention.

**Composite / crop** — `lore/highland-sentinel-lizard.jpg` (1168×880): creature
composited onto the same plate as `highland-rock-spires.jpg`; cutout edges are
visibly soft beside the plain version. Needs mask refinement plus a light
colour/grain match. `lore/noogenic-seeding-system.jpg` (1200×614): unusually
short and wide for a lore image; re-crop or regenerate.

**Verify then leave alone** — `lore/trigrian.jpg`: blown highlights on the three
suns, almost certainly intentional for a trinary-star world. Noted so a future
audit doesn't "fix" it.

**Your camera, not a generator** — `lore/saltvik.jpg` is still a plain text
card while its sibling Saltmere entries have two photographs each; the Knarr
Line's Nordic-heritage coastal world wants a real cold-coast frame.

### 3. Deferred by choice

- **The contemporary-stock-headshot cluster (13 files)** — flat studio
  backdrops, no in-world setting: `cormac-dubhghlas`, `dagny-voss`,
  `demelza-trevithick`, `dorian-calloway`, `fergus-aonghas`, `idris-bryneth`,
  `imogen-petrakis`, `niamh-o-ceallaigh`, `petra-voss`, `rhian-gwynne`,
  `rhiannon-ceridwen`, `sen`, `zara-wayland`. Three (`dagny-voss`,
  `imogen-petrakis`, `petra-voss`) lean toward the glamour look the house style
  rules out. Real style work, but a batch that size deserves its own session
  with Dermot choosing each face.
- **Flat title-card template used on humans** instead of portraits:
  `brother-fintan`, `dr-iona-vale`, `galahad-thorne`. Same template on aliens
  (`isren-farrowkin`, `mira-of-brine`, `sohrel`, `syra`) — internally
  consistent, but a third visual language beside the photo and emblem
  conventions.
- **Tonal outliers, deliberate:** `lore/planetary-liaisons-and-recruiters.jpg`
  (a "true crime" evidence board, matches its own alt text),
  `lore/the-imperium.jpg` (a real modern skyscraper standing in for a monolithic
  tower), the `prismere-*` series repeating one jellyfish/crystal-spire motif
  across distinct named locations.

### 4. New London Space Habitat — delivered, with two recorded defects (2026-07-26)

**Resolved.** `src/images/lore/new-london-space-habitat.jpg` landed in #177 and is
wired into the entry. This item is kept rather than deleted because the defects
below are known and accepted, and a future audit will otherwise re-flag them.

The render shows a horizontal ring carrying an open cityscape (a St Paul's-like
dome, a Westminster-style clock tower, Tower Bridge, parkland, a waterway with
boats), two further rings canted steeply across it, a tall central spire on
spokes, a Union-flag tram, and Earth and the Moon behind.

**Two generator defects, recorded not fixed** (full detail in
`firefly-prompts.md`):

1. **1408×768, under the ~1600px lore standard** — `eden-space-habitat.jpg` is
   1600×900 for comparison. Not upscaled: interpolation would add pixels, not
   detail, and the file is honest at its native size. Fix by regenerating larger
   if it ever matters.
2. **Garbled pseudo-text on the outer ring hull**, lower left and lower right —
   faint glyphs, low-contrast at full view. Add *text, lettering, signage,
   writing* to the negative prompt on any regeneration.

One accuracy point worth keeping: **Earth renders roughly four times the Moon's
apparent diameter, which is correct.** L4/L5 are equilateral points, so the
habitat sits one lunar distance from *both* bodies, and 12,742 km / 3,475 km
gives 3.67 — Earth ≈1.9° across, the Moon ≈0.52°. The render got this right.

**Dermot's ruling: the image is impressionist and not technically correct, and
that is fine.** Two known divergences from the entry, both accepted rather than
open questions:

- Three rings in *different planes* cannot all rotate about one axis for gravity.
  The entry's three co-rotating Stanford tori are the canon; the art is not a
  schematic of them.
- A Stanford torus interior is enclosed — the far side of the ring curves
  overhead rather than opening onto stars. The render's open city face is a
  visual choice.

Do **not** rewrite the entry's geometry to match a future image, and do not
treat these as errors to fix.

`image_alt` was rewritten after merge to describe what the render actually
shows — the landmarks especially, since a domed cathedral, a gothic clock tower
and a twin-towered bridge are the most distinctive thing in the frame and the
whole point of the habitat. The version that shipped in #177 named the location
("at Earth-Moon L5") and asserted motion ("turning"), neither of which a viewer
can see; per the standing rule, alt text describes the file, not the entry.

### 5. Missing lore illustrations (19 pages) — audited 2026-07-30

An unrecorded gap. Open work 1 covers character portraits; nothing here had ever
enumerated the **lore** entries with no `image` at all. Nineteen do (excluding
`lore/index.md` and the canonical-glossary reference doc, which has one). None
blocks a build — `lore-entry.njk` guards the image with `{% if image %}`.

**Two different jobs, and it matters which.** Nine of the nineteen are
institutions or factions and want a designed **title card**; the other ten are
places, phenomena, technology or cosmology and want a **generated image**.

> **Correction, 2026-07-30 — this section shipped with a false claim, now fixed.**
> It originally said the four existing lore cards (`cerebraun-hegemony`,
> `celtic-union-of-planets`, `orbital-habitats-compact`, `levrils`) were made
> with `scripts/make-codex-cover.ps1`, and named
> `federation-of-sentient-beings` and `united-space-consortium` alongside them
> as more of the same. **Both halves were wrong**, and the error came from
> reasoning about `image_alt` strings instead of opening the files — the exact
> failure this file already warns about two sections up. Reading them settles it:
>
> - The four cards are **1600×900 landscape**, individually tinted (Cerebraun's
>   is green-teal), and carry a device inside a ringed seal. `make-codex-cover.ps1`
>   emits **square 1600×1600** in one fixed blue palette and has no emblem motif
>   at all — only `rules`, `dissolution`, `none`. It cannot have produced them.
> - `federation-of-sentient-beings` (1200×1509) and `united-space-consortium`
>   (1200×800) are **photographs**, not cards.
>
> **The emblem-card recipe is therefore unrecorded and currently unreproducible.**
> All four landed in Release 1.7.0 (#187) with no entry in `image-prompts.md`,
> which is precisely the rule that file exists to enforce and precisely the
> failure mode the Prismere cluster prompted it over. A fifth card in the same
> family is referenced from `uniforms-and-insignia.md` ("a blue chevron insignia
> emblem in a ringed seal"). **Recovering or re-deriving that recipe is open
> work in its own right** — see the note at the end of this section.

So the split below is *descriptive of what can be built today*, not a claim about
how the shipped cards were built:

- **Institutions and factions → generator title cards** via
  `scripts/make-lore-cards.ps1` (a batch driver over `make-codex-cover.ps1`,
  added 2026-07-30, nine cards in one command). The generator letters text with
  a font engine, so titles come out sharp and correctly spelled — which an image
  model cannot be trusted to do. **These will read as codex-style cards, not
  like the four 1.7.0 lore cards**, and that inconsistency is unresolved: it is
  Dermot's call whether to accept it, extend the generator with a
  landscape/emblem mode first, or drop the batch.
- **Places, phenomena, technology and cosmology → generated images**, prompts
  below.

Prompts are written to the standing rules: era stated, lettering banned, sheen
named rather than substance, unsettling permitted and horror not. Add
`image`/`image_alt` after generating, and per "Alt text is the prompt of record"
above, write the alt text from what the file actually shows rather than pasting
the prompt back in. For a title card that means describing the card's layout and
text, not the prose of the entry it fronts.

**Title cards (generator, not image model)**

Nine pages. The table lives in `scripts/make-lore-cards.ps1` rather than here, so
there is one copy of it and it is the copy that runs; `-List` prints it. Notes
below cover only the choices that needed a reason. Two constraints learned from
reading the generator: subtitles are **not** auto-fitted (only titles are), so
keep them under ~34 characters; and `Institution`/`Author` are left empty on
every row, because codex covers carry them for a named in-universe source and
lore is the Archive's own voice with no author to name.

Only three rows involved a judgement worth recording:

- `the-institute.jpg` — motif `dissolution` rather than `rules`, because the
  entry's stance is that nothing has been established beyond the disagreement
  between instruments. The fading ring says that; ruled lines say the opposite.
- `hyperfold-yield-combine.jpg` — the one row with a `Stamp`, and it reads
  `DISSOLVED` rather than anything accusatory. Reading as a lawful trading
  entity is the entry's whole point: everything about the Combine was licensed
  right up to the moment it was destroyed. The stamp records its end, not a
  verdict on it.
- `habitat-threshold.jpg` — the weakest candidate of the nine. A charter
  population line is abstract even for a title card, and deferring it is a
  defensible outcome; it is in the batch because the card costs nothing to
  generate and can be dropped after looking at it.

The other six are straightforward: title, category, a subtitle under the length
limit, `rules`.

**Still open after this: the emblem-card recipe.** Nothing here recovers how the
four 1.7.0 lore cards were made, and until that is settled the corpus has two
visual languages for the same job — those four in landscape with a ringed seal,
and anything `make-lore-cards.ps1` produces in square codex style. Three ways
out, none of them started: find the original tool or prompt and record it in
`image-prompts.md` at last; extend `make-codex-cover.ps1` with `-Aspect`,
palette and an emblem/seal motif so one generator covers both looks (note that
every positioning constant in it is tuned for 1600×1600, so this is more than a
parameter); or accept the codex look for lore and treat the four as legacy.
Worth deciding before generating nine cards, not after.

**Generated images (ten pages)**

- **`arilon.jpg`** — not a person: the Fellowship's comparative-archive name for
  a recurring pattern (a witness who names a boundary truth, is discredited, and
  is vindicated only after departing). Must **not** read as a portrait of one
  figure, which is the whole misreading the entry exists to prevent.
  > Abstract archival composition suggesting many separate accounts of the same recurring figure: overlapping translucent layers of indistinct robed silhouettes at different scales, none in focus and none dominant, receding into a pale ground, no face resolvable, muted parchment and grey-blue palette, contemplative rather than mystical, no readable text or lettering of any kind, science-fiction archive aesthetic. Landscape orientation.

- **`ascent-javelins.jpg`** — winged craft launched near-vertically, almost like
  a missile, surface to orbit. State the era or this defaults to a Shuttle photo.
  > A slender winged orbital ascent craft climbing near-vertically from a planetary launch cradle into high thin atmosphere, seen from below and behind, exhaust plume tight and blue-white, distant curve of the horizon already visible above, far-future science-fiction spaceport infrastructure on the ground beneath, cold clear daylight, functional engineering aesthetic rather than sleek styling, no readable markings or insignia lettering. Landscape orientation.

- **`embodied-cognition.jpg`** — a small embodied mind resolving what a vast
  systems mind cannot; the doctrine is to *pair* them, so the image should show
  both scales in one frame rather than choosing.
  > A small utilitarian analytical robot chassis with one manipulator resting flat against a corridor bulkhead, foreground and sharply lit; behind and above it the vast dim architecture of a station management intelligence rendered as banks of quiet data surfaces stretching out of focus, far-future science-fiction interior, cool blue ambient glow against one warm working light on the robot, no human figures, no face, no readable text or labels. Landscape orientation.

- **`membrane-shadows.jpg`** — gravitational bleed-through: a full, edge-lit
  person-shaped silhouette cast by a mass that never crossed over. **Tone line
  applies hard here** — this must read as an unexplained physical imprint, not a
  threat approaching. Nothing is coming through.
  > A tall humanoid silhouette standing in a boundary-observation chamber, rendered as an absence of light rather than an object — edges cleanly lit from behind, interior featureless and without detail, the shape casting no reflection and disturbing no dust, calm instrument-lit far-future science-fiction interior, cold blue-grey palette, still and unremarkable rather than menacing, no face, no eyes, no readable text. Landscape orientation.

- **`the-fusion-ceiling.jpg`** — fusion is the top of the lawful energy ladder,
  and the frontier caveat is the interesting half: a rationed imported core
  running a water plant beside hand tools and draft animals. That contrast is a
  better image than a reactor hall, and it is the thing observers misread as
  poverty when it is sequencing.
  > A compact sealed fusion power core on a concrete pad at the edge of an early frontier settlement, humming and immaculate, cables running to a modest water-treatment building; in the same frame, hand tools leaning against a fence and a working draft animal in a muddy paddock, low sun, far-future science-fiction colony at an early stage of buildout, muted earth palette, dignified and matter-of-fact rather than impoverished, no readable signage or lettering. Landscape orientation.

- **`who-governs-a-universe.jpg`** — a map, not a place: primary universe versus
  the Concordant Zones inside it, and three kinds of authority.
  > Abstract diagrammatic cosmological illustration: one large luminous bounded volume containing several nested translucent regions of differing tint, with three distinct tiers of influence indicated by scale and elevation rather than by arrows or labels, dark field beyond, restrained gold-and-indigo palette, clean and schematic rather than nebulous, no readable text, numbers, or lettering anywhere. Landscape orientation.

- **`things-that-are-made.jpg`** — church-space overlay. The entry's argument is
  that the Archive uses the language of authorship and then disclaims the author.
  Avoid religious iconography; the register is *evidence of intent*, not worship.
  > An immense structure of evident deliberate design seen at a scale that makes its purpose unreadable — vast regular geometry receding into mist, precise and unweathered, clearly built and clearly not by anyone present, a single small observing figure at great distance for scale, cold pale light, far-future science-fiction, restrained grey and bone palette, awed and sober rather than devotional, no symbols, no iconography, no readable text. Landscape orientation.

- **`kieme-visible-hand.jpg`** — church-space overlay. Devotional tradition
  claims to *see* the ledger kept; the entry's images are the harm that stops
  short, the door that holds. Depict the limit, not the harm.
  > A heavy sealed pressure door holding, seen from the safe side, with visible damage stopping cleanly at its frame and none beyond it, one figure standing back from it unharmed and looking at it, far-future science-fiction station interior, low emergency lighting warming to normal at the edges of frame, quiet aftermath rather than crisis, no visible injury, no readable text or signage. Landscape orientation.

- **`universes/si-gaoithe.jpg`** — a second, unrelated membrane; high
  creative-entropy, **no predictable interval**, barely keeps a shape. The
  contrast with Tír Tairngire's regularity is the point, so this should look
  irregular where that one looks periodic. Existing file
  `lore/threnos-omega.jpg` is the precedent for a membrane portrait.
  > An unstable universe-membrane visualised as a churning irregular field of shifting translucent surfaces with no repeating structure, folds forming and collapsing at different scales at once, sudden localised eddies of luminous air, deep field beyond, restless green-grey and pale gold palette, cosmological scale, no horizon and no recognisable objects, no readable text. Landscape orientation.

- **`universes/tir-tairngire.jpg`** — the one boundary neighbour on record that
  *keeps time*: a transient gravity tunnel opening on a predictable rhythm.
  Regularity is the whole finding.
  > A universe-membrane seen across a narrowed gap, its surface carrying a smooth regular periodic swell like a slow standing wave, and at one point a clean transient tunnel of clear space open through the interval, edges sharply defined and stable, deep cosmological field, warm gold light on the far side against cool blue on the near, orderly and rhythmic rather than turbulent, no figures, no readable text. Landscape orientation.

**Added 2026-08-04, after the audit** — one more generated image, for the new
planet page drafted the same day:

- **`planets/drithane.jpg`** — the crossing night is the planet's whole
  identity, and the custom of going dark to watch it is the human half of
  the frame. Slow sparks, not meteor streaks.
  > A cold, high-altitude planetary landscape at night under an extraordinarily clear sky filled with slow, silent white-gold sparks of light drifting and fading at high altitude — soft brief glimmers, not fast meteor streaks. Below, a settled valley lies deliberately dark, its buildings unlit, faint warm light behind a few windows, snow-dusted grazing land and glasshouse roofs catching the skylight. Far-future science-fiction pastoral setting, cold blue night palette against the warm white-gold sparks, still and reverent rather than dramatic, no readable text or lettering. Landscape orientation.

**Also worth noting from the same audit:** two lore pages carry alt text that is
thin rather than wrong and would fail the "describes what the file shows" test if
tightened — `predatory-entities.jpg` (*"Blurry human arms"*) and
`teleportation-limitations.jpg` (*"Defocused luminous colour stripes"*). Both are
accurate as far as they go; neither is a defect. Flagged so a future audit
doesn't re-derive them.

### 6. Images that should not stay — audited 2026-08-10

Open work 1 and 5 are the images that are **missing**. This is the other half:
images that **exist and shouldn't**. Prompted by Dermot noticing that Saint
Aoife "looks a bit too much like a dark shadow", which turned out to be the
visible corner of something larger.

**The corpus carries two visual languages.** Alt-text length is a reliable
tell for which images were ever actually looked at, and it comes out bimodal:
68 pages sit under 80 characters — *"A smiling professional woman"*, *"An open
old book"*, *"Computer circuit board close-up"* — and 40 sit at 120+ with real
descriptions of in-world art. The short ones read as stock-library captions
because that is what they are. Roughly **55% of the 120 illustrated lore and
character pages** are contemporary stock photography, against a house style
that says in so many words: *not contemporary glamour or lifestyle shoots.*

**Correction, same day: there are three languages, not two.** The third is
**Dermot's own photography**, already in the corpus and already the best
material in it — the `highland-*` and `boirinn-uplands-*` sets, `moorhen-wetland`,
`gull-on-rock`, `trigrian`, the flower macros. Open work 2 settles the
provenance without needing EXIF: it records a sensor-dust blemish on one of
them as *"the known main-body Tamron artifact"*, which is his own lens, and
notes that the highland set doubles as Órla Shepherd's home landscape.

**Method, stated so a later audit knows what to trust:** six images were
opened and read. The 66-page cohort is *inferred from caption style* and is
not individually confirmed. Confirming it is its own pass — and per this
file's own standing warning, it must be done by opening files, not by
reasoning about filenames or alt strings.

#### Triage: sort by what the image is doing, not by where it came from

"Replace all the stock" is the wrong unit — it counts 66 images when the
number that matters is nearer 25, and it would replace things worth keeping.

**Tier 1 — photographs of real people standing in for characters. These must
go.** The only non-negotiable tier, for a reason that is not about house
style: a generated portrait of an invented person claims nothing, but a
photograph of a real stranger captioned as a character makes a claim about an
actual human being, and a false one. `dagny-voss.jpg` is a real woman
presented as an orbital refinery director on Aspenar. That is testimony
pointed at the wrong person — the same fraud the photography site's absolute
rule exists to prevent, running in the other direction. There is also a
licensing question worth *checking rather than assuming*: stock model
releases commonly restrict portraying a model as a fictional person or
implying endorsement, and these publish on owned domains under
`CONTENT-LICENSE.md`. **Roughly 15–20 portraits. Do these first.**

**Tier 2 — stock photographs standing in for specific invented places and
institutions. Should go.** An empty Earth parliament chamber as the Star
Rangers command hierarchy; a Mediterranean archway as Cill Aoife. Wrong in a
way a reader can point at. **Roughly 10–15.**

**Tier 3 — Dermot's own photography. Keep it, and lean on it much harder.**
A real Irish upland standing in for an alien world claims nothing false
because it names nothing: a real place, unnamed, his own work, no model
release in sight. **The unpublished photo backlog is a lore-art resource** —
Kenya, Tenerife, Scandinavia and Irish material sitting on `F:` includes
acacias in dust, a drowned forest, flamingos, volcanic strata, a cloud sea.
That is alien terrain already, and `earth-leopard-grassland.jpg` shows the
practice is established. For any lore entry about landscape, weather, flora
or fauna, the archive beats a prompt: cheaper, better, and it moves the
corpus toward his own work rather than away from it.

**Tier 4 — abstract and texture stock. Lowest priority; probably keep.**
Star fields, light gradients, circuit boards, nebulae. No person, no place,
no claim, and nobody's reading is broken by them. Replace opportunistically
when already in the file, never as a project. **Roughly half the 66.**

So the real work is **25–30 images**, not 66 — and a good share of those
should come from the camera rather than a prompt.

#### Five images are doing nine jobs

Byte-identical files under different names (MD5-checked):

| Kept by | Also serving as |
|---|---|
| `characters/bertram-ashcombe.jpg` | `lore/planetary-liaisons-and-recruiters.jpg` |
| `characters/elvira.jpg` | `lore/planets/verdance.jpg` |
| `characters/brother-daire.jpg` | `lore/monasteries-of-mars.jpg` |
| `lore/star-rangers-command-hierarchy.jpg` | `lore/frontier-transformation-protocols.jpg` |
| `lore/post-eleven-dimensional-manifold.jpg` | `lore/threnos-omega.jpg` |

The pattern in the first three is one error: **a character portrait reused as
the illustration for an institution or a place.** Proposed rule — *the
portrait keeps the file; the lore page gets a new image of what its entry is
actually about.* A picture of a man is not a picture of an order of monks,
and Elvira's portrait is not a picture of a planet.

Separately, `lore/united-space-consortium.jpg` is a *different* file carrying
the *same* alt text as the command-hierarchy pair (*"The interior of an empty
parliament chamber"*). One of the three describes a picture it isn't, which
is a plain breach of the one hard rule in this file.

#### The ten worth doing first

Not the merely generic — the ones where the current image **actively
misinforms**. Prompts written to the standing rules and ready to paste.

**These are not visible to `scripts/image-prompts.js`, deliberately.** It reads
only the Open work 1 and 5 headings, and an entry there counts as done while
its target file exists — so a replacement listed here would be skipped twice
over. To put one through the pipeline: delete the offending file, move its
bullet into Open work 1 (characters) or Open work 5 (lore), and re-run. The
separation is the point — this section is a list of *decisions to take*, and
the moment a prompt moves up it has been decided.

- **`saint-aoife.jpg`** (characters) — currently a black hooded figure seen
  from behind, filling the frame, in a *Mediterranean* hill town: whitewashed
  walls, terracotta pantiles, a cypress. Wrong continent for Cill Aoife,
  wrong register, and it reads as menace for a woman who spent her life
  tending the sick. **Keep the concealed face** — the record genuinely does
  not know it, and the page's whole argument is that she never claimed to know
  what she had seen. Lose the menace.
  > Cinematic portrait of a thirteenth-century Irish holy woman standing at a hawthorn well in soft Atlantic daylight, upper body, half-turned away so her face falls into shadow and is never resolved, plain undyed woollen mantle over a simple gown, hands wrapped in cloth from tending the sick, bare thorn branches and low green hill country behind her, overcast western light, muted moss-and-stone palette, quiet and unthreatening, historical rather than fantastical, no readable text or lettering of any kind. Portrait orientation.

- **`saint-aoife.jpg`** (lore) — currently candles on a gilded Orthodox
  iconostasis: real-world, wrong tradition, contemporary. The entry is about a
  devotion, so illustrate the *place* the devotion attaches to.
  > A hawthorn well in Irish hill country as a place of devotion, the low stone kerb worn smooth, strips of cloth and small offerings tied to the bare thorn branches above it, no people in frame, soft overcast western daylight, damp green and grey palette, reverent and ordinary rather than mystical, medieval vernacular with nothing modern visible, no readable text or lettering of any kind. Landscape orientation.

- **`elvira.jpg`** (characters) — **the worst of the set.** A black-robed
  hooded figure in a dark doorway, backlit through smoke, carrying what reads
  as a scythe. Her own page says *"her classification is contested; she is not
  magical"* — the image asserts precisely what the entry denies, and lands on
  the wrong side of the tone line while doing it.
  > Cinematic portrait of a solitary boundary practitioner keeping a remote marsh causeway outpost, upper body, weathered practical outdoor clothing and heavy waterproofs, calm and matter-of-fact expression, standing in the doorway of a small functional outpost building with flat reed marsh and open sky behind her, cold flat daylight, muted grey-green palette, plainly a working technician rather than anything occult, far-future science-fiction setting, no readable text or lettering of any kind. Portrait orientation.

- **`verdance.jpg`** (lore/planets) — currently Elvira's portrait, which is a
  picture of a person standing in for a picture of a world.
  > A temperate living world seen from low orbit, broad continental greens and river systems under scattered cloud, the terminator line falling across one edge, no habitation or structures visible, far-future science-fiction survey imagery, natural and unspectacular colour, no readable text or lettering of any kind. Landscape orientation.

- **`predatory-entities.jpg`** (lore) — currently blurred hands pressed
  against frosted glass: a horror stock cliché, and the one image in the
  corpus that most clearly breaks *hint at the dark fact rather than depicting
  it*. Nothing should be visible that could be pointed at.
  > A vacated habitat compartment at low light, one chair turned away from the open door and a personal effect left exactly where someone set it down, bedding disturbed and not returned to, far-future science-fiction interior, cold desaturated palette, no figure and no creature anywhere in frame, unsettling entirely by absence and by what has been left behind, no readable text or lettering of any kind. Landscape orientation.

- **`dagny-voss.jpg`** (characters) — a corporate stock photograph: smiling
  woman, pale blue blazer, stucco wall, green hedge. Contemporary Earth, no
  science fiction in it at all. She directs an orbital ore refinery.
  > Cinematic portrait of a composed woman directing a large orbital ore-refining habitat, upper body, practical industrial coverall over working clothes, standing on a gantry above refinery machinery with the curve of a planet visible through the bay beyond, competent unsmiling expression, hard directional industrial lighting, far-future science-fiction setting, muted steel-and-amber palette, professional, no glamour styling, no readable markings or insignia lettering. Portrait orientation.

- **`monasteries-of-mars.jpg`** (lore) — currently Brother Daire's portrait.
  Keep it on his page; the order needs its own image.
  > A scattered contemplative settlement on open Martian terrain, low rock-built cells and a single walled enclosure set into rust-coloured ground under a thin pale sky, long shadows and a distant escarpment, no figures in frame, deliberately austere and unmonumental, far-future science-fiction with nothing ornate, no readable text or lettering of any kind. Landscape orientation.

- **`planetary-liaisons-and-recruiters.jpg`** (lore) — currently Bertram
  Ashcombe's portrait. Same fix: an institution is not a person.
  > A small planetary liaison office on a quiet colony world, a plain desk and two chairs by a window looking onto an ordinary street, a coat on a hook and a cooling cup left on the sill, no people in frame, unglamorous and administrative, far-future science-fiction setting, warm muted daylight palette, no readable text, signage or insignia lettering of any kind. Landscape orientation.

- **`frontier-transformation-protocols.jpg`** / **`star-rangers-command-hierarchy.jpg`**
  — byte-identical. Which page keeps it is Dermot's call; the other needs a
  prompt. **Not written yet: neither file has been opened.**

- **`threnos-omega.jpg`** / **`post-eleven-dimensional-manifold.jpg`** — same
  situation, same reason. **Not written yet.**

#### Convention breaches, separately

- `lore/saltmere-mooring-gantry-1.jpg` and `-2.jpg` are **2560×1920** at
  ~420 KB each, against a ~1600px long-edge convention.
- `lore/moorhen-wetland.jpg` is 1557×2133 — 2133 on the long edge.
- `characters/aldera/field-photo-*` run 557–700 KB.
- Twenty hero images are 1920px. Enough of them that this may be an accepted
  deviation rather than drift, but it is not what the Conventions table says.
  Worth either fixing or amending the table; the table currently reads as
  though it were enforced.

---

## History (2026-07-24)

A full visual review of ~250 files in July 2026 found five character portraits
with flatly wrong content, a Vedic astrological chart standing in for a star
atlas, a broken codex cover, and a set of quality issues. All of the
wrong-content items are now fixed.

**Replaced from Firefly generations** (alt text rewritten on each):
`ilse-korvain` (US Army stock photo → Imperium cyber-revenant; v2 after v1
tipped into body horror), `aldera` (`.png` fantasy forest → a tabby matching her
own gallery field-photos), `maren-solveig-krast` (contemporary policewoman →
archival general's portrait), `karla-wender` (corporate headshot labelled
"engineer" → a pilot at the helm), `orla-shepherd` (office businesswoman →
upland flockholder), `qiren-tal` (dark-fantasy monster → basalt-sheen insectoid
engineer, from Dermot's own reworked prompt), `rook-7` (too sleek → aging
retrofit chassis; v2 after v1 arrived furnished with the NYPD), `nessa`
(purebred studio photo → wind-matted cat on barnacled rock), `lore/cerebraun`
(grey-alien bust → architectural indirection), `hero/atlas-chart`,
`hero/s01e01-corridor`, plus a `lore/five-layers` upgrade to a layered-planes
galaxy. `codex/cosmic-limitation-on-evil.jpg` was rebuilt with the cover
generator (dissolution ring, `CONTESTED` stamp from the paper's own status).

**Two corrections to the audit itself**, both worth remembering:

1. The reported "three-way lore image shuffle" was a **false positive**. All
   three files (`five-layers`, `formation-of-star-rangers`,
   `frontier-transformation-protocols`) already matched their own alt text on
   inspection, and git confirmed none had been touched since 2026-07-13 — so
   nothing was ever shuffled, and no fourth image was missing.
2. The `cerebraun` target was mis-named: the grey-alien bust was on
   `lore/cerebraun.jpg` (the **species** entry), not
   `lore/cerebraun-hegemony.jpg`, which is an on-template designed cover for the
   **polity** entry and was correctly left alone.

---

## Meta-page heroes (2026-07-25)

The out-of-character section — `/story-engine/` and the Journal index under it —
now has heroes of its own, both chosen from a set of eight generated candidates.
Three pages (About, Journal, Story Engine) had been opening with the same
`hero/about-writer.jpg`; About keeps it, the other two no longer share it.

- **`hero/story-engine.jpg`** — a brass machine whose riveted nameplate reads
  *Story Engine*, gears below, steam rising. On `/story-engine/`. Whimsical
  brass on a hard-SF site is deliberate and confined to the out-of-character
  section; nothing in-universe uses it.
- **`hero/journal-notebook.jpg`** — an open journal headed *Author's Journal*
  above a handwritten dated entry. On the Journal index.

**Selecting a text-bearing generation.** Six of the eight candidates were
rejected on lettering, which is the same failure the codex-cover generator
exists to avoid — an image model cannot spell, so the only safe pick is one
where every legible word is short and correct. Rejected: a gear array labelled
`PLOT / CHARACTER / SETTING / CONFLICT` that labelled two different gears
`PLOT`; a printing press whose scroll read `bd what...` and dissolved into
gibberish at the bottom; a journal quoting a named real author (attribution the
site would then be making in a decorative image) and hard-dating itself to 2024;
a journal spread carrying a pencil-sketched face, which reads as a specific
character on a page that is explicitly *not* in-universe. The two winners each
carry one short correctly-spelled phrase and nothing else legible.

**Cropping portrait generations for `.page-hero-image`.** Heroes render at
`width: 100%; height: 320px; object-fit: cover` in an 1100px column — roughly
3.4:1 — so CSS keeps only the middle band of whatever it is given. Both sources
were 768×1152 portraits; each was cropped to 16:9 around a chosen centre and
upscaled to 1600×900, with the centre picked so that the CSS band lands on the
lettering (verified by simulating the 1100×320 crop before committing, not
after). A naive centre crop put the nameplate and the journal's title outside
the visible band on both. Worth repeating for any portrait-orientation source.
