# Image prompts — generation and enhancement

Working record of the prompts behind every non-photographic image in the repo,
and of the enhancement recipes applied to real photographs. Kept in
`story-bible/` so it ships with the repo but stays outside `src/` and is never
published to the site.

**Why this file exists:** the `prismere-*` / `prismeri-*` cluster was generated
without its prompts being recorded anywhere. When the resolution problem
surfaced in the July 2026 audit there was no way to regenerate at a larger size
without inventing new prompts from scratch. That must not happen twice.

**Rule going forward:** no generated image enters the repo, and no photograph
gets a non-trivial enhancement pass, without an entry here.

## Alt text is the prompt of record

A prompt doesn't have to hide in here. The `image_alt` line in a lore entry —
and the descriptive text of the entry itself — is already a serviceable prompt,
and it has the advantage of being visible, reviewed, and kept in step with canon.
The eleven reconstructions below were written straight out of the alt text and
read perfectly well as prompts, which is the proof.

So the division of labour is:

- **Alt text** carries *what the image shows.* It is the short prompt, it ships
  with the site, and it is what a screen-reader user and a regenerating tool
  both get.
- **Lore body text** carries *the world the image sits in* — the material,
  light, and mood a good generation needs. Quote it into the prompt rather than
  paraphrasing it.
- **This file** carries only what the site can't: tool, version, date, seed,
  aspect, iteration count, the shared style preamble, and the enhancement
  recipes for real photographs.

**The consequence is a two-way check.** If a generated image and its alt text
drift apart, one of them is wrong — and since the alt text is what canon and
screen readers rely on, the image is usually the one that needs to change.
Treat an alt-text mismatch as a defect, not a documentation lapse.

## Entry format

    ### <filename>
    - **Type:** generation | enhancement
    - **Tool:** Firefly / Grok / Lightroom / Photoshop / other, plus version if known
    - **Date:**
    - **Source:** (enhancement only) original file or negative
    - **Prompt / recipe:**
    - **Notes:** aspect, seed, iterations, anything needed to reproduce it

---

## 1. Missing prompts — generation

### The Prismere / Prismeri cluster (11 files)

All eleven are 768x1152, almost certainly Grok output at its default size — 2:3
is not a ratio Firefly offers as a preset, which is the strongest evidence they
came from a different tool. The original prompts were never recorded.

**Superseded 26 Jul 2026: these are being regenerated, not upscaled.** Dermot's
decision — the low-quality originals won't be reused. Working prompts for the
replacements are in [`firefly-prompts.md`](firefly-prompts.md), written to
diverge per location rather than preserve the existing look, since the repeated
motif was the second complaint against the set after resolution.

The reconstructions below are kept as the record of what the *original* eleven
depicted, rebuilt from each image's alt text and the lore entries
(`src/lore/planets/prismere.md`, `src/lore/prismeri.md`). They remain the
fallback if a regeneration ever needs to stay compatible with the old look.

Shared style preamble for all eleven — the series reads as one world because
these terms were constant:

> Silicate-carbon biosphere, living tissue built from glass and crystal.
> Bioluminescent throughout, the world producing its own light. Translucent
> crystalline forms, soft shifting colour washes, dense particulate haze in the
> air. Painterly science-fiction concept art, high detail, no visible text or
> figures in human dress. Aspect 2:3, portrait.

Per-image prompt bodies:

- **prismere-orbital-vista.jpg** — A biomechanical aerial creature gliding
  beneath two ringed planets and a scatter of moons; luminous jellyfish-like
  fauna mid-air; an armoured, spike-shelled ground crawler in the foreground.
  Crowded sky, dense ring plane, seven moons.
- **prismere-twilight-lattice.jpg** — A silvery biomechanical winged organism
  in flight beneath swirling green-and-purple sky patterns; pale crystalline
  coral-like fauna below. The sky patterns are faint, *mathematically precise*
  lines, arcs and polygons — geometry, not aurora.
- **prismere-glasswood-grove.jpg** — A cluster of translucent glowing
  flower-like growths on a crystalline stalk, beneath a banded gas giant.
  Foliage translucent and lens-like, re-emitting light.
