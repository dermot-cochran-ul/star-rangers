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
replacements are in `images.md` Open work 5 (migrated 2026-08-11, when
`firefly-prompts.md` was retired), written to
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

### tissadelle-shepherd.jpg — current file's prompt unrecorded

The 1200×675 file landed by 2026-08-06 with no entry here — the rule this file
exists to enforce, tripped again; found 2026-08-11 while resolving the
replace-vs-upscale decision. The likely source, preserved verbatim from the
retired `firefly-prompts.md` § C (rewritten 28 July 2026 against Dermot's
character notes of the same day), is below. Treat it as the reference for any
future regeneration rather than certain provenance of the current file.

> Documentary photograph, available light, candid. A young woman in her
> twenties with red hair and blue-green eyes, in a practical working uniform
> worn correctly but well used, aboard a spacecraft or station. She is
> mid-task, her attention on something off to one side of the frame — reading
> an instrument, not posing. Upright, self-possessed bearing; alert and
> attentive expression rather than blank or steely. Equipment, hard surfaces
> and functional light around her. Unglamorous lighting; visible skin texture;
> no beauty retouching, no styled hair, no makeup emphasis. She is at work and
> has been for hours.

**What this prompt is carrying.** Dermot's note, 28 July 2026: she never
married and has had no relationship despite being elegant and charming — sigma
INFJ-A, highly sensitive but confident, expecting a depth most men can't
provide, and almost more focused on her career and on maintaining her dignity
as a leader. That is why the 26 Jul attempt failed and why it wasn't only a
lighting problem: beauty lighting and a to-camera gaze frame a subject as
presenting herself for approval, and her whole character is that she does not.
The two changes that matter are **her attention goes off-frame onto her
work**, and **nothing in the image invites the viewer**. Her solitude should
read as chosen and unremarkable — never as loneliness, never as a gap waiting
to be filled.

Guardrails: don't reach for *beautiful*, *striking*, *alluring*, or *lonely* —
if a batch comes back as a headshot, push harder on *documentary*, *candid*,
*available light*, and name the task she's doing. **This is Tissadelle, not a
type** — Dermot was explicit that this register must not carry over to the
story's other women in command. **The interiority — hint, don't show:** her
inner life is populated (fantasies, AI virtual companions, internal headmates
including tulpas and plural subsystems), and that complexity is what qualifies
her for a noogenic seed mind — a qualification, never pathology, instability
or spectacle. A literal depiction tips into the horror register the tone
guardrail rules out; keep the portrait outwardly plain.

Two optional variants, generate separately: the same frame at a dark
instrument panel whose glass carries two or three quiet reflections of her at
slightly different angles — ordinary equipment reflections, evenly lit,
nothing ghostly; discard any result that looks haunted. And the same woman on
a hillside flock-holding in wet upland country, off duty — her Tír na nÓg
home ground, load-bearing since Season 5.

### bubochka.jpg — current file's prompt unrecorded

Same finding, same date: 1200×675 by 2026-08-06, no entry here. The § C
prompt, preserved as the reference:

> A fluffy white rabbit sitting inside a large brown ceramic mug filled with
> pink and white marshmallows, more marshmallows scattered on the plate
> beneath. Absurdly, disarmingly cute. Photographic, soft natural window
> light, shallow depth of field. Played completely straight — a real
> photograph of a real rabbit in a mug, not an illustration.

Keep the alt text's scene exactly — it is well described and the comedy
depends on the specificity. The pair image (`bubochka-alert.jpg`, § 3 below)
must match this one's setting: same mug, same table, same light.

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
- **Creature element, if a cleaner cutout is wanted** (moved from the retired
  `firefly-prompts.md` § F). Match the light direction to the plate before
  generating, or the mask will never sit right no matter how good the edge is.
  > A large monitor-lizard-like reptile in three-quarter view, climbing, body angled upward, long tapering tail trailing behind and down. Even overcast daylight from the upper left, matching a clear high-altitude sun. Plain neutral background for cutting out. Dry, matte, dusty scale texture in muted grey-brown — no gloss, no wet look, no rim lighting.

### saltvik.jpg — OUTSTANDING
- **Type:** photograph needed, no prompt applicable
- **Need:** a real cold-coast frame for the Knarr Line's Nordic-heritage
  coastal world. Currently a plain text card while sibling Saltmere entries
  carry two photographs each.

