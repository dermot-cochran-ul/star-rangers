# Music prompts — generation and provenance

The prompt-of-record for every generated or commissioned piece of audio in the
repo, and the house sonic signature they all share. Kept in `story-bible/` so it
ships with the repo but stays outside `src/` and is never published to the site.
Planning note; not rendered.

**Why this file exists.** `src/audio/` already holds five files — four site theme
tracks and one in-universe recording — and **not one of them has a prompt
recorded anywhere.** That is precisely the failure `image-prompts.md` was written
to stop happening twice, and it had already happened again in a medium nobody was
watching. When a theme track needs regenerating at a different length, or a
codex recording needs a second take, there is currently nothing to regenerate
*from*.

**Rule going forward, borrowed intact from `image-prompts.md`:** no generated
audio enters the repo without an entry here.

**Undecided items from this file are indexed in
[`open-questions.md`](open-questions.md)**, so they can be found without reading
this one.

---

## The five existing files: mark the absence, do not invent one

| File | Used by | Prompt |
|---|---|---|
| `celtic-theme.wav` | default edition, "Celtic ambient" | **unrecorded** |
| `fellowship-theme.wav` | Fellowship of Light, "Orchestral fantasy" | **unrecorded** |
| `starquest-theme.wav` | Orbital Five-O, "Sci-fi ambient" | **unrecorded** |
| `pets-theme.wav` | Undercover Pets, "Playful ukulele" | **unrecorded** |
| `ballad-of-the-stars.m4a` | `src/codex/ballad-of-the-stars.md` | **unrecorded** |

Tool, date, model and seed are unknown for all five. **Do not reconstruct a
prompt for them and file it as though it were the original** — the Prismere
cluster's reconstructions are labelled as reconstructions for exactly this
reason, and an invented provenance line is worse than a blank one because it
stops anyone looking further. The prompts below are **new briefs written from
canon**, not recoveries; a regeneration under one of them produces a *different*
track, and that is a decision for Dermot, not a maintenance job.

---

## What governs

### The target

The same line the images run on (`images.md`, 12 August 2026), which already
says *"for images and audio alike"*:

> **Enigmatic and haunting, with beauty, mystery, hope and serenity woven
> through.**

The audio corollary of *"if a prompt reads like a brief for a passport photograph
it fails this"* is: **if it reads like a brief for corporate background music, it
fails this.** Competent, inoffensive, texture-only ambience clears every
prohibition below and still misses the target entirely.

### The tone line

Unsettling is fine, horror is not. In audio the line falls in a specific and
easily-crossed place: **no stingers, no risers, no sub-drops used as threat.**
Those are the throat machinery of the cyber-revenant portrait — they depict the
dark fact rather than hinting at it. A held note that will not resolve is the
approved version of the same instinct.

### The canon boundary

**Music is illustrative; the prose is canon** — the same rule the images carry.
A generated track is an impression of a recording the corpus describes, not a
specification of it, and where a track and an entry disagree **the entry wins and
the track stays**.

With one asymmetry that has no image equivalent:

**The codex entry is the lyric of record.** A song's words are already published,
attributed to a named in-universe author, inside a codex entry — which makes them
*valid-for-their-author* canon in a way an image's alt text is not. So:

- A generated vocal track sings **the published lyrics verbatim**. Generators
  cheerfully invent a bridge; that bridge does not enter the repo, and a take
  that mangles a confirmed line is a defect rather than a variation.
- **A new lyric is a codex draft, not a music prompt.** If a track needs words
  the corpus does not have, that is a new codex entry with an `author`, drafted
  and stopped for review, and the audio waits for it.
- Where an entry marks part of a lyric as **reconstructed scaffolding** (the
  *Ballad of the Stars* verses outside the confirmed chorus and second verse),
  the audio inherits the marking: generating those lines and shipping the result
  quietly promotes best-guess text to a recording the entry then has to be true
  about.

### Where a track may not be generated at all