- **prismere-flowering-glasswood.jpg** — A luminous flowering glasswood stand
  at night; small many-legged foraging fauna moving across the ground beneath.
- **prismere-luminous-towers.jpg** — A colony of glowing amber-lit lumenspire
  towers rising from a crystalline grove; a jellyfish-like aerial creature
  drifting past. Mineral analogues to fungal towers, lit from within, loose
  colony rather than a regular array.
- **prismere-glass-spires.jpg** — Tall translucent glass-spire structures of
  fused silica against a night sky showing a visible spiral galaxy; crystalline
  reef-like fauna at ground level. Lattice-veined, higher elevation, no
  glasswood grove around them.
- **prismere-driftjellies.jpg** — Three luminous jellyfish-like driftjellies
  floating above armoured spike-shelled ground fauna, beneath a golden ring
  system. Gas-bladder bodies, trailing luminous feeding tendrils.
- **prismere-umbral-ray.jpg** — A large silvery biomechanical-looking flying
  creature gliding through a dim sky; spiny armoured fauna and pale crystalline
  plants on the ground below. Apex aerial predator, silent glider, broad wing
  structure. Darker and more threatening in tone than the rest of the set.
- **prismeri-first-wings.jpg** — A slender grey-violet winged humanoid with
  gossamer wings and a segmented skull ridge, standing beneath a dark moon and
  a distant ringed planet. Light-boned, soft still-hardening exoskeleton. Adult,
  not childlike.
- **prismeri-full-wings.jpg** — A gold-and-blue chitin-plated winged humanoid
  with long motile sensory tendrils growing from the skull ridge, standing among
  crystalline flora beneath a banded planet. Hardened plating, load-bearing
  wings built for sustained high-altitude flight.
- **prismeri-lattice-gathering.jpg** — Two Prismeri, one First Wings and one
  Full Wings, facing each other beneath a crystalline geometric sky pattern,
  with luminous jellyfish-like fauna nearby. The size and structural difference
  between the two forms should be legible at a glance.

**Known series weakness, if regenerating rather than upscaling:** the audit
files this cluster under "tonal outliers, deliberate" because one
jellyfish/crystal-spire motif repeats across eight distinct named locations. If
the point of a regeneration is variety, the prompts need to diverge much harder
per location than the reconstructions above — which deliberately preserve the
existing look so an upscale and a regeneration stay compatible.

### Why a genuinely alien world is hard to prompt

Worth writing down, because it explains the repeated motif rather than blaming
it. Ask a generator for "alien" and it returns a learned average of alien — the
glowing translucent thing, the jellyfish, the crystal spire — and it returns the
same average for all eight locations, because "alien" is the same word each
time. Adjectives can't separate them. Nor can a human eye reliably picture a
world lit by its own biosphere; there is no memory to check the result against,
which is exactly why the near-duplicates passed review the first time.

What does separate them is naming a **concrete physical cause** and letting the
look follow from it. Prismere already has these in the lore, and they differ
sharply by location:

- **Where the light comes from.** Lumenspires are lit from within by a shared
  root-mat; glasswood re-emits light it caught as a lens; glass spires carry no
  light of their own and take it from the sky. Three different light logics —
  so three different images, if the prompt says which.
- **What the sky is doing.** The Lattice is *geometry* — precise lines, arcs and
  polygons — not aurora. A banded gas giant, a dense ring plane, a visible
  spiral galaxy and a dark moon are four distinct skies, and each is already
  specified per image in the alt text.
- **How the air behaves.** Low gravity plus dense particulate supports a truly
  aerial ecosystem. That is why driftjellies hang and umbral rays glide in
  silence — and it should make the air itself look thick, not empty.
- **Scale cues.** The one thing generators drop first and the eye misses most.
  Say what a thing is next to.

Vary the axis, not the adjective. And when a scene resists visualisation
entirely, the honest fallback is the one already in use across the repo: a real
photograph doing the structural work, with the alien element composited in —
which is why the plate-and-creature composites need to look convincing.

---

## 2. Missing prompts — enhancement of real photographs

These are Dermot's own photographs that have had, or need, a hands-on pass.
Recipes recorded so a future re-edit starts from a known state.

