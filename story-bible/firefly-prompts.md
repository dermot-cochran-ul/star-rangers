# Firefly prompts — replacements for the unsuitable images

For regeneration in the Firefly web app at firefly.adobe.com. Claude Code has no
text-to-image tool, so these have to be run by hand; hand the outputs back and
they'll be resized, renamed and PR'd.

**These replace rather than upscale.** The earlier plan was Super Resolution on
the under-spec files. That's off — the low-quality originals aren't being reused,
so the prompts below are written to be *better than* the originals, not faithful
to them. In particular the Prismere series deliberately diverges: the old set
repeated one jellyfish-and-crystal-spire motif across eight distinct named
locations, and that was the second complaint against it after resolution.

## Running these

- **Aspect.** Firefly offers square, landscape, portrait and widescreen presets.
  Pick the nearest to the target below and crop to spec afterwards. Note the
  originals are 768×1152 — a 2:3 ratio Firefly doesn't offer as a preset, which
  is the strongest evidence they came out of a different tool.
- **Target sizes.** Lore images: 1600px long edge. Character portraits: 1200×675.
  Generate at the largest Firefly offers and downscale — never up.
- **Character portraits are 16:9 landscape, not portrait.** Corrected 28 July
  2026 after checking the CSS: `.character-portrait` is
  `aspect-ratio: 16 / 9; object-fit: cover; object-position: center 30%`,
  max-width 420px. Every earlier line in this file saying "Portrait 3:4,
  1200px wide" was wrong — the existing 512×1024 and 768×1022 files have been
  getting sliced to a thin horizontal band, which is part of why they read
  badly. **Use Firefly's widescreen preset** and deliver 1200×675. Lore images
  render as `.page-hero-image` (full width, 320px tall, cover) — wide is right
  there too.
- **Generate 4, keep 1.** Vary the seed rather than the prompt between attempts;
  change the prompt only when the whole batch misses.
- **House style bans.** No flat studio backdrops. No glamour lighting. No text or
  lettering anywhere in frame. Characters belong in a place, not against a
  gradient. The audit already flags a 13-file cluster for exactly this.
- **Firefly won't render real-person likenesses.** Describe features and bearing;
  never name an actor or a real person.
- **Alt text is the prompt.** Whatever you keep, its alt text must describe what
  the frame actually shows — that mismatch is what caught the Trígrian swap.

---

# Recorded composites

## trigrian-triple-sunset.jpg — 26 Jul 2026
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

---

# Recorded generations

## new-london-space-habitat.jpg — 26 Jul 2026
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

## prismere-root-mat-network.jpg — 29 Jul 2026
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

---

# A. Prismere — eight locations, eight distinct looks

The point of this set is that Prismere's biosphere makes its own light. Each
location differs in **where that light comes from**, and the prompts below make
that the variable. Shared preamble, then the per-image body.

**Shared preamble** (paste before each):

> Silicate-carbon biosphere: living tissue built from glass and crystal rather
> than wood and chitin. Painterly science-fiction concept art, high detail,
> naturalistic rather than decorative. No text, no lettering, no human figures.

**Shared negative:** cartoon, poster, logo, watermark, text, oversaturated neon,
generic sci-fi cityscape.

### prismere-orbital-vista.jpg — the establishing shot
Landscape 16:9, 1600px wide.
> Wide high-altitude vista of a crystalline world at night seen from a ridge. A
> dense planetary ring plane cuts across the sky at a steep angle, with two
> neighbouring ringed worlds visible as discs rather than points, and seven small
> moons scattered at varying distances. Far below, the crystalline forest canopy
> glows faintly in shifting colour washes, bright enough to read the terrain by.
> A single armoured, spike-shelled ground grazer in the near foreground gives
> scale against the enormous sky. The land is lit from below by the forest, and
> from above by ringlight. Cold, vast, quiet.

*Change from the old version:* was a creature portrait. Now it is the **wide
establishing shot** the entry's lead image should have been — the whole point of
the paragraph it illustrates is that the sky is crowded.