### Character portraits — status as of 2026-08-11
Resolved by the replace-not-upscale ruling and re-measurement:
`tissadelle-shepherd` and `bubochka` were already replaced at 1200×675 (landed
by 2026-08-06, prompts unrecorded — see their § 1 entries above, which keep
the never-a-glamour-headshot caution); `bubochka-alert` and `dorian-calloway`
are recorded done in § 3; `agent-barsik` (still 512×1024) has its regeneration
prompt in `images.md` Open work 1; and the two Aldera frames (512×1120, PNG
data under a .jpg extension) are a re-crop job in Dermot's hands — see the
Aldera note in `images.md` Open work 2, which keeps the caution that they sit
beside `field-photo-01`/`-02`, real photographs of a real kitten that
generation won't match.

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

### agent-barsik.jpg — attempt of 28 Jul 2026, REJECTED
- **Type:** generation attempt, not shipped
- **Tool:** Adobe Firefly, widescreen preset
- **Why rejected:** right cat, wrong on the lettering ban. Pose, office and
  deadpan all correct, but the frame was full of readable text — "CASE FILES",
  "LOGS" and "REPORTS" along the binder spines, "STATION INCIDENT REPORT —
  LOG 41" across the papers, and garbled pseudo-text on the collar tag itself.
- **Where the fix lives:** the regeneration prompt, with the blank-surfaces
  and plain-unengraved-tag requirements folded into the body, is in
  `images.md` Open work 1 — dormant until the old 512×1024 file is deleted.

### dorian-calloway.jpg — 29 Jul 2026
- **Type:** generation (replaces a stock-headshot-register portrait)
- **Tool:** Adobe Firefly, widescreen preset — output 1408×768, centre-cropped to
  1365×768 and resized to 1200×675
- **Prompt** (moved from the retired `firefly-prompts.md` § C):
  > Documentary photograph, available light, candid. A man in his late fifties, senior civil administrator, standing on the coordination floor of an orbital habitat administration centre, half-turned from a bank of wall-mounted status displays as though interrupted mid-shift. Business dress worn like a long day rather than a photocall — jacket open, tie loosened, sleeves turned back, a small plain metal pin at the lapel. Composed, unhurried, faintly tired; attention still partly on the displays. Behind him the displays show abstract orbital ring diagrams, engineering telemetry traces and schematic floor plans as pure graphics — shapes, curves and line work only. Working clutter on the desks below: printouts, cabling, a cooling drink. Functional overhead light, natural skin texture, no retouching, shallow depth of field.
- **Negative:** text, lettering, numerals, labels, signage, writing on any screen
  or surface, uniform, military uniform, police uniform, epaulettes, rank
  insignia, badge with visible engraving, flat studio backdrop, glamour
  lighting, corporate headshot, posed to camera.
- **Why no uniform** — settled 29 July 2026. The post is administrative rather
  than operational by design and Calloway cannot direct a habitat
  Commissioner's policing decisions; a service uniform would assert command
  authority his page spends its length denying, and any one service's uniform
  narrows him to a third of the remit. There is also no Compact uniform in
  canon (`src/lore/rank-insignia-and-uniform.md` covers Star Rangers only), so
  inventing one would be new canon cascading to all five habitat
  Commissioners. The room carries the breadth instead of a costume.
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
- **Prompt** (the 29 July rewrite, moved from the retired `firefly-prompts.md`
  § C — the version that stood until then asked for "both ears fully raised",
  which a lop physically cannot do):
  > Documentary-style photograph, available light, candid. A pure white lop-eared dwarf rabbit standing bolt upright on her hind legs on a warm honey-toned rustic wooden kitchen table, body stretched tall and narrow, front paws tucked to her chest, absolutely still and tense, staring intently at something outside the frame. The rabbit: dense pure white fur, soft and fluffy; both long lop ears hanging down flat against the sides of her head, pale pink inner ear showing, never upright; one large round near-black eye in three-quarter view; small pink nose; long fine white whiskers. Beside her on the table, a brown speckled reactive-glaze ceramic mug and matching saucer, empty, with pink and white mini marshmallows spilling across the saucer and scattered over the wood. A tall glass of milk behind. A crumpled pale linen cloth to the left. Bright window to the right casting soft directional daylight; blurred warm kitchen interior behind. Shallow depth of field, warm natural colour. Played completely straight — a real photograph of a real rabbit, not an illustration.