### archipelago-palm-avenue.jpg — DONE 26 Jul 2026
- **Type:** enhancement (dust-spot removal)
- **Source:** Tenerife/Alicante palm avenue frame, main body (Tamron 18-400)
- **Recipe:** heal the recurring sensor dust blob in the sky at ~53% across /
  40% down. Feathered patch sampled from same-brightness sky at the same rows.
  If done programmatically, the SVG mask must use `stop-opacity` (alpha)
  gradients — a white-to-black *colour* gradient does not feather under
  `dest-in` and leaves visible square edges.
- **Result:** verified clean at 3x zoom, no patch edge, 1600x1200 preserved.
- **Note:** same blob recurs across Oct 2025 (Kenya) to Jan 2026 (Tenerife) on
  this body. Worth re-checking other sky-heavy frames from it.

### highland-rock-spires.jpg — DONE 26 Jul 2026
### highland-summit-snowfields.jpg — DONE 26 Jul 2026
### boirinn-uplands-waterfall.jpg — DONE 26 Jul 2026
- **Type:** enhancement (zoom-smear recovery)
- **Recipe:** _Dermot to record — which tool, and whether this was a re-process
  from the original raw or a sharpening/denoise pass on the delivered JPEG._
- **Result:** all three verified improved. Rock silhouette against sky now shows
  no colour fringing and no halo line at 3x; rock and water texture resolved
  rather than smeared. Dimensions changed slightly (1600x1200 to 1600x1168,
  1600x1462 to 1600x1503) so these are re-crops, not in-place edits.

### moorhen-wetland.jpg — DONE 26 Jul 2026
- **Type:** replacement frame, not an edit
- **Result:** motion blur gone; bird tack-sharp, preening on a log. 1557x2133.
- **Note:** alt text in the referencing lore entry should be checked against the
  new pose before this ships.

### trigrian.jpg — NO CHANGE, original restored
- **Status:** a violet, antennaed, multi-eyed reptilian creature was supplied on
  26 Jul 2026 and has been set aside as
  `9 - New images to place/unplaced-creature-savanna-sunset.jpg` (1600x1067).
  It is not a grianmhór — Trígrian's apex predator is lioness-like to the point
  that the survey filed a seeding inquiry, and the entry's central section is
  built on that resemblance. The original three-suns composite stands.
- **Exposure item:** blown highlights on the three suns remain, and remain
  intentional. Audit position is "verify then leave alone" so a future pass
  doesn't "fix" them.
- **This is the alt-text check working.** The mismatch between frame and
  `image_alt` is what caught it.

### unplaced-creature-savanna-sunset.jpg — AWAITING PLACEMENT
- **Type:** composite — generated creature on a Maasai Mara savanna plate with
  a multiple-sun sky
- **Needs:** an entry to belong to, then a filename, alt text and a prompt
  record. Do not file it under Trígrian.

### highland-sentinel-lizard.jpg — OUTSTANDING
- **Type:** enhancement (composite refinement)
- **Source plate:** the same Roques de García frame as `highland-rock-spires.jpg`
- **Recipe needed:** mask refinement on the creature cutout plus a light colour
  and grain match. Cutout edges read soft beside the plain version.
- **Opportunity:** the plate has just been re-processed and is now markedly
  sharper than the version this composite sits on. Re-compositing onto the new
  plate fixes the sharpness mismatch and the soft edges in one pass — but it
  must be redone, because the new plate is a different crop.

### saltvik.jpg — OUTSTANDING
- **Type:** photograph needed, no prompt applicable
- **Need:** a real cold-coast frame for the Knarr Line's Nordic-heritage
  coastal world. Currently a plain text card while sibling Saltmere entries
  carry two photographs each.

### Character portraits — regenerating, not upscaling
`tissadelle-shepherd` (768x1022, do first), `agent-barsik`, `bubochka`,
`bubochka-alert` (512x1024), `aldera/field-photo-03`, `field-photo-04`
(512x1120). Prompts in [`firefly-prompts.md`](firefly-prompts.md).