### prismere-glasswood-grove.jpg — light caught and re-emitted
Portrait 3:4, 1600px tall.
> A stand of slow-growing trees with translucent crystalline bark and broad
> glass-like leaves, in daylight under a banded gas giant low on the horizon. The
> leaves work as lenses: each catches the pale daylight and re-emits it as a soft
> colour wash along its own length, so the foliage glows more brightly than the
> sky that feeds it. Sunlight refracts through the canopy into scattered spectral
> patches on the forest floor. Botanical clarity, closer to a naturalist's plate
> than a fantasy scene.

*Light logic:* borrowed and re-emitted. Daylight, not night — the entry says the
forests glow *before* the sun sets.

### prismere-flowering-glasswood.jpg — the same trees, in flower, at night
Portrait 3:4, 1600px tall.
> The same crystalline forest at full night, in flower. Translucent blossoms open
> along the branches, each lit from within in warm amber and pale rose, the only
> warm colour in a cold blue-green scene. Small many-legged foraging animals move
> across the ground beneath, their shells catching the blossom light. Intimate
> scale, low viewpoint, shallow depth of field.

*Divergence:* deliberately the night-and-close counterpart to the grove above.
Same organism, opposite conditions — a pair, not a duplicate.

### prismere-luminous-towers.jpg — lit from within, shared root
Portrait 3:4, 1600px tall.
> A loose colony of tapering mineral towers rising from a forest floor, each lit
> from deep inside with amber light that is brightest at the base and fades
> upward, revealing they are fed by a shared root network under the ground rather
> than each glowing on its own. Irregular spacing, varied heights, organic
> rather than architectural. Dwellings have been shaped into the towers'
> lower structure — subtle, load-bearing, easy to miss at first glance.

*Light logic:* internal, shared, fed from below. *Divergence:* this is the
**inhabited** image of the set — settlements built into the stand, per the entry.
Drop the drifting jellyfish entirely; it belongs to the driftjelly image.

### prismere-glass-spires.jpg — no light of its own
Portrait 3:4, 1600px tall.
> Tall fused-silica spires on a bare high-elevation ridge, far above the tree
> line, with no glowing forest anywhere near them. These structures produce no
> light of their own — they are dark glass, visible only as silhouettes and as
> thin lattice veins catching starlight from behind. A spiral galaxy is clearly
> visible edge-on in the black sky above. Stark, cold, mineral. The contrast with
> the luminous lowlands is the subject.

*Light logic:* none — borrowed from the sky alone. *Divergence:* the one image in
the set that is **not glowing.** That single decision does more to break the
sameness than any amount of colour variation.

### prismere-driftjellies.jpg — the aerial ecosystem
Landscape 4:3, 1600px wide.
> Translucent gas-bladder animals drifting high on a thermal in a dense,
> particulate-thick sky, seen from below and slightly to the side. They trail
> long luminous feeding tendrils that filter spore and dust from the air. The air
> itself is visibly thick — hazy, full of suspended matter, with light shafting
> through it. A golden ring system arcs behind them. The animals are unhurried
> and harmless. Low gravity is evident in how slowly everything moves.

*Divergence:* make the **air** the subject. This is the image that has to sell a
genuinely aerial ecosystem rather than merely a flying one.

### prismere-umbral-ray.jpg — the predator
Landscape 16:9, 1600px wide.
> A large silent gliding predator with a broad, taut, biomechanical-looking wing
> structure, riding a thermal at dusk in a dim sky. Seen from below and behind at
> a distance, unaware of the viewer, hunting. Below and far off, a drifting
> colony of luminous gas-bladder animals it has not yet reached. Darker, colder
> and more sparse than the rest of the world's imagery — muted greys and deep
> blues, almost no bioluminescence in frame. Silence and intent.

*Divergence:* the tonal outlier. Everything else in the set is beautiful; this
one should be unpleasant to look at for a beat before you work out why. Restraint
— the entry says it kills people and observes a dusk curfew because of it.

### prismere-twilight-lattice.jpg — the sky phenomenon
Portrait 3:4, 1600px tall.
> Night sky above a crystalline landscape, dominated by the sky itself: faint,
> mathematically precise geometric figures traced across the whole visible
> hemisphere — straight lines, clean arcs, closed polygons, at exact angles, like
> a drafted diagram rendered in pale light. This is geometry, not aurora: no
> curtains, no billowing, no organic drift. The figures are thin, exact, and
> unmistakably constructed. The dark landscape below is a low silhouette,
> present only to give the sky something to sit above.

