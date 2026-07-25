# Image Audit — July 2026

> ## STATUS: mostly resolved 2026-07-24
>
> **Eleven images replaced** in one session from Dermot's Firefly generations —
> every CRITICAL wrong-content item except one, plus four style items. See
> [firefly-replacement-prompts.md](firefly-replacement-prompts.md) for the
> per-file ✔ REPLACED notes and the prompts that produced them:
> `ilse-korvain`, `aldera` (png→jpg), `maren-solveig-krast`, `karla-wender`,
> `orla-shepherd`, `qiren-tal`, `rook-7`, `nessa`, `lore/cerebraun`,
> `hero/atlas-chart`, `hero/s01e01-corridor`, plus a `lore/five-layers`
> upgrade. Alt text rewritten on every one.
>
> **CORRECTION — the three-way lore shuffle below was a FALSE POSITIVE.** All
> three images were verified by eye on 2026-07-24 and each already matches its
> own alt text: `five-layers.jpg` *was* a blue spiral galaxy, not a sepia
> skyline; `formation-of-star-rangers.jpg` *is* a vintage city skyline; and
> `frontier-transformation-protocols.jpg` is a delegate voting console in an
> empty blue-seated chamber — a loose but genuine match for "the interior of an
> empty parliament chamber." Git history confirms none of the three has been
> touched since 2026-07-13, so nothing was ever shuffled or fixed: the original
> finding was simply wrong, and no fourth image is missing. **Lesson: verify
> image contents by reading the files, not by reasoning about filenames and
> alt text.**
>
> **Still open:** the technical/quality items, now split out with re-measured
> dimensions into [manual-photo-edits.md](manual-photo-edits.md) (Lightroom /
> Photoshop work only Dermot can do — no spot-heal, upscaler, or compositing
> in-session); `codex/cosmic-limitation-on-evil.jpg` (rebuild as a designed
> title card — an in-session job, not yet done); and the 13-file stock-headshot
> style cluster (deferred by choice — deserves its own session).

Planning note (not built into the site — lives in `story-bible/` like
`portraits-needed.md`). Full visual review of every existing image in the
repo (~250 files: characters, lore, codex, hero), done by reading each file
and cross-checking against its front matter / character description.

**Tooling note:** this pass found issues it can't fix in-session — there's no
spot-removal/inpainting tool and no upscaler available, so the dust-spot and
low-resolution items below need Lightroom/Photoshop or a fresh Firefly
generation, not an automated fix.

---

## CRITICAL — wrong content, needs a decision

### Characters
- **`ilse-korvain.jpg`** — shows a smiling young woman in a real-world
  contemporary **US Army uniform** (actual flag patch, "U.S. ARMY" text).
  Character is a 200-year self-maintaining "dead" cyber-revenant Imperium
  colonel. Wrong era, wrong faction, wrong everything.
- **`orla-shepherd.jpg`** — office/locker-room setting, alt text "A
  businesswoman standing confidently at the workplace." Character is a rural
  sheep flockholder who has never left her homeworld.
- **`maren-solveig-krast.jpg`** — a smiling contemporary policewoman. Character
  is a historical Military Space Command *General*.
- **`karla-wender.jpg`** — alt text says "engineer," role is Chief Pilot/High
  Captain; image is a generic corporate headshot matching neither.
- **`aldera.png`** — the title character's main portrait: painterly fantasy
  forest scene, no cyber-enhancement visible, 1024×512 (2:1) — the most
  extreme style and aspect-ratio outlier in the whole cast. This is the
  protagonist's portrait, flagging separately for your call rather than
  bundling with the others.

### Lore
- **Three-way alt-text mismatch**: `five-layers.jpg`, `formation-of-star-rangers.jpg`,
  and `frontier-transformation-protocols.jpg` each show content that doesn't
  match their own `image_alt`. Likely a shuffle during a past migration.
  `five-layers.jpg` is actually a sepia NYC skyline (matches *formation*'s alt
  text); `formation-of-star-rangers.jpg` is a fingerprint-scanner/chamber shot
  (closer to *frontier*'s alt text "empty parliament chamber");
  `frontier-transformation-protocols.jpg` is a businessman with a glowing atom
  hologram, which doesn't cleanly match any of the three current alt texts —
  so this may not be a clean 3-way swap, possibly a 4th image (the actual
  "blue spiral galaxy") is missing entirely. **Not auto-fixed** — needs your
  eyes before any file gets renamed, since I can't confidently reconstruct
  the intended pairing.

### Codex
- **`cosmic-limitation-on-evil.jpg`** — wrong/stray file. A blurry stock photo
  of hands on frosted glass, no title rendered, breaks the consistent
  dark-gradient-card template every other codex entry uses. Also 29KB vs.
  ~140KB average for the set — reads like a broken generation.

### Hero
- **`atlas-chart.jpg`** — a Vedic astrological birth chart (planet
  abbreviations, house numbers), not a star atlas/navigation chart.

---

## QUALITY — technical issues (need tools this session doesn't have)

- **`lore/archipelago-palm-avenue.jpg`** — confirmed dust-spot-like blemish in
  the sky (~53%, 40%), matches the known Tamron-body sensor artifact. Needs
  healing in Lightroom, same recipe as the Kenya 2025 raw folders.
- **`lore/highland-summit-snowfields.jpg`**, **`lore/highland-rock-spires.jpg`**,
  **`lore/boirinn-uplands-waterfall.jpg`** — soft/smeared detail consistent
  with extreme digital zoom, not the dust spot.
- **`lore/moorhen-wetland.jpg`** — mild motion blur on the bird, acceptable
  but softer than the rest of the wildlife set.
- **`lore/trigrian.jpg`** — blown highlights on the three suns; likely
  intentional (matches the trinary-star concept) but reads as overexposed.
- 11-file `lore/prismere-*` / `lore/prismeri-*` cluster — all only 768×1152,
  well under the site's ~1600px lore convention (carries AI-gen EXIF
  signature). Internally consistent with each other, just low-res as a block.