Two cautions carried over there: `tissadelle-shepherd` must not come back as a
glamour headshot — the 26 Jul attempt did, and the audit rules that register out.
And the two Aldera frames sit in a gallery beside `field-photo-01`/`-02`, which
read as real photographs of a real kitten; re-cropping Dermot's own originals
beats generating replacements that won't match.

---

## 3. Recorded prompts

_Entries move up here once complete._ The five below moved from
`firefly-prompts.md`'s *Recorded composites* and *Recorded generations*
sections on 2026-08-11, as that file's own header box asked; each carries its
own **Type:** line, so the two group headings were dropped in the move.

### trigrian-triple-sunset.jpg — 26 Jul 2026
- **Type:** composite from Dermot's own photographs (no generator involved)
- **Source:** `F:\122KENYA` — base `DSC_7768`, sun discs lifted from `DSC_7770`
  and `DSC_7778`. Amboseli, October 2025.
- **Recipe:** the base already carries one low orange sun setting behind the
  ridge. A second orange sun is composited beside it at 0.92 scale, and a
  smaller, whiter companion at 0.66 scale higher and trailing — matching the
  entry's own astronomy: *a tight central pair of orange suns... and a smaller,
  whiter companion on a wide, eccentric outer orbit*, descending together
  toward the hills.
- **Technique that matters:** lift the **sun disc only**, not the sky around it.
  Patch radius ~58px at 1600px wide, circular alpha mask with the falloff
  starting at 72%, blended `lighten`. A first attempt at 110px haloed every sun
  — because `lighten` takes the brighter pixel, so wherever the donor frame's
  sky was brighter than the base's, the whole patch disc lifted. Same failure
  mode as the dust-spot heal: match brightness, or keep the patch tight.
- **Rejected approach:** a naive `lighten` blend of four whole frames. The
  sequence is handheld, so the framing drifts and the tree comes out as three
  overlapping ghosts.
- **Note:** composites are welcome here. They are *not* welcome on the
  photography site, which carries only Dermot's own unaltered photographs.


### new-london-space-habitat.jpg — 26 Jul 2026
- **Type:** generation
- **Tool:** Adobe Firefly, widescreen preset — output 1408x768
- **Prompt (complete — supplied by Dermot 26 Jul 2026):**

  > New London Space Habitat orbits at Lagrange point L5, positioned in the
  > Earth-Moon system to maintain stable distance from both bodies. Constructed
  > in the late 22nd century as a refuge following the great environmental
  > collapse that rendered much of the British Isles uninhabitable, it serves as
  > humanity's largest preservation project for British cultural heritage.
  >
  > The habitat consists of three interconnected Stanford torus rings, each 1.5
  > kilometers in diameter, rotating to provide Earth-standard gravity. The
  > rings are named Westminster, City, and Crown, reflecting the traditional
  > divisions of historical London. These connect to a central non-rotating hub
  > called "The Spire" which houses administration, docking facilities, and
  > zero-gravity manufacturing.
  >
  > New London houses approximately 180,000 residents, primarily descendants of
  > British evacuation programs, though immigration policies have relaxed in
  > recent decades. The habitat maintains formal diplomatic ties with Eden Space
  > Habitat and other major orbital settlements, while operating under a
  > constitutional monarchy governance structure that preserves British
  > parliamentary traditions.
  >
  > The habitat's most distinctive geographical feature is the Thames Canal — a
  > water system that flows through all three rings, serving both practical
  > water circulation needs and symbolic connection to Old London. Bridges
  > spanning this canal have become important cultural landmarks and meeting
  > places within the habitat.

  Note the prompt is essentially the lore entry compressed — which is the
  method working as intended: the entry is the prompt, and the alt text is the
  short form of it.
- **Canon accuracy:** good. Three interconnected rings, central spire, water
  running through the rings, recognisable London landmarks inside them, and
  Earth roughly four times the Moon's apparent diameter — which is right for
  Earth-Moon L5, where both bodies are one lunar distance away.
- **Two known defects, both from the generator:**
  1. **1408x768, under the 1600px lore standard.** `eden-space-habitat.jpg`,
     its nearest sibling, is exactly 1600x900. Regenerate larger or upscale.
  2. **Garbled pseudo-text on the outer ring hull** (lower left, faint glyphs
     reading as "R & ▨▨E"). Add *text, lettering, signage, writing* to the
     negative prompt on any regeneration — see the house rule below.