- **Negative:** upright ears, erect ears, pointed ears, standing ears, rabbit
  inside the mug, text, lettering, watermark, illustration, cartoon, studio
  backdrop, glamour lighting.
- **The pair is the joke:** same rabbit as `bubochka.jpg` (§ 1), suddenly
  working — consistency of setting between the two frames is what sells it.
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

### reeves-eden.jpg and reeves.jpg — 13 Aug 2026, a deliberate pair

- **Type:** generation (both replacing earlier images — Eden's a holographic
  evidence interface, Threshold's a PORTRAIT PENDING card)
- **Date:** 13 August 2026, in #415
- **Recorded here 19 August 2026.** The pair had no entry in this file at all,
  which is why the emblem read as possibly accidental during that day's audit.
  It was not; the reasoning below is recovered from #415's commit message and
  from the two `image_alt` lines, which have carried it correctly since.

**Why an emblem and not a portrait.** Neither Reeves has a body anywhere in
canon — Lucene-9000 is *a mobile AI humanoid*, Reeves is *investigative support
intelligence*. The 12 August rule that *AIs get portraits like everyone else*
governs how to depict an AI **that has a body**; it never required inventing one.
See the qualification now recorded in `images.md`'s Conventions.

**What actually forced the re-brief, and the lesson worth keeping.** The earlier
Eden brief asked for a holographic case-file interface and banned lettering in
the same breath. It came back reading `CASE FILE: ALPHA-7` and garbled
pseudo-words. **The lettering ban cannot beat the scene:** if a brief describes an
object whose purpose is to carry writing, the model draws the object and the
object has writing on it. The fix is to change the scene, never to strengthen the
negative. Every prompt in this file that puts a display, a board or a document
near the camera is subject to the same failure.

- **Prompt, `reeves-eden.jpg`** — the junior of the pair, and the pattern is
  earlier:
  > Cool blue points of light scattered across a deep indigo field, a handful of them joined by faint thin lines into a partial figure that does not resolve into anything nameable, the rest unjoined. Soft vignette, deep quiet, nothing else in frame. No text, no lettering, no numerals, no interface, no display, no screen, no dashboard, no console, no face, no figure, no device of any kind.
  - **Why it suits him:** *a pattern half-found and not yet claimed* — which
    describes an intelligence that will not volunteer a conclusion better than a
    dashboard ever did.

- **Prompt, `reeves.jpg`** — same emblem, same palette, same restraint, **and the
  figure further along**, because Reeves at Threshold and Reeves at Eden are the
  same model on separate deployments and their pages say so:
  > Cool blue points of light on a deep indigo field joined by fine lines into a dense ring that is almost closed and still open along one arc, the remaining points unjoined around it. Soft vignette, deep quiet, nothing else in frame. Same negative as above.

- **The difference between the two frames is the content**, not variation between
  two attempts at one idea. Eden's pattern is beginning; Threshold's is nearly
  closed and deliberately not closed. Keep it if either is ever regenerated —
  a matched pair where both are at the same stage would say nothing.
- **Lettering check passed on both.** Zero glyphs, which was the entire object of
  the re-brief.

---

## 2026-08-31 — four designed cards from the cross-platform port

No generator prompts: all four are deterministic designed cards, drawn by
`scripts/make-cards.js` (added the same day — a Node/sharp port of
`make-emblem-card.ps1` and `make-codex-cover.ps1`'s designed mode, for
sessions without Windows; needs `npm install --no-save sharp`; Liberation
Serif/Mono substitute for Georgia/Consolas, layouts matched, letterforms
not). Parameters of record, mirrored in the script's CARDS table:

- `lore/ovruhn.jpg` — emblem; device **rings** (read as sound), tint
  `#0E1E24`, accent `#8FC0B8`; epithet "The Deep-Sung"; qualifier
  "Who hear the way other peoples see".
- `lore/the-makers-shape.jpg` — emblem; device **fold** (maker and mind,
  one path), tint `#241A30`, accent `#BFA8D6`; epithet "No Mind From
  Nowhere"; qualifier "Every built mind is a portrait of its makers".
- `lore/sapience-beyond-the-human-measure.jpg` — emblem; device **triad**,
  tint `#12211A`, accent `#9CC6AB`; epithet "The Checklist Refused";
  qualifier "Recognition, per lineage, through communication".
- `codex/the-two-songs-of-the-loud-people.jpg` — codex designed card;
  title lines "THE TWO SONGS" / "OF THE LOUD PEOPLE"; category "XENOLOGY
  RECORD"; subtitle "A Keeper's Account of Humanity"; institution
  "Rendered from Chorus-Keeping · Archive Translation Desk"; author
  "KEEPER VHEN OF THAVREN"; stamp "RENDERED"; motif **dissolution**.

Regenerating any of them on Dermot's machine with the `.ps1` originals is
welcome and expected to supersede these — same parameters, Georgia and
Consolas letterforms. Epithets and qualifiers above are authored, per the
emblem generator's own rule.

---

## 2026-09-03 — the first Codex-art image

### asteria-the-sage-impression-artwork.jpg and asteria-the-sage-impression.jpg — 3 Sep 2026

- **Type:** generation with a reference image (the artwork), then a designed
  card with the artwork as underlay (the header)
- **Date:** 3 September 2026; drafted for Dermot's review
- **Entry:** `src/codex/asteria-the-sage-impression.md`
- **Ruling it realizes:** Dermot, 3 September 2026 — *in-world artist's
  impression, no watermarks or overlaid text* — on the headmate image parked
  since Intake 2026-08-24. The Codex-art rulings of the same day apply: card in
  the header, artwork in the body, prospective only.

**Reference:** `story-bible/reference-art/tissadelle-headmate-2026-08-24.jpg`,
the Botify AI image Dermot supplied on 24 August (768×1152, watermarked). Sent
as an image part with the prompt; the manifest records it.

**Why a painting.** The entry presents the picture as an impression made from a
description and not a sitting, and a painterly surface says that without a
caption. It also keeps the image visibly apart from the character-portrait
house style, which is the point of the Codex frame: this is a picture somebody
in the world made of a person they were told about, not a portrait of a
character.

**Prompt, `asteria-the-sage-impression-artwork.jpg`** (Gemini 3.1 Flash Image,
2K, 16:9, two variations; the second chosen for its heavier brushwork, the
first kept in `image-out/` until the PR merges):
> A painted portrait in the manner of an artist's impression made from a description rather than a sitting: a woman who appears in her thirties, pale, with loose blue hair and pale blue eyes, in a black hooded cloak worked with fine silver botanical embroidery over dark layered clothing with a belt, standing among bare winter branches at night, three-quarter turn, level gaze past the viewer, still and watchful. Visible brushwork and a limited palette of night blue, black and silver; the branches thin and dissolve into the dark at the edges of the picture as if the painter stopped where the description ran out. Quiet, composed, a little hopeful rather than grim. No readable text, lettering, numerals, signature, monogram, watermark, logo, signage, labels, branding or written characters of any script anywhere in frame; no holograms, projected light, glowing displays, screens, monitors or consoles; no visible lamp, light fitting or bulb; no flat studio backdrop, gradient background, glamour lighting, corporate headshot or posed smiling to camera; no weapons; no drawn frame or border around the picture. 16:9 landscape.

- **Lettering check passed on both variants.** No glyphs, no signature, no
  watermark — the reference's watermark did not carry across.
- **Card, `asteria-the-sage-impression.jpg`:** `make-codex-cover.ps1` with
  `-TitleLines "ASTERIA","THE SAGE" -Category "ARTIST'S IMPRESSION" -Subtitle
  "A member behind a registration" -Institution "Circulating; no archival
  master" -Author "Unattributed" -Motif none -Underlay <the artwork>`, default
  scrim.

---

## 2026-09-03 — seven emblem cards from the Batch 2 lore audit

All `scripts/make-emblem-card.ps1`, title and category from each page's front
matter, epithet and qualifier lifted from the page's `description`. Replacing
stock anachronisms; the audit record is in `images.md` under *Images that
should not stay*.

| Page | Device | Tint | Accent | Epithet | Qualifier |
| --- | --- | --- | --- | --- | --- |
| galactic-stardate | sundial | #1C1810 | #D9C08A | Measured by Galactic Rotation | Cycles, not planetary years |
| year-zero | sundial | #1A1712 | #D2B98A | Year Zero | The events of 2826 UCSD |
| post-teleport-ascension-stress-disorder | fold | #16202A | #A9C4C9 | A Medical Corps-Recognised Condition | Distinct from ordinary post-jump fatigue |
| knarr-line | chevron | #1B2230 | #B8C7D6 | Belt Shipping and Ice-Mining Cooperative | Old enough to have helped write the first navigation treaty |
| federation-of-sentient-beings | rings | #1A2426 | #A8CDB9 | A Multi-Species Cooperative of Worlds | Mutual aid rather than central authority |
| star-rangers-command-hierarchy | chevron | #141A26 | #9FB6CE | The Rank Ladder, Novice to Triumvirate | Two career tracks fused into one chain |
| united-space-consortium | rings | #26201A | #D4B48C | The First Attempt at Interplanetary Governance | And why it did not survive its own contradictions |

---

## 2026-09-03 — the Prismere set regenerated, and Agent Barsik

- **Type:** generation, Gemini 3.1 Flash Image, 2K, 16:9, two variants per
  entry, no reference images (the point was to leave the old motif behind)
- **Ruling it acts on:** Dermot, 11 August 2026 — replace, not upscale; all
  twelve together or none. Prompts of record are the twelve entries under
  *5a* in `images.md`; none is repeated here.
- **Drafted for review**, since every one depicts a place or a species.

**Picks** (variant numbers refer to the `image-out/` run of this date):

| File | Pick | Why |
| --- | --- | --- |
| `prismere-orbital-vista` | re-roll 1 | night as briefed, the grazer small at the ridge edge, the sky doing the work |
| `prismere-glasswood-grove` | 1 | the leaves read as lenses, refractions on the ground |
| `prismere-flowering-glasswood` | 2 | fewer foragers, the blossoms carry it |
| `prismere-luminous-towers` | 1 | lit from the base, roots visible, inhabited without a jellyfish |
| `prismere-glass-spires` | 2 | truly unlit; variant 1 had a glowing river |
| `prismere-driftjellies` | 1 | the ecosystem, not one animal |
| `prismere-umbral-ray` | 2 | dimmer, the unpleasant beat the brief asked for |
| `prismere-twilight-lattice` | 2 | geometry, not aurora; variant 1 leaned on a Milky Way |
| ~~`prismeri-first-wings`~~ | 1 | **rejected by Dermot, same day: still too humanoid.** Parked in `reference-art/` |
| ~~`prismeri-full-wings`~~ | re-roll 1 | **rejected, same reason.** Parked |
| ~~`prismeri-lattice-gathering`~~ | 2 | **rejected, same reason.** Parked |

**The three Prismeri, regenerated the same evening to the body derived from Prismere and confirmed by Dermot** (`species-design.md`, Prismeri section; prompts rewritten in place in `images.md` with a revision note; no reference images, the point being to leave the human frame behind):

| File | Pick | Why |
| --- | --- | --- |
| `prismeri-first-wings` | 1 | hanging inverted, wing-hands working a piece of glass, the spire glowing around it — the workshop posture the page describes |
| `prismeri-full-wings` | 1 | in flight with the Lattice's lines visible and the tendrils streaming, figure in the frame's middle band for the hero crop; variant 2 lost the sky to mist |
| `prismeri-lattice-gathering` | 2 | heads level, one hanging and one perched, Lattice above and forest below; variant 1's spire read as a cathedral |

Lettering check passed on all three. **One thing for Dermot's eye:** a level-spined membrane-winged flier with a long head inevitably shares a silhouette with the wyvern of fantasy art; the derivation produced the shape from Prismere's physics rather than from the trope, and the facet band, the free fingers and the hanging posture are what keep it its own — but it is the trope-adjacent result the body plan implies, and worth a look at full size.
| `prismere-root-mat-network` | 1 | the network is the subject, towers secondary |
| `agent-barsik` | re-roll 1 | no screens; variant 2 had a telephone |

**Three prompts revised on the day, recorded in place in `images.md`:**
`prismeri-full-wings` (one variant came back as a labelled PRE/POST
comparison sheet, the other as two figures — now insists on a single
individual and bans the diagram layout); `agent-barsik` (asked for
"terminals" and got wall-to-wall monitors — the scene changed, per the
lettering-ban-cannot-beat-the-scene rule); and `prismere-orbital-vista` was
briefly given a no-animals negative in error, then restored, because the
prompt asks for the grazer as a scale figure and the re-roll honoured it.

**Lettering check:** passed on every filed image. The old motif check
passed too: no jellyfish-and-spire repeat across the eight locations.
