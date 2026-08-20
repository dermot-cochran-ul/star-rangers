# Video prompts — generation and provenance

The prompt-of-record for moving images, and the house motion signature they
share. Third of the family: `images.md` and `image-prompts.md` cover stills,
[`music-prompts.md`](music-prompts.md) covers audio, this covers video. Kept in
`story-bible/`, never published.

**Why this file exists.** `src/video/` holds two files and neither has a prompt
recorded anywhere — the same gap the audio check found on 20 August 2026, in the
one remaining medium. It is worse here in two specific ways:

- **`grok-video-2026-05-10.mp4` is referenced by nothing.** Not by a page, not by
  a template, not by a script. 30 s, 448×672, 4.5 MB, sitting in the repo. An
  unreferenced image fails `npm test`; an unreferenced video is invisible to
  every gate the project has.
- **`baby-universe.mp4` is not really a video.** 4:02 at **1 fps** — one still
  image held over the audio, letterboxed to 854×480 with a third-party
  watermark. It works, and it is 19 MB to show one picture.

**Rule going forward:** no generated video enters the repo without an entry here.

---

## The reference file, read 20 August 2026

`InnerSpaceBloom_3.mp4`, supplied as the current state of the art for this kind
of piece. 854×480, 3:25, **one still frame for the entire runtime**, AAC audio
with a hard shelf at ~16 kHz (so the audio was already lossy before it was
muxed). Same production pattern as `baby-universe.mp4`.

Four things to fix in the next one, in the order they cost:

1. **The lettering is garbled.** The card reads *"Healng. Sleeep."* and
   *"Live Concert oororing"*. This is the failure `images.md` already names —
   a generator cannot spell, which is why every codex title card is built by
   `scripts/make-codex-cover.ps1` instead. **Title text is composited in the
   edit, never generated in the frame.** The generator makes the picture; the
   words go on afterwards, in a typeface, spelled correctly.
2. **480p.** The site's own still images are ~1600 px on the long edge. A video
   at 854×480 is below the standard the pictures beside it already meet. Deliver
   1920×1080.
3. **A still held for three and a half minutes is not a video.** If the piece is
   genuinely one image, ship it as **an image plus an audio player** — exactly
   what `src/codex/ballad-of-the-stars.md` already does, at a quarter of the
   bytes and with the picture at full resolution. Reach for video when something
   moves.
4. **"Live Concert Recording" claims a provenance the file does not have.** Worth
   a decision rather than a fix, and it is Dermot's: this is a site whose whole
   temper is *who says so*, whose codex entries state exactly what each recording
   is and how it reached the archive, and whose fan-work rule turns on the
   difference between referencing and endorsing. A generated track captioned as a
   live recording is the one kind of label the rest of the project is built to
   avoid. Say what it is; the piece loses nothing.

None of that is a judgement on the track, which is not what was asked about and
is not mine to judge. It is a judgement on the container.

**A second file, `RotationalHum_1.mp4`, arrived the same day** — 4:02, same
854×480, same 1 fps still-over-audio pattern, so defects 2 and 3 apply to it
unchanged. Defect 1 does not: **its card is the best of the supplied stills.** A
ribbed black rotor-like form narrowing to a waist, standing on a pale floor with
its own reflection under it, no lettering in the picture at all and the title
composited cleanly by the tool. It is enigmatic without straining, it is a matte
object in real light, and it is exactly what a still should be if a piece is
going to be one. It became scene 11 below.

### The format already has an in-universe reading

Before treating the still-over-audio wrapper as merely a limitation: the record
has already absorbed it. `src/codex/paper-galaxies-audit-dialogue.md` audits a
recovered fragment consisting of *"a single held frame, a singer before a
painted, swirling field of light standing in for a galaxy. Audio: one
performance, repeating"* — which is this production pattern, described from
inside the world, before anyone here called it a defect.

And Sen's verdict on the backdrop is a sharper version of everything above:
*"paper, not physics. It is built to read as cosmos from the audience's seat and
nowhere else. Step around it and there is nothing behind the light."*