*Divergence:* the sky is the subject and the landscape is nearly absent — the
inverse framing of every other image in the set. **This is the one most likely to
go wrong.** Generators reach for aurora on any "glowing sky" cue. If a batch
comes back with curtains and ribbons, add: *"technical diagram, ruled lines,
geometric construction, protractor angles"* and push harder.

---

# B. Prismeri — one people, two bodies

The set has to make the two life stages read as **the same person at two points
in one life**, since the founding anecdote is that contact teams filed them as
two species. Structural continuity: same skull-ridge segmentation, same eye
placement, same number of limbs.

**Shared preamble:**

> Sapient alien people, silicate-carbon physiology, winged humanoid but clearly
> not human — proportions, joint structure and head shape all wrong for human in
> specific ways. Dignified, intelligent bearing. Concept-art character study,
> full or three-quarter figure, in an environment. No text.

### prismeri-first-wings.jpg
Portrait 3:4, 1600px tall. (Lore image, not a character portrait — the 16:9
`.character-portrait` rule below does not apply to it.)
> Slender, light-boned winged figure with translucent gossamer wing membranes and
> a soft, matte, still-hardening exoskeleton in grey and violet tones. Built for
> agility in tight spaces rather than power — narrow frame, long limbs, low
> mass. Standing alert in a crystalline forest clearing at night, mid-scouting,
> a dark moon and a distant ringed planet above. **An adult, not a child** —
> composed, competent, unhurried.

### prismeri-full-wings.jpg
Portrait 3:4, 1600px tall. (Lore image. Also the hero of `src/lore/prismeri.md`,
so it is additionally cropped to `.page-hero-image` — keep the subject clear of
the top and bottom thirds.)
> The same species after an irreversible metamorphosis: hardened gold-and-blue
> chitin plating in place of soft exoskeleton, heavier and broader through the
> shoulders, with strong load-bearing wings built for sustained high-altitude
> flight. Long motile sensory tendrils grow from the skull ridge, dense with
> visible crystalline structures. Standing among crystalline flora beneath a
> banded planet, head slightly raised, tendrils extended — reading something in
> the sky that isn't visible in the frame.

*The tendrils are the character.* They're the organ the astrogation guilds exist
for. Give them presence.

### prismeri-lattice-gathering.jpg
Landscape 4:3, 1600px wide.
> Two individuals of the same alien species facing each other in conversation:
> one slender with gossamer wings and soft grey-violet exoskeleton, one heavier
> with gold-and-blue plating and long sensory tendrils. The size and structural
> difference between them is obvious at a glance, but they are clearly kin —
> same head structure, same stance, meeting as equals rather than as senior and
> junior. Above them, precise geometric figures traced across the night sky.
> Luminous drifting fauna at a distance.

*Hardest image in the set,* because it has to carry "two forms, one people, no
hierarchy" in a single frame. Equals — no looking-up-at, no deference.

---

# C. Character portraits

All four currently sit under spec and get replaced outright.

### tissadelle-shepherd.jpg — do first
Landscape 16:9, 1200×675. **Rewritten 28 July 2026** against Dermot's
character notes of the same day — see *What this prompt is carrying* below
before running it.

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
as a leader.

That is why the 26 July attempt failed and why it wasn't only a lighting
problem. Beauty lighting and a to-camera gaze frame a subject as presenting
herself for approval; her whole character is that she does not. The two
changes that matter here are **her attention goes off-frame onto her work**,
and **nothing in the image invites the viewer**. Her solitude should read as
chosen and unremarkable — never as loneliness, never as a gap waiting to be
filled.

Two guardrails on the wording:

- **Don't reach for *beautiful*, *striking*, *alluring*, or *lonely*.** If a
  batch still comes back as a headshot, push harder on *documentary*,
  *candid*, *available light*, and name the task she's doing.
- **This is Tissadelle, not a type.** Dermot was explicit that he doesn't want
  it made into a stereotype about female leaders. Don't carry this register
  over to the story's other women in command.

**The interiority — hint, don't show.** Her inner life is populated, not empty:
fantasies, AI virtual companions, and internal headmates including tulpas and
plural subsystems. That complexity is precisely what qualifies her for a
noogenic seed mind, so it reads as a qualification and never as pathology,
instability or spectacle. A literal depiction of headmates tips straight into
the horror register the tone guardrail rules out. Keep the main portrait
outwardly plain and let the interiority stay unstated.