- **External recordings.** `clan-avalons-anthem.md` and `aethelrock-tir-na-nog.md`
  are filed as *linked, not archived* — real work by a real band, referenced and
  not endorsed. Generating audio for either would fabricate a third party's
  recording and file it beside their name. Never.
- **The Krenyi.** `src/lore/krenyi.md` marks their distance from human music as
  *their* absence, not the archive's, and declines to claim they have no forms of
  their own. A "Krenyi theme" would answer, in a footer player, the one question
  that entry deliberately leaves open. Don't.

---

## The house sonic signature

Every edition's palette differs; the signature underneath does not. Same
arrangement as the stylesheets — `main.css` is the structure and a theme swaps
only the palette — and for the same reason: the domains are one work wearing
different front-of-house, and a listener moving between them should hear that
before they can say why.

Three anchors, all of them already canon, none invented for the music:

1. **The hum.** A habitat rotates and it is audible; unshielded systems leak it.
   Every track sits on a low sustained tone that was never played by anybody.
2. **The drift.** *Slipwave* is named for the pitch drift habitat musicians
   learned to compensate for when that hum reached the sound system
   (`src/glossary/slipwave.md`). So the house signature is a **slow, small,
   uncorrected detune** — a few cents, wandering, never fixed. It is the setting's
   own name for itself, and it is the single most useful instruction in this file.
3. **The forty seconds.** Threshold's clock runs slow and has for eleven years.
   Wherever a track carries a pulse, **the pulse arrives a fraction late and never
   catches up.** Not a stumble — a steady, patient wrongness that a listener
   notices only on the second pass.

### Shared preamble

Paste ahead of any edition prompt below.

> Instrumental. A low sustained rotational hum under everything, like a
> habitat's structure heard through a wall. Slow harmonic movement, long held
> tones, generous space between events. A small uncorrected pitch drift across
> sustained instruments, a few cents wandering and never resolving into tune.
> Where a pulse exists it sits a fraction behind the beat and stays there.
> Recorded-in-a-real-room quality, air and noise floor audible, nothing
> perfectly quantised. Restrained, patient, unhurried. Enigmatic and haunting,
> with beauty, mystery, hope and serenity in it.

### Shared negative

> No trailer risers, no braams, no impact stingers, no horror drones, no
> dissonant stabs. No big cinematic percussion, no EDM build or drop, no glossy
> pop mastering, no sidechain pumping. No spoken word, no vocal samples, no
> lyrics. No whale song. No sitar, no shakuhachi and no theremin used as
> shorthand for "alien" or "space".

### Delivery

- **Loopable**, 90–150 s, no fade in or out, ending on a tone that can meet its
  own beginning. `base.njk` sets `loop`, so a track with a produced ending will
  audibly restart forever.
- **Quiet.** Around −18 LUFS, no limiting for loudness. It is a footer flourish
  under someone reading; a track that competes with the prose has failed
  regardless of how good it is.
- **`preload="none"`** is already set, which is what makes the current 4–8 MB
  WAVs survivable. Keep new tracks well under that — see *Practical notes*.

---

## Ready prompts — site theme audio

One per edition, keyed to the `themeAudio.label` already registered in
`lib/editions.js`, because the label ships to the reader and a track that
contradicts it makes the site wrong in public.

### Default — "Celtic ambient" (`fianilchruinne.com`, GitHub Pages)

The full record's own theme, and the one every unlabelled clone falls back to.
The Celtic here is the **Celtic Union's** — old-world roots carried into vacuum
by people several centuries and many light years from the islands the tunes came
off. Not a tourist reel.

> [shared preamble] Low whistle and a bowed drone over a small wire-strung harp,
> a fiddle entering late and playing almost nothing. Dorian, modal, no cadence
> that fully closes. A single melodic figure stated three times and never
> developed. Ancient instruments in a room that is plainly not on a planet.