That is the house instruction working as intended — a limit of the medium
answered from inside the story rather than shrugged at. **It does not excuse the
fixable things.** A garbled word and a 480p master are errors, and the standing
rule is that a genuine mistake gets fixed rather than diegetically excused. What
the audit earns is the *format*: a held frame over a repeating performance is a
real kind of artifact in this setting, not a shortfall, provided the frame is
worth holding.

**Disclosure about this reading:** I did not hear the audio. Everything above and
in the timed plan below comes from the file's structure, a waveform render and a
log-scale spectrogram — a machine reading, good for where sections start and stop
and useless for whether any of it is any good. Check the plan against your own
ears before cutting to it.

---

## What governs

### The target, and the new word

The standing target (`images.md`, 12 August 2026) is *enigmatic and haunting,
with beauty, mystery, hope and serenity woven through*. Dermot's direction of
**20 August 2026** adds one: **beautiful, enigmatic, haunting, dramatic.**

*Dramatic* is not in the earlier line and does not contradict it — it scopes it.
See `music-prompts.md`'s note on the same direction: **a footer loop and a film
are different jobs.** The loop plays under someone reading and must not compete
with the prose. A video is a thing someone chose to watch, gave three minutes to,
and is looking directly at. Drama is what that attention is for, and withholding
it there is not restraint, it is just quiet.

The horror line does not move. Dramatic means *stakes and structure* — a shape
that arrives somewhere — not shock. Nothing lunges at the camera, and the dark
fact is still hinted rather than depicted.

### The camera is a witness

The strongest rule here, and it comes straight out of how the prose works:
**there is no omniscient narrator anywhere in this project**, only named
viewpoints, each withholding what the others supply. The camera inherits that.

- **No impossible camera.** No drone flight through a sealed hull, no move
  through solid matter, no orbital pull-back that no instrument was in a position
  to take. If no person and no mounted instrument could have been where the lens
  is, the shot is narrating rather than witnessing.
- **The frame knows less than the scene.** Something is usually out of shot, and
  it is usually the thing being reacted to.
- **Instrument footage is a legitimate viewpoint** — a fixed dock camera, a hull
  mount, a survey rig — and often the better one. It is the form the record
  itself would hold.

### Light is diegetic

From `src/lore/narrative-works-and-their-adaptation.md`, which already settles
what audiovisual work looks like in this setting: imagery on matte unlit surfaces
read by ambient light, *"nothing glowing, nothing projected"* — closer to a
scored and illustrated record than to a film. So: **no holographic displays, no
glowing interfaces, no projected UI**, all three of which the 26 July intake
listed among refused tropes, and which every generator reaches for the moment it
hears "spaceship". Light comes from lamps, windows, work lights, stars and fires.

### No text in frame

Not a stylistic preference — see defect 1. No signage, no readouts, no name
tapes, no console lettering, no subtitles baked in. Carry it in every negative
prompt, and composite anything the piece genuinely needs.

---

## The house motion signature

The audio has three anchors and the video shares them, because they are facts
about the setting rather than facts about a medium:

1. **The hum** — everything is on something that is running. A frame is never
   perfectly still: there is always the faintest structural vibration, the kind a
   camera resting on a bulkhead picks up.
2. **The drift** — the *slipwave* signature. Movement is slow, continuous and
   never corrects: a push that does not arrive, a drift that does not settle. No
   locked-off tripod, no snap zoom, no whip pan.
3. **The forty seconds** — where two things ought to be in step, one is very
   slightly behind, and stays behind.

Plus two of pace: **long takes, few cuts**, and **cut on the music's structure,
never on its beat.** A cut on every fourth bar is a promo; this is not one.

### Shared preamble