### dorian-calloway.jpg — 29 Jul 2026
- **Type:** generation (replaces a stock-headshot-register portrait)
- **Tool:** Adobe Firefly, widescreen preset — output 1408×768, centre-cropped to
  1365×768 and resized to 1200×675
- **Prompt:** the § C entry in [`firefly-prompts.md`](firefly-prompts.md), quoted there in full.
- **Result:** correct on the first batch. No uniform; business dress worn like a
  long day, jacket open and one sleeve turned back, a small plain lapel pin as
  the only mark of office. The coordination floor carries the breadth of the
  remit — orbital ring diagrams, telemetry traces and a schematic floor plan
  across the wall displays, working clutter and a melting iced drink below.
- **Lettering check passed.** This was the risk the prompt was written against,
  since status boards invite the failure that killed the 28 July Agent Barsik
  attempt. Inspected at 4× on both the left display stack and the desk
  printouts: the text-like rows resolve to blur with no legible glyphs anywhere,
  which is the intended outcome — the *suggestion* of dense readouts without any
  actual writing. **Worth checking the same way on any future frame that puts
  screens or paper near the camera**, rather than judging it at page size.
- **Alt text updated** at `src/characters/dorian-calloway.md` — it previously
  read "A mature businessman portrait", which named a stock category rather than
  describing a frame.

### bubochka-alert.jpg — 29 Jul 2026
- **Type:** generation (replaces the rejected 28 July attempt)
- **Tool:** Adobe Firefly, widescreen preset — output 1408×768, centre-cropped to
  1365×768 and resized to 1200×675 (the preset is 1.833, the spec is 16:9 =
  1.778, so a 21px trim each side is needed — `import-image.ps1` scales but does
  not crop, so this needed a crop-then-resize pass)
- **Prompt:** the rewritten version in [`firefly-prompts.md`](firefly-prompts.md)'s § C, quoted there in full.
- **Result:** correct on the first batch. Lop ears folded flat, standing bolt
  upright on the hind legs, same brown speckled mug and saucer, same
  marshmallows, same linen cloth, same warm kitchen and window light. The pair
  now reads as one animal photographed twice, which is the only thing the image
  had to do.
- **Alt text updated** at `src/characters/bubochka.md` — it previously read
  "ears fully raised", inherited from the faulty prompt and impossible for a lop.

### prismere-root-mat-network.jpg — 29 Jul 2026
- **Type:** generation
- **Tool:** Adobe Firefly — output 848×1264, downscaled to 773×1152 via
  `scripts/import-image.ps1 -MaxEdge 1152`
- **Prompt (complete — supplied by Dermot 29 Jul 2026):**

  > Silicate-carbon biosphere, living tissue built from glass and crystal.
  > Bioluminescent throughout, the world producing its own light. Translucent
  > crystalline forms, soft shifting colour washes, dense particulate haze in the
  > air. Painterly science-fiction concept art, high detail, no visible text or
  > figures in human dress. Aspect 2:3, portrait.

- **Placement:** `src/lore/planets/prismere.md`, under *Glasswood and the
  Luminous Biosphere*, illustrating the shared root-mat network that feeds a
  lumenspire colony — described in the entry since it was written, never shown.
  Added in #217 along with a one-sentence lead-in.
- **Note — this used the wrong preamble.** The text above is the *legacy*
  shared preamble from `image-prompts.md` §1, which exists to reconstruct what
  the original eleven depicted. The current replacement preamble is in section A
  below, and differs: it adds *"naturalistic rather than decorative"* and drops
  the fixed 2:3 aspect. The consequence is visible in the result — crystal
  spires and the same palette as the old set, which is a faithful continuation
  of exactly the repeated motif the replacement series is meant to break from.
  Not a defect in the image, which is good, but it is not a step toward the
  eight-distinct-looks goal either.
- **Known defect:** 773×1152, under the 1600px lore standard — the same problem
  as the rest of the Prismere cluster. It should be regenerated with the section
  A preamble whenever that set is done, rather than upscaled on its own.
