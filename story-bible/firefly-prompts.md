# Replacement prompts — for the under-spec and unsuitable images

> **Superseded in part, 10 August 2026. Read this box before using anything below.**
>
> **1. Generation is no longer manual.** The opening line of this file used to
> say Claude Code has no text-to-image tool. It has one now:
> `scripts/image-prompts.js --generate` runs prompts against the Gemini API
> unattended, and `scripts/image-file.ps1` resizes and files the results. The
> runbook is in [`images.md`](images.md). Adobe's Firefly Services API turned
> out to be an enterprise contract and stayed shut, so the app-specific
> instructions in "Running these" below apply only if you are working by hand
> in a browser.
>
> **2. The tooling cannot see these prompts.** It parses `images.md` only, and
> only bullets of the form ``- **`file.jpg`**`` with the prompt in a blockquote
> beneath. Everything here is in a different shape, in a different file, so
> roughly twenty already-written prompts are invisible to the pipeline. Moving
> one into `images.md` Open work 1 or 5 is what makes it runnable — and because
> an entry counts as *done* while its target file exists, a moved prompt stays
> dormant until the old file is deleted. That deletion is the decision.
>
> **3. Decision resolved, 2026-08-11 (Dermot's ruling): replace, not
> upscale.** Super Resolution is off; `images.md` Open work 2 records the
> ruling, and the runnable copies of the replacement prompts now live in its
> Open work 1 (`agent-barsik`) and Open work 5 (the Prismere/Prismeri set,
> twelve entries) — dormant until the old files are deleted, so regeneration
> stays a deliberate act. Sections A–C below are now the craft record only:
> **edit prompts in `images.md`, not here.** Re-measuring for the ruling also
> found four of the "four under-spec portraits" already replaced at spec —
> see the notes in § C.
>
> **4. One instruction below was wrong and is now fixed everywhere.** The
> "Character portraits are 16:9, not portrait" note in "Running these" is
> correct and was the only place it was written down. It has since been
> promoted into `images.md`'s conventions table, into a comment beside the CSS
> rule itself, and into the generator — which had been producing 3:4 portraits
> until 10 August precisely because this file was the only witness.
>
> **Moved out, 2026-08-11:** the *Recorded composites* and *Recorded
> generations* sections — provenance rather than pending work — now live in
> [`image-prompts.md`](image-prompts.md) § 3, the prompt-of-record file, as
> this box asked. Everything remaining in this file is pending work, gated on
> the replace-versus-upscale decision above.

For regeneration in an image app, or via the pipeline once a prompt has been
moved into `images.md`. Hand the outputs back and they'll be resized, renamed
and PR'd.

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

# A. Prismere — eight locations, eight distinct looks

*Runnable copies migrated to `images.md` Open work 5, 2026-08-11 — edit
prompts there; this section is the craft record.*

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

*Runnable copies migrated to `images.md` Open work 5, 2026-08-11 — edit
prompts there; this section is the craft record.*

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

### tissadelle-shepherd.jpg — SUPERSEDED: already replaced in the repo
**Found 2026-08-11 while resolving the replace-vs-upscale decision:** the repo
already carries a 1200×675 `tissadelle-shepherd.jpg` (landed by 2026-08-06),
so this replacement is no longer pending and the entry was not migrated. The
character notes and guardrails below remain the reference for any future
regeneration.

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
*Runnable copy migrated to `images.md` Open work 1, 2026-08-11, with the
lettering fix below folded into the prompt body — edit it there.*

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

### bubochka.jpg — SUPERSEDED: already replaced in the repo
**Found 2026-08-11, same check as tissadelle-shepherd:** the repo carries a
1200×675 `bubochka.jpg` (landed by 2026-08-06), so this replacement is no
longer pending and the entry was not migrated.

Landscape 16:9, 1200×675.
> A fluffy white rabbit sitting inside a large brown ceramic mug filled with pink
> and white marshmallows, more marshmallows scattered on the plate beneath.
> Absurdly, disarmingly cute. Photographic, soft natural window light, shallow
> depth of field. Played completely straight — a real photograph of a real
> rabbit in a mug, not an illustration.

*Keep the existing alt text's scene exactly.* It's already well described and
the comedy depends on the specificity.

### bubochka-alert.jpg — DONE 29 Jul 2026
Landscape 16:9, 1200×675. **Prompt rewritten 29 July 2026** — the version that
stood here until then asked for *"both ears fully raised"*, which a lop
physically cannot do, and was itself the cause of the mismatch recorded below.
The prompt that worked:

> Documentary-style photograph, available light, candid. A pure white lop-eared
> dwarf rabbit standing bolt upright on her hind legs on a warm honey-toned
> rustic wooden kitchen table, body stretched tall and narrow, front paws tucked
> to her chest, absolutely still and tense, staring intently at something outside
> the frame. The rabbit: dense pure white fur, soft and fluffy; both long lop
> ears hanging down flat against the sides of her head, pale pink inner ear
> showing, never upright; one large round near-black eye in three-quarter view;
> small pink nose; long fine white whiskers. Beside her on the table, a brown
> speckled reactive-glaze ceramic mug and matching saucer, empty, with pink and
> white mini marshmallows spilling across the saucer and scattered over the wood.
> A tall glass of milk behind. A crumpled pale linen cloth to the left. Bright
> window to the right casting soft directional daylight; blurred warm kitchen
> interior behind. Shallow depth of field, warm natural colour. Played completely
> straight — a real photograph of a real rabbit, not an illustration.

**Negative:** upright ears, erect ears, pointed ears, standing ears, rabbit
inside the mug, text, lettering, watermark, illustration, cartoon, studio
backdrop, glamour lighting.

*This is the pair image where the joke turns.* Same rabbit, suddenly working.
Consistency of setting between the two is what sells it.

**The general lesson — Firefly has no memory between generations.** "The same
rabbit" is meaningless to it; continuity has to be carried as literal attributes
in every prompt. Anything a companion image establishes — coat, ear carriage,
eye colour, crockery, surface, light direction — must be re-stated in full, and
any trait the model defaults against (here, lop ears) belongs in the negative
prompt as well as the body. Applies to every paired or series image in this file.

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