> Slow continuous camera drift, never locked off and never settling. Long
> unbroken take. Diegetic light only — work lamps, window light, starlight,
> fire; nothing glows that would not glow. Matte surfaces, real materials, dust
> and wear. Deep shadow with detail retained in it. Restrained, patient,
> unhurried, no event arriving suddenly. Cinematic, filmic grain, shallow depth
> of field. Enigmatic, haunting, beautiful, quietly dramatic. 24 fps.

### Shared negative

> No on-screen text, letters, numbers, signage, subtitles or watermarks. No
> holograms, holographic displays, projected interfaces, glowing UI or floating
> icons. No lens flares, no light streaks, no volumetric god rays as decoration.
> No drone flythrough, no crash zoom, no whip pan, no camera passing through
> solid objects. No jump scares, no sudden movement toward camera, no gore, no
> horror imagery. No time-lapse clouds, no slow-motion explosion, no
> hyperspace star streaks. Not a music-video montage, not a trailer.

### Delivery

- **1920×1080, 24 fps** as the default. Vertical 1080×1920 only for a social cut,
  generated as its own frame rather than cropped out of the wide one.
- **Generate 5–10 s clips and assemble.** No current tool holds a coherent
  three-minute take, and pretending otherwise is what produces the drifting-face
  problem. A 3½-minute piece is 20–30 generations, most of them discarded.
- **Cut, do not dissolve, unless the music dissolves.** The house dissolve is a
  slow one across a held tone.
- **Never upscale-stretch a 480p source to sit beside 1080p footage.** It reads
  instantly and it reads as carelessness.
- Keep the surviving clips and their prompts. An assembled piece whose sources
  are gone cannot be re-cut, which is this file's whole subject.

---

## Scene library

Each is a single generated clip, canon-grounded, framed from a viewpoint someone
could have occupied. Paste the shared preamble ahead and the shared negative
behind. **All are proposals** — a video attached to a codex entry is
publication-adjacent, and the scenes touching narrative ground are draft-and-stop.

### 1. The forty seconds

> Two mechanical instrument dials side by side on a worn bulkhead panel in a
> dim station corridor, lit by one amber work lamp. Both sweep hands move
> steadily; one is a fraction behind the other and never catches up. Slow push
> in over eight seconds. Nobody present. Dust in the lamp light.

The premise of the entire work in one shot, and it needs no text to say so.

### 2. Half-light causeway

> A long enclosed dock causeway at half-light, empty, viewed from one end. Wet
> metal floor, handrails, a row of failing lamps down one side, one lamp near
> the far end burning a different colour to all the others. Slow drift forward,
> never reaching the end. Cold blue ambient, one warm source.

Straight out of the anthem's own lines — *every dock has a light it can't
explain*.

### 3. The muster

> A crowd of young people in dark service dress standing close together in a
> large hard-walled hall, singing. Camera at head height **inside** the group,
> not in front of it, drifting slowly past shoulders and faces in profile. No
> stage, no conductor, no audience. Overhead industrial light, faces half in
> shadow.

Pairs with `music-prompts.md`'s Take B. The camera being inside the group rather
than facing it is the shot.

### 4. The empty berth

> A vacant docking berth seen through a scratched observation window at night.
> Mooring clamps open, guide lights still cycling for a ship that is not there,
> a barrier line across the walkway. Static frame with a faint structural
> vibration. One figure out of focus in the foreground reflection, still.

The Ballad's register — hint at the dark fact, never depict it.

### 5. Inner space bloom

> Total darkness. One small point of warm light appears off-centre and begins,
> very slowly, to acquire structure — filaments, a faint spiral, a
> shell — as if something is organising rather than exploding. Extremely slow
> outward drift. No debris, no shockwave, no sound-implied impact. Vast scale
> implied by how slowly it changes.

The uploaded track's own title, and the one scene where the music can be
dramatic without anything being violent. **Note the canon caution:** if this is
ever attached to *Baby Universe*, that codex entry deliberately declines to
resolve whether the song's reading is true, and a picture that shows it happening
resolves it. Keep it abstract enough to remain a song's image rather than the
record's finding.