> Short style tag: *celtic ambient, low whistle, wire harp, bowed drone, dorian,
> slow, spacious, station hum, detuned, unresolved*

Negative, in addition to the shared: no jig or reel rhythm, no bodhrán driving
anything, no step-dance tempo, no pub session energy.

### Fellowship of Light — "Orchestral fantasy"

The contemplative tier. **Vigil, not liturgy** — the church-space material is an
overlay, a lens laid across the record, and music that sounds like a rite makes
a claim the overlay itself declines to make. Reverent register, no doctrine.

> [shared preamble] Divided strings held very quietly, a small wordless choir at
> the edge of audibility, a low organ-like tone that never articulates. One
> phrase passed between sections, each hand-off slightly out of tune with the
> last. Warm, patient, watchful. The sound of someone keeping a watch through
> the night rather than a ceremony being performed.

> Short style tag: *slow orchestral, divided strings, distant wordless choir, low
> organ drone, hymn-adjacent, restrained, no percussion*

Negative, in addition: no triumphant brass, no hero theme, no timpani swell, no
epic-trailer orchestration, no plainchant quotation, no church bells.

### Orbital Five-O — "Sci-fi ambient"

The young-adult tier and the procedural thread. The only edition allowed real
forward motion — its tagline is *racing to decide what's true* — and the one
place the Hawaii Five-0 echo in the brand name may be heard at all.

> [shared preamble] A taut two-chord vamp under an analogue arpeggio that runs
> the whole length without resolving. A tremolo-reverb guitar figure, wiry and
> reverbed, stating a hook once and leaving. A dry tick keeping time a fraction
> late. Procedural, alert, forward-leaning, cool rather than warm.

> Short style tag: *sci-fi ambient procedural, analogue arpeggio, reverb tremolo
> guitar, two-chord vamp, taut, late tick, no fanfare*

Negative, in addition: no brass fanfare, no surf-rock kit or full drum groove,
no sixties pastiche played straight. The echo is a nod, and a nod held longer
than a moment becomes a costume.

### Undercover Pets — "Playful ukulele"

**The exempt thread**, deliberately off house style: cute, cool and clever, and
weaving melancholy through it is a category error rather than a stylistic
variation. It keeps the hum, because it is the same universe and a station hum
under a ukulele is a joke worth making — but **the drift resolves here.** The
wobble bends and lands back in tune. It is the one edition where the thing that
is wrong everywhere else comes right, and that is the gag.

> Instrumental. Ukulele, brushed kit, upright bass walking, glockenspiel,
> finger snaps, a muted trumpet answering one phrase. Light swing, spy-jazz
> caper energy, small and clever rather than big. A low station hum underneath,
> played straight-faced. Any pitch bend resolves cleanly back into tune. Warm,
> bright, unbothered.

> Short style tag: *ukulele spy jazz, brushed kit, walking upright bass,
> glockenspiel, muted trumpet, light swing, playful*

Negative: no melancholy, no minor-key wistfulness, no ambient pads, no cutesy
toy-piano nursery register (clever, not infantile), no cartoon sound effects, no
meowing.

### Church Space — no theme of its own

`church-space` registers no `themeAudio` and falls through to the default
edition's Celtic ambient. Whether that is a decision or an omission is
**undecided** — see Open questions. Do not resolve it by generating a track.

---

## Ready prompts — in-universe recordings

These are artifacts, not themes. The brief is not "what would sound good" but
**what would this recording actually sound like**, given who recorded it, on
what, and in what room — the audio form of asking whether a codex source could
have known this and would have written it this way.

**All four are draft-and-stop.** A recording attached to a codex entry is
publication-adjacent in a way a footer flourish is not.

### *Half-Light Causeway* — the Star Rangers Anthem

`src/codex/star-rangers-anthem.md` — lyrics published, **no recording exists.**
The entry says no studio master survives and that the text is reconstructed from
three carried copies. So there are legitimately **two takes**, and the difference
between them is the entry's whole point:

