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

**Two different jobs, and it matters which.** The existing lore corpus already
uses both conventions, so the split below is descriptive, not new policy:

- **Institutions and factions → designed emblem cards**, via
  `scripts/make-codex-cover.ps1`, not an image model. Precedent:
  `cerebraun-hegemony`, `celtic-union-of-planets`, `orbital-habitats-compact`,
  `federation-of-sentient-beings`, `united-space-consortium`, `levrils` — all
  ringed-seal emblem cards, all readable, all spelled correctly. Nine of the
  nineteen belong here. An image model cannot letter a seal and there is no
  reason to make it try.
- **Places, phenomena, technology and cosmology → generated images**, prompts
  below. Ten of the nineteen.

Prompts are written to the standing rules: era stated, lettering banned, sheen
named rather than substance, unsettling permitted and horror not. Add
`image`/`image_alt` after generating, and per "Alt text is the prompt of record"
above, write the alt text from what the file actually shows rather than pasting
the prompt back in.

**Emblem cards (generator, not image model)**

Nine pages, all `Institutions` or `Factions`. Suggested `-Category` /
`-Motif rules` unless noted; each needs a title line and a subtitle drawn from
the entry's own first sentence.

- `communion-of-the-called.jpg` — a network of congregations Rangers belong to
  off-duty; no rank inside it. Motif `rules`; subtitle from "the Communion's
  only qualification for belonging is showing up."
- `solar-system-concord.jpg` — continuing civil law, founded 2543 UCSD as the
  Solar System Concordant, restyled 2790. Worth carrying **both** names on the
  card, since the rename is the entry's whole point.
- `the-commonwealth.jpg` — voluntary association anchored at New London;
  deliberately thin. Motif `rules`.
- `star-rangers-frontier-corps.jpg` — caretaker law enforcement whose mandate is
  designed to end. Subtitle from "measures itself by how soon it can leave."
- `star-rangers-science-corps.jpg` — guild-independent research body; pairs with
  the existing Survey Corps material.
- `the-institute.jpg` — secular sceptical research body, no fixed world. Motif
  `dissolution` fits the register better than `rules`; the entry's stance is
  that nothing has been established beyond the disagreement.
- `hyperfold-yield-combine.jpg` — a defunct commercial concern. This one wants a
  **corporate** card rather than an institutional seal, and reading as a lawful
  trading entity is the point: everything about it was licensed. Stamp
  `DISSOLVED` rather than `OFFICIAL`.
- `habitat-threshold.jpg` — the charter population line. Abstract for a seal;
  consider instead deferring this one, or a plain rules-motif card carrying the
  station/habitat distinction.
- `eden-ring-rail.jpg` — see below; could go either way, but a transit-line
  diagram card would serve the entry better than a photograph. Ring line plus
  radial spokes, no station lettering.

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

**Also worth noting from the same audit:** two lore pages carry alt text that is
thin rather than wrong and would fail the "describes what the file shows" test if
tightened — `predatory-entities.jpg` (*"Blurry human arms"*) and
`teleportation-limitations.jpg` (*"Defocused luminous colour stripes"*). Both are
accurate as far as they go; neither is a defect. Flagged so a future audit
doesn't re-derive them.

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