- **`lore/noogenic-seeding-system.jpg`** — unusually short/wide crop
  (1200×614) vs. the site's usual lore aspect ratios.
- **Characters**: `agent-barsik.jpg`, `bubochka.jpg`, `bubochka-alert.jpg` are
  512px wide vs. the ~1200px standard; `tissadelle-shepherd.jpg` is 768px
  wide; `aldera/field-photo-03.jpg` and `field-photo-04.jpg` are unusually
  narrow (512×1120). No character image actually matches the ~1200×1600
  portrait spec in `portraits-needed.md` — aspect ratios are scattered across
  the whole set (landscape 1200×800, 1600×900, square, etc.), so that spec
  isn't being enforced today even on portraits nobody's flagged as wrong.

---

## STYLE/CONSISTENCY — house-style judgment calls, not bugs

### Characters — off the noir-cinematic house style
- **Generic contemporary stock-headshot cluster** (flat studio backdrop, no
  in-world setting): `cormac-dubhghlas`, `dagny-voss`, `demelza-trevithick`,
  `dorian-calloway`, `fergus-aonghas`, `idris-bryneth`, `imogen-petrakis`,
  `niamh-o-ceallaigh`, `petra-voss`, `rhian-gwynne`, `rhiannon-ceridwen`,
  `sen`, `zara-wayland`. Three of these (`dagny-voss`, `imogen-petrakis`,
  `petra-voss`) lean toward the glamour/lifestyle look the style notes
  explicitly rule out.
- **Flat title-card template used on humans** instead of a portrait:
  `brother-fintan`, `dr-iona-vale`, `galahad-thorne`.
- **Same title-card template used on aliens** — internally consistent, but a
  third visual language beyond both the noir-photo convention and the
  Reeves/Eden-Warden abstract-emblem convention: `isren-farrowkin`,
  `mira-of-brine`, `sohrel`, `syra`.
- **`qiren-tal.jpg`** — dark-fantasy monster art, style mismatch with the
  photographic cast; also tonally off for a careful engineering specialist.
- **`rook-7.jpg`** — too sleek/premium for a character described as an
  "outdated, deliberately understated" chassis.
- **`nessa.jpg`** — polished purebred studio pet photography; character is a
  scruffy wild/unaugmented cat.

### Lore
- **`highland-sentinel-lizard.jpg`** — creature composited onto the same base
  photo as `highland-rock-spires.jpg`; soft cutout edges are noticeable next
  to the plain photo version.
- **`cerebraun.jpg`** — the literal grey-alien-bust cliché, notable because
  the sibling `krenyi.md` entry explicitly says it wants to avoid that trope.
- **`planetary-liaisons-and-recruiters.jpg`** — stock photo of a "true crime"
  evidence board (visible text like "THE HORROR CAME TRUE"); matches its own
  alt text so it's deliberate, just a tonal outlier.
- **`the-imperium.jpg`** — real photo of a modern skyscraper standing in for
  "a monolithic tower," among otherwise abstract/illustrated Imperium art.
- The 11-file `prismere-*`/`prismeri-*` series repeats the same jellyfish/
  crystal-spire motif across distinct named locations — consistent but
  interchangeable.
- **`saltvik.jpg`** — plain text card, no photography, while its sibling
  `saltmere` entries have two full photographic images each.

### Hero
- **`s01e01-corridor.jpg`** — glossy CGI spaceship corridor, stands out
  against the gritty real-world photography used for the rest of the S01
  episode banners (`s01e00-cat`, `s01e02-machinery`, `s01e03-archive`).

---

## OK
The remaining ~200 files (roughly 30 characters, ~85 lore, 22 codex, 17 hero)
were checked and are technically sound and on-style: no corrupt files,
no other alt-text mismatches, no other dust-spot occurrences, resolutions in
a sensible range, and content matching filenames/descriptions.