### 6. The Undersong

> A dark stone chamber cut by hand, dry dust on a level floor. The dust shifts
> and settles into clean geometric standing-wave patterns, then reorganises into
> another. Nothing visible causes it. Slow overhead drift. Faint amber light
> from a single opening.

Shows resonance without putting a Chthonari on screen and without inventing one.

### 7. The Garden Core

> A cultivated terrace inside a rotating habitat, humid air, working lamps
> among green growth, the curve of the floor rising away in the far distance. A
> single leaf falls far too slowly and lands without sound. Handheld drift at
> walking height.

Variable gravity carried by one falling leaf instead of by exposition.

### 8. Prismere

> A silicate-carbon biosphere: living tissue built of glass and crystal,
> bioluminescent throughout, the world producing its own light. Translucent
> forms, soft shifting colour washes, dense particulate haze. Slow drift between
> two crystal masses. No figures.

Deliberately reuses the shared preamble already recorded in `image-prompts.md`
for the Prismere cluster, so the moving version and the stills read as one place.

### 9. Both ends of a fold

> Two shots of the same short length, cut together with nothing between them: a
> ship's running lights receding from a quiet transit marker, then the same
> class of lights approaching a different marker under a different sky. Static
> frames, long holds. Nothing dramatic happens in either.

*Nothing has ever been lost inside a fold, only at the two ends of one.* The
absence of a transit shot is the point, and a generator will supply star streaks
unless the negative forbids them.

### 10. Off the roster

> Close on a hand in service dress at a wall-mounted crew board in a corridor,
> lifting one name plate out of a slot and closing the empty space with a
> finger. No face in frame. One overhead light. Held four seconds after the hand
> leaves.

No lettering: the plate is out of focus or turned away. What it says is not the
information.

---

### 11. The rotor

> A large ribbed metal rotor assembly in a maintenance space, seen side-on from
> a catwalk. Stacked discs narrowing to a waist at the centre, matte black,
> worked and worn. It is turning slowly enough that only the surface texture
> shows it. One caged work lamp, deep shadow behind. Camera drifts a few
> degrees; nothing else happens.

The hum with a body. Shape borrowed from the card art supplied with
*Rotational Hum*, which is the best of the supplied stills and the one that
needs no fixing.

### 12. Listening to the structure

> An engineer in coveralls presses a long metal rod against a bulkhead and rests
> an ear on the other end, eyes closed, entirely still. Corridor lit by one
> failing overhead. Held for eight seconds with no cut and no reaction. Faint
> vibration visible in dust on a nearby ledge.

Diagnosis by ear, which is how a structure is read by the people who live inside
one — and the human counterpart to scene 6.

---

## Card art for a recording

Where a piece really is one held image, that image is doing all the work, and
three of the five supplied cards get Slipwave wrong in the same direction — they
put a small unglamorous band on a big stage. The canon detail is in
[`music-prompts.md`](music-prompts.md); this is the brief that answers it:

> A three-piece band playing in a dock-adjacent common room aboard a space
> habitat. A red-haired woman in her twenties singing into a single shared
> microphone, a man behind her on hand percussion, a second man seated with a
> stringed instrument. Working clothes, not stage clothes. Fluorescent overhead
> light and one work lamp — no stage lighting, no coloured wash, no haze. A dozen
> people sitting on crates and mismatched chairs, close enough to touch the
> players. Scuffed deck plating, cable runs, a bulkhead door standing open.
> Warm, unpolished, small. Nobody in the room thinks this is going anywhere.

Negative: no stage, no crowd barrier, no arena, no spotlights, no smoke, no
matching outfits, no leather stage costume, no electric guitars, no drum kit, no
video wall, **no text or lettering of any kind**.

**And the prior question:** the four Slipwave-adjacent codex entries already
share a designed cover set — gold serif on a dark starfield with a trailing star,
built by `scripts/make-codex-cover.ps1` precisely because a generator cannot
spell. Photographic band art would change that whole set and invalidate four
`image_alt` lines. Worth deciding as a set rather than one cover at a time.

