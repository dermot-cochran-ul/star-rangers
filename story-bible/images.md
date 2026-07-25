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