**Take A — the dock recording.** Slipwave as they were: three people, one room.

> Spacer folk. Female lead vocal, close and unpolished, slightly ahead of the
> beat. One acoustic guitar, sparse hand percussion, a low whistle on the chorus
> only. Recorded on a single microphone in a dock common room: room tone, chair
> noise, a low structural hum audible throughout, a small pitch drift on the
> sustained notes. Reluctant rather than declarative. Nobody in the room thinks
> this is going anywhere.

**Take B — the cadet muster.** The same song years later, sung by people who do
not know who wrote it.

> The same melody sung unaccompanied by twenty untrained voices in a large hard
> room. Slightly ragged unison, one octave, the chorus louder and more certain
> than the verses. Ambient recording made from within the group, not in front of
> it. No instruments. Reverberant, imperfect, communal.

Lyrics verbatim from the entry. The chorus must sit inside a range a room full
of non-singers can hold — that is the in-world reason it spread, and a take
that soars is a take that would not have.

### *Ballad of the Stars*

`src/codex/ballad-of-the-stars.md` — **an audio file already exists**
(`ballad-of-the-stars.m4a`), and the entry's transcriber's note claims a
listener's capture at the 1:27 mark matches the chorus and second verse line for
line.

**So this one is constrained by a published claim about it.** Regenerating it
produces a recording whose confirmed lines land somewhere else, and the entry
becomes false about its own audio. **Prefer not to regenerate.** If a second take
is wanted anyway, the entry's note is part of the work and gets reviewed in the
same pass.

Brief, if that day comes: same session and same three musicians as Take A above,
slower, more personal, sung to one person rather than a room. Played, not
performed. The entry's own line for the register — *usually while a ship is
overdue*.

### *Baby Universe*

`src/codex/baby-universe-ballad.md` — a video exists; the entry is explicit that
the recording circulates **unattributed, hand to hand**, with no credited
performer.

> One voice, unaccompanied or with a single quiet instrument, recorded on
> whatever was to hand. Imperfect intonation, an audible room, a breath before
> the chorus. Not produced, not mixed, not centred. It sounds carried rather
> than made.

**The arrangement must not smooth the pronoun shift.** The entry says the song
opens in the third person and slips into the first for the chorus, *"so that the
plea is sung in her voice by people who were never in a position to hear it"* —
and that the shift is the whole ballad. So the chorus is a different act of
singing from the verses: closer, thinner, one voice where the verses might have
had more. A take that performs both alike has removed the song.

### *Protectors of the Fold*

`src/codex/protectors-of-the-fold.md` — lyrics published, **no recording
exists.** Ashgrove's own account of why this one is clean: *"we finally had a
mixing booth instead of a dock common room."*

> Two male voices in close harmony, arranged and rehearsed. Guitar and
> percussion properly mic'd and separated, a low sustained pad, a controlled
> plate reverb. Steady tempo, confident diction, an unmistakable downbeat.
> Declarative. Made to sit under the opening titles of a training film, and
> aware of it.

**The house signature is deliberately absent here** — no drift, no late pulse,
the tuning true. Its absence is the arrangement's argument: the glossary already
says this track's diction reads *closer to doctrine than dock-circuit folk*, and
losing the wobble is what that sounds like. Two musicians who have spent decades
playing memorials and musters, recorded properly for the first time, and
something has gone out of it that nobody involved would have named.

---

## Textures, not themes

Material for a scene, a trailer, or a future page — never a footer player, and
never filed as "the music of species X".

### The Undersong

`src/lore/undersong-belt.md` establishes structured, sustained harmonic bands
carried through rock, felt through the body, with excavation and tuning as one
act.

> Sub-bass and low harmonic bands felt more than heard. Stone resonance, long
> sustained partials layered at different ages, no melody and no beat. Several
> harmonic centres coexisting without conflict. Immense, patient, entirely
> unhurried. Nothing struck, nothing plucked — the structure itself sounding.