*Optional variant, harder, generate separately:* the same frame but she is
working at a dark instrument panel whose glass carries **two or three quiet
reflections of her at slightly different angles** — ordinary equipment
reflections, evenly lit, nothing ghostly or doubled-exposure. This is the one
image in the set that gestures at the plurality, and it only works if it stays
mundane. Discard any result that looks haunted.

*Optional variant, easy:* same woman on a hillside flock-holding in wet upland
country, off duty. Her home ground on Tír na nÓg is now load-bearing in
Season 5.

### agent-barsik.jpg
Landscape 16:9, 1200×675.
> A black cat seated squarely on a untidy stack of printed paperwork on an office
> desk, wearing a small worn metal badge on his collar. Institutional station
> office behind him — filing, terminals, fluorescent light. He is looking
> directly at the viewer with complete composure, entirely unbothered, as though
> he has been interrupted rather than caught. Photographic, warm practical
> lighting, no whimsy and no costume beyond the badge.

*The joke is the deadpan.* Everyone assumes he's the station mascot. Don't let
the image wink.

**Attempt of 28 July 2026 — right cat, wrong on the lettering ban.** The pose,
the office and the deadpan are all correct. But the frame is full of readable
text: "CASE FILES", "LOGS" and "REPORTS" along the binder spines, "STATION
INCIDENT REPORT — LOG 41" across the papers, and garbled pseudo-text on the
collar tag itself. The house style bans text or lettering anywhere in frame,
and generated lettering always comes out subtly wrong on close reading.
Regenerate with *"no text, no labels, no writing on any surface; binder spines
and paperwork blank; the collar tag plain and unengraved"* — the badge should
read as a worn metal disc, which also suits a character whose whole point is
that nobody has ever asked what it authorises.

### bubochka.jpg
Landscape 16:9, 1200×675.
> A fluffy white rabbit sitting inside a large brown ceramic mug filled with pink
> and white marshmallows, more marshmallows scattered on the plate beneath.
> Absurdly, disarmingly cute. Photographic, soft natural window light, shallow
> depth of field. Played completely straight — a real photograph of a real
> rabbit in a mug, not an illustration.

*Keep the existing alt text's scene exactly.* It's already well described and
the comedy depends on the specificity.

### bubochka-alert.jpg
Landscape 16:9, 1200×675.
> The same white rabbit, out of the mug, standing bolt upright on her hind legs
> with both ears fully raised, staring intently at something outside the frame.
> Body tense, absolutely still, caught mid-alert. Same office environment and
> lighting as the seated portrait so the two read as one animal photographed
> twice. Photographic and unstyled.

*This is the pair image where the joke turns.* Same rabbit, suddenly working.
Consistency of setting between the two is what sells it.

**Attempt of 28 July 2026 rejected — the pair read as two different rabbits.**
Three mismatches, in order of damage: the seated rabbit is a **lop** with ears
folded flat against her head while the standing one has **fully upright ears**;
the standing one is *in* a mug rather than out of it; and the mug and setting
changed too (brown glazed mug, saucer and marshmallows on a kitchen table
versus a white speckled mug on a desk with pot plants, books and a lamp). Any
one of those is survivable. Together they break the only thing the image has
to do.

Regenerate the **alert** frame to match the seated one, not the other way round
— the seated version matches the existing alt text exactly and that text is
staying. Add to the prompt: *"a lop-eared white rabbit, both long ears folded
down flat against the sides of her head"*, and name the same brown glazed mug,
saucer and kitchen table. Firefly defaults to upright ears unless the lop is
stated outright, so state it in every attempt.

### dorian-calloway.jpg — Chief Commissioner, Orbital Habitats Compact — DONE 29 Jul 2026
Landscape 16:9, 1200×675. Was 1200×800 at 44 KB — both off-spec (sliced by
`object-fit: cover`) and under-quality. One of the thirteen files in the
contemporary-stock-headshot cluster in `images.md` § 3, and the first of that
cluster to be replaced.