---

## A timed plan for `InnerSpaceBloom_3`

The track's structure as measured from its own waveform and spectrogram —
verify by ear before cutting:

| Time | What the audio does | Scene |
|---|---|---|
| 0:00–0:25 | thin, low, few events | **5. Inner space bloom**, first light only |
| 0:25–0:55 | first fill, harmonics arrive | **8. Prismere** drift |
| 0:55–1:20 | sustained, stable | **6. The Undersong** |
| 1:20–1:35 | thins out | **4. The empty berth**, static, long hold |
| 1:35–2:00 | rebuilds | **7. The Garden Core** |
| 2:00–2:30 | fullest, brightest | **2. Half-light causeway** |
| 2:30–2:50 | peak | **5** again, structure now forming |
| 2:50–3:10 | falling away | **9. Both ends of a fold** |
| 3:10–3:25 | tail, low sweep, fade | **1. The forty seconds**, then black |

Nine clips, two of them the same scene at different stages, which is what gives
a three-minute piece a shape instead of a sequence. Title card composited at the
head over the first hold — set, not generated.

---

## A timed plan for `RotationalHum_1`

4:02, and the more sectioned of the two — a pulse arrives partway through a piece
that starts without one, which gives an edit real hinges to cut on. Same
disclosure: measured, not heard.

| Time | What the audio does | Scene |
|---|---|---|
| 0:00–0:16 | thin, low, almost nothing | **11. The rotor**, dark, barely turning |
| 0:16–0:48 | bed builds, still beatless | **12. Listening to the structure** |
| 0:48–1:18 | **pulse enters** | **1. The forty seconds** — the two dials |
| 1:18–1:36 | fuller | **6. The Undersong**, dust reorganising |
| 1:36–2:08 | sustained, two internal edges | **3. The muster**, one long take |
| 2:08–2:24 | thins out | **4. The empty berth**, static |
| 2:24–2:32 | bright break | cut to black, hold |
| 2:32–3:52 | fullest and longest passage | **5. Inner space bloom**, the whole arc |
| 3:52–4:02 | tail | **11** again, still turning, lights out |

The two hinges are the ones to protect: **the pulse at 0:48**, which should land
on the dials so the mechanism and the beat arrive together, and **the break at
2:24**, which is the one place in either track where cutting to nothing is
better than cutting to a picture.

---

## Entry format

    ### <filename>
    - **Type:** generation | assembly
    - **Tool:** name and version
    - **Date:**
    - **Used by:** page path, or "unreferenced"
    - **Prompt:** verbatim, per clip
    - **Negative:**
    - **Notes:** seed, clip count and lengths, cut points, source clips kept where

No entries yet. The two files in `src/video/` predate this file and have no
recorded prompts; do not reconstruct one and file it as though it were the
original.

---

## Open questions

Mirrored into [`open-questions.md`](open-questions.md).

1. **`grok-video-2026-05-10.mp4` is an orphan.** Referenced nowhere, 448×672,
   30 s, and the only genuinely moving footage in the repo. Find it a home or
   remove it — but removal of anything published-adjacent is Dermot's call.
2. **Should the still-over-audio pieces become image + audio player?**
   `baby-universe.mp4` is 19 MB of one picture. The pattern already exists in
   `ballad-of-the-stars.md`. This changes a live page, so it is a proposal.
3. **Should `validate-content.js` cover `src/video/` and `src/audio/`?** Same
   question the audio file raises, and the orphan above is the evidence for it.
4. **Does *Inner Worlds / Inner Space Bloom* belong to this site at all?** It
   carries no Fian Ilchruinne branding and reads as a separate ambient project.
   If it is a site piece it needs a codex home and a named author like every
   other recording; if it is a separate release it needs no canon check at all,
   and these scene prompts should be treated as a loose library rather than as
   anything the record commits to. Nobody has said which, and the answer changes
   what this section is for.