Two limits. It is **architecture rather than performance** — a burrow-cluster is
judged on how it sounds the way another people judge a façade, which is not the
same as a piece of music. And a human-audible rendering is **a translation and
should be labelled as one** if it is ever published, on the same footing as any
other adaptation in the record: attributed, dated, and never mistaken for the
thing itself.

### Slipwave's cross-species arrangements — not yet

The cross-species translation methodology and the "Drift Engine" adaptive rig
appear in `intake-2026-07-26.md`, **not in published canon** — and parts of that
same block were explicitly overruled (the band never reformed). `slipwave.md`
says nothing about either. Treat it as unwritten: a prompt built on it would
render a fact the corpus has not established.

---

## Entry format

Same shape as `image-prompts.md`, one per generated file:

    ### <filename>
    - **Type:** generation | edit
    - **Tool:** name and version
    - **Date:**
    - **Used by:** edition id / codex entry path
    - **Prompt:** style prompt, verbatim
    - **Lyrics:** codex entry the words came from, or "instrumental"
    - **Negative:**
    - **Notes:** seed, length, take count, loop point, loudness, format

No entries yet. The five files in `src/audio/` predate this file and are
recorded above as absences.

---

## Practical notes

- **Location and wiring.** Audio lives in `src/audio/`, passed through by
  `.eleventy.js` to `/audio/`. A theme track is named in `lib/editions.js` as
  `themeAudio: { label, file }` and rendered by `base.njk` with `controls`,
  `loop` and `preload="none"`. `validateEditions()` throws if the named file is
  not in `src/audio/`, so a typo fails the build rather than shipping a dead
  player — the label is **not** checked against anything, which is why the
  briefs above are keyed to it.
- **`themeAudio` is replaced wholesale, never merged.** An edition override
  supplies both label and file or neither; a new track under an old label is
  exactly the half-overridden state that comment exists to prevent.
- **Nothing checks audio the way `validate-content.js` checks images.** There is
  no unreferenced-file check, no duplicate-bytes check and no stale-slug check
  for `src/audio/` or `src/video/`. An orphaned track sits in the repo
  indefinitely, and two byte-identical tracks under different names would pass
  every gate. Until that changes, **check by hand** when adding or replacing
  audio: grep `lib/editions.js` and `src/` for the filename before deleting
  anything, and after adding, confirm the file is actually named somewhere.
- **Format.** The four themes are WAV, 4–8 MB each. That is heavy for a
  decorative footer element even behind `preload="none"`, and the one file added
  later — the ballad — is m4a. **New audio should be m4a or mp3**, and
  re-encoding the four existing WAVs is a real cleanup with no content risk,
  though it is a live-domain-facing change and so Dermot's call. Logged in Open
  questions.
- **In-body players are hand-written HTML** (see `ballad-of-the-stars.md`), with
  a download link inside the element as the fallback. Copy that block rather
  than inventing a new one; `check-internal-links.js` reads those paths and will
  catch a filename that does not exist.

---

## Open questions

Mirrored into [`open-questions.md`](open-questions.md).

1. **Do the four existing themes get regenerated?** Their prompts are gone, so
   any regeneration is a new track rather than a recovery — a change to four
   live domains' front-of-house, not maintenance.
2. **Does Church Space get its own theme?** It currently plays the default
   Celtic ambient. Falling through may well be right; it has just never been
   decided.
3. **WAV → m4a/mp3 for the four themes.** Mechanical, saves ~20 MB of repo and
   bandwidth, touches live domains.
4. **Recordings for the two unrecorded anthems.** *Half-Light Causeway* and
   *Protectors of the Fold* both have published lyrics and no audio. Briefs are
   ready above; generating either is a draft-and-stop proposal.
5. **Should audio get the bookkeeping images already have?** A duplicate and
   unreferenced check over `src/audio/` and `src/video/` in
   `validate-content.js` is a small script change and would close a gap that is
   currently covered by nothing at all.
