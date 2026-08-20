# Prompt sheet — the paste queue

Everything currently waiting to be generated, in paste-ready form. **This file is
disposable and derived.** The reasoning, the rules and the record all live in
[`images.md`](images.md), [`music-prompts.md`](music-prompts.md) and
[`video-prompts.md`](video-prompts.md) — this is only the queue, so that
regenerating a batch does not mean reading three runbooks first. Strike an item
when it is done and record the result in the runbook that owns it.

**Two rules that apply to every item and are the reason most of this queue
exists:**

1. **No words inside the picture.** Every card below is generated wordless and
   titled afterwards. Four of the supplied cards broke on this — *Healng*,
   *Sleeep*, *ooroting*, *aa' Star Rrarles*, *superical* — and no generator will
   stop doing it.
2. **The house target** — enigmatic and haunting, with beauty, mystery, hope and
   serenity, and now *dramatic* for anything a listener chose to play. Unsettling
   is fine; horror is not.

---

## Part 1 — Recreate

Eight items. Audio is fine in all of them; it is the card that fails.

### 1.1 *Ballad of the Stars* — card

Wrong band, garbled caption. This is the canonical Slipwave card and the one to
get right first, because three other items can reuse it.

> A three-piece band playing in a dock-adjacent common room aboard a space
> habitat. A red-haired woman in her twenties singing into a single shared
> microphone, a man behind her on hand percussion, a second man seated with a
> stringed instrument. Working clothes, not stage clothes. Fluorescent overhead
> light and one work lamp. A dozen people on crates and mismatched chairs, close
> enough to touch the players. Scuffed deck plating, cable runs, a bulkhead door
> standing open. Warm, unpolished, small. Nobody in the room thinks this is going
> anywhere.

**Negative:** stage, crowd barrier, arena, spotlights, smoke, matching outfits,
leather stage costume, electric guitars, drum kit, video wall, text, lettering,
watermark.

**Then composite:** *Ballad of the Stars* — and note the designed-cover question
in `video-prompts.md` before adopting a photographic card at all.

### 1.2 `StarRangers_3` (3:49) — identity first, then card

Captioned as the Ballad and is not the Ballad. **Decide what it is before
generating anything**, because the card follows the answer:

- *A Slipwave track* → use 1.1.
- *An unattributed song that circulated* → the card below.
- *Not story material* → nothing here applies; give it a card you simply like.

> A crew compartment aboard a station, empty of people. A stringed instrument
> propped against a bunk, a set of headphones on a fold-down table, a duffel bag
> half unpacked. One overhead light on, the corridor beyond it dark. Nothing
> being played, everything recently played. Warm and lived-in.

**Negative:** as 1.1, plus figures, faces.

### 1.3 `StarRangers_3` (1:44) — same decision, third card

If it turns out to be a muster-sung piece rather than a recording:

> Twenty young people in dark service dress standing close together in a large
> hard-walled hall, singing, seen from within the group at head height. Faces in
> profile and half shadow, overhead industrial light, no stage and no audience.
> Ragged, communal, unposed.

**Negative:** as 1.1, plus conductor, sheet music, choir robes, altar.

### 1.4 `InnerSpaceBloom_3` — card

Garbled lettering, and *"Live Concert Recording"* claims a provenance the file
does not have. Drop the claim; the card does not need a person in it at all.

> Total darkness with one small point of warm light off-centre, beginning to
> acquire structure — filaments, a faint spiral, a shell — as though something is
> organising rather than exploding. Immense scale implied by how little is
> happening. Deep blacks, one warm source, no debris and no shockwave.

**Negative:** explosion, shockwave, debris, nebula postcard, lens flare, planets,
figures, text, lettering.

**Then composite:** the title, and whatever the recording actually is.

### 1.5 `HoldMeTillDawn_2` — card

Contemporary stage look, off-house. If the song stays a personal piece this does
not apply; if it ships on a domain it needs to look like the rest.

> A viewport in a quiet habitat compartment at the hour before the lights come
> up. Two chairs turned toward it, one of them empty. Cold blue outside, one warm
> lamp inside, the reflection of the lamp doubled in the glass. Nobody in frame.
> Still, patient, unresolved.

**Negative:** stage, microphone, band, crowd, sunrise cliché, silhouetted couple,
text, lettering.

### 1.6 `AshOnTheDoor_3` — card

The worst of the lettering failures — a burned-in lyric caption, garbled and
repeated. The title is already a strong image; use it.

> A closed door in a dim domestic passage, and a smear of grey ash marked across
> the frame by a hand. Cold hearth visible behind, unlit. Worn paint, old wood,
> one weak light source from off to the side. Quiet, deliberate, unexplained —
> a mark somebody made on purpose and did not explain.

**Negative:** fire, flames, horror imagery, blood, handprint-as-threat, symbols,
runes, text, lettering.

**Then composite:** title only. **No lyric caption** — that is the defect.

### 1.7 `AoifeofStars_3` — hold, and a second reading to compare

Not a fix. `src/characters/saint-aoife.md` has no portrait at all, so this would
be the first depiction of her and it waits for Dermot. `images.md` already holds
a different brief, and the difference is the whole argument:

> A woman at the edge of a dark pool at night, looking down at the water rather
> than up at the sky. Red hair, plain woollen clothing of the thirteenth century,
> a thorn tree behind her. Starlight only. **No halo, no glow, no rays, no
> radiance of any kind.** Her expression is uncertain rather than transported.