> Documentary photograph, available light, candid. A man in his late fifties,
> senior civil administrator, standing on the coordination floor of an orbital
> habitat administration centre, half-turned from a bank of wall-mounted status
> displays as though interrupted mid-shift. Business dress worn like a long day
> rather than a photocall — jacket open, tie loosened, sleeves turned back, a
> small plain metal pin at the lapel. Composed, unhurried, faintly tired;
> attention still partly on the displays. Behind him the displays show abstract
> orbital ring diagrams, engineering telemetry traces and schematic floor plans
> as pure graphics — shapes, curves and line work only. Working clutter on the
> desks below: printouts, cabling, a cooling drink. Functional overhead light,
> natural skin texture, no retouching, shallow depth of field.

**Negative:** text, lettering, numerals, labels, signage, writing on any screen
or surface, uniform, military uniform, police uniform, epaulettes, rank
insignia, badge with visible engraving, flat studio backdrop, glamour lighting,
corporate headshot, posed to camera.

**Why no uniform** — settled 29 July 2026. The post is *administrative rather
than operational by design* and Calloway explicitly cannot direct a habitat
Commissioner's policing decisions; a service uniform would assert command
authority the character page spends its length denying. His remit also spans
engineering operations, public safety *and* law enforcement, and each has its
own uniform tradition — any one of them narrows him to a third of the job and
invites the "top cop" misreading. The surrounding cast already carries this:
Voss, Wayland and Petrakis are civilian, Oyelaran is plainclothes, and Larsen's
navy flight suit is the single uniform in the cluster, marking him as the
operational one. There is also no Compact uniform in canon —
`src/lore/rank-insignia-and-uniform.md` covers Star Rangers only — so inventing
one is new canon that would have to cascade to all five habitat Commissioners.
Let the *room* carry the breadth instead of a costume.

**Watch the lettering.** Putting him in front of status boards invites exactly
the failure that killed the 28 July Agent Barsik attempt. State the
graphics-only requirement in the body as well as the negative, and reject any
frame with readable glyphs on a display.

**Alt text to use if the frame matches:**
"Chief Commissioner Dorian Calloway on a habitat coordination floor, jacket
open and sleeves turned back, half-turned from a bank of displays showing
orbital diagrams and engineering telemetry."

---

# D. Aldera gallery — field-photo-03 and -04

**Check before generating.** `field-photo-01` and `-02` are 736×1024 and read as
photographs of a real kitten in a boat. If those are your own photographs, then
generating 03 and 04 puts AI images in a gallery beside real ones, and the
mismatch will show. Two better options in order of preference:

1. **Re-crop from your own originals** — the alt text describes a tabby-and-white
   kitten among yellow flowers, and beside a blue flower. If those frames exist
   on the F: drive, this is a crop job, not a generation job, and it matches 01
   and 02 perfectly.
2. Retire 03 and 04 and run the gallery with two images.

If you do want them generated, match 01/02's look rather than the prompts' usual
register:

> Close-up photographic portrait of a tabby-and-white kitten with blue eyes,
> outdoors among yellow wildflowers, late afternoon sunlight, shallow depth of
> field, natural colour. Candid pet photography, not studio.

and the same again with *"beside a single blue flower"*. Portrait 3:4, 1200px.

---

# E. noogenic-seeding-system.jpg

Currently 1200×614 — a banner crop unlike anything else in `lore/`.
Landscape 4:3, 1600px wide.
> A vast field of stars and nebulae, deep and layered, with a sense of enormous
> distance — and at its centre something small, dense and structured: a compact
> point of organised light with visible internal architecture, clearly not a star.
> The scale relationship is the subject: something very small carrying the
> information a very large thing will be built from. Cosmological, contemplative,
> no figures, no text, no lettering.

*The entry is about a mind compressed into a seed that starts a universe.* The
current image is a generic starfield; the seed should be visible in it.

---

# F. highland-sentinel-lizard — creature element only

Not a full regeneration. The plate is your Roques de García photograph, now
re-processed and much sharper, and the composite should be rebuilt onto the new
crop. If you want a cleaner creature element to mask in:

> A large monitor-lizard-like reptile in three-quarter view, climbing, body
> angled upward, long tapering tail trailing behind and down. Even overcast
> daylight from the upper left, matching a clear high-altitude sun. Plain neutral
> background for cutting out. Dry, matte, dusty scale texture in muted grey-brown
> — no gloss, no wet look, no rim lighting.

Match the light direction to the plate before generating, or the mask will never
sit right no matter how good the edge is.