**Negative:** halo, glow, aura, light beams, ascension pose, stained glass,
religious iconography, ecstasy, text, lettering.

**The point of the difference:** her page is built on her *refusal to claim* what
she saw. A card facing the viewer under stars reads as testimony; a card looking
down at the water reads as doubt. Both are defensible and they are not the same
page.

### 1.8 The shuffle-dance clip — only if it is meant to be canon

Text in frame, arena register, and full gravity — which loses the only part
worth establishing. **Low-gravity shuffle dance is marked in the July intake as
not existing in canon**, so establishing it is a lore decision first. If it is
taken:

> A wide compartment in a habitat's variable-gravity zone, three dancers in
> working clothes with magnetic-soled boots. Movement that could not happen in
> full gravity: a long drift between footfalls, a slow tethered spin, a landing
> that arrives later than it should. Practical work lights, no stage, a handful
> of people watching from the deck edge. Handheld camera at floor level, one
> unbroken take.

**Negative:** club, nightclub, arena, LED wall, neon bodysuits, moving stage
lights, crowd, slow motion, text, lettering.

---

## Part 2 — Fresh, and genuinely needed

Only three things are actually missing from the site. Everything else on this
page is a replacement.

### 2.1 *Half-Light Causeway* — the recording that does not exist

`src/codex/star-rangers-anthem.md` has published lyrics and no audio. **Two
takes**, because the entry's own point is that the song exists in more than one
form. Lyrics verbatim from the entry; invented lines do not enter the repo.

**Take A — the dock recording**

| Field | |
|---|---|
| **Style** | spacer folk, acoustic, live room recording, slow 3/4 |
| **Mood** | reluctant, intimate, unpolished, quietly hopeful |
| **Instruments** | female lead vocal, one acoustic guitar, sparse hand percussion, low whistle on the chorus only |
| **Production** | single microphone in a small room, room tone audible, low structural hum, slight pitch drift on sustained notes, vocal a shade ahead of the beat |
| **Exclude** | studio polish, reverb wash, strings, drum kit, backing vocals, autotune |
| **Form** | vocal, lyrics as published |

**Take B — the cadet muster**

| Field | |
|---|---|
| **Style** | a cappella group singing, field recording, communal |
| **Mood** | ragged, certain, collective |
| **Instruments** | twenty untrained voices in unison, one octave, no instruments |
| **Production** | large hard room, long natural reverb, recorded from inside the group, chorus surer than the verses |
| **Exclude** | choir arrangement, harmony parts, soloist, instruments, applause |
| **Form** | vocal, same lyrics and melody as Take A |

The chorus must sit where a room of non-singers can hold it. A take that soars
is a take that would not have spread.

### 2.2 *Protectors of the Fold* — the polished one

`src/codex/protectors-of-the-fold.md`, same situation. **The house signature is
deliberately absent** — tuning true, no drift, no late pulse. Its absence is the
argument.

| Field | |
|---|---|
| **Style** | anthem, close harmony, studio folk-rock, mid-tempo, march-adjacent |
| **Mood** | declarative, confident, institutional, warm |
| **Instruments** | two male voices in close harmony, acoustic guitar, kit percussion, low sustained pad |
| **Production** | properly mic'd and separated, controlled plate reverb, steady tempo, unmistakable downbeat |
| **Exclude** | room noise, single-mic capture, hum, detune, hesitancy |
| **Form** | vocal, lyrics as published |

### 2.3 *Rotational Hum* — a home, not a prompt

The track and its card both pass. What it lacks is an answer to *what is this* —
site furniture or an in-universe recording with a named author. Nothing to
generate; a decision to make.

### Conditional

- **A Church Space theme.** Only if the fall-through to Celtic ambient is judged
  an omission rather than a decision. Brief in `music-prompts.md`.
- **The four edition themes.** They work. Regenerating is a change to four live
  domains and there is no prompt to regenerate *from*, so it produces new tracks
  rather than better versions of these.
- **The twelve scenes** in `video-prompts.md`, when a moving piece is actually
  wanted. Nothing on the site needs one today.

---

## Compositing the titles

The step every card above ends with, and the one no generator can do.

**Built 20 August 2026.** `scripts/make-codex-cover.ps1` now takes
**`-Underlay <path>`**: it draws the photograph centre-cropped to fill the
square, scrims it in the template's navy — heaviest at the two bands the
lettering occupies, lightest through the middle — and then runs the existing
text pass over the top. So the words are set by the font engine, correct by
construction, and the picture underneath never has to carry any.

    .\scripts\make-codex-cover.ps1 `
        -Underlay art\slipwave-common-room.jpg -Scrim 66 `
        -TitleLines "BALLAD OF THE STARS" `
        -Category "CULTURAL RECORD" `
        -Institution "Eden Space Habitat Collections" `
        -Out src\images\codex\ballad-of-the-stars.jpg

Two things to know before generating a batch:

- **Ask for square images.** The card is 1:1 and the crop is centred, so a 16:9
  source loses a third of its width — and it loses whatever the composition put
  at the edges.
- **`-Scrim` is a percentage, default 62.** Raise it for a busy or bright
  photograph, drop it for a dark one. A motif would fight a picture, so
  `-Underlay` turns the motif off unless you pass `-Motif` yourself.

**Untested on Windows.** It parses clean and the crop and scrim arithmetic are
verified, but this container has no GDI+, so the first real render is yours.
Check the title band on a bright card first — that is where a scrim set too low
will show.
