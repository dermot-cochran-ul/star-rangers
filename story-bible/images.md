# Images — conventions, open work, prompts

One living document for every image concern. **Replaces four overlapping notes**
(`image-audit-2026-07.md`, `portraits-needed.md`, `firefly-replacement-prompts.md`,
`manual-photo-edits.md`) that drifted out of sync with each other and with the
repo — two of their claims were found false on inspection, so they were retired
in favour of this. Planning note; not rendered on the site.

**Verify before trusting.** Anything here is a snapshot. Check the repo (or run
the commands in "Auditing" below) before acting on a status line, and correct
the line rather than working around it.

**This file stays the runbook and the single place image work is tracked.** What
is *undecided or awaiting a look* is additionally indexed in
[`open-questions.md`](open-questions.md), so it can be found without reading
1,300 lines — the lost emblem-card recipe, the card-style inconsistency, the
open-questions block below, and the two competing abstract-emblem prompts. Add a
line there when something here becomes a decision rather than a task.

---

## Conventions

| | |
|---|---|
| Location | `src/images/<characters\|lore\|codex\|hero>/` |
| Lore & hero | ~1600px long edge, JPG quality ~85 |
| Character portraits | **1200×675 — 16:9 landscape**, not portrait (see below) |
| Codex entries | designed dark-gradient **title cards**, not photographs |
| `image_alt` | must describe what the file *actually shows* |

**Audio has its own runbook now.** This file stays about images;
[`music-prompts.md`](music-prompts.md) carries the house sonic signature, the
per-edition theme briefs and the in-universe recording briefs, written 20 August
2026 after a check found all five files in `src/audio/` had no recorded prompt.
The target below is shared between them, which is why it is still worded for
both.

**The target, for images and audio alike** (12 August 2026):

> **Enigmatic and haunting, with beauty, mystery, hope and serenity woven
> through.**

Read that as the thing to aim at, not a limit to stay inside. The tone line
below says what to avoid; this says what to reach for, and they are the same
instruction from opposite ends. It rules out a register that breaks no
prohibition at all: flat documentary lighting, blunt literal description, the
merely competent. **If a prompt reads like a brief for a passport photograph it
fails this**, however accurate it is. And **hope and serenity are load-bearing** —
haunting on its own drifts toward the horror line the next paragraph exists to
hold.

**One thread is exempt, deliberately.** *Undercover Pets* is **cute, cool and
clever** — Agent Barsik, Bubochka, Nessa. Do not weave melancholy or mystery
through that thread to match the house style; the contrast is the point, and a
haunting cat portrait would be a category error rather than a stylistic
variation.

**House style for people:** role-appropriate, slightly cinematic, in-world
setting, professional wardrobe. Not contemporary glamour or lifestyle shoots.

**AIs get portraits like everyone else** (12 August 2026, superseding the older
rule that they got an abstract emblem or interface instead of a face — that rule
produced Reeves as *"A laptop displaying a face-recognition hologram"* and the
Eden Warden as *"A facial recognition system interface"*, both since replaced).

The portrait must make the **artificiality visible** — matte shell, seams and
joins, eyes that are plainly optical instruments. This is not decoration. A
generator asked for "an AI" returns a photoreal human face by default, and that
face belongs to nobody and to everybody; it is the same failure as the stock
portraits removed on 12 August, arriving by a different road. Visible
manufacture closes it **at the prompt** rather than at review.

Where a system has several bodies, show **one**. The Eden Warden's Ward and
Custos are two personas in one system, and two figures would literalise them as
two beings — the same mistake ruled out for plural human minds.

**And where canon gives a system no body, the portrait is not a body** — settled
13 August 2026, confirmed and written down here 19 August. This is not an
exception to the rule above; it is the rule's scope. *AIs get portraits like
everyone else* answers **how to depict an AI that has a body**, so that a
generator's photoreal default cannot stand in for one. It was never a
requirement to invent a body for a system that has none.

Three worked cases, all settled the same day in #415:

- **The Eden Warden** — re-briefed on Dermot's direction: *the Warden may not
  have a body at all, other than in the sense that the habitat structure is its
  body.* The portrait became the habitat, inhabited and attended, with no figure
  in it.
- **Reeves (Eden)** — the re-brief that produced the emblem was forced by a
  different problem and landed on the same answer. **The lettering ban cannot
  beat the scene**: a brief describing a case-file interface returns an object
  whose purpose is to carry writing, and the model draws the writing (this one
  came back reading `CASE FILE: ALPHA-7`). The scene had to change, not the
  negative. It became *points of light with some joined and some not — a pattern
  half-found and not yet claimed*, which **suits an intelligence that will not
  volunteer a conclusion better than a dashboard ever did.**
- **Reeves (Threshold)** — made the deliberate twin, because the two Reeves are
  the same model on separate deployments and their pages say so. Same emblem,
  same palette, same restraint, **and the figure further along**: a dense ring
  almost closed and still open along one arc. The difference between the two
  frames is the point and is recorded in both alt texts.

Neither Reeves has a body anywhere in canon — Lucene-9000 is *a mobile AI
humanoid*, and Reeves is *investigative support intelligence*, which is not the
same kind of thing. **So the emblem was the correct answer twice over and is not
a lapse from the 12 August rule.** It was flagged as possibly one during the
19 August audit, and the flag was wrong: the decision is recorded in #415's
commit message and carried consistently into both `image_alt` lines. What it was
never carried into is this file, which is the same failure the rest of that audit
found — *the decision gets made and the note never gets it.*

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

### Settings the prompt text cannot set

- **Aspect ratio is a request field, not prose.** The orientation sentence at
  the end of each prompt does *not* drive it — in an app it is a dropdown that
  defaults to Auto and will happily return a landscape portrait. **Everything
  is 16:9**, character portraits included: `.character-portrait` crops to
  16 / 9 with `object-fit: cover`, so a taller frame loses its edges rather
  than scaling. The prompts still end "Portrait orientation." — that phrase is
  now about *framing the subject*, not the frame's shape, and the scripts
  ignore it in favour of the CSS. Delivered sizes: **1200×675 portraits,
  1600px long edge lore.**
- **Ban lettering in the prompt, every time.** As of 10 August every prompt
  here carries *"no readable text, signage, insignia lettering or written
  characters anywhere in frame"*. It was added because ten of the twelve
  portrait prompts had no ban at all and the first run came back with
  `DOMESTIC ASSIST`, `CASE #KV-8720`, `DOCKING BAY 4 | CREW MESS` and a
  `GATE 14` — the failure the Prompt craft section below has warned about
  since July. A *narrow* ban is not enough either: `galen.jpg` said "no
  insignia lettering" and got station signage instead, because the model
  honoured the letter of it.
- **One exception: Compact settings may show signage on purpose.** [The
  Plainmark](../src/lore/plainmark.md) (settled 2026-08-11) is shapes and
  colour bands rather than script, so there is nothing in it to misspell — a
  model can draw it, and it reads as deliberate design instead of broken text.
  In a Compact-habitat corridor, hatch or cargo scene, carry this clause
  *instead of* a blanket ban:

  > Wayfinding shown only as Compact plainmarks — flat stencilled panels of
  > stacked colour bands in black, slate-blue, bone-white and ochre, carrying
  > simple geometric figures (chevrons, rings, short tally strokes, lozenge
  > diamonds), painted on the fixed frame beside each hatch and at corridor
  > junctions, no readable text, numerals, signage, insignia lettering or
  > written characters of any script anywhere in frame.

  **Scope it, and do not sweep it.** The plainmark is a Compact standard, not
  a universal one — a galaxy-wide sign system would reintroduce exactly the
  convenience the record refuses. It belongs in Compact habitats and nowhere
  else: not on a Martian hillside, not at an Irish chapter house, and not in
  Celtic Union corridors, which are lettered in their members' own languages.
  So far it is carried by two prompts, `galen` and `wendell-albercombe` — the
  two that failed *because of* signage, now specifying it deliberately.
- **Generate large.** `import-image.ps1` resizes on the way in (~1200px
  portraits, ~1600px lore), so 2K costs nothing and leaves room to crop. 4K
  only costs more.
- **Reference images** are the only lever for making a *set* look like a set —
  worth reaching for on the character portraits, where twelve separately
  generated faces otherwise share no house style. **The script sends them
  (2 September 2026).** Give an entry a `References:` line among its prose,
  before the blockquote, naming the files in backticks — repo-relative
  (`story-bible/reference-art/…`) or absolute (a frame in one of the `F:\`
  camera folders):

  > References: `story-bible/reference-art/tissadelle-headmate-2026-08-24.jpg`

  `--generate` sends them as image parts after the prompt; `--next` and
  `--only` print them so the clipboard loop can attach them by hand. A named
  file that is missing fails that entry rather than generating without it — a
  reference silently dropped is a different picture. Gemini 3.1 Flash Image
  takes up to fourteen in one request; the manifest records which were sent,
  and the provenance rule below still applies: name the plates in
  `image-prompts.md`.
- **Photo first, generation last** (Dermot, 2 September 2026: *"AI enhancements
  of or superpositions into original photographs are often more pleasing than
  purely AI generated images entirely from a text prompt."*). The order for any
  new image is therefore: his own photograph as it stands or cropped; his
  photograph as the plate with a generated element composited in or the frame
  extended; generation with his photographs as references; and a pure
  text-to-image result only when nothing of his fits. Run `--catalogue` before
  `--generate` for that reason. He asked the same day whether his photographs
  could act as fine-tuning: not on Gemini, which offers no user fine-tuning —
  references are the lever it has. A LoRA on an open model trained on a few
  dozen of his frames would learn the look, and he has parked that as probably
  too ambitious for now, while noting a separate repo could be opened for it if
  it is ever wanted.
- **Dermot's own photographs may be used as references.** Standing permission,
  11 August 2026: *"any of my existing photos may be used as references for
  image generation, in future, if relevant or needed."* This is the sharpest
  tool available for the two things generation is worst at. **Consistency** —
  one reference carried across a set is what makes twelve separately generated
  faces read as one cast. **Place** — the corpus already stands Irish uplands
  in for alien terrain, and feeding the actual frame as a reference puts *his*
  light and *his* weather into a generated scene rather than a model's idea of
  them. The unpublished archive is the obvious source: Kenya, Tenerife,
  Scandinavia, the Irish material.

  Note the boundary this does **not** cross. A reference informs a generated
  image and the result is still a generated image; it does not become his
  photograph, and the portfolio's own-work-only rule is untouched. The
  distinction is the one *[Where the Record Lives](../src/journal/where-the-record-lives.md)*
  draws — what matters is whose record the picture carries, and a generated
  image carries none either way.
- **Model choice is a decision, not a default.** Models differ in what they
  are trained on and in the terms attached to their output, and these images
  publish on public domains under `CONTENT-LICENSE.md`.

Neither script writes front matter: `image_alt` describes what the file
*actually shows* and cannot be derived from the prompt that asked for it.
Neither merges anything — new portraits and lore images are the repo's *draft
it and stop* tier.

### Episode heroes: thread sets the palette, the episode sets the frame

Settled 2026-08-11. The site fronts four audience tiers — children, young
adult, general, contemplative — mapped to domains in
[`lib/editions.js`](../lib/editions.js). The question was whether images should
be styled per tier.

**They should not, because the tier is already carried by the thread.**
starquest fronts Orbital Five-O and the young-adult tier; the church-space and
fellowship domains front the contemplative tier; sciencefiction fronts the
general tier; fianilchruinne holds everything. So styling by *thread* delivers
the tier for free — no per-tier variants, no machinery to choose an image per
edition, and no image rendering differently on two domains, which would make
one scene read as two to anyone who visits both.

| Thread | Tier | Palette |
|---|---|---|
| Founding Era | general | archival, documentary, muted — the record being made |
| Tissadelle Arc | general | the house style above, unchanged |
| Undercover Pets | young adult | warmer, higher key, animal eye-level |
| Orbital Five-O | young adult | brighter, procedural, busier |
| Church Space | contemplative | quieter, more negative space, light rather than event |

**But the thread only sets the palette. The episode's own subject sets the
frame** — and `s02e03` is the case that proves why the distinction matters.
*The Dark-Down* sits in the young-adult thread, and its hero should not be
styled young-adult on that account: the episode's weight is the dark-down
itself, the valley warden walking it at night, the kept custom. The prose
reaches two bands at once (Bubochka's blocks in the children's band, Sorcha's
carrying the adult weight) and it works — Dermot's own reading, and the reason
a per-tier scheme was rejected. **A chapter carrying two registers is a feature
of the writing, not a problem for the pictures to solve.** Let the prose carry
the register; put the picture where the episode's weight is.

**The unit is the episode, not the chapter.** Chapters do carry `image` /
`image_alt`, but the schema records why: added 2026-07-30 *"for a
social-sharing reason rather than a design one"* — they are Open Graph cards,
not page illustrations. The established practice is one hero per episode
(`s01e00-cat`, `s01e01-corridor`, `s01e02-machinery`, `s01e03-archive`,
`s03e01-radiotelescope`, `s05e02-kerry-hills`). Nineteen episodes exist and six
have heroes, so **thirteen are missing** — a tractable batch. Forty-four
chapter images would mostly be four views of the same room.

### Prompt craft (learned the hard way)

- **Name the sheen, not the substance.** "Stone-textured skin" for a Basaltborn
  produced a golem; describing basalt *iridescence* on chitin produced the
  character.
- **Ban lettering explicitly** ("no readable text, no insignia") or you get
  gibberish name tapes — and once, an entire NYPD squad room with `NYC POLICE`
  case files. **But the ban is a floor, not a fix — see the next bullet, and
  note that this one used to recommend "plain unmarked folders" as its own
  example, which is precisely the shape that fails.**
- **The lettering ban cannot beat the scene** (13 August 2026, #415; the rule
  was recovered and written down 19 August). If a brief describes an object
  whose purpose is to carry writing — a case file, a form, a certificate, a
  departures board, an open notebook, station wayfinding — **the model draws the
  object, and the object has writing on it**, however many negatives are
  stacked against it. The Eden Reeves brief asked for a holographic case-file
  interface and banned lettering in the same breath, and came back reading
  `CASE FILE: ALPHA-7`.

  **So the fix is always to change the scene, never to strengthen the
  negative.** Three moves, in order of preference: **remove** the object (an
  empty desk says more than a desk of blank paper); **close** it (a shut book is
  reliably safe where an open one is not, and a shut book still reads as a
  record); or **substitute** an object that carries meaning without a writing
  surface — a stamped seal, a tally, a sealed case. *Blank* and *unmarked* are
  not scene changes. They are instructions the model cannot follow, because a
  blank certificate is not a thing it has ever seen.
- **State the era**, or the setting defaults to contemporary Earth.
- Small text artifacts can be fixed in-session with a targeted select-and-blur
  rather than a re-roll (worked on a garbled flight-suit name tape).
- **Generate 4, keep 1.** Vary the seed between attempts, not the prompt;
  change the prompt only when the whole batch misses.
- **A generator has no memory between frames.** "The same rabbit" means
  nothing to it; series continuity must be carried as literal attributes in
  every prompt — coat, ear carriage, crockery, light direction — and any trait
  the model defaults against (a lop's ears) belongs in the negative as well as
  the body. Learned on the bubochka pair.
- **Never name an actor or a real person** — describe features and bearing;
  generators refuse or mangle likenesses.
- **Characters belong in a place, not against a gradient** — no flat studio
  backdrops, no glamour lighting; the 13-file stock-headshot cluster in Open
  work 3 is the cautionary example.

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

## Working through the prompts — the runbook

Two local authoring tools — not in the build, not run by CI — that remove
everything around the generating. `scripts/image-prompts.js` reads the prompts
out of *this file*; `scripts/image-file.ps1` resizes and files the results.

**Everything below runs in your own PowerShell window**, not through an
assistant: Start menu → "PowerShell". Then:

```powershell
cd F:\CLAUDE\star-rangers
```

### Step 0 — one-time setup

Node is already installed (the site build uses it). The only thing missing is
a Gemini API key.

1. Go to **https://aistudio.google.com/apikey**, sign in, **Create API key**.
   Self-serve — no enterprise contract, no admin approval. The free tier
   covers a run of twenty-three comfortably.
2. Set it, once, for your Windows user:

   ```powershell
   setx GEMINI_API_KEY "your-key-here"
   ```

   **`setx` only affects new windows.** Close that PowerShell and open a fresh
   one, or nothing below will see the key.

Prefer the environment variable to the file option: it keeps the key off this
drive entirely. `scripts/gemini.local.json` works too (gitignored), but a
secret inside a git working tree is one `git clean` away from gone and one
folder-copy away from travelling. **Never paste the key into a chat, a commit,
or an issue** — if it ever lands in one, revoke it at the same URL and make a
new one.

**One more thing to settle once — PowerShell will refuse to run the `.ps1`
steps as this machine is configured.** `Get-ExecutionPolicy -List` shows
`CurrentUser` and `LocalMachine` both `Undefined`, which means Restricted, and
Step 4 will fail with *"running scripts is disabled on this system"*. Two ways
out, and the choice is yours because it is a security setting:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned   # persistent
powershell -ExecutionPolicy Bypass -File .\scripts\image-file.ps1   # per-run
```

`RemoteSigned` allows local scripts and still blocks unsigned downloaded ones.
This affects `import-image.ps1` and `make-lore-cards.ps1` equally — anything
in `scripts/` ending `.ps1`.

### Step 1 — see what is pending

```powershell
node scripts/image-prompts.js
```

Lists every prompt with a status: **done** (its file already exists under
`src/images/`), **generated** (waiting to be filed), **served** (handed to the
clipboard, not yet filed), **pending**. Nothing is written; run it whenever.

### Step 2 — generate ONE first

Never start a run of twenty-three. One image proves the key, the model name,
the size constants and the network in about ten seconds:

```powershell
node scripts/image-prompts.js --generate --only arilon
```

Expect: a line naming the target and aspect ratio, then `2 image(s)`. The
files land in `image-out\lore-arilon\`. **Open them.** If the API rejects
anything, Google's error body prints in full rather than being summarised —
the text will name the offending field.

### Step 3 — generate the rest

```powershell
node scripts/image-prompts.js --generate
```

Everything still pending, two variations each. Failures are reported per
image and do not stop the run; a failed entry keeps its error in the manifest
and is simply retried next time.

Useful flags: `--variations 4` for more choice, `--size 4K` if you want room
to crop hard, `--model <id>` to try a different one.

### Step 4 — look at what came back, and choose

The whole pipeline exists to leave you exactly one job: deciding which
variation is the one. Browse `image-out\`, then:

```powershell
.\scripts\image-file.ps1 -WhatIf
```

Prints the full plan — every source file against the target it would become —
and changes nothing. **Always run this before the real thing.** Variation 1 is
assumed; override per image (there are two by default, so `=1` or `=2` unless
you passed `--variations`):

```powershell
.\scripts\image-file.ps1 -Pick "lore-arilon=2","characters-naomi-kestrel=2" -WhatIf
```

**Expect to hold some back.** A run is judged image by image, and the manifest
records what was *generated*, never that all of it is good — the first real
run landed seventeen of twenty-three, with five portraits carrying readable
signage and two missing the thing the entry is actually about. `-Skip` holds
those; `-Only` files just the named ones:

```powershell
.\scripts\image-file.ps1 -Skip "characters-jeeves","characters-galen" -WhatIf
.\scripts\image-file.ps1 -Only "lore-arilon" -WhatIf
```

Then drop `-WhatIf` when the plan reads correctly. That resizes each to
convention through `import-image.ps1` (1200px portraits, 1600px lore), files
it under the right name in the right directory, and puts the lot on a new
branch — or use `-NoBranch` to leave them in the working tree.

**What to look for before choosing.** Readable text anywhere in frame is the
commonest failure and the easiest to miss on a contact sheet — zoom before
deciding. Then: does it show what the *entry* is about, or only what the
prompt literally said? Two of the first run's rejects were technically fine
images of the wrong subject.

### Step 5 — the part no script does

1. Add `image` and `image_alt` to each page's front matter. **Write the alt
   text from the file in front of you**, not from the prompt that asked for
   it — that rule is the whole reason the stock images in Open work 6 were
   catchable.
2. Commit, push, open a PR. New portraits and lore images are the *draft it
   and stop* tier: the PR is a proposal.
3. Add a `CHANGELOG.md` entry under `[Unreleased]` if they are going out.
4. When they have landed: `Remove-Item -Recurse -Force image-out`

### The clipboard path — for one image at a time

A browser beats an API for the image you want to nudge by hand, so the app
loop is kept:

```powershell
node scripts/image-prompts.js --next
```

Puts the next pending prompt on the clipboard and prints **which aspect ratio
to set** — the app's dropdown defaults to Auto and will happily return a
landscape portrait, which the prompt text cannot prevent. Paste, generate,
download, run `--next` again.

Then file from the downloads folder rather than the manifest:

```powershell
.\scripts\image-file.ps1 -From "$env:USERPROFILE\Downloads" -WhatIf
```

Here pairing is **positional** — the order prompts were served against the
order files were downloaded, oldest first. It is right as long as you saved
one image per prompt in the order served. **A re-roll you saved twice, or a
prompt you skipped, throws every later pairing off by one**, which is why
`-WhatIf` matters more on this path than the other. Fix any bad pair with
`-Map "lore-arilon=Firefly_abc.png"`; leftover downloads are reported rather
than silently ignored.

### When something goes wrong

| Symptom | Cause |
|---|---|
| `running scripts is disabled on this system` | Execution policy is Restricted — see Step 0. Affects every `.ps1` in `scripts/`, not just this one |
| `no Gemini API key` | Key not set, or `setx` was run and the window not reopened |
| Readable text in the output | The prompt's lettering ban is missing or too narrow. Every prompt should end with the full "no readable text, signage, insignia lettering or written characters anywhere in frame" |
| A 400 naming a field | Bad model id, unsupported size, or a prompt tripping a safety filter — the message says which |
| `response carried no image` | Call succeeded, shape unexpected. The raw JSON is written beside the output |
| `-WhatIf` plan looks shifted | Clipboard path only. Use `-Map`, or `--reset <name>` and re-serve |
| A prompt never appears | It has no blockquote, or its target file already exists — Open work 6 replacements are invisible until the old file is deleted |
| `Nothing to pair` | Downloads older than 24h. Widen with `-Since 72` |

**Why Gemini and not Firefly Services.** Adobe sells API access to Firefly as
an enterprise contract; the Developer Console disables it outright without the
entitlement (*"Your organization does not have a license to access this
API"*), and the Firefly app bundled with Creative Cloud has no multi-prompt
batch mode. Gemini sells the same class of model self-serve — and Nano Banana
is one of the models the Firefly app itself offers — so the unattended path is
available without an enterprise agreement. The key is gitignored and must stay
that way; this repo is public. See `scripts/gemini.local.json.sample`.

**This file stays the source of truth** — the scripts parse it and never write
to it, and there is deliberately no separate queue file to drift out of sync.
Edit a prompt here and re-run. An entry is picked up only if it is a bullet
naming a `` `file.jpg` `` in bold with the prompt in a blockquote under it,
which is how the nine generator title cards below exclude themselves without
being listed anywhere.

---

## Open work

### 0. Replaced with placeholder cards — **22 of the 28 still carded** (re-audited 19 August 2026)

**Six of the twenty-eight have since been replaced with real images and were
never marked:** `petra-voss`, `brother-daire`, `ilsabet-marrowtide`,
`rasa-oyelaran`, `eden-warden` and `reeves`. The remaining **22 are still
PORTRAIT PENDING / ILLUSTRATION PENDING cards** and are still the head of the
queue.

**Method, so a later audit knows what to trust.** A card and a real image are
separable by shape: the cards are all **1600×900 at 52–77 KB**, the delivered
portraits **1200×670 at 96–217 KB**. Two files were then **opened** to check the
inference at both ends — `cormac-dubhghlas` is still a card reading *PORTRAIT
PENDING*, `rasa-oyelaran` is a finished portrait of a superintendent in a bureau
doorway. The measurement located them; opening them confirmed it, per this
file's own standing rule against reasoning from filenames.

*(One thing noticed here and since resolved: `reeves.jpg` came back as an
abstract emblem rather than a portrait, which looked as though it sat oddly
beside the 12 August rule that **AIs get portraits like everyone else**.
**Confirmed 19 August: it is deliberate**, settled in #415 on 13 August and
recorded in that commit — see the qualification added to that rule under
Conventions. The flag was wrong about the decision and right about the file:
nothing in `images.md` said so until now.)*

**This is the head of the queue.** Every image below was removed and replaced
with a designed PORTRAIT PENDING / ILLUSTRATION PENDING card, so no page is
broken and nothing is claiming to be what it is not — but each one now needs a
real image, and none has a prompt written yet.

Prompts are deliberately *not* drafted here. Section 1's history shows why: the
`asteria-the-sage` note produced two wrong portraits because the brief itself
was wrong, and the fix was Dermot restating the character in his own words. That
is authoring, not bookkeeping.

**Tier 1 — real people standing in for characters (15, PR #396).** All were
photographs of identifiable strangers: `cormac-dubhghlas`,
`demelza-trevithick`, `fergus-aonghas`, `idris-bryneth`, `imogen-petrakis`,
`niamh-o-ceallaigh`, `petra-voss`, `rhian-gwynne`, `rhiannon-ceridwen`, `sen`,
`zara-wayland`, `bertram-ashcombe`, `brother-daire`, `ilsabet-marrowtide`,
`rasa-oyelaran`.

**Reviewed one at a time, 12 August (4, PR #398).**

| Image | Why it went | What its replacement has to carry |
| --- | --- | --- |
| `lore/civilisation-comparison.jpg` | A stock photo *of* real family prints — a christening baby, a girl at first communion | Three eras compared. The old photographs were doing real work; the idea of an inherited record is worth keeping without using anyone's actual family |
| `characters/eden-warden.jpg` | A real woman's face resolved under a recognition mesh | A plural habitat AI, two personas in one system. Not a face at all, arguably |
| `characters/reeves.jpg` | Dated stock look (no real person — the screen face is a halftone render) | An investigative intelligence that will not volunteer a conclusion. Restraint, not menace |
| `lore/ynys-wydrin.jpg` | A real Southeast Asian mask-dance costume standing in for a Welsh-named world | A dome-and-station world settled *because* it was not a paradise. Thin air, permafrost, glass |

**Batch 1 remainder, 12 August (5, this PR).**

| Image | Why it went | What its replacement has to carry |
| --- | --- | --- |
| `lore/mnemari.jpg` | **Tone, not people.** A hockey-mask figure in a hood — slasher iconography, against the standing horror guardrail | A people who never forget and never age. The interest is memory, not menace |
| `lore/meta-dimensional-beings.jpg` | Generic hooded-figure stock | Three classes of being, sorted by whether talking is possible |
| `lore/military-space-command.jpg` | Real NASA EVA imagery in a stock composite; licence unverified | A benevolent technocracy that could not last |
| `hero/characters-concourse.jpg` | Same family, same unverified provenance | A page hero for the whole cast |
| `hero/about-writer.jpg` | Typewriter-and-rotary-phone cliché | The About page. Dermot's own photography is the obvious answer here |

**Batch 2, 12 August (4, this PR).** The forty never-opened lore images were
finally looked at, all forty at once as a contact sheet. **The result was far
better than the audit implied:** about eighteen are already designed emblem
cards in the house style, and another eighteen are abstract or astronomical
stock with no people and no claims. Only these four needed anything.

| Image | Why it went | What its replacement has to carry |
| --- | --- | --- |
| `ftl-mechanics.jpg` | A suited man cradling a glowing orbital diagram over city lights — stock *business-visionary* imagery. Face cropped above frame, so not a privacy case | How fold transit actually works. Anything true would beat this |
| `lagrange-fold-points.jpg` | A hand holding floating tech icons; the same genre, the same nothing | Five points where gravity balances, and what that buys a ship |
| `chthonari.jpg` | A horned, muscular figure against fire — demon art, in the register the horror guardrail rules out. **Same misjudgement as `mnemari`** | A species. The Korvain lesson applies: hint, don't show |
| `solar-time-and-local-calendars.jpg` | Antique clock-face stock, near-duplicate of `galactic-stardate.jpg`. Kept the latter because its calendar grid is the more apt of the two | Local calendars diverging from solar time |

*Left alone deliberately:* `physics-comparison` and `quantum-space-harmonics`
are near-identical light-trace abstracts, the same repetition the `prismere-*`
note complains about — but neither makes a false claim, and replacing them is
taste rather than need.

**Batch 3, 15 August (2, deleted not carded).** Surfaced by the alt-text pass
rather than looked for. Both were **deleted outright**, following the eight
verified stock images of 11 August: a lore page renders cleanly with no image,
and absence beats a picture that is quietly making a claim. Neither has a
PENDING card, so neither shows up in the placeholder queue — they are recorded
here instead, and both pages currently open with no image at all.

| Image | Why it went | What its replacement has to carry |
| --- | --- | --- |
| `formation-of-star-rangers.jpg` | A **recognisable real city** — a sepia-treated skyline with One World Trade Center's spire unmistakable in it — standing in for the founding of the Star Rangers. No people, so not a privacy case; the problem is that it is a specific place on Earth with its own meaning already attached | The founding of an independent humanitarian corps. Something that is not a photograph of somewhere real |
| `universal-cosmic-stardate.jpg` | An antique dial engraved **in French with a fleur-de-lis border**, on the entry for a count whose whole argument is that it *"commemorates no founding … a spine that honoured an event would belong to whoever owned the event."* The image hands the standard to exactly one nation's heraldry | A civil timescale owned by nobody. The page's own material is better: an ensemble of clocks, a paper timescale, a loop that closes |

### A third option: refile as in-universe art (Dermot's direction, 18 August 2026)

**An image that directly contradicts canon but remains aesthetic may be moved
into the Codex as in-universe artwork rather than removed.**

**This completes the rule above rather than overturning it.** *Absence beats a
picture quietly making a claim* is about a picture asserting in **Archive
voice**, on a lore page. A Codex artefact asserts nothing — it is
valid-for-its-author, like every other codex entry — so relocating an image
stops the claim just as deletion does, and keeps the picture. The disposal
options are therefore three, in order of preference: **fix it, relocate it,
delete it.**

**The Codex's own schema is what makes this work.** `author` is a required field
on every codex entry, and an artwork's author is exactly what makes it
valid-for-its-author: a rendering by someone who never saw the subject, worked
from a description, or had reasons to flatter. A grey-alien bust is wrong as
lore and *interesting* as a popular-press impression by an illustrator who never
met one — and it then illustrates the very refusal
[What the Record Refuses](../src/lore/what-the-record-refuses.md) makes. Test an
image the way the boundary already tests prose: not *is this true?* but *could
someone in this world have made it, and would they have made it this way?*

**What it takes mechanically — it is not a file move.** `validate-content.js`
fails on any unreferenced file under `src/images/`, so an image cannot sit in
the Codex unattached. Refiling means **writing a codex entry around it**, with
an author, and moving the file to `src/images/codex/`. `image_alt` still
describes what the picture actually shows. Codex entries carry no `canon_facts`,
which is consistent — an artefact establishes nothing.

**It would not have rescued either Batch 3 deletion**, and the reason is worth
keeping because it bounds the rule. Both failed for something the Codex cannot
cure: they are **photographs of identifiable real-world subjects**. Refiling
`formation-of-star-rangers.jpg` still shows One World Trade Center, whoever is
said to have taken it — the problem was never the claim the page made, but that
the image arrives with its own meaning already attached. The stock provenance is
a second, independent reason, and the 11 August sweep removed eight on that
ground alone. *(The French dial was recorded here as arguable — an in-universe
artefact could legitimately be French-made. The 18 August exclusions below
settle it twice over: it is stock photography, and an antique instrument on a
twenty-ninth-century page is an anachronism. Not arguable; excluded.)*

**So the rule's real catchment is original or generated images replaced for
canon reasons**, not stock photography removed for provenance.

**Correction, 18 August 2026 — this section shipped with a false claim, now
fixed.** It said the rejected originals were *"recoverable from git history"* and
named `lore/cerebraun` (grey-alien bust) as the strongest candidate. Checking the
blobs rather than the prose settles both halves against it, which is the same
failure this file warns about two sections up:

- **`lore/cerebraun.jpg` has exactly one content version in git**, and opening it
  shows the **architectural indirection** — a vast concrete hall, one robed
  figure, mist and high clerestory light. The grey-alien bust never entered the
  repository. It is not a candidate; it does not exist here.
- **Nor do most of the others.** `aldera`, `rook-7`, `nessa` and `orla-shepherd`
  each have **one** distinct blob across every commit touching them. The
  replacements happened *before* first commit, so the rejected originals were
  never version-controlled and git cannot return them.
- **`characters/qiren-tal.jpg` is the sole exception**, with two distinct blobs.

**Consequence: the rule is effectively prospective.** There is almost nothing to
apply it backwards to, which makes the retroactivity question below much smaller
than it looked — and means this rule will earn its keep on the *next* image
rejected for canon, not on the ones already gone.

#### Two absolute exclusions (Dermot's ruling, 18 August 2026)

**Stock photography never qualifies, and neither do anachronisms.** These are
not weightings to consider; an image failing either is deleted or replaced, and
the Codex is not offered.

The two exclusions look unrelated and share one reason, which is worth stating
because it also marks the rule's outer edge. **The Codex can carry a wrong
belief. It cannot carry a wrong century, or a real place.** A codex artefact is
still a physical object *made inside this world*, so the author's fallibility
covers **interpretation** — what they thought, inferred, flattered or got wrong
— and never **material culture**. Attributing a picture to an in-universe artist
explains why its reading is mistaken; it does nothing whatever about what is
physically in the frame.

- **Stock photography.** The image arrives with real-world meaning already
  attached, and no frame strips it: refiling still shows One World Trade Center
  whoever is said to have taken it. Provenance is an independent second reason.
- **Anachronism.** An out-of-period object is not a claim the artist made — it
  is a claim about what the world could manufacture. An artist working in 2826
  does not put a twenty-first-century desk lamp in a 2826 scene, so the codex
  frame has nothing to explain it with. The record already holds the doctrine
  this rests on: [What the Record Refuses](../src/lore/what-the-record-refuses.md)
  treats the sprung, jointed, domed desk lamp as *"as much a period object as a
  wall of dials,"* and sets out what light, displays and surfaces actually look
  like here.

  **A deliberate historical depiction is not an anachronism** and the rule never
  reaches it: a picture *of* the twenty-first century showing twenty-first
  century objects is correctly period. An anachronism is an object out of its
  time *within the scene depicted*, which is why the exclusion needs no
  exception.

**What the exclusions leave.** They cut the candidate pool hard, and usefully —
most of the Firefly replacement list above goes: `ilse-korvain` (US Army stock),
`karla-wender`, `orla-shepherd`, `nessa` and `maren-solveig-krast` are stock, and
`rook-7` v1 *"arrived furnished with the NYPD"*, which is both. What survives is
the **generated and non-period** remainder — `lore/cerebraun` (grey-alien bust)
still the strongest, with `aldera` and `qiren-tal` behind it.

#### The quality bar (Dermot's ruling, 18 August 2026)

**Only a high-quality image with artistic merit and without technical flaws
qualifies.** *Aesthetic* in the original direction is not a low bar meaning
"looks alright"; it is these three, and an image failing any of them is deleted
or replaced like any other.

The clean formulation: **if the picture would not earn a place on a page were
canon no obstacle, it does not earn one as Codex art.** The Codex is not a
salvage yard, and refiling is not a way of keeping work that was not good
enough. Most images rejected in this repository were rejected *partly* because
they were poor, and a poor generation does not improve by being reattributed.

**Technical flaw versus style — the distinction worth holding.** A generation
artefact is a flaw: six-fingered hands, garbled lettering, mismatched eyes,
architecture that does not resolve, a limb with no shoulder. A stylisation is
not: flattened perspective, exaggerated proportion, a naive or votive manner are
all things a maker chooses. **The test is whether an in-world artist could have
chosen it.** They can choose a style; they cannot choose a diffusion artefact,
because it is evidence of how the picture was actually made — which is exactly
the seam a codex frame cannot cover, the same reason anachronism and stock are
excluded.

**Where this leaves the pool: empty, or nearly.** Combined with the two
exclusions and the correction above, no identified candidate currently survives.
That is not a fault in the rule. It is well specified and will catch the next
case; it simply rescues nothing already gone.

#### Two things still to decide

1. **Does it override the codex title-card convention?** Codex images are
   *"designed dark-gradient title cards, not photographs"* and covers *"go
   through the generator, never an image model."* An artefact-image is a
   **second class** of codex image. Either that convention gains an exception,
   or artefact entries carry a card and show the artwork in the body.
2. **Is it retroactive?** Deleted images are recoverable from git. Applying it
   backwards is a separate decision from applying it going forward.

**Note what the July audit did and did not ask.** `formation-of-star-rangers`
was inspected in that sweep and passed — correctly, on the question being asked,
which was whether the alt matched the image. Nobody asked whether the image
belonged. Two different tests, and only one of them was ever run on it.

**The cheapest good answer to several of these is tier 3 of Open work 6** —
Dermot's own photography. An Irish upland standing in for Ynys Wydrin claims
nothing false and needs no prompt at all.

### 1. Missing portraits — **the original list is fully delivered** (audited 19 August 2026)

**Every one of the thirty-four prompts below has been generated and shipped.**
Checked by pulling each `` `slug.jpg` `` out of this section and testing it against
`src/images/characters/`; nothing is outstanding. The heading said *28 pages* and
the section listed 34, and none of it had been marked done — so the count was
wrong, the label was wrong, and a reader would have taken finished work for a
queue.

**The prompts stay exactly where they are.** They are the prompt of record for
the images they produced, and deleting them to tidy a status line would destroy
the provenance the file exists to hold. Read what follows as an archive, not a
work list.

**What is actually outstanding is a different set of pages** — 25 of them, none
overlapping with this list. See *Outstanding portraits* at the end of this
section.

**One stale instruction to ignore in these archived prompts.** Most of them end
*"Portrait orientation."* That predates the settled convention: character
portraits are **1200×675, 16:9 landscape** (see Conventions, and the recorded
Calloway entry in `image-prompts.md`), and the delivered files bear it out —
42 of 52 are landscape. Don't copy that tail into a new prompt.

None block a build — `character.njk` renders cleanly without an image. Prompts
below were ready to paste; `image`/`image_alt` were added after generating.

**Humans**

- **`naomi-kestrel.jpg`** — junior field investigator, Eden Civil Investigations;
  reads telemetry, manifests and comm chatter "as one continuous sentence."
  > Cinematic portrait of a young woman analyst with dark red hair cut short, clear green eyes and a freckled complexion, at her station in a large working analysis bay aboard a space habitat, upper body, focused and absorbed rather than worried. This is plainly a professional workplace and not a private room: a long fitted work surface of pale composite built into the structure of the bay, other analysts visible at their own stations further down it, a tall structural bulkhead and a wide viewport onto starfield behind them, the room deep and institutional in scale. No domestic furniture of any kind, no wooden table, no wooden chair, no kitchen, no bed, no soft furnishings, no curtains, no bedsit or study. The bay is lit by soft diffuse recessed lighting from a concealed source, warm and even, with no lamp, no light fitting, no shade and no bulb visible anywhere in frame. Flat on the work surface in front of her lies one slim matte grey reading slate, a single rigid slab the size and thickness of a small hardback book, lying face-up on the tabletop, entirely unlit and blank-faced, its surface catching the room light the way a page would. It has no hinge, no lid, no keyboard, no stand and no raised panel — it is not a laptop, not a clamshell and not propped up at any angle; it lies flat like a closed book set down. Nothing else on the table. Practical dark uniform bearing small geometric rank marks — plain metal bars and a single star at the collar, shapes only. No name tape, no name badge, no printed words, no letters and no numerals on her clothing of any kind. Calm, uncluttered interior of a well-kept space habitat, muted palette, professional, no glamour styling. Absolutely no screens, no monitors, no glowing displays, no holograms, no projected light, no consoles, no dials, no gauges, no analogue instrument panels, no filing binders and no loose paper anywhere in frame. Her face is lit by the room, never by anything she is reading. No readable text, numerals, signage or written characters of any script anywhere in frame. Portrait orientation.

- **`rosalind-vey.jpg`** — tactical specialist, Eden Civil Investigations;
  ex-habitat tactical response, treats a scene as a room that might still be dangerous.
  > Cinematic portrait of a composed woman with fair blonde hair worn short and pushed back, in a practical tactical-response jumpsuit aboard a space habitat, upper body, alert and unbothered expression, subdued corridor lighting, science-fiction setting, desaturated palette, professional, no glamour styling. The jumpsuit carries small geometric rank marks only — plain bars and chevrons at the collar and shoulder, shapes and nothing else. No name tape, no name badge, no printed words, no letters and no numerals on her clothing of any kind. Lighting is soft, diffuse and recessed, with no lamp or light fitting visible. No screens, no glowing displays, no holograms and no projected light anywhere in frame. No readable text, numerals, signage or written characters of any script anywhere in frame. Portrait orientation.

- **`tamsin-reyes.jpg`** — undercover specialist; "whoever a room needs her to
  be," craft not instinct. Deliberately forgettable.
  > Cinematic portrait of a woman with a neutral, unreadable expression in understated civilian clothing, upper body, softly lit habitat interior, science-fiction setting, muted palette, deliberately ordinary and approachable rather than striking, professional, no glamour styling, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

- **`lorien-the-wanderer.jpg`** — freelance survey-and-salvage captain of the
  *Restless Verge*; weathered but disciplined.
  > Cinematic portrait of a weathered independent starship captain, woman, upper body, wearing a worn unmarked flight jacket, standing in the compact cabin of a well-kept stripped-down long-range courier ship, self-reliant expression, lit by soft diffuse recessed light and starlight through a small viewport, with no lamp or light fitting visible in frame, science-fiction frontier setting, muted realistic palette, professional. The ship is spare rather than shabby: clean painted hull surfaces, everything stowed square and strapped down properly, tools racked, nothing loose, nothing broken — the ship of an owner-operator who flies alone and therefore maintains it meticulously, because there is nobody else aboard to fix anything. Absolutely no rust, no corrosion, no grime, no oil stains, no damage, no exposed wiring, no dripping, no clutter and no derelict or abandoned look anywhere. Her leather flight jacket is old and softened by use but clean and intact, and carries no marks at all — she holds no commission and answers to nobody, so no rank tabs, no insignia, no name tape, no badge, no printed words, no letters and no numerals on her clothing. No instrument panels, no consoles, no screens, no displays, no holograms, no dials, no gauges and no numerals anywhere in frame. No readable text, signage, insignia lettering or written characters of any script anywhere in frame. Portrait orientation.

- **`osric-fenholt.jpg`** — Historical (2558–2621); Imperium-era Belt
  compliance clerk, "The Honest Man of the Directorate." Period, not modern.
  > Cinematic portrait of a plain, serious middle-aged male bureaucrat in a severe archaic administrative uniform of a fallen space empire, upper body, seated at a paperwork desk, unremarkable and precise demeanor, muted sepia-and-grey period palette, dim archival lighting, historical science-fiction, no heroism or grandeur, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

- **`wendell-albercombe.jpg`** — Detective Inspector, Eden; carries the boring
  caseload, complains constantly, solves cases over dinner. Suits the noir register.
  **Re-brief 13 August — two faults, and *noir* caused both.** The returns were
  grimy cyberpunk: rain-slicked industrial corridors, a lit cigarette in each
  variant, and heavy signage (*LEVEL 44*, *DOCKING BAY B*, *SECTOR-7 NO ENTRY*)
  that the plainmarks clause never displaced, because "noir detective, space
  station" summons a genre whose visual furniture *is* neon lettering. **Eden is
  a functioning, well-kept civil habitat, not a dying megacity**, and the house
  target — enigmatic and haunting, with beauty and hope in it — rules the look
  out on its own. So the word *noir* is gone, the setting is named as clean and
  cared-for, the cigarette is banned explicitly, and the plainmarks are stated
  before any mention of a corridor rather than after it.
  > Cinematic portrait of a rumpled, world-weary male detective inspector in a slightly worn but clean coat, upper body, standing in the quiet civil bureau of a well-maintained space habitat. Tired but sharp expression, a man near the end of a long shift who is still paying attention. Warm practical interior lighting from ordinary fixtures against a cooler corridor beyond, softly lit and orderly, no rain, no steam, no neon, no grime, no rust, no wet floors, no smoking and no cigarette. Muted natural palette, science-fiction habitat interior that is clearly looked after. Wayfinding appears only as flat stencilled plainmark panels — stacked bands of black, slate-blue, bone-white and ochre carrying simple geometric figures (chevrons, rings, short tally strokes, lozenge diamonds) — painted on the fixed frame beside a hatch. Absolutely no signs, no display boards, no illuminated panels, no numerals, no lettering or written characters of any script anywhere in frame. Portrait orientation.

- **`asteria-the-sage.jpg`** — retired Star Captain, now leads a local
  Fellowship of Light chapter on a quiet planet. **She wears the robes of her
  chapter and still reads unmistakably as a commander. Both at once — that is
  the whole portrait.**

  **This note has now been wrong in both directions, which is worth recording
  rather than tidying away.**

  It first read "a portrait should read as retirement, not command", and two
  rounds produced a beatific wise-woman in flowing robes, looking eighty. The
  correction of 11 August fixed the bearing and overcorrected the costume: it
  banned robes outright — *"absolutely no robes, no shawl, no draped or flowing
  fabric of any kind"* — and named **robes** as a word that "summons the
  wise-woman every time".

  **Dermot's correction, 12 August: she needed to have robes but look strong at
  the same time.** So robes were never the fault. The fault was letting the
  robes carry the whole characterisation — flowing fabric plus *serene* plus
  *older woman* produces a sage, and the first brief supplied all three. Take
  the bearing seriously and the robes stop being a costume for wisdom and
  become what a chapter leader actually wears.

  **The lesson for every other brief in this file:** when an image comes back
  wrong, the instinct is to ban the most visible feature. Usually the visible
  feature is innocent and the *combination* is the fault. Ban the softness, not
  the garment.

  So: robes, and a spine. An age stated as a number, because **older woman**
  drifts on its own. **Serene** stays excluded — that word did produce the
  first version, and nothing here needs it.

  **Third correction, 13 August, and this one came from outside the brief.**
  The 13 August lifespan and retirement canon put Asteria's departure from the
  service at **about a hundred**, and she has been retired long enough for
  Galahad to have met her afterward. She is therefore around **105** in the
  present, and the brief's "about sixty-five" was forty years wrong through no
  fault of its own — the canon moved under it. *(She also gained a surname the
  same day: **Asteria Wessex**. The chapter's "the Sage" is an honorific, not a
  name.)*

  The re-run is consequently a harder brief than the last one, and the reason
  is the setting's own rule: humans here stay **capable into the eleventh
  decade**, so a hundred-and-five-year-old is neither frail nor a marvel. She is
  simply old and entirely functional, which is a face contemporary reference
  photography barely contains. State the number, state the fitness, and ban the
  frailty vocabulary the way *serene* is banned — no stoop, no cane, no tremor,
  no papery softness, and no wondering-at-her-own-age expression either.

  **Also fixed:** the last two returns had no robes at all, which lost the
  chapter house entirely and left her reading as a countrywoman outside a barn.
  The robes are named first this time.

  *(Re-run 30 August at Dermot's report that the filed image reads about 55 —
  half her age. The filed file matched the pre-correction returns, so the
  harder brief below had never actually been run to success. First re-run
  overshot into frailty — both variants gaunt and diminished, which Dermot
  rejected: the age landed and the strength did not. The brief now welds the
  creased skin onto a plainly powerful frame, bans the gaunt vocabulary, and
  keeps the craft in the background from reading as a flying saucer. Stale
  portrait-orientation tail fixed to landscape.)*
  > Cinematic portrait of a woman of one hundred and five who reads unmistakably as a senior officer, upper body, standing outside a modest stone chapter house on a quiet rural world. She wears the plain working robes of a contemplative order over ordinary clothes - heavy, well-worn, functional cloth with a clear shoulder line, belted at the waist, not draping or billowing and not ceremonial; the robes are the first thing to get right and must be present. Genuinely old and physically powerful at the same time, and both must be unmistakable: her face is deeply creased and weathered everywhere, skin spotted with genuine great age, thin white hair cut short and practical - and her body is broad-framed and solid, full square shoulders, a strong neck, sleeves pushed back over thick weathered forearms, large capable hands with prominent knuckles, standing at parade rest with her weight set forward like a woman who hauled feed sacks this morning and will again tomorrow. Old like an ancient oak, not old like a dry reed. Level and unsmiling, looking straight at the viewer, assessing, faintly impatient. No stoop, no cane, no walking stick, no staff, no trembling, no frailty, no gauntness, no thinness, no sunken cheeks, no hollow eyes, no shrunken or withered frame, no papery delicacy, no beatific warmth, no serenity, no wisdom pose; no middle-aged smoothness, no soft focus, no airbrushed skin. Soft overcast daylight, pastoral setting on a settled colony world - dry-stone walls, green hills, and no aircraft, no spacecraft and no flying saucer anywhere in frame. Muted natural palette, a commander who happens to be wearing robes rather than a sage who happens to have been a commander, no uniform, no insignia, no rank marks, no readable text, signage, insignia lettering or written characters anywhere in frame. Landscape orientation.

- **`galen.jpg`** — Star Rangers liaison officer at a Celtic Union shuttle gate;
  minor character, correct and quietly decent.
  > Cinematic portrait of a mid-career woman Star Rangers liaison officer in a plain service uniform, upper body, standing in a quiet arrivals hall beside a tall window, courteous professional expression, soft overcast daylight, science-fiction setting, muted palette. Her uniform carries small geometric rank marks only — plain bars and a ring at the collar, shapes and nothing else. No name tape, no name badge, no printed words, no letters and no numerals on her clothing of any kind. The only wayfinding visible is a Compact plainmark: one flat stencilled panel of stacked colour bands in black, slate-blue, bone-white and ochre carrying a simple geometric figure (a chevron, ring, tally stroke or lozenge diamond), painted on the wall beside her. Absolutely no gates, no departure boards, no destination signs, no illuminated panels, no screens, no holograms and no numerals, and no readable text, signage or written characters of any script anywhere in frame. Portrait orientation.

**Alien**

**The fourteen unfiled Tier 1 sets predate every rule made on 13 August — do
not select from them, re-brief them.** Sampled two on 13 August and both failed
for reasons that were not rules when they were generated:

- **`sen`** — a warm, genuinely lovely archive scene, and wrong twice. A brass
  anglepoise lamp, which the lighting rule now retires by name, and a wall of
  cardboard box files with paper labels, which is a mid-twentieth-century
  office rather than a Survey Archive. Displays are matte slates here.
- **`eden-warden`** — a single humanoid android face in a corridor, against a
  review-table brief that already said *"a plural habitat AI, two personas in
  one system. **Not a face at all, arguably.**"* A whole habitat's mind is not
  one body standing in a walkway.

The rest of the batch was generated in the same run and against the same
pre-review briefs, so the expected yield from reviewing all twenty-eight images
is low and the effort is better spent on the briefs. **Work through them entry
by entry**: check each against the display, lighting, lettering, insignia,
cast-variety and non-humanoid rules above, rewrite, then regenerate. The
medieval-set entries — `brother-daire`, `ilsabet-marrowtide` — are the likeliest
survivors, since a period look is correct for them and the display rules barely
apply.

**Both of them did survive, and are filed** (13 August), which confirms the
diagnosis: what dated the rest was the *future* furniture, and these two have
none. Daire is a scribe at a sloped desk with quill, ink pot and vellum in a
stone cell; Marrowtide is an abbess in a stone passage with grey sea through the
arch behind her. Neither needed a rule that did not exist in 1216.

**And Daire settles something the lettering ban had left open: a scribe may
write.** His vellum carries close script and the entry passes anyway, because
the ban was always aimed at *signage and labels* — the readable word asserting a
name, a place or a rank — and never at the act of writing as a subject. The test
is unchanged and it is the only one that matters: **nothing in frame may be
legible.** Script that reads as writing without resolving into words is correct
here, and would be correct on any archive, ledger or manuscript entry. Nine sets
still need re-briefing.

**Non-humanoid species — briefed from the new lore pages, 13 August.** All three
of these were blocked until the species had a body in prose. They now do:
`src/lore/serephine-dunekin.md`, `veyr-basaltborn.md`, `verdani.md`. The prompts
below all open by stating **what the thing is not**, in the flattest possible
terms, because "non-human" on its own reliably returns a person with a
different head. Landscape orientation throughout — these bodies are wider than
they are tall and a portrait crop fights them.

- **`qiren-tal.jpg`** — Veyr Basaltborn engineer. The body is a **truss**, not a
  mass: many fine chitinous members bracing one another, which is how a slender
  thing stands in gravity that degrades human joints in a generation. No fixed
  front, no privileged pair of arms.
  > Cinematic photographic image of a Veyr Basaltborn engineer at work on a hull junction inside a dim service space. THIS IS NOT A HUMANOID: no head on a neck, no torso, no two arms, no two legs, no face, no upright bipedal stance. The body is an open lattice - a living scaffold of many fine dark chitinous struts and braces, roughly the size of a large dog and wider than it is tall, with no solid trunk anywhere, so that the space behind it is visible through the frame of it. Eight to ten slender jointed limbs radiate from the lattice at irregular angles; several are braced against the deck and the bulkhead taking load, while three or four fine-tipped ones work together on a single point of the hull plate. The surface has the dark iridescent sheen of cooled basalt, blue-black shot with oil-slick colour. Small dark compound eyes are distributed in clusters around the upper lattice rather than paired on a face. Working light is soft and recessed with no lamp or fitting visible, warm against cool metal, muted industrial palette, photographic and biological and grounded. Absolutely no humanoid or bipedal form, no head, no face, no clothing, no armour, no grey-alien features, no glowing screens or holograms. No readable text, signage, insignia lettering or written characters anywhere in frame. Landscape orientation.

- **`isren-farrowkin.jpg`** — Verdani delegate. Photosynthesis pays by area, so
  the body is built to **spread**: kinbeds ride on broad extensible vanes, and
  a Verdani in good light is a far larger object than the same Verdani in a
  corridor. No single face — sensory structures run along the leading margins.
  > Cinematic photographic image of a Verdani in a bright airy hall, vanes partly opened toward a tall window. THIS IS NOT A HUMANOID: no head on a neck, no torso, no two arms, no two legs, no face, no upright bipedal stance, nothing shaped like a person. The body is low, broad and multiply supported, resting close to the floor on six or more short sturdy limbs, and from it rise several very broad thin extensible vanes like the fanned leaves of a great fern, held half-open and angled to the light - opened, the vanes span far wider than the body itself. The vanes carry dense patches of deep living chlorophyll green across their upper surfaces, soft and slightly waxy, set into a paler grey-brown hide. Along the leading edges of the vanes run rows of small dark sensory nodes, evenly spaced, with no eyes and no face anywhere on the animal. Soft diffuse daylight from a tall window, calm institutional interior, muted natural palette, photographic and biological and grounded rather than stylised. Absolutely no humanoid or bipedal form, no head, no face, no clothing, no armour, no glowing screens or holograms. No readable text, signage, insignia lettering or written characters anywhere in frame. Landscape orientation.

- **`sethka-ru.jpg`** — Serephine Dunekin long-range scout. **Must read as
  clearly non-human** — light-scattering eye membranes, water-conservative
  build (the earlier mistake was a human in a headwrap).

  **Two rounds went wrong in the same two ways.** He arrived **armed with a
  rifle** nobody asked for — badly wrong for a Corps whose own doctrine is that
  a Ranger's real weapon was never on the belt, and wrong for *him*: he is an
  observer who plans routes by radiation profile, glare angle and thermal
  shadow. Weapons are now excluded by name, and he carries instruments instead.
  And "professional concept-art style" produced exactly that — a generic
  videogame alien — so the style words are gone and photographic realism is
  asked for instead. Per the sheen rule, the eye membrane is now described by
  what it *does* rather than named: "nictitating light-scattering membrane" is
  jargon a model cannot draw.
  > Cinematic photographic image of a Serephine Dunekin scout at dusk on a high stony ridge under a thin pale sky. THIS IS NOT A HUMANOID: no head on a neck, no torso, no two arms, no two legs, no face, no bipedal stance, nothing shaped like a person. The body is a low, broad, sealed carapace about the size of a large dog, mineral-hard and matte pale bone-grey, held clear of the ground on six slender jointed limbs of unequal length placed radially rather than in pairs. It has no front. Rising and unfurling from the upper surface are several enormous thin translucent respiratory vanes, fanning open like wet paper lifted into the light, veined and faintly iridescent, twice the span of the body they grow from - the animal is opening for the evening margin and is caught halfway. Set around the rim of the carapace are many small dark eye-spots, each glazed with a pale opaque membrane drawn part-way across it, catching the low sun with a faint prismatic sheen. Cold clear high-altitude light, long shadows, thin dry air, muted sand and bone palette, photographic and grounded and biological rather than stylised or mechanical. Absolutely no weapons, no armour, no helmet, no clothing, no face, no humanoid or bipedal form of any kind, and no grey-alien features. No readable text, signage, insignia lettering or written characters anywhere in frame. Landscape orientation.

- **`suvra-kel.jpg`** — Ilveth search-and-rescue specialist; the first Ilveth
  portrait, briefed 23 August 2026 from `src/lore/ilveth.md` and
  `src/characters/suvra-kel.md` (both merged that day), so the sethka-ru rule
  is satisfied: the body plan comes from the record, not the JPG. **Must read
  as cold.** The body runs at ground temperature, so the frame's one warm
  thing is deliberately the ground and never her — and since heat is invisible
  to a camera, the picture stays honest: the warmth shows only as the one
  frost-free patch of bare rock, **no glow anywhere**. The mirror-pits are
  described by what they look like rather than named, per the sheen rule
  ("mirror optics" is jargon a model cannot draw, and the word *mirror* would
  put glass in the frame). Setting is her biography: the boundary watch of a
  geothermal province on Sardain, at night, utterly still — stillness is the
  portrait's whole posture, a watch-keeper priced in duration. **One axis is
  proposed here and is not canon: size.** The lore says long, low, several
  paired limbs, mass near the ground, and never says how big; the brief
  proposes roughly two people lying end to end and knee height, plausible for
  a body that pulls casualties out of collapsed structure. **Confirmed by Dermot, 23 August 2026** ("size is fine") — the
  two-people-long, knee-height figure is now the settled brief, and if a
  future Ilveth page states a size it should agree with this one.
  > Cinematic photographic image of an Ilveth watch-keeper at night on a frost-covered stony plain, beside a low outcrop of bare dark rock. THIS IS NOT A HUMANOID: no head on a neck, no torso, no two arms, no two legs, no face, no upright bipedal stance, nothing shaped like a person. The body is long, low and segmented, roughly the length of two people lying end to end and never higher than a standing person's knee, carried close to the ground on several pairs of short sturdy limbs, its surface smooth, matte and slate-grey, drawn compact against the cold. The forward third rises into a hooded crest, and set into the crest are several wide, shallow, bowl-shaped hollows, dry, dark and polished smooth, each holding a faint dim reflection of the sky - nothing like animal eyes, no pupils, no whites, no lenses. Below the crest runs an even ring of very small dark bead-like eyes. Along the flanks lie broad thin folded vanes like furled sails, matte, veined, held flat against the body. The animal is utterly still, facing out across the plain. The outcrop beside it is the one patch of ground free of frost - bare dark stone, dry and free of ice, the only warm thing in the frame. Deep dusk light from a small dim sun low on the horizon, long blue shadows, a handful of faint stars in a clear dark sky, frost and stone in slate, bone-grey and deep blue. Photographic, biological and grounded rather than stylised or mechanical. Absolutely no weapons, no armour, no clothing, no equipment, no glow, no bioluminescence, no steam, no mist, no humanoid or bipedal form of any kind, no grey-alien features, no insectoid mandibles, no reptilian scales. No readable text, signage, insignia lettering or written characters anywhere in frame. Landscape orientation.

  Proposed alt text for `suvra-kel.md` when the image lands (alt text is the
  prompt of record, so it is drafted with the brief): *"Suvra Kel keeping a
  night watch on Sardain: a long, low, segmented slate-grey body on several
  pairs of short limbs, resting beside the one frost-free outcrop of bare dark
  warm stone on a frozen plain. The forward crest carries wide dry bowl-shaped
  hollows holding faint reflections of a dim sky, a ring of small bead-like
  eyes beneath them, and broad folded vanes lying flat along the flanks. A
  small dim sun sits low on the horizon under a handful of stars."*

**AIs & non-corporeal — abstract emblem, no face**

- **`jeeves.jpg`** — domestic-companion AI, Eden; kitchen-and-gossip
  competence. **Superseded 30 August 2026** by Dermot's body-in-canon ruling:
  the live brief is in "The five stamped on 30 August 2026" below, under the
  visible-artificiality rule. The retired emblem here (the tidied night
  kitchen, no figure) was the 13-August bodiless-AI treatment; its blockquote
  is removed so the generator queue serves only the live brief — the parser
  takes the first quoted entry per filename.

- **`reeves.jpg`** — investigative-support AI, Threshold Station; **the other
  half of a deliberate pair.** Written 13 August on Dermot's note that the two
  or more instances of Reeves might look very similar to each other. They are
  the same model on separate deployments and their pages say so, so the images
  copy each other closely on purpose — same emblem, same palette, same
  restraint — and differ only the way a second installation of one thing
  differs. Here the partial figure is further along: more points joined, still
  not finished. Same intelligence, longer posting. Nothing else changes.
  > Abstract emblematic image representing an investigative intelligence: a slow constellation of small cool-blue points of light suspended in dark space, joined by faint thin lines into a partial figure that is most of the way complete but still open at one edge, a few points left unconnected. Deep indigo and near-black background, soft volumetric glow, quiet and patient rather than busy or urgent, a sense of a pattern nearly found and not yet claimed. No screens, no consoles, no terminals, no user interface, no panels, no dials, no charts, no diagrams, no icons, no symbols, no glyphs, no numerals, no lettering of any script, no human face, no figure, no machinery of any kind. Pure light and geometry only. Portrait orientation.

- **`reeves-eden.jpg`** — investigative-support AI, Eden bureau; same model as
  Threshold's Reeves, distinct enough to read as a separate deployment.
  **Re-brief 13 August — the old prompt was self-defeating.** It asked for "a
  holographic evidence-analysis interface and case-file glyphs" and then banned
  writing, which is a request for the one object in the setting whose entire
  purpose is to carry text. The return was exactly that: *CASE FILE: ALPHA-7*,
  *EVIDENCE CHAIN*, *PATTERN MATCH*, a real-world date, and garbled
  pseudo-words. **The ban was never going to win against the scene.** The fix is
  to describe an image with nothing in it that could bear lettering — light,
  geometry and depth rather than a console. This also suits the character
  better: Reeves is an intelligence that will not volunteer a conclusion, which
  is restraint, not a dashboard.
  > Abstract emblematic image representing an investigative intelligence: a slow constellation of small cool-blue points of light suspended in dark space, a few of them joined by faint thin lines into a partial, unfinished figure, the rest still unconnected. Deep indigo and near-black background, soft volumetric glow, quiet and patient rather than busy or urgent, a sense of a pattern half-found and not yet claimed. No screens, no consoles, no terminals, no user interface, no panels, no dials, no charts, no diagrams, no icons, no symbols, no glyphs, no numerals, no lettering of any script, no human face, no figure, no machinery of any kind. Pure light and geometry only. Portrait orientation.

- **`rasa-oyelaran.jpg`** — Superintendent, Eden's civil detective bureau.
  **Re-run 13 August, and the reason is written into the prompt.** The first
  generation returned a white woman in *both* variants, because the brief
  described her bearing, her role and her setting and never carried the
  heritage her own surname states. Oyelaran is a Yoruba name; the prompt now
  says so, and no future edit should quietly drop it. Note what the picture has
  to hold besides that: she runs an ordinary police bureau in a place that
  keeps handing her things no ordinary bureau was designed for, and her
  competence is patience rather than intensity. Not a hard-bitten chief.
  **Variant 2 chosen, 13 August, and the reason generalises:** the re-run
  returned one portrait in a navy blazer and one in a plain work jacket, both
  correct on heritage and both well made. Dermot took the second — *"she looks
  more like a detective."* The blazer read as someone who now manages people
  who work cases; the jacket reads as someone who still works them. **Dress the
  portrait for the job the page describes, not for the seniority the title
  implies.** Her page opens by calling her bureau the closest thing Eden has to
  an ordinary police detective bureau, so detective-first was the right read and
  the brief should have said so.
  > Cinematic portrait of a Black woman of Yoruba heritage in her fifties, a senior civil police superintendent aboard a large space habitat, upper body, standing in the doorway of a working detective bureau. Dark brown skin, close-set greying natural hair worn short and practical, plain dark civil-service jacket over a soft collar, no uniform and no rank marks. Level, patient, unhurried expression — a woman who has stopped being surprised by her own caseload and has not stopped caring about it. Warm practical office light behind her against a cooler corridor, science-fiction habitat interior, muted palette, professional, no glamour styling, not severe and not hard-bitten, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

- **`turquoise-dove.jpg`** — a Higher Levril known only by the turquoise
  iridescence of her dimensional signature. A field signature, not a dragon.
  > Abstract ethereal image of a meta-dimensional presence known only by its harmonic signature: a gentle turquoise-and-verdigris iridescent field of light, coral-shallow blue-green tones, no defined creature shape, soft non-threatening luminosity, science-fiction otherworldly abstraction, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

**Replacement decided — replace, not upscale (Dermot's ruling, 2026-08-11; see
Open work 2).** Dormant by design while the old file exists — delete it to arm
the entry, per the standing pipeline rule.

- **`agent-barsik.jpg`** — currently 512×1024. Undercover Pets Detective
  Agency: black cat, station office, complete deadpan — everyone assumes he is
  the mascot, and the image must not wink. The 28 July attempt was right on
  pose and wrong on the lettering ban (readable binder spines, papers, and
  collar tag); the ban is written into the prompt below. The rejected 28 July attempt is recorded in
  `image-prompts.md` § 3.
  > A black cat seated squarely on an untidy stack of printed paperwork on an office desk, wearing a small worn plain metal disc on his collar. Institutional station office behind him — filing, terminals, fluorescent light. He is looking directly at the viewer with complete composure, entirely unbothered, as though he has been interrupted rather than caught. Photographic, warm practical lighting, no whimsy and no costume beyond the badge. No text, no labels, no writing on any surface; binder spines and paperwork blank; the collar tag plain and unengraved; no readable text, signage, insignia lettering or written characters anywhere in frame. Landscape orientation.

#### The seventeen replaced on 12 August 2026

Portraits for pages whose previous image was removed — see Open work 0 for
why each went. Drafted 12 August, revised 13 August against the aesthetic
target, and reviewed with Dermot. The atmosphere is added around each page’s
own `role` and `description`; no fact here is invented.

**`idris-bryneth` revised 20 August 2026 — the prompt contradicted the page.**
It asked for a herder *"of about sixty"*, but Idris Bryneth took the headship in
2815 UCSD as **"the youngest clan head on Aethelrock at the time of his
inheritance"**, which against the current 2826 puts him in his mid-forties. The
first run came back accordingly: a man of about seventy who was also
near-indistinguishable from `cormac-dubhghlas` — same grey beard, same weathered
face, same staff. Two of five clan heads reading as one man is a real cost when
they sit at one table. The revision sets the age and separates the silhouette
deliberately: dark close-cropped hair against Cormac's grey beard, and **no
staff**, which the generator added unprompted both times.

- **`cormac-dubhghlas.jpg`** — holder of the world's most arable ground; the
  Ridgemoot's most persistent voice for restoring the old seat rotation.
  > Cinematic portrait of a weathered farmer in late middle age at the edge of a cultivated upland field on a cold world, upper body, hard-wearing coat over layered woollens, standing entirely still with the unhurried patience of someone who has waited on weather all his life, early light coming low under a broken cloud ceiling and catching the mist still lying in the furrows, the crop young and coming up behind him, the far end of the field lost in haze, science-fiction agrarian colony, muted green and grey with one warm band of low sun, quiet and unhurried rather than stern, professional, no glamour styling, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

- **`fergus-aonghas.jpg`** — holder of the eastern granite highlands and most of
  the planet's mining claims; the Ridgemoot's sharpest critic of Rhiannon
  Ceridwen, and her nearest neighbour.
  > Cinematic portrait of a broad, solidly built miner in middle age against a face of exposed granite on a cold world, upper body, heavy quilted working jacket with stone dust in the seams, weight settled, wholly unhurried, late sun raking across the rock so the grain of it reads like weather, the cut of the workings going into darkness behind his shoulder and not explained, thin cold air, science-fiction mining colony, slate and iron with warm light on stone, formidable and not unkind, professional, no glamour styling, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

- **`idris-bryneth.jpg`** — holder of the sparsely populated northern high
  country; the Ridgemoot's most consistent voice against any arrangement that
  concentrates authority off Bryneth land.
  > Cinematic portrait of a lean, wind-burned upland herder in his mid-forties on open high moor, upper body small against an enormous sky, dark close-cropped hair and several days' stubble rather than a full beard, both hands empty and no staff, stick or crook anywhere in frame, oiled storm coat with the collar up, standing quite still and watching something well beyond the frame, weather arriving as a wall of light and rain far off across the moor with sun still on the near ground, science-fiction frontier highland, desaturated brown and pewter under a luminous sky, vast and calm rather than bleak, professional, no glamour styling, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

- **`niamh-o-ceallaigh.jpg`** — holder of the coastal fjord country and its
  fishing fleets; the Ridgemoot's most consistent broker between Ceridwen's
  faction and the clans demanding the old rotation back.
  > Cinematic portrait of a practical woman in her fifties on a working fjord quayside at first light, upper body, waterproof deck coat, hair pulled back against the wind, head slightly inclined in the posture of someone genuinely listening, the water absolutely flat and holding the cliffs upside down, boats out at the mouth of the fjord already and very small, science-fiction coastal colony, blue-grey and salt-white with the first warmth on the far cliff, still and hopeful, professional, no glamour styling, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

- **`rhiannon-ceridwen.jpg`** — holder of the world's only major fold-relay
  station; the most contested figure at the Ridgemoot since she began negotiating
  directly with Star Rangers survey traffic.
  > Cinematic portrait of a composed woman in her fifties beneath the mast structure of a relay station on a cold world, upper body, well-made practical coat, standing level and unhurried and quite alone, the mast rising out of frame above her and its guy lines going up into low cloud, one small steady light burning high on it, dusk with the last daylight behind the hills, science-fiction communications outpost, muted teal and grey with one warm point of light, solitary rather than isolated, professional, no glamour styling, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

- **`demelza-trevithick.jpg`** — fourth-generation chief engineer of Kernowek
  Reach's Ridge Processor Cooperative, keeper of the band's atmospheric
  machinery, first Reach officer to speak with the Survey Corps team.
  > Cinematic portrait of a chief engineer in her forties inside a working atmospheric processing plant, upper body, practical coverall with the sleeves pushed back and hands marked by the work, one hand resting on a running machine as though listening to it through her palm, warm furnace light from below meeting cold blue daylight from a high vent far above, steam drifting through the beam, the plant continuing away into depth behind her, science-fiction industrial interior, amber and steel, proprietary and at home, professional, no glamour styling, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

- **`rhian-gwynne.jpg`** — senior fabrication engineer at the Ynys Wydrin dome
  and life-support base, whose recycler and cold-world agricultural designs have
  been exported to two later charter worlds — and who has never visited either.
  > Cinematic portrait of a fabrication engineer in her thirties in a dome life-support workshop on a cold world, upper body, insulated work jacket, absorbed and only half turned toward us as though interrupted mid-thought, ranks of growing frames behind her running green and lit from within, and beyond the dome glazing a white permafrost plain going to nothing, condensation on the glass between the two, science-fiction engineering interior, pale green and glass-grey against cold white, warm life held inside a cold world, professional, no glamour styling, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

- **`imogen-petrakis.jpg`** — Eden's elected Mayor, the half of Wayland's
  reporting line accountable to residents rather than the Compact.
  > Cinematic portrait of an elected mayor in her fifties in a habitat public concourse, upper body, plain well-cut civilian jacket with no insignia, standing still amid movement with people passing softly blurred around her, the habitat's window band throwing a long slow bar of true sunlight across the floor as the ring turns, science-fiction orbital habitat interior, warm and inhabited, tired and glad of it, wayfinding shown only as Compact plainmarks - flat stencilled panels of stacked colour bands in black, slate-blue, bone-white and ochre carrying simple geometric figures, no readable text, numerals, signage, insignia lettering or written characters of any script anywhere in frame. Portrait orientation.

- **`zara-wayland.jpg`** — Eden's Space Commissioner, answering upward to the
  Compact's Chief Commissioner and in parallel to Eden's Mayor.
  > Cinematic portrait of a civil administrator in her forties at a habitat observation gallery, upper body, restrained administrative dress without rank marks, standing quietly with her hands at her sides, the great curve of the ring's inhabited interior rising away behind her and going soft with distance and haze, lit windows scattered across it, Earth or its star out of frame and throwing one clean edge of light along her, science-fiction orbital habitat, muted navy and bone with one bright rim, measured and faintly wistful, professional, no glamour styling, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

- **`rasa-oyelaran.jpg`** — Detective Superintendent, head of Eden's civil
  detective bureau, the officer of record whose paperwork the real work hides
  behind.
  > Cinematic portrait of a detective superintendent in her fifties in a quiet bureau corridor long after hours, upper body, practical dark civilian suit worn well past the end of the working day, entirely unhurried, one office still lit far down the corridor behind her and nobody visible in it, low warm lamplight near and cool habitat night light beyond, science-fiction habitat interior, subdued brown and charcoal with two temperatures of light, dry, patient, still at it, professional, no glamour styling, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

- **`petra-voss.jpg`** — Governor presiding over the five self-governing orbital
  habitats bound by the Orbital Habitats Compact, and the officer who
  commissioned Orbital Five-O to close an investigative gap none of her habitats
  could close alone. She is listed among the three original headshots that leaned
  toward the glamour look the house style rules out, so the exclusions below are
  explicit rather than implied.
  > Cinematic portrait of a governor in her fifties at a high viewport, upper body, restrained formal civilian dress without insignia or rank marks, standing quite still with her weight settled, more than one distant orbital habitat visible far off beyond the glass as separate points of light on their own paths, Earthlight coming up cool and even across her from below, the room behind her dark, science-fiction orbital setting, deep blue and bone with one cold soft key light, presiding rather than commanding, no glamour styling, no jewellery, no styled hair, professional, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

- **`bertram-ashcombe.jpg`** — immaculately dressed, unfailingly cheerful, and
  serenely confident that cases solve themselves once he has had a proper
  breakfast.
  > Cinematic portrait of an impeccably turned-out detective inspector in his fifties aboard a space station in the year 2826, upper body, three-piece suit in excellent order with a pocket square — the formality is his, not the room's — entirely at ease and genuinely pleased with the morning, standing in a working constabulary office built into the station's own structure with composite bulkheads, exposed structural ribs and current-era flat displays at the desks behind him, a tall window looking out along the station hull to hard sunlight and black sky rather than onto any street, early light coming through it in a single warm shaft with dust turning in it, warm brass and oxblood in the furnishing set against plainly modern construction, cheerful without being comic, professional, no glamour styling, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

  *Revised 20 August 2026. The prompt said "science-fiction detective setting with a period sensibility" and stated no era, and the generator took the period half and dropped the other: both candidates came back as a Victorian panelled office that could not be a station in 2826. The prompt-craft rule above — **state the era, or the setting defaults to contemporary Earth** — applies just as much to a stated *sensibility*, which a generator will read as a setting unless something anchors it. The tailoring and the warmth are his and are kept; the room is now the station's.*

- **`reeves.jpg`** — investigative support intelligence: correct, courteous, and
  constitutionally unable to volunteer a conclusion before being asked the right
  question.
  > Cinematic portrait of a humanoid artificial intelligence in a detective's office at night, upper body, a courteous attentive figure whose face is plainly manufactured rather than human - matte shell with visible seams and joins, calm even features, eyes that are clearly optical instruments and not human eyes - in restrained formal service attire in keeping with the station, hands still and folded, poised as though waiting to be asked rather than about to speak, a single warm desk lamp from one side leaving most of the room dark, one soft steady light somewhere within the shell itself, science-fiction detective interior with a period sensibility, brass and deep green, patient, unthreatening, and slightly unreadable, professional, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

- **`sen.jpg`** — Senior Archivist of the Survey Archive, quietly correcting the
  institutional record for two decades. Sen is a plural mind — Cael, Wyn and Sen
  — sharing one body and one desk.
  > Cinematic portrait of a senior archivist in their forties among deep archive shelving, upper body, comfortable unremarkable working clothes, wholly absorbed and entirely still, one low warm lamp at the desk and the stacks receding into soft darkness behind for a very long way, dust suspended in the lamplight, a sense of enormous quiet and of work that will outlast the worker, science-fiction records interior, amber and paper-grey, serene and a little uncanny, a single ordinary composed person, no mirrors, no doubling, no split lighting, no translucent overlay, professional, no glamour styling, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

- **`eden-warden.jpg`** — Eden's resident AI collective: two Kernel-compliant
  personas, Ward and Custos, sharing one system, with standing authority over the
  habitat's mobile AI humanoids.
  **Re-brief 13 August. Dermot: the Warden may not have a body at all, other than in the sense that the habitat structure is its body.** The previous prompt asked for it to present through a mobile humanoid, and the return was a single android face in a corridor — which is wrong twice over: the mobile humanoids on Eden are *other people* the Warden holds welfare authority over, not limbs, and a whole habitat's mind is not one body standing in a walkway. So the portrait is Eden. The Warden is not depicted; it is **inhabited**, and what a resident can actually see is the habitat behaving.
  > Wide interior view of a great inhabited orbital ring habitat seen from inside along its curve, the floor rising away in both directions until it closes overhead. Green cultivated terraces, small low buildings and a rail line follow the curve into the distance. Soft diffuse light spread evenly across the whole volume from concealed sources, with no visible lamp, fitting or bulb anywhere. The scene is entirely empty of people and of any figure, face, robot, android, humanoid form, statue or silhouette of any kind — nothing in the image is a body. The habitat is plainly awake and attended: lights already lit along a walkway, a hatch standing open, the rail lit and running, everything in order and nobody present to have done it. Calm, spacious, quiet and slightly uncanny, warm greens against cool structure, photographic and grounded. No screens, no holograms, no glowing displays, no readable text, signage, insignia lettering or written characters anywhere in frame. Landscape orientation.

- **`brother-daire.jpg`** — thirteenth-century monastic scribe of Cill Aoife who
  set down the only surviving account of Saint Aoife's vision at the thorn well.
  **Historical, not science fiction** — the only prompt here with no SF setting.
  > Cinematic portrait of a thirteenth-century Irish monastic scribe at his writing slope in a small stone scriptorium, upper body, undyed woollen habit, ink-stained fingers, absorbed and unsentimental, cold north daylight falling through one narrow window in a single hard shaft across the slope and leaving the rest of the cell in darkness, breath faintly visible in the cold, historical setting, limewash and umber, quiet and rigorous, no piety pose, no hands folded in prayer, no beatific expression, professional, no readable text, lettering, manuscript characters or written script of any kind legible anywhere in frame. Portrait orientation.

- **`ilsabet-marrowtide.jpg`** — Abbess of the Tideward Sisterhood, keeper of the
  Long Accounting, and the Kingdom of the Four Islands' de facto first point of
  contact for the Survey Corps delegation.
  > Cinematic portrait of an abbess in her sixties in a coastal stone abbey, upper body, heavy plain working habit of a contemplative order, belted, with a clear shoulder line and no draping or billowing fabric, upright bearing and entirely still, cold sea light flooding in through an open doorway behind her with the sea beyond it bright and out of focus, the stone interior dark and close around her, pre-industrial island setting, grey stone and dark wool against a luminous doorway, an administrator who happens to be in orders, no serenity of expression, no benevolence, no wisdom pose, no hands folded in blessing, professional, no readable text, signage, lettering or written characters anywhere in frame. Portrait orientation.

#### The five stamped on 30 August 2026 — hero-cast cards

Dermot's full-images-only rule for the homepage slideshow (29–30 August)
surfaced five hero-cast images that were never portraits: four designed
title cards (Iona, Galahad, Syra, Fintan) and Jeeves's kitchen emblem. All
five are now PLACEHOLDER-stamped and out of every cast until real portraits
land — the `lib/editions.js` cast comments say who returns where. The four
below are the portrait briefs; Jeeves is a decision, not a brief, and is
indexed in `open-questions.md`.

All are **16:9 landscape**, and the atmosphere is added around each page's
own `role` and `description` — no fact here is invented.

**The negative lives inside each blockquote, and that is a lesson, not a
style choice** (30 August, first run): `image-prompts.js --generate` sends
only the blockquote, so a "carry the standing negative" instruction beside
it is invisible to the generator. The first run went out bare and returned
readable signage, branded real-world survey kit, active screens and visible
lamp fittings across three of the four. Any future entry written for the
generator carries its negatives in the quoted text itself. (The parser also
joins every consecutive `>` line into the prompt, so notes about an entry
go in its bullet prose, never in the quote.)

- **`dr-iona-vale.jpg`** — Transit Safety Officer, Harmonic Operations,
  Threshold Station; the authority to say the jump does not happen. Her page
  is exact about what she is not: not against teleportation, against the
  pretence that the cost disappears. So the portrait is not a guard at a
  gate — it is a clinician standing where the cost is paid, unhurried and
  immovable. No displays (the standing rule: never light a scene with one);
  the bay behind her is hardware, not readouts.
  *(Revised 30 August after the first run: readable "PLATFORM 4" signage, a
  lettered console, active screens and a caged lamp fitting — the negative now
  travels inside the prompt.)*
  > Cinematic portrait of a woman in early middle age, a transit safety officer standing at the observation position of a teleportation bay aboard a science-fiction boundary station, upper body, turned to face the viewer. Practical dark clinical-professional uniform with no markings, hair pinned back for work, one hand resting beside a heavy plain metal hold lever she has not pulled, the lever's mount unlabelled bare metal. Calm, level, immovable expression — the person who decides whether the jump happens, unhurried and not unkind. The bay behind her is quiet metal architecture in soft shadow: coil housings, conduit, an empty transit platform, every surface plain unmarked metal, no glow and no active machinery. Cool muted palette, lit by one soft warm pool of light falling on her position from a concealed source above, no lamp or light fitting visible in frame, cinematic haze, professional, no glamour styling. No readable text, lettering, numerals, signage, labels, stencilled markings, branding or written characters of any script anywhere in frame; no screens, monitors, displays, consoles, gauges, dials or indicator lights; no holograms or projected light; no wristwatch; no weapons; no flat studio backdrop and no corporate headshot posing. Landscape orientation.

- **`galahad-thorne.jpg`** — Survey Team Lead, twelve years at boundary
  postings; describes accurately rather than reaching for the nearest
  category. Field surveyor, not office lead, so he is outdoors at an
  instrument. The Ranger block applies, adapted for field dress. The Marsh
  Causeway register — standing water, mist, first light — carries the
  boundary without depicting anything across it, per the hint-don't-show
  line.
  *(Revised 30 August after the first run: a branded present-day total
  station with keypad and display, sleeve chevrons, a handwritten notebook, a
  cap — the instrument is now described as unfamiliar and unmarked, and the
  negative travels inside the prompt.)*
  > Cinematic portrait of a weathered man in his forties, bare-headed, a survey team lead at work on a misted marsh boundary at first light, upper body, standing beside a surveying instrument of unfamiliar future design mounted on a heavy tripod — a plain matte grey-green housing around a single large optical lens, smooth unmarked casing with no keypad, no display, no branding and no manufacturer's markings, clearly an optical instrument and clearly not any present-day surveyor's model. One hand steadies it as he looks toward the viewer with a patient, level, precise expression — a man who describes exactly what he sees and nothing more. Plain well-kept field service dress in muted grey-green, its only insignia one small plain geometric tab at the collar, shapes and a single colour insert; no sleeve patches, no chevrons, no badges anywhere else on the clothing; practical field kit, empty hands otherwise. Behind him flat standing water and low mist going pale at the horizon, a single line of old bare wooden marker posts receding into the haze, nothing visible beyond them. Soft dawn light, cool serene palette, quiet and slightly haunting, hopeful rather than bleak. No readable text, lettering, numerals, signage, labels, branding or written characters of any script anywhere in frame; no screens, displays or keypads; no notebook and no handwriting; no wristwatch; no cap or hat; no weapons. Landscape orientation.

- **`syra.jpg`** — Krenyi boundary analyst, the Quiet-Built. The hardest
  brief of the four, because the species canon forbids the easy move: there
  is no organ to point at, so there is nothing to exaggerate, and the record
  says the Quiet-Built look almost human and decline to say what they are.
  What the portrait can hold is what the lore page opens on — posture
  steady, gaze direct, no wasted gesture — plus low light (which costs her
  nothing) and an age that will not resolve. The stillness is the alien.
  Trope guard written in: no elf, no grey, nothing glowing.
  *(Revised 30 August after the first run: both variants nailed the
  stillness and the unplaceable age, and both leaked monitors, lamps and
  cabling into the room — the room is now described as closed and inert, and
  the negative travels inside the prompt.)*
  > Cinematic portrait of a Krenyi woman, a humanoid who at first glance reads as an entirely ordinary human and gives the eye nothing to point to — ordinary ears, ordinary eyes, ordinary skin, no prosthetics and no alien features of any kind. What is not human is the composure: she sits perfectly still in a dim survey analysis room, hands at rest on the table, posture exactly balanced, gaze direct into the viewer, an adult whose age is impossible to place, quietly beautiful without any glamour styling, pale, dark hair drawn plainly back, plain professional analyst's clothing with no markings. The room around her is almost dark and everything in it is closed and inert — closed instrument cases, a bare worktable, deep shadow — lit by one soft warm pool of light from a concealed source above, no lamp or light fitting visible in frame, and she is visibly comfortable in the dark. Serene, enigmatic, slightly uncanny in stillness only; not a pointed-eared elf, not a grey alien, no glowing eyes, no unusual skin colour. No readable text, lettering, numerals, signage, labels, branding or written characters of any script anywhere in frame; no screens, monitors, displays, tablets, consoles or indicator lights of any kind, powered or dark; no cables; no holograms or projected light; no wristwatch or jewellery; no weapons; no corporate headshot posing. Landscape orientation.

- **`brother-fintan.jpg`** — retired Chief on the boundary-safety track,
  now the beekeeper of Cnoc na mBeach. The one non-SF frame of the four,
  same licence as `brother-daire`. The picture is his page's own image of
  him: the same watch at a smaller scale — and the telling-the-bees custom
  gives the pose, hinted rather than staged. Contemplative-tier domains
  front him, so serenity leads.
  *(First run, 30 August: both variants clean — variant 1 the stronger on
  the telling-the-bees pose and free of modern tells; variant 2 carries a
  wristwatch. Variant 1 filed and approved by Dermot the same day; all four
  portraits in this section were approved as the v1s of their runs.)*
  > Portrait of a fit, weathered man past seventy, a retired officer turned beekeeper, standing among plain wooden hives in a stone-walled hive-yard at first light, upper body. One hand rests flat on a hive roof and his head is slightly inclined toward it, as though he is quietly telling it something; a few bees hang in the air around him, unbothered. Undyed working wool in monastic plainness, no veil, no gloves, deeply lined unhurried face with the attentive patience of a man reading a slow instrument. Behind him low whitewashed stone cells and a green hillside going up into soft mist. Warm early light, gentle and serene, quiet, hopeful, entirely unhaunted; no science-fiction furniture of any kind. Landscape orientation.

- **`jeeves.jpg`** — **ruled 30 August: a body in canon** (Dermot's pick
  from the three options; the alternatives — a new emblem, or emblem-plus-
  never-cast — are closed). The ruling turned out to be half a
  clarification: `s02e01c01` already has him as *"a domestic-model
  intelligence... standing exactly where a man might stand"*, timing
  arrivals and pouring tea, so the frame existed in published canon and the
  character page now describes it (matte ivory-grey shell, plainly jointed,
  hands *sufficient for pastry*, round dark lenses that make no attempt to
  be eyes — and the uncatalogued waistcoat). The portrait falls under *AIs
  get portraits like everyone else*: artificiality visible at the prompt.
  The kitchen carries over from the retired emblem — same room, now with
  him in it, at morning instead of waiting for one.
  > Cinematic portrait of a domestic-model artificial intelligence in the compact kitchen of an apartment aboard a large space habitat, upper body, standing at a scrubbed wooden table setting down a tea tray with exact care. The machine is human-shaped and unmistakably a machine: matte ivory-grey composite shell with plainly visible seams and joints, articulated mechanical hands, a smooth head with two round dark optical lenses that make no attempt to be eyes, no human face, no synthetic skin, no hair. Over the shell it wears a plain dark neatly fitted waistcoat. The apartment is unmistakably aboard a habitat, not a house on a planet: smooth pale composite walls with rounded coving, a galley counter in matching composite, a single small viewport whose view is the habitat's own softly lit green interior curving upward in the distance — no sky, no garden, no countryside. The kitchen is warm and immaculate all the same — a folded cloth, one clean cup, the wooden table an obvious treasure in a moulded room — and the whole picture is gentle, precise, and quietly comic in its dignity. Photographic realism, warm domestic palette over cool habitat neutrals. No readable text, lettering, numerals, signage, labels, branding or written characters of any script anywhere in frame; no screens, monitors, displays, consoles or indicator lights; no visible lamp, light fitting or bulb; no holograms; no weapons; not a menacing robot, not an industrial robot, no exposed wiring; no rustic cottage, no exposed wooden beams, no stone walls, no potted plants, no gas stove, no copper kettle. Landscape orientation.

#### Peran Slade — added 30 August 2026

- **`peran-slade.jpg`** — Fellowship of Light novice at Asteria's chapter
  house, seeking which expression of the one vocation is theirs (page
  approved by Dermot 30 August). The pose is the page's own material: the
  kept lamp custom and the door the margin-book line is about, so the
  portrait puts them in the doorway at dusk with the lamp — staying and
  going in one frame, nothing depicted beyond the threshold but hills. The
  flame hand-lamp is a deliberate, scoped exception to the no-visible-lamp
  negative: it is the subject's own instrument, not a light fitting.
  > Cinematic portrait of a young person of about twenty-two, androgynous, a novice of a contemplative order, standing in the open stone doorway of a chapter house at dusk, upper body, seen from just inside the threshold. They hold a small lit hand-lamp with a live flame, the picture's only warm light; through the doorway behind them, green hills going dark under a pale evening sky, nothing else out there. Plain undyed novice's working clothes with a belted overtunic, short practical hair, an alert open expression caught mid-thought between staying and going — attentive, earnest, questioning, not sad. Warm lamplight against cool dusk, quiet, serene, hopeful, slightly enigmatic. No readable text, lettering, numerals, signage, labels, branding or written characters of any script anywhere in frame; no screens, monitors, displays or consoles; no electric light fittings or bulbs anywhere, the hand-lamp's flame is the only light source; no candle arrays, no incense, no religious symbols or iconography; no weapons; no glamour styling, no corporate headshot posing. Landscape orientation.

#### Outstanding portraits — audited 19 August 2026 (25 pages)

The pages that carry no `image:` today. This is a **list, not a prompt set** —
only Anne's prompt is written, because that is what was asked for. The other 24
are named so the next session starts from a true count rather than re-deriving
one.

```
alala · andrew-falkorian · anne-de-courtney · anne-wender · dagny-voss
elvira · emma-la-chapelle · ernesto-strozzi · galen-kane · kate-ukrainka
knopka · lucene-9000 · luke-valerius · lumbarian · muffin · saint-aoife
sildron-drey · sofia-santos · sorcha-nic-dhiarmada · sorcha-shepherd
sylvie-harrow · thalassa-vexar · thrum · xenon · zoe-smith
```

Re-derive it rather than trusting it, the same way this audit did:

```bash
for f in src/characters/*.md; do [ "$(basename "$f")" = index.md ] && continue
  grep -q '^image:' "$f" || basename "$f"; done
```

**Three of these are the rescue machines** — Lucene-9000, Xenon and Lumbarian —
and they fall under the *AIs get portraits like everyone else* rule above, with
the artificiality made visible at the prompt. Worth doing as a set rather than
singly, since they share a frame of reference and a generator has no memory
between frames.

##### The remaining twenty-one (19 August 2026)

Written at Dermot's request, in one pass, which is the right way to do it: the
roster reads as a roster only if the frames were chosen against each other. All
are **16:9 landscape**, all are **present-day** unless the page says Historical,
and all carry the standing negative below. **None is generated. All are
proposals.**

**Standing negative — paste into every one of these:**
> readable text, lettering, numerals, signage, labels, branding or written characters of any script anywhere in frame; holograms, projected light, glowing displays, screens, monitors, consoles; visible lamp, light fitting or bulb; flat studio backdrop, gradient background, glamour lighting, corporate headshot, posed smiling to camera; weapons.

**Ranger block — paste into the seven Star Rangers frames:**
> Star Rangers service dress, plain and well kept, carrying small geometric rank marks only — a plain-finished tab at the collar, shapes and a single colour insert and nothing else. No name tape, no nameplate, no stitched badge, no printed words, no letters and no numerals anywhere on the clothing.

**Five of these belong to *Undercover Pets* and are deliberately off the house
style.** That thread is *cute, cool and clever*, and the runbook is explicit
that weaving melancholy or mystery through it is a category error rather than a
stylistic variation. Kate Ukrainka, Knopka, Muffin, Sylvie Harrow and Thrum are
therefore lit warm and ordinary, not haunted. Muffin is the exception inside the
exception — see its entry.

---

**The Star Rangers (7)**

- **`andrew-falkorian.jpg`** — Chief Science Officer; an engineering doctorate,
  standing at the seam where *the Corps decides what an instrument needs to
  measure and engineering decides how it will survive measuring it*.
  > [ranger block] Cinematic wide portrait of a man in his late forties in a post's science section aboard a space installation, upper body, standing at a bench beside a part-built instrument — a bare frame with its optics cradled and its housing not yet on — one hand resting on the frame, considering it rather than working on it. Absorbed, exacting, unhurried; the expression of someone deciding whether a thing is finished. Spare institutional interior, soft diffuse light from a concealed source, deep shadow beyond the bench, a wide dark viewport further back. Muted grey, brushed alloy, one warm neutral. 16:9 landscape.
  - **Extra negative:** laboratory glassware, bubbling liquids, microscope, mad-scientist styling, wall of equipment.

- **`anne-de-courtney.jpg`** — Chief Ranger of the one standing delegation on
  Vellamar, whose method is *not asking the court for the second thing before the
  first one is understood.*
  > [ranger block] Cinematic wide portrait of a woman in her fifties standing just inside the open doorway of a small walled compound at the edge of a pre-industrial island capital, upper body, looking out at the city beyond without stepping toward it, hands at her sides, entirely composed. Beyond the doorway: tiled roofs, stone lanes, terraced ground rising behind, warm afternoon light on the town. Inside the doorway where she stands the light is cool and plain. Restraint and patience rather than longing. Muted stone, terracotta and grey. 16:9 landscape.
  - **The frame is her method.** She is at the threshold of a place she has never
    asked to be let further into. Nothing else on the page needed saying, and a
    desk would have said nothing.
  - **Not the posted clause.** Her page keeps the charter's withdrawal clause
    pinned in the working room, which would have been the obvious frame and is
    unusable — it is a sheet of text, and text is the standing failure mode.

- **`emma-la-chapelle.jpg`** — the junior xenolinguist who filed the reading *at
  the bottom of her confidence range*, and returns from the Abbeylands *with more
  questions than sentences*.
  > [ranger block] Cinematic wide portrait of a young woman seated at a plain wooden table in the cool stone hall of a working abbey on a pre-industrial world, upper body, a closed notebook squared on the table in front of her and a pencil laid down beside it, her hands still — listening to someone out of frame with her head slightly tilted, entirely absorbed. Cold north daylight through a tall narrow opening, the hall dim beyond it, plain benches, no ornament. Practical field clothing over her service dress. Grey stone, pale daylight, one warm wood surface. 16:9 landscape.
  - **The notebook is shut and the pencil is down** — changed 19 August from
    *open and blank*, which is a page asked to be empty. Shut is the safe form
    and says the same thing better: she is at the moment before the note,
    listening rather than recording.

- **`ernesto-strozzi.jpg`** — the branch's most-cited practitioner for a piece of
  work he got wrong, who *teaches the correction rather than the recovery from
  it*.
  > [ranger block] Cinematic wide portrait of a man in his sixties standing at the head of a plain working table in a delegation compound's translation room, upper body, mid-explanation to two junior officers seated out of frame, one hand open in a gesture that is laying something out rather than insisting on it. Unembarrassed, matter-of-fact, patient. The table between them is entirely bare. Warm shuttered daylight in bars across the room, whitewashed walls. Ochre, whitewash, dark wood. 16:9 landscape.
  - **The table was cleared on 19 August.** It held *blank unmarked cards laid
    in rows*, which is a writing surface asked not to be one. The gesture does
    the work: a man laying something out for two people carries *method* without
    an object, and a bare table between a teacher and his juniors is the better
    composition anyway.

- **`galen-kane.jpg`** — *counts departures*. His most valued record entries are
  the closures, and the Corps' tradition puts the departing Ranger at the back of
  the room, in civilian clothes, unarmed.
  > Cinematic wide view of a man in his sixties standing alone at the back of a plain frontier meeting hall during a ceremony, upper body, in ordinary civilian clothes and carrying nothing, hands loosely at his sides, watching the front of the room from the last row. He is not the subject of the occasion and is plainly glad of it. The hall is full of seated colonists seen from behind, out of focus, and morning light falls through tall plain windows down the length of it toward the front. Timber, whitewash, low sun. Quiet, unceremonious, complete. 16:9 landscape.
  - **No uniform, deliberately, and the ranger block is not used here.** The
    tradition is explicit that the departing Ranger attends as a civilian guest,
    unarmed, at the back — a uniform would invert the one moment his career is
    counted in.

- **`luke-valerius.jpg`** — will not say *everywhere*, and declines the sentence
  beginning *which suggests*.
  > [ranger block] Cinematic wide portrait of a man in his forties standing at a wide dark viewport of a boundary-proximate outpost, upper body, turned away from a plain workbench behind him and looking out, arms at his sides, having just finished and having nothing to add. On the bench behind: two matched sealed reference housings, plain unmarked cylinders on a level mount, close together and identical. Outside the viewport, ordinary starfield and nothing remarkable at all. Very still, very level, faintly austere. Cool grey and deep black with one warm interior note. 16:9 landscape.
  - **The two matched housings carry the character** — instruments that disagree,
    with nothing to read on them. The house negative bans dials and readouts and
    it does not hurt here: the point is that the disagreement is not visible from
    the outside.

- **`zoe-smith.jpg`** — *the last rank most civilians ever stand in a corridor
  with*, held on purpose and at length.
  > [ranger block] Cinematic wide portrait of a woman in her fifties standing in an ordinary residential corridor of a space habitat, upper body, half-turned toward someone out of frame at a doorway and listening, weight settled, unhurried, entirely approachable. Not a command deck and not a crisis: a plain lived-in corridor with worn deck plate and a stowed handrail. Soft even light from a concealed source. Weathered, capable, patient. Warm neutral palette. 16:9 landscape.
  - **Deliberately the least impressive frame on the roster.** Her page's whole
    argument is that this rank is what the word *Star Ranger* actually means, and
    a heroic setting would have argued the opposite.

---

**Orbital Five-O (1)**

- **`alala.jpg`** — a Smart Pet raven on the public roster *with a service number
  and a leg band, because Commander Larsen's unit does not do covert animals.*
  > Cinematic wide view of a raven perched on a public handrail in the open concourse of a space habitat, in daylight from a great overhead window, the bird sharp and close and the concourse behind soft and busy with people who are not looking at her. Glossy black plumage with blue and purple iridescence, head turned, one bright eye directed at something off to the side, entirely composed. On one leg a plain metal band, unmarked. A slim matte collar fitting sits low at the back of her neck, small, plainly manufactured and making no attempt to be hidden. Bright, open, ordinary. Warm daylight, green planting in the middle distance. 16:9 landscape.
  - **Visible band, unmarked band.** Her whole posting is that she is announced
    in advance and in writing; the band has to read as official and cannot carry
    a number, so it is plain metal and the *manner* does the work.

---

**Undercover Pets — cute, cool and clever (5)**

- **`kate-ukrainka.jpg`** — writes Smart Pet books that *get the animal exactly
  right and the machinery cheerfully, deliberately wrong.*
  > Cinematic wide portrait of a woman in her sixties at a small table in a lived-in habitat apartment, upper body, having just stopped work — her pen set down and her notebook closed under one hand, both hands round a mug, looking out of the window with a half-smile she is not aware of. A plant doing well. Behind her a wide window onto the green curve of an orbital habitat's inner surface in daylight. Warm, comfortable, entirely unhaunted. Warm wood, green, soft daylight. 16:9 landscape.

  - **Nothing is being written, deliberately** (19 August). *Writing by hand* on
    a *blank unmarked notebook* is two invitations to lettering in one clause,
    and the moment just after is warmer anyway: an author with the work shut and
    a hot drink is more like the page than an author mid-sentence.

- **`knopka.jpg`** — failed the assessment *on every axis it measures*, and the
  finding is one word long.
  > Cinematic wide view of an ordinary domestic rabbit sitting upright and entirely still on the floor of a tidy habitat apartment, close and low to the ground, facing the camera and looking at nothing in particular with complete composure. Soft dense fur, ears up, one carrot-top on the floor a little way off and ignored. No harness, no collar, no fitting, no device of any kind on the animal anywhere. Warm domestic light, plain floor, a chair leg and a bag by the door. Comic dignity. 16:9 landscape.
  - **Absolutely no harness or subsystem**, which is the entire joke: nothing was
    ever fitted, and failing left her exactly as the programme found her.

- **`muffin.jpg`** — **and this one should probably not be a portrait at all.**
  Eleven statements returned a cat, a rabbit, a very young dog and *you know —
  Muffin*, and the four who said cat disagreed about the colour. **Drawing a
  specific adorable animal contradicts the page in the first frame.**
  So the portrait is the place, on the [Eden Warden](../src/characters/eden-warden.md)
  precedent — *the Warden is not depicted; it is inhabited* — and the entity is
  present and unresolved.
  > Cinematic wide view of a warm-air vent beside a galley doorway on a working deck of a space habitat, seen straight on and slightly low, the deck plate scuffed and ordinary. Warm light spills from the galley across the floor. In the warm patch by the vent something small is settled and comfortable, and it is genuinely unclear what it is — soft, low, indistinct at the edges, half in the warm light and half in the shadow of the doorway, out of focus in a way nothing else in the frame is. Beside it on the floor, a chipped saucer somebody brought from the galley. Everything else is sharp: the vent grille, the door frame, the scuffed plate. Inviting, domestic, entirely undramatic. Warm amber against cool grey deck. 16:9 landscape.
  - **Extra negative:** cat, rabbit, dog, puppy, kitten, lamb, recognisable animal of any species, face, eyes, teeth, claws, menace, horror, monster, shadow creature, glowing eyes.
  - **The tone line is the whole risk here.** The page is unsettling because the
    room is pleasant, and any legible creature — cute *or* frightening — loses
    it. If the batch keeps resolving the shape, the fix is a tighter crop on the
    saucer and the vent with the warm patch only implied.
  - **Worth Dermot's call whether it ships at all.** An entity nobody can
    describe twice is arguably a page that should carry no image, and *no
    picture* is a legitimate answer here rather than a gap.

- **`sylvie-harrow.jpg`** — a model statement, *no sentence that is false*, and
  nothing that catches.
  > Cinematic wide portrait of a woman in her forties seated at a plain table in an unremarkable habitat office, upper body, mid-answer to someone out of frame, pleasant and cooperative and entirely at ease, hands loosely together on the table. Neat ordinary professional clothing. Even, flat, perfectly adequate light with nothing dramatic in it; a plain wall, and an empty table in front of her. Nothing in the frame is out of place and nothing in it is interesting. Cool neutral palette. 16:9 landscape.
  - **The frame must have nothing to catch on**, which is the hardest brief here.
    No shadow across the eyes, no held look, no tell. It reads as a competent
    witness because that is exactly what every audit found.
  - **Extra negative:** sinister, suspicious, shifty, smirk, hard shadow across the face, film-noir lighting, interrogation lamp, villain styling.

- **`thrum.jpg`** — deaf to airborne sound, blind to a human face, *reads the
  structure it is standing on, continuously, without deciding to.*
  > Cinematic wide view of a small six-limbed alien burrow animal low in a narrow service void behind a deck panel, close and at its own height, its whole underside pressed flat in contact with the structural plate beneath it. Low, broad and compact, smooth dark hide with a faint sheen, no visible ears and no eyes to speak of, entirely occupied with the surface it is standing on and not with the viewer. Warm air and warm light leaking in from an open panel to one side; ducting, cable runs and structure receding into the dark. Alien and completely unthreatening. Warm amber light on dark metal. 16:9 landscape.
  - **It must not look at the camera.** A creature that cannot see a face and
    would not care about one is the character; a returned gaze would undo it.

---

**Historical (3)** — state the era or the setting defaults to contemporary Earth.

- **`saint-aoife.jpg`** — *never claimed to know what she'd met at the thorn
  well*, and every later reader has taken that refusal at face value.
  > Cinematic wide portrait of a woman in her thirties standing at a spring well in a thorn thicket in thirteenth-century Ireland, upper body, plain undyed woollen dress and shawl, work-worn hands, looking down at the water rather than up or out. **Her face turned down and away and left in shadow, features not legible.** Composed and unresolved — no rapture, no distress, no certainty of any kind. Night, an ordinary clear sky of small stars doing nothing in particular, a moorland horizon behind the thicket. Long dark red hair. Wet blackthorn, low stone kerb around the water, wet grass. Cold, plain, historical, entirely earthbound. Deep blue-green night, wet black thorn, undyed wool. 16:9 landscape, 1200×675.
  - **Extra negative:** halo, aureole, rays of light, glow, doves, upturned face, face toward camera, legible features, hands folded in prayer, beatific expression, ecstasy, stained glass, religious iconography, robes, veil of office, angels, apparition, embroidered or ornamented gown, jewellery, stage lighting, text, lettering.
  - **Keep the face concealed** — turned, shadowed, or away. Adopted 19 August from the older brief in Open work 6, which had it and this entry did not: *the record genuinely does not know it, and the page's whole argument is that she never claimed to know what she had seen.* Canon reasoning rather than styling, so it is written into the prompt above rather than left as a note.
  - **Ruled 20 August 2026 — the *Aoife of Stars* card is reframed, not adopted.** A supplied song card showed her front-lit and facing the viewer, features fully legible, under a night sky on moorland. Dermot's ruling: **keep the concealed face, take the rest.** So the prompt moved from grey overcast daylight to night, gained the star field and the moorland horizon and the red hair, and kept the well, the thorn and the turned face. He liked the look; the page keeps its argument.
    - Two things from the card deliberately **not** taken. The **embroidered blue-green gown** is a class signal this page does not support — she is a holy woman whose whole standing rests on refusal, and plain undyed wool says that where ornament argues with it; the card's colour survives as the colour of the night instead. And the **stars stay ordinary**: no light comes from the sky, nothing in it is happening. A sky that appears to be doing something would tell the viewer what she saw, which is the one thing seven centuries of record declined to say — and the song's own title makes that association easy to drift into.
  - **The whole page is her refusal to claim.** Any device that tells the viewer
    what she saw contradicts it, and a glow would be the story arriving at a
    verdict the record spent seven centuries declining to give. Same discipline
    the `brother-daire.jpg` prompt already used.

- **`sildron-drey.jpg`** — MSC Director of Operations, Mars; the staff side,
  *measured on whether the order was correctly formed rather than on whether it
  arrived in time.*
  > Cinematic wide portrait of a woman in her fifties in the severe service dress of a militarised space command of an earlier era, upper body, standing at a plain operations desk on Mars with her hands resting on it, looking down at the work rather than at anyone. Precise, capable, entirely without warmth or cruelty. The desk is completely bare — no paper, no folder, no document and no object of any kind on it. A tall window behind her onto flat rust-coloured Martian ground under a pale sky. Institutional, historical, cold. Rust, grey and dull olive. 16:9 landscape.
  - **Neither villain nor victim.** Her page is careful that she argued the case
    in writing and then had to execute it, and the frame should let a reader
    arrive at their own verdict rather than pre-empt it.

- **`thalassa-vexar.jpg`** — the best-liked Imperium officer in the Belt, holding
  a grade with *no authority to change anything there*.
  > Cinematic wide portrait of a woman in her fifties in the plain administrative uniform of a fallen space empire, upper body, seated at a small counter in a cramped Belt settlement office, turned attentively toward someone standing out of frame and listening properly. Genuinely courteous, genuinely powerless, and aware of both. A worn counter with absolutely nothing on it, and a queue of people waiting behind her out of focus. Cramped, warm, worn, decent. Dim amber lighting, dull metal, historical science fiction. 16:9 landscape.
  - **The queue is the point.** She was the officer who answered every question
    and could alter no condition, and a solitary desk would have made her a
    functionary instead of the thing the Belt actually remembers.
  - **The empty counter is the 19 August rewrite.** The first version put *blank
    unmarked forms in a tray* in front of her, and a form is the purest
    text-bearing object there is. Clearing it is also the better picture: an
    official with nothing between her and the person talking.

---

**Elsewhere in the settled worlds (5)**

- **`dagny-voss.jpg`** — born vacuum-side, *has never once been to a world anyone
  would call beautiful, and has stopped waiting to be assigned to one.*
  > Cinematic wide portrait of a woman in her fifties in practical industrial coveralls on the overlook gallery of a large orbital ore-refining habitat, upper body, one hand on a railing, turned back toward the camera with a dry good humour and no self-consciousness at all. Behind and below her the refinery floor runs away in scale: gantries, bulk hoppers, heavy handling frames, everything clean and orderly and working. Beyond it a wide port shows the planet's ring and the curve of the world below. Hard even industrial light, no glow, no sparks. Steel grey, dull orange, the pale planet beyond. 16:9 landscape.
  - **Extra negative:** molten metal, sparks, foundry glow, furnace, dirt, grime, hard-hat stock photography.

- **`elvira.jpg`** — **the one prompt that will fight its own subject.** She is
  *not magical*; the locals call her the Enchantress and the label *obscures the
  mechanism*. She is a technician working chalk, thread, water in vessels and
  written records against Etheric gradients.
  > Cinematic wide portrait of a woman in her forties working alone in the stone main room of a small marsh outpost, upper body, crouched over a broad section of bare chalk floor on which fine thread has been laid out in a precise geometric survey grid, weighting one thread at a corner with careful fingers, checking the line by eye. Working clothes, sleeves pushed back, chalk dust on her hands and forearms. Around her: plain glass and earthenware vessels of water set at measured intervals, a folding rule, stacked plain-bound record books shut on the table. Flat cold daylight from a small window and open door, marsh light, no fire and no flame anywhere. Chalk white, wet grey-green, plain grey stone. Procedural and absorbed, the concentration of a surveyor. 16:9 landscape.
  - **Extra negative:** witch, sorceress, enchantress, magic, spell, ritual, occult, candles, flame, incense, smoke, glowing runes, glowing symbols, sigils, pentagram, crystal ball, cauldron, staff, wand, amulet, robes, hood, cloak, mystical aura, floating objects, sparkles, arcane.
  - **The longest negative on the roster, and it earns its length.** *Chalk,
    thread, water in vessels* is a witchcraft prompt read literally, and the page
    exists to say it is not one. The grid, the folding rule and the shut record
    books are what make it survey work; take any of them out and the frame turns
    into the label she spends her page rejecting.

- **`sofia-santos.jpg`** — answers for *everything below the waterline* and has
  no authority whatever over anything above it.
  > Cinematic wide portrait of a woman in her fifties in plain practical clothing standing inside a seabed city's pressure hull, upper body, at a wide thick viewport with dim green-blue ocean beyond it, turned three-quarters to the camera, an engineer's composure and no ceremony of office anywhere about her. Through the viewport: the lit shapes of other domes and a work light in the dark water. The interior is heavy and well-made — thick frames, sealed joints, everything rated. No surface, no sky, no daylight anywhere in the frame. Deep blue-green and warm interior light. 16:9 landscape.
  - **No sky in frame, deliberately.** Her jurisdiction stops at the waterline
    and the picture stops there too.

- **`sorcha-nic-dhiarmada.jpg`** — walks the dark-down *because a thing kept by
  everyone should still be seen to be kept by someone.*
  > Cinematic wide view of a woman in her forties walking a rough hill track alone at night on an upland pasture world, seen from a little way off and small in the frame, wrapped against the cold, a working dog at her heel. Below her a valley of scattered steadings with every single light out — dark roofs, dark yards, nothing lit anywhere. Above, an enormous clear sky, thick with stars, and the whole scene lit by starlight alone. Sheep on the slope as pale shapes. Nothing frightening: a kept custom, walked. Deep blue-black, silver, the faint warmth of wool. Beautiful and quiet. 16:9 landscape.
  - **Extra negative:** lantern, torch, lamp, firelight, glowing windows, lit houses, any artificial light source anywhere in frame.
  - **The dark is the custom.** One lit window would break the thing the walk
    exists to honour, and this is the frame on the roster with the most
    *serenity* in it, which the house target asks for and the roster is otherwise
    short of.

- **`sorcha-shepherd.jpg`** — the registry taught her that *a record can be
  wrong, and a record can be unfinished, and the second is worse.*
  > Cinematic wide portrait of a woman in her thirties at survey work on open limestone upland, upper body, standing at a tripod-mounted optical survey instrument with one hand steadying it, looking off along the line she is shooting rather than through the eyepiece. Bare pale fissured limestone pavement running away in every direction, thin grass in the cracks, a low drystone wall on the skyline. Practical outdoor clothing, weather on her face. Wide bright overcast light, no sun. Pale grey stone, grey-green, wide sky. Methodical and unhurried. 16:9 landscape.
  - **Looking along the line, not through the eyepiece** — she is checking what
    the measurement will mean before she takes it, which is the habit the page
    says the registry gave her.

**When these come back.** Check Elvira and Muffin first — both have a default the
generator wants badly and both fail quietly rather than obviously. Check
lettering at 4× on Strozzi's cards, Drey's folders and Vexar's tray, per the
Calloway lettering-check note. And **do not generate all twenty-one in one
sitting and judge them tired**; the roster's value is that the frames differ from
each other, and that is a judgement that degrades.

##### The three rescuers — a set (19 August 2026)

`lucene-9000.jpg`, `xenon.jpg`, `lumbarian.jpg`. Prompted together because they
share a generation of manufacture, and **a generator has no memory between
frames** — so "the same era" has to be carried as literal attributes in all three
or it will not survive the batch.

**What binds them is not a place.** Lucene is in Eden's civil detective bureau;
Xenon and Lumbarian are aboard Wender's ship. What they have in common is the
catalogue shelf: all three are **classic designs whose lines are out of
production**, well made in a period that expected its work to outlive it, and
still running decades past it. `xenon.md` files him and Lucene on the same shelf
in as many words.

**All three are present-day frames.** The rescue-era framing was considered and
dropped: a character portrait shows the character now, like every other portrait
on the roster, and setting Xenon's in the aftermath would have put the rack of
part-empty cradles in shot — which is published prose but would make an *image*
carry the hint about the machines that were lost, and §7 is explicit that the
loss stays hinted and no page may state it. Not a line worth walking up to for a
background detail.

**The shared house block — paste verbatim into all three.** This is the set.

> Classic-design service machine of a period that expected its work to outlive it, still in service decades later, plainly manufactured and plainly maintained. Matte pale grey composite shell with a fine even grain, unpainted and entirely unmarked. Panel joins are honest recessed seams with captive fasteners left visible, built to be opened rather than concealed. Dull warm-toned alloy at the bearings and joints. Wear reads as polish and not as damage: edges gone smooth and faintly darker where work and hands have passed, with no rust, no corrosion, no grime, no chipping, no dents and no broken parts anywhere. Where a sensor sits it is plainly an optical instrument — a recessed lens behind a machined ring — and never a human eye. Nothing anywhere is open, exposed, wired, dripping or unfinished; every panel is closed.

**Why the shell is visible rather than seamless, in-world.** The rule that a
machine's artificiality must show at the prompt has a canon reason here rather
than only a craft one: Reeves and Jeeves run newer architecture and Lucene is a
generation behind them. **Her manufacture shows because her generation did not
hide it**, not because she is crude — which is the same sentence her page already
makes about her mind.

**Common negative — paste into all three:**
readable text, lettering, numerals, branding, maker's plate, signage, labels,
stencilled markings or written characters of any script anywhere in frame;
holograms, projected light, glowing displays, screens, monitors, consoles, dials,
gauges; exposed wiring, open panels, visible internal machinery, cabling,
sparks, fluid, damage; rust, corrosion, grime, oil stains, derelict or abandoned
look; weapons of any kind; flat studio backdrop, gradient background, glamour
lighting, corporate headshot; contemporary Earth setting; menace, threat, horror,
uncanny grimace, red glowing eyes.

---

- **`lucene-9000.jpg`** — the one that will fight the generator hardest, because
  *social gynoid* returns a photoreal woman by default and that face belongs to
  nobody. Her frame is her actual working posture: **beside the interviewing
  officer, never leading**. *The questions are always a detective's, and what
  Lucene does is watch the answer arrive.*
  > [house block] Cinematic wide portrait of a humanoid service machine of female form seated slightly to one side in the plain interview room of a civil detective bureau aboard a space habitat, upper body, angled toward someone out of frame and watching them closely and steadily, hands still and folded in her lap, not speaking. Her face is a manufactured face and is meant to be read: near-human proportions, capable of expression, currently holding a small attentive warmth — and unmistakably made, with a fine seam running at the jaw line and another at the temple, a matte surface with no pores and no translucency, and eyes that are plainly recessed optical lenses behind machined rings. Her hair is a single moulded matte form rather than individual strands. The plain single-breasted bureau jacket over ordinary clothing, one colour, cut for a long shift — and the collar entirely bare, carrying no mark of any kind. The room is spare and institutional and softly lit by diffuse recessed light from a concealed source, with no lamp or fitting visible; a bare table edge in the foreground, a blank wall behind. Muted grey and warm neutral palette, quiet, composed, patient, faintly uncanny but entirely unthreatening. 16:9 landscape orientation.
  - **Extra negative:** photorealistic human woman, human skin, pores, freckles, translucent skin, human eyes with sclera and iris, individual hair strands, flowing hair, cosmetics, jewellery, android with visible circuitry, exposed skull plate, half-peeled face, seductive or doll-like styling.
  - **The tone line lives on this one.** Her artificiality is carried by a seam
    at the jaw, a seam at the temple and the lenses, and by nothing else — the
    cyber-revenant precedent exactly, which sealed the collar and left one silver
    seam. A peeled face or a visible skull would clear no prohibition and break
    the rule.
  - **The bureau jacket with a bare collar** (added 19 August, on Dermot's
    direction that Eden's detectives are uniformed). She wears the uniform
    because she works the bureau's interviews; she carries no rank mark because
    **rank is an office and she holds none** — she answers to Oyelaran
    operationally and to the Warden on her own standing. The bare collar is a
    proposal and the sharpest thing in the frame: a machine in the uniform of a
    ladder it is not on. See `src/lore/eden-bureau-uniform.md`.
  - **Draft alt text, to be checked against the frame:**
    > A humanoid machine of female form in a plain bureau jacket sits to one side in an interview room, hands folded, watching someone out of frame. Her collar carries no rank mark. Her matte face has a fine seam at the jaw and temple, and her eyes are recessed optical lenses.

- **`xenon.jpg`** — *his personhood lives where his hands do*, so the hands are
  the subject and the face is not. He is going over a machine with nothing
  visibly wrong with it, which is the whole character: *his standard for beyond
  repair has never once been met.*
  > [house block] Cinematic wide view of an old maintenance robot at work at a bench in a starship's machine bay, seen close and slightly from the side, the composition centred on its hands and forearms rather than on any face. The hands are the most finished thing about it — many-jointed, worn smooth and bright at the fingertips from decades of use, holding a small component with great precision and no hurry. On the bench in front of it lies a small service machine, powered down and intact, with nothing visibly wrong with it; a shallow tray of clean parts sits alongside, laid out in order. The robot's upper body is a functional column of closed panels with no human face and no attempt at one — a sensor head with recessed lenses, angled down at the work. One articulated task light on a bench arm throws a single clean pool of light across the work surface, with the rest of the bay falling away into soft shadow. Racked tools behind, everything stowed square. Muted grey, warm alloy and one warm circle of working light. Absorbed, unhurried, quietly devotional in the way of skilled hands. 16:9 landscape orientation.
  - **Extra negative:** humanoid face, human features, expressive mouth, robot with a human-looking head, clumsy or bulky hands, welding sparks, cutting torch, disassembled parts strewn about, mess.
  - **One deliberate breach of house convention, and why.** The standing rule is
    *no lamp or light fitting visible in frame*, and this prompt puts a bench task
    light in shot. That rule exists to stop habitat interiors filling up with
    domestic lamps; **a task light on a workbench is a tool, not a furnishing**,
    and the single bright light over the work is the register the chapter already
    established for him. Worth a look on return, and easy to drop from a re-roll
    if it reads as clutter.
  - **Draft alt text, to be checked against the frame:**
    > An old maintenance robot bends over a workbench in a ship's machine bay, its many-jointed hands worn bright at the fingertips, holding a small part under a single bench light. A powered-down service machine lies intact on the bench beside a tray of clean parts.

- **`lumbarian.jpg`** — the hardest to get right and the simplest to say. *There
  is nothing humanoid about him. No face to read, no hand-sized anything,
  nothing built to be held.* The frame carries **scale and stillness**, because
  *something that size being that still is a language of its own* — and because
  there is no record, on any posting, of him damaging anything smaller than
  himself.
  > [house block] Cinematic wide view in open space of a vast heavy repair machine working against the outer hull of a starship, no human figure present. The machine has no face and nothing humanoid about it at all — a great trussed frame and armoured housings carrying several long articulated manipulators, built entirely around reach and load. One manipulator is laid flat against the hull plate and held perfectly still, resting rather than gripping, in contact along its whole length. Beside it in the same frame is an ordinary hull hatch with a handrail beside it, human-sized, which is what makes the machine's scale legible. The hull curves away into the distance behind. Hard raw sunlight from one side, absolute black shadow on the other, unfiltered starfield beyond, the vacuum silent and enormous. Muted grey plate, warm alloy at the joints, one long clean seam of new weld running away under the manipulator. Immense, careful and entirely still. 16:9 landscape orientation.
  - **Extra negative:** face, eyes, head, humanoid form, arms and legs, mech, mecha, battle robot, walker, weapons, thrusters firing, debris field, wreckage, explosion, drama, astronaut, human figure, spacewalking person.
  - **Why no human in frame** — the hatch and handrail carry the scale instead.
    Putting a person beside him invites the reading his page forecloses: he is
    *not* a machine that works alongside people, he works where people cannot,
    and the crew reach him afterwards, at the height they can reach.
  - **Draft alt text, to be checked against the frame:**
    > A vast trussed repair machine works against the outer hull of a starship in open space, one long manipulator laid flat and still against the plate. A human-sized hatch and handrail beside it give the scale; a clean seam of new weld runs away beneath.

**Generate the three together, and look at them side by side before keeping
any.** The set only works if the shell reads as one catalogue across all three
frames; a batch where Lucene's grey and Xenon's grey are different greys has
failed the thing the set was for, however good each frame is on its own.

**Not yet generated.** All three are proposals.

- **`anne-wender.jpg`** — [Anne Wender](../src/characters/anne-wender.md), the
  eldest survivor of the wreck of 2788 and later the first sheriff a frontier
  world ever swore in. **Depicted as safety officer during the buildout, not as
  sheriff**, for two reasons and the second is the binding one: her page puts her
  in that post at Season 1's start with the election's course left unwritten, and
  **there is no sheriff's insignia in canon** — `rank-insignia-and-uniform.md`
  covers the Star Rangers only, so drawing a badge would invent an office's
  regalia in a picture, which is the same cascade the Calloway entry refused for
  a Compact uniform. The frame is the settlement working, and she is counting it.
  > Cinematic wide portrait of a woman in her early fifties standing in the gravel yard of a young frontier settlement in the early morning, upper body and a little of the yard, turned three-quarters away from the camera and looking off across the site rather than at the viewer, plainly in the middle of taking a count of something out of frame. Dark hair going grey at the temples, tied back tight and out of the way; a weathered outdoor face, no cosmetics, no styling; calm, unhurried, entirely absorbed. Practical hard-wearing site clothing in undyed and muted colours — a canvas work coat over layers, cuffs turned back, gloves pushed into a pocket — worn plain and completely unmarked. Behind her the settlement is visibly working and well kept: timber-framed barns and low prefabricated buildings squared up along the yard, a concrete pad where a plain grey fusion unit stands behind a simple railing with its pipework running off to a nearby building, hand tools racked upright, timber stacked square and strapped down, everything stowed and nothing broken. No crates, no drums and no packaging of any kind. Wide pale sky, low early light raking across the yard from one side, long soft shadows, a thin ground mist not yet burnt off. Muted realistic palette of grey, canvas and pale gold. Quiet, spacious and still, with the settlement plainly thriving rather than struggling. Science-fiction frontier setting, photographic and grounded, documentary in feel but composed and unhurried. 16:9 landscape orientation.
  - **Negative:** badge, star, shield, sheriff badge, police badge, rank insignia, epaulettes, name tape, patch, uniform, military uniform; firearm, gun, holster, weapon of any kind; readable text, lettering, numerals, signage, labels, stencilled markings or written characters of any script anywhere in frame; screens, monitors, glowing displays, holograms, projected light, consoles, dials, gauges; visible lamp, light fitting, bulb or lantern; rust, corrosion, grime, oil stains, damage, exposed wiring, litter, clutter, shanty, slum, refugee camp, derelict or abandoned look, poverty; flat studio backdrop, gradient background, glamour lighting, corporate headshot, posed to camera, smiling at camera; contemporary Earth setting, modern street, modern vehicles; horses or draft animals in frame; children.
  - **Why "no poverty" is a canon negative rather than taste.** [The Fusion
    Ceiling](../src/lore/the-fusion-ceiling.md) says it outright: an early
    settlement's pre-industrial surface is *"persistently misread as poverty when
    it is sequencing."* A generator asked for a frontier colony will reach for
    hardship by default, and that default would make the picture assert the exact
    misreading the entry corrects. The yard is orderly because the world is
    working, not because anyone is prospering.
  - **Why she is not looking at the camera.** Her character note is that she
    counts — stock, shifts, who is where — and is not in the habit of saying the
    total aloud. Attention directed off-frame renders that without a caption, and
    it keeps the portrait inside the house target: *enigmatic and haunting, with
    beauty, mystery, hope and serenity woven through.* Hope and serenity are
    carried by the light and the working settlement; the withholding is carried
    by where she is looking.
  - **No family resemblance is specified, deliberately.** She is Karla Wender's
    elder sister, but `karla-wender.jpg`'s alt text establishes no hair, eye or
    feature detail to match, and a generator carries nothing between frames — so
    a resemblance could only be invented here and would then bind Karla's
    existing portrait retroactively. If a resemblance is wanted, it should be
    specified from Karla's actual frame first, in both prompts, as literal
    attributes.
  - **Draft alt text, to be checked against the frame that comes back** and
    rewritten if it does not match, per the standing rule that alt describes what
    the file actually shows:
    > A woman in her fifties in a canvas work coat stands in the gravel yard of a frontier settlement at dawn, turned away from the camera and looking across the site. Behind her, timber barns and low prefabricated buildings, and a plain grey fusion unit on a concrete pad behind a railing.
  - **Not yet generated.** Tone, wardrobe and setting are proposals.

### 2. Lightroom / Photoshop — Dermot's hands only

No spot-heal, upscaler, or compositing exists in-session. Dimensions
re-measured 2026-07-24.

**The dust spot (priority).** `lore/archipelago-palm-avenue.jpg` (1600×1200) —
sensor-dust blemish in the sky at ~53% across, 40% down; the known main-body
Tamron artifact. Same heal recipe as the Kenya 2025 raws. Worth re-checking
other sky-heavy frames from that body while in there.

**Under-spec — resolved 2026-08-11 (Dermot's ruling): replace, not upscale.**
Super Resolution is off for this set, which ends the two-remedies-one-problem
conflict `firefly-prompts.md`'s header box recorded (that file has since
been retired, 2026-08-11, its remaining content absorbed here and into
`image-prompts.md`). Re-measuring for the
ruling also found the 2026-07-24 table half stale: four of the six portrait
files were already replaced at spec (1200×675) — `tissadelle-shepherd.jpg` and
`bubochka.jpg` by 2026-08-06, `bubochka-alert.jpg` and `dorian-calloway.jpg`
recorded done 29 Jul in `image-prompts.md` § 3. What actually remains, and
where each goes:

| File | Current | Route |
|---|---|---|
| `characters/agent-barsik.jpg` | 512×1024 | regenerate — prompt now in Open work 1 |
| `characters/aldera/field-photo-03.jpg`, `-04.jpg` | 512×1120 — **PNG data under a .jpg extension** | re-crop from Dermot's own originals — see the Aldera note below; his hands, stays here |
| `lore/prismere-*` / `prismeri-*` — 11 files | 768×1152 | regenerate — prompts now in Open work 5 |
| `lore/prismere-root-mat-network.jpg` | 773×1152 | regenerate with the set — Open work 5 |

The old all-or-none rule carries over to replacement: the Prismere set
regenerates as one batch or not at all, so the series stays internally
consistent. Every migrated entry is dormant until its old file is deleted, per
the standing pipeline rule — regeneration stays a deliberate act.

**Softness** — may be re-shoots rather than edits; sharpening only goes so far
on zoom-smear: `lore/highland-summit-snowfields.jpg`,
`lore/highland-rock-spires.jpg`, `lore/boirinn-uplands-waterfall.jpg` (all
zoom-smeared), `lore/moorhen-wetland.jpg` (mild motion blur on the bird). This
set now doubles as Órla Shepherd's home landscape, so it earns attention.

**Composite / crop** — `lore/highland-sentinel-lizard.jpg` (1168×880): creature
composited onto the same plate as `highland-rock-spires.jpg`; cutout edges are
visibly soft beside the plain version. Needs mask refinement plus a light
colour/grain match; a creature-element prompt for the rebuild is recorded in
`image-prompts.md` § 2. `lore/noogenic-seeding-system.jpg` (1200×614): unusually
short and wide for a lore image; regeneration decided — its replacement
prompt is in Open work 5, dormant until the old file is deleted.

**Verify then leave alone** — `lore/trigrian.jpg`: blown highlights on the three
suns, almost certainly intentional for a trinary-star world. Noted so a future
audit doesn't "fix" it.

**The lettering ban cannot beat the scene** (added 2026-08-13, after
`reeves-eden`, `wendell-albercombe` and `galen` all came back covered in text
*with the ban present in every prompt*). Every house prompt already ends with
"no readable text, signage, insignia lettering or written characters anywhere in
frame", and it is not a spell. If the brief describes **an object whose purpose
is to carry writing** — a case-file interface, a departures board, a spaceport
gate, station wayfinding, a dashboard — the model will draw the object, and the
object will have writing on it. Strengthening the ban does nothing; the scene
has to change. Two tests before generating:

- **Name every surface in the brief and ask what it is for.** If any of them
  exists to be read, replace it. `reeves-eden` went from "holographic
  evidence-analysis interface" to points of light and connecting lines, which
  says the same thing about the character and offers nothing to letter.
- **Watch for genre words that import furniture.** *Noir* brought neon signage
  into `wendell-albercombe` twice, along with rain, grime and a cigarette,
  none of them requested and all of them standard issue for the genre named.
  *Gritty* did the same to `lorien-the-wanderer`, returning a rusted, stained,
  half-derelict hull for a captain whose own page says she has never lost a
  ship. A genre word is a whole set of defaults arriving at once.
- **`sethka-ru` is blocked, and it is a worldbuilding gap rather than a prompt
  problem** (13 August). Four rounds failed in three different ways — armed
  with a rifle, concept-art alien, grey-alien recipe, then an ordinary
  weathered man — and the fifth was pulled after Dermot supplied the fact that
  makes all of them wrong: **the Serephine Dunekin are not humanoid at all.**
  Every prompt in that history opens "non-human *humanoid* scout", so the whole
  line was building the one thing the species is not. The entry is back to a
  placeholder card and should stay there.

  What is written about the Serephine is only: light-scattering eye membranes,
  a water-conservative metabolism, respiratory efficiency, a homeworld of thin
  air and lethal thermal swing — plus three passing mentions elsewhere, and
  **no lore page at all**, unlike the Krenyi, Cerebraun, Verdani or Mnemari.
  There is nothing to draw a body plan from, and inventing one in a JPG would
  make the picture the most specific statement about the species in the repo,
  which is backwards. **This needs a sentence of prose from Dermot before any
  further generation.** The rule it illustrates is the file's oldest one: the
  brief has to come from the record, and where the record is silent the answer
  is authoring, not another attempt.
- **"Non-human" without further instruction means the grey alien, every time.**
  Dermot on the third `sethka-ru` round: *"he looks too much like a sci-fi trope
  of an alien."* He was right, and the brief was the cause — *tall narrow
  skull, no visible hair, wide pale eyes* is not a description of an alien, it
  is the grey's exact specification, written out. The trope is a **fixed recipe**:
  enlarged domed cranium, hairlessness, oversized almond eyes, tapering chin,
  spindly neck and limbs, smooth grey skin. Ban that list by name, then
  differentiate on axes the recipe never touches — **build, skin, hair,
  proportion** — and let one or two derived features carry the species. The
  Krenyi card already fought this battle and its alt text still says *"not a
  grey alien"*; the lesson generalises to every non-human portrait in the file.
- **The generator converges on one face, so vary the cast on purpose.** Three
  portraits filed in the same batch on 13 August — `naomi-kestrel`,
  `galen`, `rosalind-vey` — came back as dark-haired white women of similar
  age, build and features. Dermot: *"they are not related; they do not need the
  same hair colour and features."* Nothing in any of the three briefs asked for
  that; it is simply where an unconstrained "cinematic portrait of a woman"
  lands, every time, and the effect compounds across a cast until half the
  Corps looks like one family. **Give every human portrait at least one stated
  distinguishing feature** — hair colour and cut, build, age band, colouring —
  and check a new brief against the ones already filed rather than against the
  page alone. Heritage is a separate question and belongs to Dermot (see the
  `rasa-oyelaran` rule below); this is about not producing siblings by default.
- **And the converse, which matters just as much: resemblance has to be earned
  where it is real.** Dermot, same exchange: *"obviously characters who are
  meant to be related should look similar in some way,"* and *"the two or more
  instances of Reeves might look very similar to each other."* Two cases, one
  principle — sameness is meaningful only when it is true, so it must be
  deliberate in both directions.
  - **Kinship.** The clusters currently in the cast are the **Shepherds**
    (Tissadelle, Órla, Sorcha), the **Wenders** (Karla, and Anne when she is
    drafted) and the **Vosses** (Petra, Dagny) — check the relationship on the
    pages before assuming it, then carry one or two shared features across the
    set rather than a matching face. A family resemblance is a recurrence, not
    a duplicate.
  - **Manufacture.** [Reeves](/star-rangers/characters/reeves/) at Threshold
    and [Reeves](/star-rangers/characters/reeves-eden/) at Eden are the same
    model on separate deployments, and their pages say so. Their images should
    be **near-identical by design**, differing only in the small way a second
    installation of one thing differs — a shifted accent, a different count,
    the same emblem seen from another angle. This is the one place in the file
    where copying a previous image closely is the correct answer.
- **Spare is not shabby, and minimal is not neglected.** The distinction is
  worth stating because briefs reach for *stripped-down*, *worn*, *practical*
  and *utilitarian* constantly, and every one of them can slide into decay.
  A vessel or a post in this record is kept: clean surfaces, everything stowed
  square, tools racked, nothing broken. **The people who work alone keep the
  best kit**, because there is nobody else aboard to fix anything — which is
  the opposite of what the frontier-salvage look assumes. Ban the decay
  vocabulary by name (rust, corrosion, grime, oil stains, exposed wiring,
  clutter, derelict) rather than trusting *well-maintained* to carry it.
- **A uniform is a text-bearing object.** Discovered the hard way on
  `naomi-kestrel`, whose portrait came back wearing a badge reading **ANALYST
  A. SHARMA** — a different person's name, legible, plausible, and one
  filing away from a page captioned as somebody else. Uniforms attract name
  tapes, unit patches, rank tabs and badges the way corridors attract signage,
  and the general ban never reaches them because they are clothing rather than
  scenery. **Every character prompt that dresses someone in a uniform must ban
  worn lettering by name.**

  **Ban the words, not the marks** (Dermot, 13 August: *"ok to have stripes,
  bars, stars and other shapes on human uniforms even if no lettering"*). My
  first correction over-banned — it stripped rank tabs and patches outright,
  which contradicts `rank-insignia-and-uniform.md`, where insignia is
  load-bearing. Rank and certification marks are **shapes**: bars, stripes,
  chevrons, stars, rings, discs and bands, read by count and arrangement. A
  geometry has no first language, which is exactly why a service carrying
  Krenyi, Pelagene, Veyr and Serephine officers uses one. So ask for geometric
  insignia and ban only text — no name tape, no name badge, no printed word,
  no letters or numerals of any script. `wendell-albercombe` shows Compact
  plainmarks rendering correctly, badge included.

  **And the lighting is not exempt from the century either** (Dermot, same
  exchange: *"the desk lamp is still too retro and bulky — either just remove
  that lamp or have a softer more diffuse recessed light source"*). Replacing
  screens with an anglepoise swapped one period object for another; a sprung,
  jointed, domed lamp with a visible bulb is a 20th-century design and reads as
  one. **Light is recessed and diffuse**: concealed source, soft spread or a
  gentle pool on the working surface, no visible fitting and no bulb in frame.
  Most rooms simply have light in them.
- **Never light a scene with a display.** "Lit by the glow of data readouts"
  guarantees readouts, and readouts carry readings. Use practical light — a
  work lamp, a window, an overhead fixture. Applied to `naomi-kestrel`,
  `lorien-the-wanderer` and `jeeves` on 13 August.
- **But a negative rule alone sends the picture backwards.** Told only what a
  2826 workspace is *not*, the generator reaches for the last thing it knows,
  and the first screen-free `naomi-kestrel` re-run came back with walls of
  analogue dials and a paper ledger — a room that read as about 1975. The lore
  may decline to specify; **an image cannot.** Anything banned has to be
  replaced by something nameable.

**What a display actually looks like** (Dermot, 13 August: *"I don't believe in
holograms — the displays would be more like a Kindle, less glowing lights and
more like a static object, or even a book that is not a book"*). This is now
canon on `src/lore/what-the-record-refuses.md`, and it is the positive answer
every prompt in this file should reach for:

- **Matte, still and unlit.** A thin rigid sheet, or a bound stack of them,
  read by whatever light is already in the room. No glow, no bezel, no frame,
  no backlight, no visible screen edge, no colour it did not need.
- **Book-shaped, often literally bound.** Slim, hand-held, the size and weight
  of a small hardback. "A book that is not a book" is the in-world phrase and
  it is exact both ways.
- **No holograms at all** — no projected figures, no volumetric charts turning
  above a table, no floating schematics. The technology does not perform.
- **Nobody's face is ever lit by what they are reading.** No under-lit blue
  wash, ever. Light comes from a lamp, a window or the sun, always.
- **The house image of expertise** is therefore a person at an ordinary table
  under an ordinary lamp with one still object in front of her — which looks,
  deliberately, almost exactly like a scholar in any earlier century. That
  resemblance is the point, not a failure of imagination, and it is what makes
  the near-miss retro rooms above so nearly right: they had the calm and the
  lamp and got the object wrong.

**And this is why so many of these images should look old** (Dermot, same
exchange: *"which is why some planets and settlements look medieval and rural
despite very advanced technology"*). It is the single most useful thing to hold
on to when briefing a scene, so it is worth stating as a rule rather than
leaving it to be re-derived every time:

- **Technology that does not announce itself does not reshape a place.** No
  glowing rectangles, no projected light, no machines that need to be seen
  working — so nothing is competing for attention, and a settlement ends up
  shaped by weather, land, local materials and what people actually like
  living in. Which is roughly what they always liked.
- **A stone chapter house, a hive-yard, a thatched roof and a farm track are
  all period-correct for 2826.** Do not "modernise" a rural brief to prove the
  century. The correct reading of thatch here is not *pre-industrial*; it is
  that thatch works, the material is local, and nothing in eleven hundred years
  made it stop working. `the-fusion-ceiling` is the worked example already in
  hand — timber barns, a gravel yard, hand tools on a rack, and one grey
  fusion unit on a concrete pad, and it passed cleanly on the first run.
- **Industrial looks are earned by function, never by era.** A dock, a boundary
  post or a working station may look like machinery because it *is* machinery.
  A farm may not.
- **Consequence for the retro problem above:** the fix is never to add
  futuristic set-dressing. It is to correct the one object the character is
  using and leave the world alone.

**A prompt that does not state heritage will have one chosen for it** (added
2026-08-13, after the `rasa-oyelaran` re-run). An image model fills every gap
in a brief with its own default, and the default is not neutral. Two rules
follow, and both are cheap:

- **If a character's name states a heritage, the prompt must state it too.**
  *Oyelaran* is Yoruba and the brief did not say so, so both variants came back
  white. That is not the generator misbehaving; it is a brief that left the
  question open and got an answer anyway.
- **Where the record genuinely does not say, that is Dermot's call and not a
  variant-picking exercise.** `petra-voss` returned one Black woman and one
  white woman, both good. Choosing between them would have decided a
  character's heritage by selecting a picture, which is authoring — the same
  line Section 1's Asteria history already draws. He chose the first, on
  2026-08-13, **for cast balance**: the reason he gave was that it supplies
  something the cast so far was missing. Worth carrying forward as a criterion
  rather than a one-off — when the record is silent and the variants differ,
  ask what the ensemble is short of, and put the question to him.

**Your camera, not a generator** — `lore/saltvik.jpg` is still a plain text
card while its sibling Saltmere entries have two photographs each; the Knarr
Line's Nordic-heritage coastal world wants a real cold-coast frame.

**Aldera gallery (`field-photo-03`/`-04`) — re-crop, don't generate** (moved
from the retired `firefly-prompts.md` § D). `field-photo-01`/`-02` read as
photographs of a real kitten in a boat; generated frames in the same gallery
will show against them. Prefer re-cropping Dermot's own originals — the alt
text describes a tabby-and-white kitten among yellow flowers, and beside a
blue flower; if those frames exist on the F: drive this is a crop job, not a
generation job. Second choice: retire 03 and 04 and run the gallery with two.
If generation is ever chosen anyway, match 01/02's look rather than the usual
concept-art register: candid close-up pet photography, tabby-and-white kitten
with blue eyes, outdoors among yellow wildflowers (and again beside a single
blue flower), late afternoon sunlight, shallow depth of field, natural colour.
Portrait 3:4, 1200px.

### 3. Deferred by choice

> **Stale as a description — corrected 19 August 2026, not rewritten.** The
> *contemporary-stock-headshot cluster (11 files)* below no longer exists in the
> form described: **all eleven of those names were replaced with PENDING cards on
> 12 August** (they are Tier 1 of Open work 0), and `petra-voss` has since
> received a real portrait. Nothing in that bullet is true of the current files.
>
> **The section's own closing note predicted exactly this** — *"a file that still
> exists but is no longer what the note says it is, the validator cannot see, and
> never will"* — and it was right within four days of being written. The
> `validate-images: on` block passes because the eleven files exist; it has no
> way to know they are cards now. Left in place rather than rewritten because the
> bullet is a record of why those images were deferred, and rewriting it would
> lose that; **read it as history, not as inventory.**

<!-- validate-images: on -->
<!-- Every image named below is asserted to EXIST, so `npm test` checks it.
     That is the point of this section: it describes the image set as it
     stands. Sections listing images still to be made must not opt in. -->

- **The contemporary-stock-headshot cluster (11 files)** — flat studio
  backdrops, no in-world setting: `cormac-dubhghlas`, `demelza-trevithick`,
  `fergus-aonghas`, `idris-bryneth`, `imogen-petrakis`, `niamh-o-ceallaigh`,
  `petra-voss`, `rhian-gwynne`, `rhiannon-ceridwen`, `sen`, `zara-wayland`.
  Two (`imogen-petrakis`, `petra-voss`) lean toward the glamour look the house
  style rules out. Real style work, but a batch that size deserves its own
  session with Dermot choosing each face.
  *Was written as thirteen: dagny-voss was deleted in `55dc1ec` and
  dorian-calloway was replaced with a generated portrait in `525dfc1`, neither
  of which reached this note. Corrected 2026-08-12. Names of removed files are
  left un-backticked here deliberately — inside a `validate-images: on` block a
  backticked name is an assertion that the file exists.*
- **Flat title-card template used on humans** instead of portraits:
  `brother-fintan`, `dr-iona-vale`, `galahad-thorne`. Same template on aliens
  (`isren-farrowkin`, `mira-of-brine`, `sohrel`, `syra`) — internally
  consistent, but a third visual language beside the photo and emblem
  conventions.
- **Tonal outliers, deliberate:** `lore/the-imperium.jpg` (a real modern
  skyscraper standing in for a monolithic tower), and the `prismere-*` series
  repeating one jellyfish/crystal-spire motif across distinct named locations.
  *The "true crime" evidence board, lore/planetary-liaisons-and-recruiters.jpg,
  was listed here too until 2026-08-12 — it was deleted in `55dc1ec` as a
  verified stock image, so it stopped being an outlier and started being a dead
  reference. The same photograph survives at `characters/bertram-ashcombe.jpg`. **No longer true as of
  2026-08-20: that path now holds a generated portrait, so the last copy of the
  stock photograph is gone from the repository.***

<!-- validate-images: off -->

*Two names above are stale and kept only until this section is rewritten:
`dagny-voss` was deleted in `55dc1ec`, and `dorian-calloway` was replaced with a
generated portrait in `525dfc1`, so the cluster is eleven files rather than
thirteen. The validator now catches the first kind of drift; the second kind —
a file that still exists but is no longer what the note says it is — it cannot
see, and never will.*

### 4. New London Space Habitat — delivered, with two recorded defects (2026-07-26)

**Resolved.** `src/images/lore/new-london-space-habitat.jpg` landed in #177 and is
wired into the entry. This item is kept rather than deleted because the defects
below are known and accepted, and a future audit will otherwise re-flag them.

The render shows a horizontal ring carrying an open cityscape (a St Paul's-like
dome, a Westminster-style clock tower, Tower Bridge, parkland, a waterway with
boats), two further rings canted steeply across it, a tall central spire on
spokes, a Union-flag tram, and Earth and the Moon behind.

**Two generator defects, recorded not fixed** (full detail in
`image-prompts.md` § 3):

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

### 5. Missing lore illustrations — **the 2026-07-30 list is fully delivered** (re-audited 19 August 2026)

**23 of the 30 slugs named in this section now exist under `src/images/lore/`, and the seven that do not are pages that never had a prompt written here at all** — they were named in passing. The heading said *19 pages*. As with Open work 1, finished work was reading as a queue.

**The prompts stay in place** as the prompt of record for the images they produced. Read what follows as an archive.

**The true outstanding count is 52 lore pages**, re-derived rather than trusted:

```bash
for f in $(find src/lore -name '*.md' ! -name index.md); do
  grep -q '^image:' "$f" || echo "${f#src/lore/}"; done
```

Most of them postdate July. Prompts for all 52 are at *Outstanding lore illustrations* below.

### 5a. Missing lore illustrations (19 pages) — audited 2026-07-30, archived

An unrecorded gap. Open work 1 covers character portraits; nothing here had ever
enumerated the **lore** entries with no `image` at all. Nineteen do (excluding
`lore/index.md` and the canonical-glossary reference doc, which has one). None
blocks a build — `lore-entry.njk` guards the image with `{% if image %}`.

**Two different jobs, and it matters which.** Nine of the nineteen are
institutions or factions and want a designed **title card**; the other ten are
places, phenomena, technology or cosmology and want a **generated image**.

> **Correction, 2026-07-30 — this section shipped with a false claim, now fixed.**
> It originally said the four existing lore cards (`cerebraun-hegemony`,
> `celtic-union-of-planets`, `orbital-habitats-compact`, `levrils`) were made
> with `scripts/make-codex-cover.ps1`, and named
> `federation-of-sentient-beings` and `united-space-consortium` alongside them
> as more of the same. **Both halves were wrong**, and the error came from
> reasoning about `image_alt` strings instead of opening the files — the exact
> failure this file already warns about two sections up. Reading them settles it:
>
> - The four cards are **1600×900 landscape**, individually tinted (Cerebraun's
>   is green-teal), and carry a device inside a ringed seal. `make-codex-cover.ps1`
>   emits **square 1600×1600** in one fixed blue palette and has no emblem motif
>   at all — only `rules`, `dissolution`, `none`. It cannot have produced them.
> - `federation-of-sentient-beings` (1200×1509) and `united-space-consortium`
>   (1200×800) are **photographs**, not cards.
>
> **The emblem-card recipe is therefore unrecorded and currently unreproducible.**
> All four landed in Release 1.7.0 (#187) with no entry in `image-prompts.md`,
> which is precisely the rule that file exists to enforce and precisely the
> failure mode the Prismere cluster prompted it over. A fifth card in the same
> family is referenced from `uniforms-and-insignia.md` ("a blue chevron insignia
> emblem in a ringed seal"). **Recovering or re-deriving that recipe is open
> work in its own right** — see the note at the end of this section.

So the split below is *descriptive of what can be built today*, not a claim about
how the shipped cards were built:

- **Institutions and factions → generator title cards** via
  `scripts/make-lore-cards.ps1` (a batch driver over `make-codex-cover.ps1`,
  added 2026-07-30, nine cards in one command). The generator letters text with
  a font engine, so titles come out sharp and correctly spelled — which an image
  model cannot be trusted to do. **These will read as codex-style cards, not
  like the four 1.7.0 lore cards**, and that inconsistency is unresolved: it is
  Dermot's call whether to accept it, extend the generator with a
  landscape/emblem mode first, or drop the batch.
- **Places, phenomena, technology and cosmology → generated images**, prompts
  below.

Prompts are written to the standing rules: era stated, lettering banned, sheen
named rather than substance, unsettling permitted and horror not. Add
`image`/`image_alt` after generating, and per "Alt text is the prompt of record"
above, write the alt text from what the file actually shows rather than pasting
the prompt back in. For a title card that means describing the card's layout and
text, not the prose of the entry it fronts.

**Title cards (generator, not image model)**

Nine pages. The table lives in `scripts/make-lore-cards.ps1` rather than here, so
there is one copy of it and it is the copy that runs; `-List` prints it. Notes
below cover only the choices that needed a reason. Two constraints learned from
reading the generator: subtitles are **not** auto-fitted (only titles are), so
keep them under ~34 characters; and `Institution`/`Author` are left empty on
every row, because codex covers carry them for a named in-universe source and
lore is the Archive's own voice with no author to name.

Only three rows involved a judgement worth recording:

- `the-institute.jpg` — motif `dissolution` rather than `rules`, because the
  entry's stance is that nothing has been established beyond the disagreement
  between instruments. The fading ring says that; ruled lines say the opposite.
- `hyperfold-yield-combine.jpg` — the one row with a `Stamp`, and it reads
  `DISSOLVED` rather than anything accusatory. Reading as a lawful trading
  entity is the entry's whole point: everything about the Combine was licensed
  right up to the moment it was destroyed. The stamp records its end, not a
  verdict on it.
- `habitat-threshold.jpg` — the weakest candidate of the nine. A charter
  population line is abstract even for a title card, and deferring it is a
  defensible outcome; it is in the batch because the card costs nothing to
  generate and can be dropped after looking at it.

The other six are straightforward: title, category, a subtitle under the length
limit, `rules`.

**Still open after this: the emblem-card recipe.** Nothing here recovers how the
four 1.7.0 lore cards were made, and until that is settled the corpus has two
visual languages for the same job — those four in landscape with a ringed seal,
and anything `make-lore-cards.ps1` produces in square codex style. Three ways
out, none of them started: find the original tool or prompt and record it in
`image-prompts.md` at last; extend `make-codex-cover.ps1` with `-Aspect`,
palette and an emblem/seal motif so one generator covers both looks (note that
every positioning constant in it is tuned for 1600×1600, so this is more than a
parameter); or accept the codex look for lore and treat the four as legacy.
Worth deciding before generating nine cards, not after.

**Generated images (ten pages)**

- **`arilon.jpg`** — not a person: the Fellowship's comparative-archive name for
  a recurring pattern (a witness who names a boundary truth, is discredited, and
  is vindicated only after departing). Must **not** read as a portrait of one
  figure, which is the whole misreading the entry exists to prevent.
  > Abstract archival composition suggesting many separate accounts of the same recurring figure: overlapping translucent layers of indistinct robed silhouettes at different scales, none in focus and none dominant, receding into a pale ground, no face resolvable, muted parchment and grey-blue palette, contemplative rather than mystical, science-fiction archive aesthetic, no readable text, signage, insignia lettering or written characters anywhere in frame. Landscape orientation.

- **`ascent-javelins.jpg`** — winged craft launched near-vertically, almost like
  a missile, surface to orbit. State the era or this defaults to a Shuttle photo.
  > A slender winged orbital ascent craft climbing near-vertically from a planetary launch cradle into high thin atmosphere, seen from below and behind, exhaust plume tight and blue-white, distant curve of the horizon already visible above, far-future science-fiction spaceport infrastructure on the ground beneath, cold clear daylight, functional engineering aesthetic rather than sleek styling, no readable text, signage, insignia lettering or written characters anywhere in frame. Landscape orientation.

- **`embodied-cognition.jpg`** — a small embodied mind resolving what a vast
  systems mind cannot; the doctrine is to *pair* them, so the image should show
  both scales in one frame rather than choosing.
  > A small utilitarian analytical robot chassis with one manipulator resting flat against a corridor bulkhead, foreground and sharply lit; behind and above it the vast dim architecture of a station management intelligence rendered as banks of quiet data surfaces stretching out of focus, far-future science-fiction interior, cool blue ambient glow against one warm working light on the robot, no human figures, no face, no readable text or labels, no readable text, signage, insignia lettering or written characters anywhere in frame. Landscape orientation.

- **`membrane-shadows.jpg`** — gravitational bleed-through: a full, edge-lit
  person-shaped silhouette cast by a mass that never crossed over. **Tone line
  applies hard here** — this must read as an unexplained physical imprint, not a
  threat approaching. Nothing is coming through.
  > A tall humanoid silhouette standing in a boundary-observation chamber, rendered as an absence of light rather than an object — edges cleanly lit from behind, interior featureless and without detail, the shape casting no reflection and disturbing no dust, calm instrument-lit far-future science-fiction interior, cold blue-grey palette, still and unremarkable rather than menacing, no face, no eyes, no readable text, no readable text, signage, insignia lettering or written characters anywhere in frame. Landscape orientation.

- **`the-fusion-ceiling.jpg`** — fusion is the top of the lawful energy ladder,
  and the frontier caveat is the interesting half: a rationed imported core
  running a water plant beside hand tools and human labour. That contrast is a
  better image than a reactor hall, and it is the thing observers misread as
  poverty when it is sequencing.

  **The draft animal is out, and the reasoning is worth keeping.** The earlier
  version of this prompt asked for one, and the sequencing argument that
  justified it survives — a rationed core prioritised for water treatment
  genuinely may not have surplus for traction yet. But that argues for *hand
  tools*, not for livestock. A working draft animal is not one animal: it is
  breeding stock, years of established forage, veterinary support and an
  enormous launch mass, against an electric tractor that folds into a crate and
  runs off the core you have just installed. Realistically a colony ships
  frozen genetic stock and grows a herd decades after the moment this image
  depicts. The corpus does have off-world animals — Bubochka, Agent Barsik —
  but those are companions carried by people, which is a far smaller claim than
  a working herd at early buildout. The tools carry the contrast on their own,
  and they carry it without asserting a biosphere.

  > A compact sealed fusion power core on a poured concrete pad at the edge of a young frontier settlement, plain matt grey industrial casing with bolted access panels and a maintenance walkway, no glow, no illuminated strips, no bevelled armour panelling, no ornament of any kind; armoured conduit runs from it to a modest water-treatment building; in the same frame, well-kept hand tools racked on a rail and two colonists working with them, unhurried, mid-task. No animals anywhere in frame. The settlement behind is newly built and clearly well-provisioned - level gravel, timber-framed buildings finished and roofed, nothing improvised, no tents, no mud, no crates in transit. Late afternoon light, far-future science-fiction colony early in its buildout, muted earth palette, competent and unhurried and plainly not poor, the machine ordinary rather than impressive, no readable text, signage, insignia lettering or written characters anywhere in frame. Landscape orientation.

- **`who-governs-a-universe.jpg`** — a map, not a place: primary universe versus
  the Concordant Zones inside it, and three kinds of authority.
  > Abstract diagrammatic cosmological illustration: one large luminous bounded volume containing several nested translucent regions of differing tint, with three distinct tiers of influence indicated by scale and elevation rather than by arrows or labels, dark field beyond, restrained gold-and-indigo palette, clean and schematic rather than nebulous, no readable text, numbers, or lettering anywhere, no readable text, signage, insignia lettering or written characters anywhere in frame. Landscape orientation.

- **`things-that-are-made.jpg`** — church-space overlay. The entry's argument is
  that the Archive uses the language of authorship and then disclaims the author.
  Avoid religious iconography; the register is *evidence of intent*, not worship.
  > An immense structure of evident deliberate design seen at a scale that makes its purpose unreadable — vast regular geometry receding into mist, precise and unweathered, clearly built and clearly not by anyone present, a single small observing figure at great distance for scale, cold pale light, far-future science-fiction, restrained grey and bone palette, awed and sober rather than devotional, no symbols, no iconography, no readable text, no readable text, signage, insignia lettering or written characters anywhere in frame. Landscape orientation.

- **`kieme-visible-hand.jpg`** — church-space overlay. Devotional tradition
  claims to *see* the ledger kept; the entry's images are the harm that stops
  short, the door that holds. Depict the limit, not the harm.
  > A heavy sealed pressure door holding, seen from the safe side, with visible damage stopping cleanly at its frame and none beyond it, one figure standing back from it unharmed and looking at it, far-future science-fiction station interior, low emergency lighting warming to normal at the edges of frame, quiet aftermath rather than crisis, no visible injury, no readable text or signage, no readable text, signage, insignia lettering or written characters anywhere in frame. Landscape orientation.

- **`universes/si-gaoithe.jpg`** — a second, unrelated membrane; high
  creative-entropy, **no predictable interval**, barely keeps a shape. The
  contrast with Tír Tairngire's regularity is the point, so this should look
  irregular where that one looks periodic. Existing file
  `lore/threnos-omega.jpg` is the precedent for a membrane portrait.
  > An unstable universe-membrane visualised as a churning irregular field of shifting translucent surfaces with no repeating structure, folds forming and collapsing at different scales at once, sudden localised eddies of luminous air, deep field beyond, restless green-grey and pale gold palette, cosmological scale, no horizon and no recognisable objects, no readable text, no readable text, signage, insignia lettering or written characters anywhere in frame. Landscape orientation.

- **`universes/tir-tairngire.jpg`** — the one boundary neighbour on record that
  *keeps time*: a transient gravity tunnel opening on a predictable rhythm.
  Regularity is the whole finding.
  > A universe-membrane seen across a narrowed gap, its surface carrying a smooth regular periodic swell like a slow standing wave, and at one point a clean transient tunnel of clear space open through the interval, edges sharply defined and stable, deep cosmological field, warm gold light on the far side against cool blue on the near, orderly and rhythmic rather than turbulent, no figures, no readable text, no readable text, signage, insignia lettering or written characters anywhere in frame. Landscape orientation.

**Added 2026-08-04, after the audit** — one more generated image, for the new
planet page drafted the same day:

- **`drithane.jpg`** — the crossing night is the planet's whole
  identity, and the custom of going dark to watch it is the human half of
  the frame. Slow sparks, not meteor streaks.

  **Filed one directory too deep**, and the page rendered a broken image from
  2026-08-17 (when both the file and its `image:` line landed, in #454) until
  2026-08-21. It sat at `src/images/lore/planets/drithane.jpg` where the page
  could not reach it: `lore-entry.njk` hardcodes `/images/lore/` and appends
  the front-matter value, so a bare `image: "drithane.jpg"` asked for a file
  that was not there. Every other planet's image is flat in `src/images/lore/`
  and this one now is too. The subdirectory convention is real, but it is
  `universes/`, where the front matter carries the prefix as well — a
  subdirectory only works when both halves agree. `validate-content.js` now
  checks the URL the layout emits, not just that the file exists somewhere.

  **Two rounds returned a night landscape with no sparks in it at all** — a
  starfield and a moon, which is every night sky and not this one. The old
  prompt asked for them correctly and still lost them, and the likely reason
  is instructive: **sparks described as small points high in a clear night sky
  are stars, as far as a model is concerned**, and "not fast meteor streaks"
  is a negation, which prompts handle badly. So the sparks are now the stated
  *subject* of the image rather than a property of the sky — many, large,
  individually distinct, mid-fall and mid-fade, unmistakably not stars — and
  the settlement's darkness is described as the deliberate thing it is rather
  than as an absence of light. The lit windows are gone: the entry says the
  world watches its own sky by the light the sky provides, and a warm window
  was arguing with that.
  > A night sky filled with dozens of slow silent falling sparks - the subject of the picture - each a distinct warm white-gold glow with a short soft trail, drifting downward and fading out high in the air, clearly much larger and brighter than the stars behind them, some at the top of the frame and some low near the ridgeline, caught at different stages of their fall. Below them a high cold valley lies completely unlit, every building dark on purpose, roofs and snow-dusted ground and glasshouse panels picking up only the gold light from above, small figures standing outside in ones and twos with their faces turned up. Far-future science-fiction pastoral world, deep cold blue night against the warm gold of the sparks, still and quiet and shared rather than dramatic, no artificial lighting anywhere in the settlement, no readable text, signage, insignia lettering or written characters anywhere in frame. Landscape orientation.

**Also worth noting from the same audit:** two lore pages carry alt text that is
thin rather than wrong and would fail the "describes what the file shows" test if
tightened — `predatory-entities.jpg` (*"Blurry human arms"*) and
`teleportation-limitations.jpg` (*"Defocused luminous colour stripes"*). Both are
accurate as far as they go; neither is a defect. Flagged so a future audit
doesn't re-derive them.

#### Prismere/Prismeri replacement set — replace, not upscale (Dermot's ruling, 2026-08-11)

Twelve entries, migrated from `firefly-prompts.md` §§ A–B on 2026-08-11 — the
file has since been retired, so **this is the only copy**, each entry carrying
its divergence note in its description. See Open work 2 for the ruling. Dormant while the old files exist; the set regenerates **all together
or not at all** (the all-or-none rule carried over from the upscale plan), and
each prompt varies the *light source* rather than the adjective — that
divergence is the whole point of replacing instead of upscaling, since the old
set repeated one jellyfish-and-crystal-spire motif across eight distinct named
locations.

- **`prismere-orbital-vista.jpg`** — the establishing shot; was a creature
  portrait, becomes the wide vista whose point is the crowded sky. Landscape
  16:9, 1600px wide.
  > Silicate-carbon biosphere: living tissue built from glass and crystal rather than wood and chitin. Painterly science-fiction concept art, high detail, naturalistic rather than decorative. Wide high-altitude vista of a crystalline world at night seen from a ridge. A dense planetary ring plane cuts across the sky at a steep angle, with two neighbouring ringed worlds visible as discs rather than points, and seven small moons scattered at varying distances. Far below, the crystalline forest canopy glows faintly in shifting colour washes, bright enough to read the terrain by. A single armoured, spike-shelled ground grazer in the near foreground gives scale against the enormous sky. The land is lit from below by the forest, and from above by ringlight. Cold, vast, quiet. No text, no lettering, no human figures, no cartoon, no watermark, no oversaturated neon, no generic sci-fi cityscape. Landscape orientation.

- **`prismere-glasswood-grove.jpg`** — light caught and re-emitted; daylight,
  botanical clarity. Portrait 3:4, 1600px tall.
  > Silicate-carbon biosphere: living tissue built from glass and crystal rather than wood and chitin. Painterly science-fiction concept art, high detail, naturalistic rather than decorative. A stand of slow-growing trees with translucent crystalline bark and broad glass-like leaves, in daylight under a banded gas giant low on the horizon. The leaves work as lenses: each catches the pale daylight and re-emits it as a soft colour wash along its own length, so the foliage glows more brightly than the sky that feeds it. Sunlight refracts through the canopy into scattered spectral patches on the forest floor. Botanical clarity, closer to a naturalist's plate than a fantasy scene. No text, no lettering, no human figures, no cartoon, no watermark, no oversaturated neon, no generic sci-fi cityscape. Portrait orientation.

- **`prismere-flowering-glasswood.jpg`** — the same trees in flower at night;
  the deliberate pair to the grove, not a duplicate. Portrait 3:4, 1600px tall.
  > Silicate-carbon biosphere: living tissue built from glass and crystal rather than wood and chitin. Painterly science-fiction concept art, high detail, naturalistic rather than decorative. The same crystalline forest at full night, in flower. Translucent blossoms open along the branches, each lit from within in warm amber and pale rose, the only warm colour in a cold blue-green scene. Small many-legged foraging animals move across the ground beneath, their shells catching the blossom light. Intimate scale, low viewpoint, shallow depth of field. No text, no lettering, no human figures, no cartoon, no watermark, no oversaturated neon, no generic sci-fi cityscape. Portrait orientation.

- **`prismere-luminous-towers.jpg`** — lit from within by a shared root; the
  inhabited image of the set, no drifting jellyfish. Portrait 3:4, 1600px tall.
  > Silicate-carbon biosphere: living tissue built from glass and crystal rather than wood and chitin. Painterly science-fiction concept art, high detail, naturalistic rather than decorative. A loose colony of tapering mineral towers rising from a forest floor, each lit from deep inside with amber light that is brightest at the base and fades upward, revealing they are fed by a shared root network under the ground rather than each glowing on its own. Irregular spacing, varied heights, organic rather than architectural. Dwellings have been shaped into the towers' lower structure — subtle, load-bearing, easy to miss at first glance. No text, no lettering, no human figures, no cartoon, no watermark, no oversaturated neon, no generic sci-fi cityscape. Portrait orientation.

- **`prismere-glass-spires.jpg`** — no light of its own; the one image in the
  set that is not glowing. Portrait 3:4, 1600px tall.
  > Silicate-carbon biosphere: living tissue built from glass and crystal rather than wood and chitin. Painterly science-fiction concept art, high detail, naturalistic rather than decorative. Tall fused-silica spires on a bare high-elevation ridge, far above the tree line, with no glowing forest anywhere near them. These structures produce no light of their own — they are dark glass, visible only as silhouettes and as thin lattice veins catching starlight from behind. A spiral galaxy is clearly visible edge-on in the black sky above. Stark, cold, mineral. The contrast with the luminous lowlands is the subject. No text, no lettering, no human figures, no cartoon, no watermark, no oversaturated neon, no generic sci-fi cityscape. Portrait orientation.

- **`prismere-driftjellies.jpg`** — the aerial ecosystem; the air itself is the
  subject. Landscape 4:3, 1600px wide.
  > Silicate-carbon biosphere: living tissue built from glass and crystal rather than wood and chitin. Painterly science-fiction concept art, high detail, naturalistic rather than decorative. Translucent gas-bladder animals drifting high on a thermal in a dense, particulate-thick sky, seen from below and slightly to the side. They trail long luminous feeding tendrils that filter spore and dust from the air. The air itself is visibly thick — hazy, full of suspended matter, with light shafting through it. A golden ring system arcs behind them. The animals are unhurried and harmless. Low gravity is evident in how slowly everything moves. No text, no lettering, no human figures, no cartoon, no watermark, no oversaturated neon, no generic sci-fi cityscape. Landscape orientation.

- **`prismere-umbral-ray.jpg`** — the predator and the tonal outlier: unpleasant
  for a beat before you work out why. Landscape 16:9, 1600px wide.
  > Silicate-carbon biosphere: living tissue built from glass and crystal rather than wood and chitin. Painterly science-fiction concept art, high detail, naturalistic rather than decorative. A large silent gliding predator with a broad, taut, biomechanical-looking wing structure, riding a thermal at dusk in a dim sky. Seen from below and behind at a distance, unaware of the viewer, hunting. Below and far off, a drifting colony of luminous gas-bladder animals it has not yet reached. Darker, colder and more sparse than the rest of the world's imagery — muted greys and deep blues, almost no bioluminescence in frame. Silence and intent. No text, no lettering, no human figures, no cartoon, no watermark, no oversaturated neon, no generic sci-fi cityscape. Landscape orientation.

- **`prismere-twilight-lattice.jpg`** — the sky phenomenon; geometry, not
  aurora, and the one most likely to go wrong. If a batch comes back with
  curtains and ribbons, add *"technical diagram, ruled lines, geometric
  construction, protractor angles"* and push harder. Portrait 3:4, 1600px tall.
  > Silicate-carbon biosphere: living tissue built from glass and crystal rather than wood and chitin. Painterly science-fiction concept art, high detail, naturalistic rather than decorative. Night sky above a crystalline landscape, dominated by the sky itself: faint, mathematically precise geometric figures traced across the whole visible hemisphere — straight lines, clean arcs, closed polygons, at exact angles, like a drafted diagram rendered in pale light. This is geometry, not aurora: no curtains, no billowing, no organic drift. The figures are thin, exact, and unmistakably constructed. The dark landscape below is a low silhouette, present only to give the sky something to sit above. No text, no lettering, no human figures, no cartoon, no watermark, no oversaturated neon, no generic sci-fi cityscape. Portrait orientation.

- **`prismeri-first-wings.jpg`** — the first life stage: an adult, not a child.
  Lore image, not a character portrait — the 16:9 portrait rule does not apply.
  Portrait 3:4, 1600px tall.
  > Sapient alien people, silicate-carbon physiology, winged humanoid but clearly not human — proportions, joint structure and head shape all wrong for human in specific ways. Dignified, intelligent bearing. Concept-art character study, full or three-quarter figure, in an environment. Slender, light-boned winged figure with translucent gossamer wing membranes and a soft, matte, still-hardening exoskeleton in grey and violet tones. Built for agility in tight spaces rather than power — narrow frame, long limbs, low mass. Standing alert in a crystalline forest clearing at night, mid-scouting, a dark moon and a distant ringed planet above. An adult, not a child — composed, competent, unhurried. No text, no lettering, no cartoon, no watermark, no oversaturated neon. Portrait orientation.

- **`prismeri-full-wings.jpg`** — the second stage; the sensory tendrils are
  the character. Also the hero of `src/lore/prismeri.md`, so keep the subject
  clear of the top and bottom thirds for the hero crop. Portrait 3:4, 1600px
  tall.
  > Sapient alien people, silicate-carbon physiology, winged humanoid but clearly not human — proportions, joint structure and head shape all wrong for human in specific ways. Dignified, intelligent bearing. Concept-art character study, full or three-quarter figure, in an environment. The same species after an irreversible metamorphosis: hardened gold-and-blue chitin plating in place of soft exoskeleton, heavier and broader through the shoulders, with strong load-bearing wings built for sustained high-altitude flight. Long motile sensory tendrils grow from the skull ridge, dense with visible crystalline structures. Standing among crystalline flora beneath a banded planet, head slightly raised, tendrils extended — reading something in the sky that is not visible in the frame. No text, no lettering, no cartoon, no watermark, no oversaturated neon. Portrait orientation.

- **`prismeri-lattice-gathering.jpg`** — two forms, one people, no hierarchy;
  the hardest image in the set. Equals — no looking-up-at, no deference.
  Landscape 4:3, 1600px wide.
  > Sapient alien people, silicate-carbon physiology, winged humanoid but clearly not human — proportions, joint structure and head shape all wrong for human in specific ways. Dignified, intelligent bearing. Concept-art character study, full or three-quarter figure, in an environment. Two individuals of the same alien species facing each other in conversation: one slender with gossamer wings and soft grey-violet exoskeleton, one heavier with gold-and-blue plating and long sensory tendrils. The size and structural difference between them is obvious at a glance, but they are clearly kin — same head structure, same stance, meeting as equals rather than as senior and junior. Above them, precise geometric figures traced across the night sky. Luminous drifting fauna at a distance. No text, no lettering, no cartoon, no watermark, no oversaturated neon. Landscape orientation.

- **`prismere-root-mat-network.jpg`** — the twelfth file: generated 29 Jul 2026
  at 773×1152 with the *legacy* preamble (see `image-prompts.md` § 3), so it
  faithfully continues the old motif; regenerate with the set. The subject is
  the buried network, not the towers. Portrait 3:4, 1600px tall.
  > Silicate-carbon biosphere: living tissue built from glass and crystal rather than wood and chitin. Painterly science-fiction concept art, high detail, naturalistic rather than decorative. A shared luminous root-mat network beneath a colony of mineral lumenspire towers at night, seen low to the ground: veins of warm amber light running through translucent crystalline soil, converging toward the tower bases and brightest where they feed them, the glow fading upward along each spire. The buried network is the subject; the towers stand at the edge of frame. No text, no lettering, no human figures, no cartoon, no watermark, no oversaturated neon, no generic sci-fi cityscape. Portrait orientation.

**Also decided, independent of the Prismere batch** (moved from the retired
`firefly-prompts.md` § E; dormant until the old file is deleted):

- **`noogenic-seeding-system.jpg`** — currently a 1200×614 banner crop, a
  generic starfield; the entry is about a mind compressed into a seed that
  starts a universe, and the seed should be visible in the image. Landscape
  4:3, 1600px wide.
  > A vast field of stars and nebulae, deep and layered, with a sense of enormous distance — and at its centre something small, dense and structured: a compact point of organised light with visible internal architecture, clearly not a star. The scale relationship is the subject: something very small carrying the information a very large thing will be built from. Cosmological, contemplative, no figures, no text, no lettering. Landscape orientation.

### 5b. Outstanding lore illustrations — all 52, prompted 19 August 2026

Written in one pass at Dermot's request. **1600×900, 16:9 landscape**, JPG ~85,
into `src/images/lore/`. **None generated; all proposals.**

**The governing rule for this set: every abstract page gets a concrete anchor.**
Roughly half of these are pages about a *rule*, a *scope*, or an *epistemology*
rather than a place, and an abstract page illustrated abstractly produces exactly
the flat filler the house target rules out — *if a prompt reads like a brief for a
passport photograph it fails this*, and a gradient with a glow in it fails it
worse. So each one is anchored on a place, an object, or a person doing
something, and the idea is carried by what that thing is doing. The corpus
already proves the method works: `embodied-cognition.jpg`,
`who-governs-a-universe.jpg`, `things-that-are-made.jpg` and
`teleportation-limitations.jpg` are all abstract pages with concrete frames.

**Standing negative — paste into every one:**
> readable text, lettering, numerals, signage, labels, branding or written characters of any script anywhere in frame; schematic diagrams, technical drawings, blueprints, charts, graphs, arrows, callouts, infographic styling; holograms, projected light, glowing displays, screens, monitors, consoles; visible lamp, light fitting or bulb; lens flare, god rays, magical sparkle, glowing energy, neon; flat gradient background, stock illustration, clip art.

**One naming collision, flagged.** `src/lore/saint-aoife.md` and
`src/characters/saint-aoife.md` are different pages about the same person, and
both would reach for `saint-aoife.jpg`. Different directories, so the build is
fine, but two files one letter apart in intent is how the July audit's alt-text
drift started. The lore page's image is proposed as **`cill-aoife-devotion.jpg`**
and framed on the devotion rather than the woman.

---

#### Cosmology (10)

Impressions, never schematics. The Cascade tiers in particular must not become
nested-sphere diagrams.

- **`archecluster.jpg`** — *one Archewright's vocabulary carried in every route chart, statute book and certified machine.*
  > A vast orbital archive hall seen from a high gallery, rank upon rank of identical plain shelving running away in perfect repetition into soft distance, every bay built to the same proportion. Two small figures far below at floor level for scale. Cool even daylight from a high clerestory, no fittings visible. The repetition is the subject: one vocabulary, everywhere, unremarked. Pale stone, brushed alloy, deep shadow between the ranks. Immense, ordered, quiet.

- **`archewright.jpg`** — *eternal, unobserved, and known only by inference.*
  > A worked stone quarry face at dawn, seen straight on, where every block that ever left it has been cut to the same handful of standard proportions — the negative shapes still legible in the rock. No tools, no workers, no machinery, nobody present and no sign of anyone recently. Cold clear early light raking across the cut faces. What made the shapes is absent and only the shapes remain. Grey stone, pale sky, long shadow.
  - **Absence is the whole entry.** Anything that depicts a maker contradicts *known only by inference*.

- **`ask-and-it-will-be-reviewed.jpg`** — the church-space telling of prayer as *a permissions office*, and *the joke is load-bearing.*
  > A modest municipal planning-office waiting room, warm and worn and entirely ordinary: a row of wooden chairs against a wall, a counter with a closed shutter, a well-swept floor, a plant somebody waters. One chair holds a folded coat as though its owner has stepped out. Late afternoon light through frosted glass. Utterly mundane and quietly numinous, with nothing supernatural anywhere in frame. Warm wood, cream paint, dust in the light.
  - **Not a temple, and not a joke played broadly.** The register is affectionate.

- **`counterpane-archecluster.jpg`** — *single systems behave identically; correlations among independent sources obey a different composition rule.*
  > Two identical hand-woven cloths lying side by side on a plain table, each thread and weave indistinguishable, but where they overlap at the centre the interference of the two patterns produces a moiré figure that belongs to neither. Flat even daylight from one side, plain table, nothing else in frame. Quiet, exact, faintly wrong. Undyed linen, grey table, one cool shadow.
  - **The best frame in the set for a physics idea**: identical parts, a joint behaviour that is not.

- **`made-minds-and-the-ai-safety-archetype.jpg`** — *an archetype explains convergence, never enforcement. Nothing in the Cascade holds a kernel shut.*
  > Three unrelated hand-made wooden doors of different ages and joinery standing in a row against a plain wall, each fitted with a latch of visibly different manufacture, and every latch resolving to the same simple shape. All three doors stand closed and none is locked; there is no bolt, no chain, no seal and no mechanism holding any of them. Cool workshop daylight. Convergence without compulsion. Warm wood, dull iron, grey wall.

- **`post-eleven-dimensional-manifold.jpg`** — the structure *shared by every universe in the Cascade, regardless of its own dimensional floor.*
  > A great still body of dark water at night seen from just above the surface, absolutely flat, with the reflections of several separate distant lights lying on it — each light unreachable from the others across the surface, all of them held by the same water. No horizon visible, no shore, no vessel, no sky detail. Utterly calm. Black, silver, one warm reflected point.

- **`resurrection-and-the-life.jpg`** — *life beyond death rather than life after it, and a last day.*
  > A country burial ground at first light, low stone wall, wet grass, plain unornamented markers, the light just reaching the top of the far wall and not yet the ground. No figures, no ceremony, no flowers, no ruin. Ordinary, tended, and waiting. Grey-green, wet stone, one line of gold along the wall top.
  - **Extra negative:** skeleton, bones, ghost, spirit, ascending figure, light from the sky, angel, resurrection imagery of any kind.
  - This is a church-space overlay page: it reads devotional tradition sympathetically and asserts nothing. A depicted resurrection would make the picture claim what the page declines to.

- **`selvage-archecluster.jpg`** — *the weave's self-finished edge*, where sealed universes *can never touch one another, and can still reproduce.*
  > The finished edge of a heavy woven cloth photographed very close, filling the frame, where the weave turns back on itself and closes without a hem or a stitch. Along that edge the threads are dense and perfectly regular; beyond it, nothing. Raking side light picking out every thread. Textile, tactile, exact. Undyed fibre, warm shadow.

- **`wholecloth-formcluster.jpg`** — *woven without fold geometry and with static seating; primary, childless, and sealed.*
  > A single vast unbroken sheet of woven cloth stretched taut and filling the frame, seen straight on and lit flat, with no seam, no join, no fold, no crease and no edge visible anywhere in frame. Perfectly regular, perfectly still. Cool even light. Pale undyed fibre, almost monochrome.
  - **Deliberately the least eventful image on the roster.** *Nothing about it can be measured from here* is the entry, and a dramatic frame would assert access the record denies. Pair it with Selvage — same material, opposite fact.

- **`what-the-record-refuses.jpg`** — *what is refused outright, what is kept but honestly priced.*
  > A small, meticulously kept props store in a working repertory theatre: open shelving, everything squared away and nothing ticketed, labelled or numbered anywhere, and one shelf standing conspicuously and deliberately empty and swept clean while every other shelf is full. Plain worklight, no stage lighting, no glamour. Ordered, unsentimental, faintly witty. Warm wood, dust, one bare clean shelf.
  - **The empty shelf is the page.** A refusal that is *filed* rather than merely absent.

#### Physics (4)

- **`dreams-across-the-interval.jpg`** — *a dreaming mind near a narrowed Interval registers a neighbour's bled templates.* The mechanism refuses a sender.
  > A single small window of a habitat cabin seen from inside in the middle of the night, the cabin dark and the bunk empty and unmade, and on the far wall a faint indistinct patterning of light that does not correspond to anything outside the window. No figure, nobody sleeping, nothing at the window. Very dark, very quiet. Deep blue-black with one dim uncertain pale shape.
  - **Extra negative:** face, figure, silhouette, apparition, eyes, creature, anything that could read as a sender.
  - *A dream is never evidence about who sent it — nothing did.* The prompt has to hold that line, so the room is empty in both directions.

- **`generalised-quantum-mechanics.jpg`** — *the laboratory theory survives exactly as its kernel, and everything Etheric enters as extension terms.*
  > A well-used bench-top physics apparatus of entirely ordinary laboratory kind — a rigid optical bench, mounted posts, a sealed enclosure — clean, calibrated and clamped down, sitting on a stone bench in a plain university laboratory. Around it and behind it the room falls into soft darkness. Nothing exotic, nothing glowing, nothing added. Flat daylight from a high window. Brushed alloy, black anodising, grey stone.
  - **The kernel is unamended, so the instrument is ordinary.** Adding anything strange to the apparatus would illustrate the opposite of the entry.

- **`quantum-computing-and-the-cavern-constraint.jpg`** — *deep under sealed rock and nowhere else*, and *fast machines rather than oracles.*
  > A deep rock cavern, dry and sealed, its bare stone walls curving away, holding a single compact plain-cased machine cabinet standing alone on a level plinth at the centre with a great deal of empty floor around it. The rock is the subject and the machine is small in it. Cool even light with no visible source, deep quiet. No cables in shot, no racks, no personnel. Grey stone, matte casing, black shadow.
  - **Extra negative:** glowing chandelier cryostat, gold-plated quantum computer, cables, wires, blue glow, server racks.
  - The gold-cryostat image is the single strongest default and it is wrong twice — it is the popular photograph, and it is a glowing object in a page about shielding.

- **`the-scope-of-physical-law.jpg`** — *a physics claim is well-formed only at its level. Nothing physical is Ensemble-wide.*
  > A set of six plain nested wooden measuring boxes of graduated size, sitting apart from one another in a row on a workbench rather than stacked inside each other, each one plainly made to a different standard and none of them matching. Flat workshop daylight. Ordinary, handmade, exact. Warm wood, grey bench.
  - **Apart rather than nested**, deliberately: nesting would assert that the smaller scopes sit inside the larger as containers, which is not what the entry says.

#### Institutions (14)

- **`communion-of-the-called.jpg`** — *secular by charter, not its people*; answerable to no rank.
  > A small plain room aboard a space installation set out for a gathering that has ended: a dozen mismatched chairs pulled into a rough circle, a folding table with cups on it, the room empty. Nothing on the walls, no ornament, no symbol of any kind visible. Warm ordinary light. Companionable and entirely unofficial. Warm neutrals, worn deck.

- **`cross-biosphere-taxonomy.jpg`** — *frames, which describe structure and claim no ancestry, and lineages, which claim ancestry and never leave one world.*
  > A long bare bench holding four articulated skeletons of clearly unrelated origin laid side by side, each built on a broadly similar plan and each unmistakably not a variation of the others. Nothing else on the bench — no card, no label, no plaque, no case and no mount plate. Cool even daylight. Rigorous and slightly uncanny. Bone white, grey bench.

- **`frontier-transformation-protocols.jpg`** — *slowly, incompletely, and never on a Kernel-compliant system's say-so alone.*
  > A wide view across a frontier world's untouched valley at dawn — native vegetation, standing water, bare rock — with a single small survey stake driven at the near edge of the frame and nothing else built anywhere in sight. Enormous, intact, and observed rather than begun. Cold clear light, long shadows. Ochre, grey-green, pale sky.
  - **One stake and nothing else.** The whole clause is that the world gets time.

- **`habitat-threshold.jpg`** — *the charter population line above which a settlement passes out of jurisdiction entirely.*
  > A large orbital habitat seen from outside at a middle distance, whole and self-contained against the black, its inhabited ring lit from within along its length, no vessel docked and no other structure anywhere near it. Nothing arriving, nothing attending. Self-sufficient and slightly solitary. Steel grey, warm interior glow through the ring windows, deep black.

- **`heritable-modification-protocols.jpg`** — *between a change that ends with the body carrying it and a change that breeds.*
  > A plain laboratory bench holding two identical sealed sample vessels standing a hand's width apart, one of them standing inside a shallow plain tray and the other on the bare bench beside it, everything else about them the same. Flat clinical daylight, no other equipment in frame. Spare, exact, consequential. White, glass, brushed steel.
  - **Two identical things on opposite sides of a line** is the entry in one image.

- **`monasteries-of-mars.jpg`** — *scattered across Mars's open, thin-atmosphere terrain, deliberately unaffiliated.*
  > A small low stone-built enclosure alone on open rust-coloured Martian ground at evening, sealed and plain, its walls the same material as the ground it stands on, with an enormous empty landscape running to the horizon in every direction and no road, track, vehicle or other structure anywhere. Thin pale sky, long shadow, one small sealed doorway. Rust, ochre, deep violet sky. Austere and unlonely.

- **`planetary-liaisons-and-recruiters.jpg`** — *the berth a Ranger moves to when front-line work stops being possible without leaving the force.*
  > A modest ground-floor office on an ordinary inhabited world, its door standing open onto a busy street, one plain desk inside and two chairs on the public side of it. A person's coat on a hook. Nobody in frame. Warm daylight from the street reaching a little way in. Approachable, unimportant-looking, permanent. Warm plaster, worn wood, street light beyond.

- **`shore-leave-and-neutrality.jpg`** — *an officer on personal leave is the hardest case the neutrality clause has to cover.*
  > A quiet civilian bar on a habitat concourse in the middle of the afternoon, nearly empty, one stool at the counter pulled out and a half-finished drink and a folded jacket left on it, the seat vacant. Ordinary, unglamorous, entirely off duty. Warm low light from behind the counter with no fitting visible. Warm brown, brass, grey deck.
  - **The officer is absent from the frame** because the entry is about which of two people is sitting there, and the record has never decided.

- **`solar-system-concord.jpg`** — *the compact that every government since has enforced, and none has owned.*
  > A large plain assembly chamber with a ring of identical unmarked desks and no head of table, no dais, no throne, no seat of honour and no flag or emblem anywhere, seen from one side and entirely empty of people. Even daylight from a high band of windows. Deliberately unimpressive, deliberately symmetrical. Pale stone, plain wood, cool light.

- **`star-rangers-frontier-corps.jpg`** — *whose mandate on every world it serves is designed to end.*
  > A single set of boot tracks crossing wet ground away from the camera toward a small frontier settlement in the middle distance, the settlement lit and busy at dusk, the tracks leading away from it and out of frame at the near edge. Nobody in shot. Cold blue evening with the settlement warm in the distance. Departure as the achievement. Grey-blue, wet ground, distant amber.
  - **The best single image in this set**, and it is entirely the entry's own idea.

- **`star-rangers-navigation-corps.jpg`** — *route certificates expire when hull certificates do not.*
  > A navigational beacon buoy alone in deep space, plain and unlit and slightly out of alignment with the corridor it marks, the starfield behind it. Nothing else in frame — no ship, no station, no route line. Small, exact, and quietly out of date. Matte grey against black, one cold highlight.

- **`star-rangers-science-corps.jpg`** — *interprets what the Survey Corps collects.*
  > A plain working room aboard an installation where a long bench holds a single sealed sample container and, beside it, a stack of shut plain-bound record volumes; a chair pushed back from the bench. Nobody present. The specimen is unremarkable and the record beside it is thick. Cool even light. Grey, warm binding cloth, glass.
  - **The stack is taller than the specimen is interesting**, which is the corps.

- **`the-commonwealth.jpg`** — *thin by design.*
  > A modest meeting room in an orbital habitat with a long table set for perhaps ten, most of the chairs empty and pushed in, three cups at one end where a short conversation happened. A wide window onto the habitat's interior curve. Unhurried, undemanding, well kept. Warm neutrals, pale daylight.

- **`the-institute.jpg`** — *accepts the instruments and declines the cosmology.*
  > A plain research office with one bare wall, a working desk, and a single well-made instrument case standing closed on a side table. On the desk, one shut notebook squared to the edge, and a chair turned to face the wall rather than the window. Flat daylight, nothing decorative anywhere, no diagrams, no display. Sceptical, spare, unfriendly to enthusiasm. Grey, black, one warm wood surface.

#### Technology (4)

- **`eden-ring-rail.jpg`** — *the ordinary, AI-scheduled way most residents actually move around the ring.*
  > A commuter rail platform on the inner surface of a great orbital habitat in the early morning, a plain modern train standing at the platform with its doors open, a handful of residents boarding without hurry, the habitat's green curved landscape rising away behind and overhead. Soft daylight from the habitat's light band. Utterly ordinary and quietly extraordinary. Green, pale grey, warm morning.

- **`fold-transit-catastrophic-failure.jpg`** — *the three accounts settled space gives of the same wreckage.*
  > A single recovered fragment of hull plate laid flat on a bare bench under even light, its torn edge presented to the camera, clean and dry and quite small. Nothing else on the bench at all — no tag, no label, no card, no marker. The room around it dark. Sober and undramatic. Grey metal, black shadow.
  - **Extra negative:** explosion, fire, debris field, wreck, dramatic destruction, ship breaking apart.
  - The entry is about how a loss is *classified*, not about the loss.

- **`kalypsis-dawn.jpg`** — *a boundary zone cannot be shielded against, only carried better references into.*
  > An unarmed survey and transport vessel in deep space seen three-quarter from ahead, mid-sized, plainly built, with no weapon mounts and no aggressive line anywhere on the hull, holding station in a region of ordinary starfield. Working lights along the hull, a large observation viewport, a plain unmarked hull. Calm, capable, unthreatening. Pale grey hull, deep black, cold starlight.
  - **The lee is the name**, so the silhouette should read as shelter rather than force. No cannon, no prow, no wings.

- **`orbital-compute-complexes.jpg`** — *classical machines without exception, since no quantum computer flies.*
  > A very large orbital structure above a settled world, plainly industrial and entirely without windows, its whole surface given over to flat radiator panels edge-on to the sun and running away in ranks. The planet below fills the lower frame. Hard sunlight, black shadow, no glow anywhere. Functional to the point of austerity. White radiator faces, black structure, blue-grey world.
  - **Radiators, not lights.** Heat rejection is what a compute complex actually looks like, and it keeps the frame off the glowing-datacentre default.

#### Factions (3)

- **`cairn-trust.jpg`** — *a marker is of no use to the one who set it.*
  > A cairn of stacked flat stones standing on a high bare ridge on an unfamiliar world at first light, carefully built and weathered, with an empty valley beyond it and no track, no building and nobody in sight. Behind it the ridge continues into distance. Cold clear light, long shadow from the stack. Purposeful and unattended. Grey stone, pale gold light, cold blue distance.

- **`halvern-combine.jpg`** — *a permission outlives the power that granted it.*
  > A heavy old office safe standing open in an otherwise emptied room, its interior holding one squared stack of plain document wallets, every one shut and tied closed with tape, none of them open and no loose paper anywhere, and nothing else. The room around it is stripped: pale rectangles on the wall where things hung, dust, a bare floor. Flat daylight through an uncurtained window. The institution has gone and the paper has not. Dull green enamel, brass, dust.

- **`hyperfold-yield-combine.jpg`** — *everything about it was lawful*, and it ended at Dock Seven.
  > An industrial rendering platform in open space, plain and well maintained and entirely intact, holding station off a distant station's lights. Ordinary working plant: tanks, transfer booms, docking cradles, all of it orderly. Nothing dramatic, nothing sinister, nothing damaged. Hard sunlight from one side. Cold grey plant, black space, distant warm station. Utterly unremarkable, which is the entry.
  - **Extra negative:** creature, tentacle, dragon, aperture, portal, rift, destruction, wreckage.

#### Locations (5)

- **`planets/cirrane.jpg`** — *the only Federation member world with no surface.*
  > The upper atmosphere of a great gas giant seen from within it, banded cloud layers running away in enormous horizontal strata above and below, sunlight coming from one side through miles of haze, and no ground, no horizon and no solid object anywhere in frame. Vast, layered, entirely open. Ochre, cream, deep amber shadow.

- **`planets/corryn.jpg`** — the ringed gas giant *whose rings pulse and hum in patterns.*
  > A gas giant with a complex ring system seen from the night side of a nearby habitable world, low above the horizon and dominating the sky, its rings edge-lit and carrying faint patterned colour in blues, purples and greens along their length. In the foreground the dark silhouette of a hillside with spiral-form vegetation against the sky. Quiet, enormous, patterned. Deep blue-black, cold ring colour, black foreground.
  - **Patterned, never addressed.** No face in the rings, nothing that reads as a signal aimed at the viewer.

- **`planets/fliade.jpg`** — *biodiversity lives underground.*
  > The interior of an enormous deep cavern on a cold world, its floor and walls carrying dense, complex, entirely non-photosynthetic growth in pale and dark forms, lit only by the faint self-luminescence of the growth itself and by nothing else. No opening to the sky, no equipment, no figures. Cold, crowded, alive. Pale grey-green light, black rock, deep shadow.

- **`planets/verdance.jpg`** — *four climate zones, each hosting a distinct native civilization.*
  > A high aerial view across a world where four utterly different landscapes meet within sight of one another — cold forest, open savanna, wetland, and high dry upland — the transitions clearly visible, each with its own distinct built settlement small in the distance. Clear midday light. Extraordinary range held in one frame. Full natural colour, wide horizon.

- **`umbral-moon.jpg`** — *a small dark body at Earth–Moon L5, held by ordinary celestial mechanics.*
  > A small, dark, irregular airless body in space seen close and lit hard from one side, its far limb in complete blackness, the Earth and the Moon both visible together as small distant discs in the same frame at a great distance. Nothing built on it, nothing orbiting it, nothing strange about it. Cold, plain, unremarkable. Charcoal rock, hard white light, black.
  - **Nothing strange about the moon**, which is the fix that entry made: the flexure merely shares the address.

#### Universes (1)

- **`universes/deadwater.jpg`** — *no corridor has ever formed there, and every journey between its stars is sublight.*
  > A deep-space starfield of ordinary appearance, seen wide, with a single small sublight vessel crossing it far off and plainly a very long way from anything. No corridor, no aperture, no distortion, no structure. The emptiness is the subject and it is entirely calm. Black, cold white points, one dim hull.

#### Species (1)

- **`ollune.jpg`** — *never stood on a surface, never lit a fire.*
  > Several large, delicate, entirely non-humanoid atmospheric beings holding position in the sunlit upper cloud of a gas giant, seen at middle distance, broad and translucent and built for buoyancy rather than for walking, with no legs, no feet and nothing that could grip. Banded cloud running away behind and below them. Serene, alien, at home. Amber and cream cloud, pale translucent forms.
  - **Extra negative:** wings, faces, eyes, limbs, hands, humanoid form, jellyfish cliché with trailing tentacles.

#### Culture (3)

- **`narrative-works-and-their-adaptation.jpg`** — *a spine of scenes carrying several viewpoints, with its reference apparatus attached.*
  > A reader's table holding one bound volume lying shut and flat with a ribbon marker trailing from it and, ranged around it, four slimmer companion volumes standing shut on their edges — a set that plainly belongs together and is plainly not one book. Every book in frame is closed. Warm reading light from a window. Quiet, scholarly, inviting. Warm wood, cloth binding, pale paper.

- **`cill-aoife-devotion.jpg`** — the devotion *carried into space as living devotion by the Currach Fleet.* Filed under this name rather than `saint-aoife.jpg` — see the collision note above.
  > A small plain shrine niche set into the bulkhead of an old colony vessel's corridor: a shallow recess holding a few sprigs of blackthorn in water and a worn stone the size of a fist, the metal around it polished bright by generations of hands passing. Nothing ornate, no image, no figure, no candle. Ordinary corridor light. Devotion as an unbroken habit rather than an occasion. Dull alloy, wet green, one bright worn patch.

- **`star-rangers-proverbs-and-maxims.jpg`** — *taught in the college, inadmissible in the log.*
  > A worn wooden lecture-room bench in a training college, seen close, its surface marked by decades of use, with a plain shut record book set squarely on it and nothing else. Cold daylight from a high window. Two registers, one bench. Warm scarred wood, grey light, dark binding.

#### Records (2)

- **`plainmark.jpg`** — *stacked colour bands carrying chevrons, rings, tally strokes and lozenges.*
  > A close view of a heavy hatch frame in a working orbital habitat, carrying a vertical stack of flat painted colour bands with simple geometric marks on them — chevrons, plain rings, short tally strokes, lozenges — crisply painted, hard-wearing, and containing no letters or numerals of any kind. The corridor beyond is out of focus. Utilitarian and oddly handsome. Saturated flat colour against grey alloy.
  - **The one prompt in the set whose subject cannot be moved.** Everywhere else the 19 August fix was to change the scene (see *the lettering ban cannot beat the scene* under Prompt craft); here the marks **are** the entry, so the scene stays and the handling has to differ. Two things do the work: the prompt describes the marks purely as **painted geometric shapes** and never as a marking system, a code or a standard — naming the function is what summons letters — and **nothing else in frame is markable**, the corridor beyond being thrown out of focus.
  - **Check at 4× without fail**, and if glyphs appear anyway the next move is to crop tighter onto a single band rather than to add negatives. A band of flat colour with one chevron on it has nowhere to put a word.

- **`timekeeping-and-the-common-record.jpg`** — *time distributed by courier in a civilisation without faster-than-light communication.*
  > A small hardened transit case standing alone on a plain bench in a ship's compartment, closed and clamped down and secured with a strap, plainly precious and plainly unremarkable to look at. Cool even light, nothing else in frame. What is inside is a clock, and the picture does not show it. Matte case, dull alloy, grey bench.

#### History (3)

- **`formation-of-star-rangers.jpg`** — *the moment the Military Space Command's institutional failure became irreversible.*
  > A long negotiating table in a plain hall, seen from one end, strewn with the aftermath of many days: pushed-back chairs at irregular angles, cups and glasses left where they stood, one chair overturned and not righted. Nothing on the table but the cups — no paper, no folder, no document anywhere in frame. The room empty and the work finished. Grey late light through tall windows. Exhausted and consequential. Cool grey, pale wood, cold daylight.

- **`the-generation-ark-era.jpg`** — *the odds of arriving were the odds of an early Norse or Irish open-boat ocean crossing.*
  > An enormous, plain, slow sublight vessel crossing deep space, seen small in a very wide frame, its long hull built for endurance rather than speed and showing the accumulated repairs of a long passage. No destination visible, no star close. Vast emptiness around it and the ship entirely alone. Cold white points, dull hull, black.

- **`what-nobody-certifies.jpg`** — hulls, routes, people and minds are certified, and *nothing at all certifies a permission to be somewhere.*
  > A plain office wall carrying five identical shallow mounting niches in a level row. Four hold a small stamped metal seal hanging on a short cord — plain discs bearing only a struck geometric device, no writing of any kind. The fifth niche is empty and holds nothing at all. Flat even daylight, nothing else in frame. Bureaucratic, deliberate, quietly pointed. Pale wall, dull metal, one empty recess.
  - **Seals rather than certificates — rewritten 19 August.** The first version asked for *four framed certificates, each one blank of any writing*, the exact self-defeating shape #415 disproved: a certificate's purpose is to carry writing, so the model draws the writing. A struck metal seal keeps the whole idea — four things certified, a fifth with nothing — and removes the writing surface instead of arguing with it.

#### Entities (1)

- **`predatory-entities.jpg`** — *classified by sapience and feeding method*, and governed by the tone line.
  > An empty woodland clearing at dusk, ordinary and pleasant, with a ring of soft trampled grass at its centre where something has habitually lain, and a few small personal objects — a shoe, a folded cloth — at the edge of the ring, undisturbed and weathered. Nothing present. Warm failing light, long shadows, complete quiet. Green-gold, deep shade.
  - **Extra negative:** creature, monster, teeth, claws, blood, gore, corpse, horror, body, violence, glowing eyes, shadow figure.
  - **Superseded — use Open work 6's brief instead, 19 August.** That section already carried a prompt for this file and it is the better one: *a vacated habitat compartment, one chair turned away from the open door, a personal effect left exactly where someone set it down.* Same discipline, held indoors and in-setting, where the clearing above is neither. The frame above is kept only as a second option if the interior refuses to read.
  - **Hint at the dark fact rather than depicting it**, exactly as the tone line requires. Nothing in frame is frightening; what is frightening is what the frame implies, and that is the setting's whole register.

#### Timeline Notes (1)

- **`universal-cosmic-stardate.jpg`** — *a paper timescale kept by an ensemble of clocks no institution owns.*
  > A plain room holding six identical sealed instrument housings on separate isolated plinths, well spaced apart, each one unmarked and giving nothing away, in a space that is plainly kept very still. Cool even light, no cables in shot, no readouts. The agreement between them is the instrument and none of them is it. Matte white, grey stone, deep shadow.

---

**Checking these on return.** Four carry a default strong enough to fail quietly:
**`quantum-computing-and-the-cavern-constraint`** (the gold cryostat),
**`plainmark`** (gibberish lettering — inspect at 4×),
**`predatory-entities`** (the tone line, in both directions: a monster fails it and
so does a frame with nothing implied), and **`ollune`** (the trailing-tentacle
jellyfish). Beyond those, the set's own risk is sameness: a great many of these
are *a quiet room with one object in it*, which is the right answer individually
and would be a monotonous gallery. **Judge them as a page of thumbnails, not one
at a time**, and re-roll for variety rather than for quality where they cluster.

#### Two delivered portraits versus the bureau uniform (19 August 2026)

Dermot's direction that **Eden's detectives are uniformed with rank insignia**
(`src/lore/eden-bureau-uniform.md`) postdates two delivered portraits that show
neither. Recorded here rather than acted on, because the runbook's own rule
settles it: **art is illustrative, the prose is canon — when the two disagree,
the entry wins and the art stays.**

**Both are fine, and the second one stopped being a problem the same day.** An
earlier version of this note called Albercombe's herringbone *not compatible*.
Dermot's follow-up — **the obligation is on the lower ranks** — settled it:
Albercombe is a Detective Inspector and Oyelaran a Superintendent, and neither is
required to wear the jacket at all.

- **`rasa-oyelaran.jpg`** — *a plain grey work jacket over a maroon shirt.* Fine
  twice over: she is senior enough not to be required, and a plain grey work
  jacket would pass as the uniform anyway.
- **`wendell-albercombe.jpg`** — *a worn herringbone jacket over an open blue
  shirt.* Fine. A Detective Inspector in civilian cloth is the entry working, not
  the entry contradicted.

**No alt text changes**, and none were needed. Both lines describe what their
files actually show, which is the one hard requirement.

**A future frame of a junior officer takes the uniform** — the jacket, and the
collar mark by rank — where a senior one need not, an undercover one must not,
and a Commissioner is never required to. Note the lettering trap while writing
any of them: the marks are strokes and blocks carrying **no letters and no
numerals**, and whether the jacket bears any identifying number is deliberately
unsettled in the entry, so no prompt should invent one.

**And the same caution now applies to Ranger frames.** Corps and branch badges
are canon as of the same direction, which puts a new device on a uniform that
previously had only tabs and plates — so a Ranger prompt may name a corps badge,
but it is **shapes only**, never a word, a monogram or an emblem with writing in
it.

### 6. Images that should not stay — audited 2026-08-10

Open work 1 and 5 are the images that are **missing**. This is the other half:
images that **exist and shouldn't**. Prompted by Dermot noticing that Saint
Aoife "looks a bit too much like a dark shadow", which turned out to be the
visible corner of something larger.

> **The figures below are stale, and stale in the good direction — re-measured
> 19 August 2026.** The distribution now reads **7 pages under 80 characters,
> 16 between 80 and 119, and 112 at 120 or more**, across **135** illustrated
> lore and character pages. The 68-page short-caption cohort this audit found is
> down to seven. The alt-text work was done and this section was never updated to
> say so, which made an almost-finished job read as an open one. The reasoning
> below stands as the record of why it was done; the counts do not.

**The corpus carries two visual languages.** Alt-text length is a reliable
tell for which images were ever actually looked at, and it comes out bimodal:
68 pages sit under 80 characters — *"A smiling professional woman"*, *"An open
old book"*, *"Computer circuit board close-up"* — and 40 sit at 120+ with real
descriptions of in-world art. The short ones read as stock-library captions
because that is what they are. Roughly **55% of the 120 illustrated lore and
character pages** are contemporary stock photography, against a house style
that says in so many words: *not contemporary glamour or lifestyle shoots.*

**Correction, same day: there are three languages, not two.** The third is
**Dermot's own photography**, already in the corpus and already the best
material in it — the `highland-*` and `boirinn-uplands-*` sets, `moorhen-wetland`,
`gull-on-rock`, `trigrian`, the flower macros. Open work 2 settles the
provenance without needing EXIF: it records a sensor-dust blemish on one of
them as *"the known main-body Tamron artifact"*, which is his own lens, and
notes that the highland set doubles as Órla Shepherd's home landscape.

**Added to the third language, 2026-08-22: `lore/young-lake-margin.jpg`**
(Rivers Old, Lakes Young) — Dermot's own D3100 frame, February 2025: a flooded
Irish lakeshore, bare trees standing in the shallows, gorse in flower on the
drowned bank. Routed here after failing the portfolio's bar (soft throughout —
f/22 diffraction at ISO 4000 — with a car and fence on the far shore); the top
strip carrying both was cropped away before the 1600px resize, so the frame
holds nothing man-made. The softness stands: at page size it reads as
atmosphere, the same licence the record already extends to `moorhen-wetland`.

**Four more, 2026-08-22, same session — the portfolio survey.** All 158
photos published on dermotcochran.com were cross-matched against the
image-less lore pages (Dermot picked these four from a shortlist of seven);
each is his own frame, re-filed from the portfolio's 1600px site file:

- **`lore/volcanic-strata.jpg`** (Stone, Fire, and Ice) — the portfolio's
  *Volcanic Strata*, cropped to the strata alone (1300×695): the crop removes
  a guardrail, a marker pole and a chain fence, and with the sky gone the
  scale goes unreadable, which is the point. Under the ~1600px convention
  because the source is the 1600px site file; a full-spec recrop from the
  original on `F:` is the upgrade path if ever wanted.
- **`lore/cloud-sea.jpg`** (Coasts, and Other Edges) — *Above the Clouds*,
  unmodified: a cloud sea with distant ridges standing out of it, carrying
  the entry's "shoreline between atmospheres" line. Nothing man-made in frame.
- **`lore/grassland-storm-tree.jpg`** (The Ledger and the Truce) —
  *Before the Storm*, unmodified: one flat-crowned tree in dry grassland
  under a near-black storm sky — the truce with its enforcer arriving.
- **`lore/drowned-forest.jpg`** (The Forest Is Waiting) — *The Drowned
  Forest*, unmodified: a forest's century-bet lost, standing in the water
  that called it. The faint pale structures along the far shore were judged
  acceptable in-world (settled worlds have buildings; they read as haze at
  page size).

**A sixth, same day: `lore/shoreless-sea.jpg`** (Tides Without Shores) —
the portfolio's *Sunset at Sea*, as the radical left crop (1150×900 from the
1920px site file): the cruise deck, railing and lifeboat all fall outside
it, leaving open water to a pink horizon band with **two distant vessels
hull-down on the line** — kept deliberately, because on a shoreless ocean
the only witnesses are afloat, which is the entry's own point. Under the
~1600px convention like the strata crop; the original on `F:` is the
upgrade path.

**A seventh, 2026-08-23: `lore/island-watchtower.jpg`** (The Cost of the
Crossing) — the portfolio's *Dalkey Island*, unmodified from the 1600px site
file: a low green island across dark water, a round stone watchtower on the
summit and the gable of a small stone ruin along the ridge. The structures
were the question — Garachico Rock fell below to a summit cross — and Dermot
ruled these in (2026-08-23): a watchtower and a stone gable are the Kingdom
of the Four Islands' own furniture (Old Houses, an order standing tideward),
where a cross is a specific Earth confession the record does not carry. The
island is identifiable to a local eye as a named Irish island; judged
acceptable — a real place, unnamed, his own work.

**The identifiability question is settled in general, not just for that
frame** (Dermot's ruling, 2026-08-23): *"A movie filmed on location would
also include places that local fans would recognise. I am ok with that."*
So a candidate from his portfolio is never rejected merely because a local
reader could name the place — the record is filmed on location. What still
disqualifies is unchanged: structures the setting cannot absorb (the
Garachico summit cross), anachronisms, recognisable people, and anything
that *names* the place in frame (signage, lettering). The distinction from
the `formation-of-star-rangers` rejection holds: that was a skyline whose
meaning travels with it worldwide; a local landmark carries no meaning a
non-local reader can import.

Not carried over from the shortlist, recorded so the survey isn't redone:
*Where the Water Was* (soils — **judged unusable from the site file,
2026-08-22, second look**: a dozen-plus white litter fragments lie across
the right-hand slope, exactly where the best terrace patterns are; the only
clean crop is a weak 780×810 of the left water-and-spit. Cleaning it means
spot-heal on Dermot's photograph, which this file reserves for his hands —
so the soils page waits for a healed master, or for the 111BOHER originals
STYLE.md names on `F:`, the cracked mud `DSC_2860` or the eroded spit
`DSC_2895`), and *Garachico Rock* (The Cost of the Crossing — a summit
cross survives every crop). The portfolio holds nothing for The Honest Dark
(no night skies), Where the Weather Stops (no caves), or Quern's storm
belt.

**Method, stated so a later audit knows what to trust:** six images were
opened and read. The 66-page cohort is *inferred from caption style* and is
not individually confirmed. Confirming it is its own pass — and per this
file's own standing warning, it must be done by opening files, not by
reasoning about filenames or alt strings.

#### Triage: sort by what the image is doing, not by where it came from

"Replace all the stock" is the wrong unit — it counts 66 images when the
number that matters is nearer 25, and it would replace things worth keeping.

**Tier 1 — photographs of real people standing in for characters. These must
go.** The only non-negotiable tier, for a reason that is not about house
style: a generated portrait of an invented person claims nothing, but a
photograph of a real stranger captioned as a character makes a claim about an
actual human being, and a false one. `dagny-voss.jpg` is a real woman
presented as an orbital refinery director on Aspenar. That is testimony
pointed at the wrong person — the same fraud the photography site's absolute
rule exists to prevent, running in the other direction. There is also a
licensing question worth *checking rather than assuming*: stock model
releases commonly restrict portraying a model as a fictional person or
implying endorsement, and these publish on owned domains under
`CONTENT-LICENSE.md`. **Roughly 15–20 portraits. Do these first.**

**Tier 2 — stock photographs standing in for specific invented places and
institutions. Should go.** An empty Earth parliament chamber as the Star
Rangers command hierarchy; a Mediterranean archway as Cill Aoife. Wrong in a
way a reader can point at. **Roughly 10–15.**

**Tier 3 — Dermot's own photography. Keep it, and lean on it much harder.**
A real Irish upland standing in for an alien world claims nothing false
because it names nothing: a real place, unnamed, his own work, no model
release in sight. **The unpublished photo backlog is a lore-art resource** —
Kenya, Tenerife, Scandinavia and Irish material sitting on `F:` includes
acacias in dust, a drowned forest, flamingos, volcanic strata, a cloud sea.
That is alien terrain already, and `earth-leopard-grassland.jpg` shows the
practice is established. For any lore entry about landscape, weather, flora
or fauna, the archive beats a prompt: cheaper, better, and it moves the
corpus toward his own work rather than away from it.

**Tier 4 — abstract and texture stock. Lowest priority; probably keep.**
Star fields, light gradients, circuit boards, nebulae. No person, no place,
no claim, and nobody's reading is broken by them. Replace opportunistically
when already in the file, never as a project. **Roughly half the 66.**

So the real work is **25–30 images**, not 66 — and a good share of those
should come from the camera rather than a prompt.

#### Five images are doing nine jobs — RESOLVED 15 August 2026

Byte-identical files under different names (MD5-checked). **All five are now
resolved, and a full MD5 scan of `src/images/` returns no duplicate group at
all.** The first three had already been fixed by earlier work without this note
being updated — a reminder that these tables go stale silently.

| Kept by | Also serving as | Resolution |
|---|---|---|
| `characters/bertram-ashcombe.jpg` | `lore/planetary-liaisons-and-recruiters.jpg` | fixed earlier; note was stale |
| `characters/elvira.jpg` | `lore/planets/verdance.jpg` | fixed earlier; note was stale |
| `characters/brother-daire.jpg` | `lore/monasteries-of-mars.jpg` | fixed earlier; note was stale |
| `lore/star-rangers-command-hierarchy.jpg` | `lore/frontier-transformation-protocols.jpg` | duplicate deleted 15 Aug; the frontier page is now image-less and needs one |
| `lore/threnos-omega.jpg` | ~~`lore/post-eleven-dimensional-manifold.jpg`~~ | duplicate deleted 15 Aug, then **flipped on Dermot's ruling the same day**: Threnos-Ω keeps the ring, and the Common Manifold page is now image-less and needs one |

**A sixth pair this note never had**, found by rescanning on 15 August rather
than trusting the table: `hero/glossary-book.jpg` was byte-identical to
`lore/canonical-glossary-and-migration-guide.jpg`. Resolved differently from the
other two, because both *uses* are legitimate — a section hero and a lore
entry's own image — and only the second copy was redundant. The hero file was
deleted and `src/glossary/index.md` now points at the lore copy directly. **Note
the wrinkle:** `lore-entry.njk` hardcodes `/images/lore/`, so an `image:` field
cannot reach across into `hero/`, but an explicit `<img src>` in a page body can
reach the other way. That asymmetry decided the direction; it was not a
preference.

**Which page kept the image, in the two lore pairs, followed this table's own
"Kept by" column** rather than a fresh judgement — flipping either is a
one-line front-matter change plus a file rename.

The pattern in the first three is one error: **a character portrait reused as
the illustration for an institution or a place.** Proposed rule — *the
portrait keeps the file; the lore page gets a new image of what its entry is
actually about.* A picture of a man is not a picture of an order of monks,
and Elvira's portrait is not a picture of a planet.

Separately, `lore/united-space-consortium.jpg` is a *different* file carrying
the *same* alt text as the command-hierarchy pair (*"The interior of an empty
parliament chamber"*). One of the three describes a picture it isn't, which
is a plain breach of the one hard rule in this file.

#### The ten worth doing first

> **Two corrections, 19 August 2026.**
>
> **First: every one of the ten target files has since been deleted.** Nothing
> here is *currently* a hooded figure, a stock headshot or a voting console —
> those pages now carry no image at all. The diagnoses below are the record of
> why each was removed and remain worth reading; the present tense in them is
> not.
>
> **Second, and my own error: eight of these were prompted a second time on
> 19 August**, in *Outstanding portraits* and *Outstanding lore illustrations*,
> because both lists were derived from pages lacking an `image:` field and this
> section was never checked against them. `images.md` therefore carried two
> competing briefs for the same file in eight cases. Reconciled as follows.
>
> **The newer brief governs**, for `verdance`, `dagny-voss`,
> `monasteries-of-mars`, `planetary-liaisons-and-recruiters`, `elvira` and the
> lore Aoife — it was written against each page's current text, carries the
> set's shared negative blocks, and in the Aoife case fixes a naming collision
> this section did not notice.
>
> **This section's brief governs for `predatory-entities`**, and the newer one
> should be dropped. *A vacated habitat compartment, one chair turned away from
> the open door, a personal effect left exactly where someone set it down* is
> in-setting where the newer frame is a woodland clearing, and it holds the same
> tone line better by holding it indoors.
>
> **And this section carries one constraint the newer Aoife portrait brief
> missed and must adopt: keep the concealed face.** The record does not know it,
> and the page's whole argument is that she never claimed to know what she had
> seen — so the face stays turned, shadowed, or away. That is canon reasoning,
> not a styling preference, and it outranks anything in the newer entry.
>
> **Two entries here said *prompt not written* and now have one**: the Frontier
> Transformation Protocols page and the Common Manifold page are both covered in
> *Outstanding lore illustrations*.

Not the merely generic — the ones where the current image **actively
misinforms**. Prompts written to the standing rules and ready to paste.

**These are not visible to `scripts/image-prompts.js`, deliberately.** It reads
only the Open work 1 and 5 headings, and an entry there counts as done while
its target file exists — so a replacement listed here would be skipped twice
over. To put one through the pipeline: delete the offending file, move its
bullet into Open work 1 (characters) or Open work 5 (lore), and re-run. The
separation is the point — this section is a list of *decisions to take*, and
the moment a prompt moves up it has been decided.

- **`saint-aoife.jpg`** (characters) — currently a black hooded figure seen
  from behind, filling the frame, in a *Mediterranean* hill town: whitewashed
  walls, terracotta pantiles, a cypress. Wrong continent for Cill Aoife,
  wrong register, and it reads as menace for a woman who spent her life
  tending the sick. **Keep the concealed face** — the record genuinely does
  not know it, and the page's whole argument is that she never claimed to know
  what she had seen. Lose the menace.
  > Cinematic portrait of a thirteenth-century Irish holy woman standing at a hawthorn well in soft Atlantic daylight, upper body, half-turned away so her face falls into shadow and is never resolved, plain undyed woollen mantle over a simple gown, hands wrapped in cloth from tending the sick, bare thorn branches and low green hill country behind her, overcast western light, muted moss-and-stone palette, quiet and unthreatening, historical rather than fantastical, no readable text or lettering of any kind. Portrait orientation.

- **`saint-aoife.jpg`** (lore) — currently candles on a gilded Orthodox
  iconostasis: real-world, wrong tradition, contemporary. The entry is about a
  devotion, so illustrate the *place* the devotion attaches to.
  > A hawthorn well in Irish hill country as a place of devotion, the low stone kerb worn smooth, strips of cloth and small offerings tied to the bare thorn branches above it, no people in frame, soft overcast western daylight, damp green and grey palette, reverent and ordinary rather than mystical, medieval vernacular with nothing modern visible, no readable text or lettering of any kind. Landscape orientation.

- **`elvira.jpg`** (characters) — **the worst of the set.** A black-robed
  hooded figure in a dark doorway, backlit through smoke, carrying what reads
  as a scythe. Her own page says *"her classification is contested; she is not
  magical"* — the image asserts precisely what the entry denies, and lands on
  the wrong side of the tone line while doing it.
  > Cinematic portrait of a solitary boundary practitioner keeping a remote marsh causeway outpost, upper body, weathered practical outdoor clothing and heavy waterproofs, calm and matter-of-fact expression, standing in the doorway of a small functional outpost building with flat reed marsh and open sky behind her, cold flat daylight, muted grey-green palette, plainly a working technician rather than anything occult, far-future science-fiction setting, no readable text or lettering of any kind. Portrait orientation.

- **`verdance.jpg`** (lore/planets) — currently Elvira's portrait, which is a
  picture of a person standing in for a picture of a world.
  > A temperate living world seen from low orbit, broad continental greens and river systems under scattered cloud, the terminator line falling across one edge, no habitation or structures visible, far-future science-fiction survey imagery, natural and unspectacular colour, no readable text or lettering of any kind. Landscape orientation.

- **`predatory-entities.jpg`** (lore) — currently blurred hands pressed
  against frosted glass: a horror stock cliché, and the one image in the
  corpus that most clearly breaks *hint at the dark fact rather than depicting
  it*. Nothing should be visible that could be pointed at.
  > A vacated habitat compartment at low light, one chair turned away from the open door and a personal effect left exactly where someone set it down, bedding disturbed and not returned to, far-future science-fiction interior, cold desaturated palette, no figure and no creature anywhere in frame, unsettling entirely by absence and by what has been left behind, no readable text or lettering of any kind. Landscape orientation.

- **`dagny-voss.jpg`** (characters) — a corporate stock photograph: smiling
  woman, pale blue blazer, stucco wall, green hedge. Contemporary Earth, no
  science fiction in it at all. She directs an orbital ore refinery.
  > Cinematic portrait of a composed woman directing a large orbital ore-refining habitat, upper body, practical industrial coverall over working clothes, standing on a gantry above refinery machinery with the curve of a planet visible through the bay beyond, competent unsmiling expression, hard directional industrial lighting, far-future science-fiction setting, muted steel-and-amber palette, professional, no glamour styling, no readable markings or insignia lettering. Portrait orientation.

- **`monasteries-of-mars.jpg`** (lore) — currently Brother Daire's portrait.
  Keep it on his page; the order needs its own image.
  > A scattered contemplative settlement on open Martian terrain, low rock-built cells and a single walled enclosure set into rust-coloured ground under a thin pale sky, long shadows and a distant escarpment, no figures in frame, deliberately austere and unmonumental, far-future science-fiction with nothing ornate, no readable text or lettering of any kind. Landscape orientation.

- **`planetary-liaisons-and-recruiters.jpg`** (lore) — currently Bertram
  Ashcombe's portrait. Same fix: an institution is not a person.
  > A small planetary liaison office on a quiet colony world, a plain desk and two chairs by a window looking onto an ordinary street, a coat on a hook and a cooling cup left on the sill, no people in frame, unglamorous and administrative, far-future science-fiction setting, warm muted daylight palette, no readable text, signage or insignia lettering of any kind. Landscape orientation.

- **`frontier-transformation-protocols.jpg`** / **`star-rangers-command-hierarchy.jpg`**
  — byte-identical; **deduplicated 15 August**, the command-hierarchy page
  keeping the file per the table's "Kept by" column. Both files have now been
  opened: the image is a tight close-up of a delegate's electronic voting
  console on a wooden desk, the chamber's blue seating thrown out of focus
  behind it — which suits neither page especially well, and suits *frontier
  transformation* least. **The Frontier Transformation Protocols page is now
  image-less and needs one.** Prompt still not written: what that entry is
  about is a protocol for changing a world, and nothing in a debating chamber
  says so.

- **`threnos-omega.jpg`** / **`post-eleven-dimensional-manifold.jpg`** — same
  situation; deduplicated 15 August with the manifold page keeping the file, and
  then **flipped the same day on Dermot's ruling: Threnos-Ω keeps the ring.**
  The reason is recorded because it is the kind that goes missing: this file
  already calls `lore/threnos-omega.jpg` "the precedent for a membrane
  portrait", so the image had standing on that page specifically, and the
  original "Kept by" column was pointing the wrong way.

  **The Common Manifold page is now image-less and needs one.** Prompt not
  written. What it has to carry is harder than the ring was: higher-order
  spacelike and timelike structure shared by every universe in the Cascade
  regardless of its own dimensional floor — a *shared* substrate, not a
  boundary, so a membrane or a ring is exactly the wrong figure for it.

#### Convention breaches, separately

- `lore/saltmere-mooring-gantry-1.jpg` and `-2.jpg` are **2560×1920** at
  ~420 KB each, against a ~1600px long-edge convention.
- `lore/moorhen-wetland.jpg` is 1557×2133 — 2133 on the long edge.
- `characters/aldera/field-photo-*` run 557–700 KB.
- Twenty hero images are 1920px. Enough of them that this may be an accepted
  deviation rather than drift, but it is not what the Conventions table says.
  Worth either fixing or amending the table; the table currently reads as
  though it were enforced.

### Intake 2026-08-24 — first candidate for the Codex-art pool: a headmate of Tissadelle

Dermot supplied one generated image in session (Botify AI; no prompt kept),
first captioned **"Asteria the Sage, codex art"** and reassigned by him in the
same session, after the Asteria canon mismatch was raised, as **"a headmate of
Tissadelle"**. Parked at
`story-bible/reference-art/tissadelle-headmate-2026-08-24.jpg` — nothing ships.

**What it shows:** a woman appearing in her thirties, pale, loose blue hair,
pale blue eyes, in a black hooded cloak with silver botanical embroidery over
dark layered clothing with a belt, standing among bare branches at night;
three-quarter turn, level gaze past the camera. Register is still and watchful
rather than horror — inside the tone rule as it stands.

**Technical state:** 768×1152 (below the 1200px portrait floor and the 1600px
codex-card square), 232 KB, **"Botify AI" watermark bottom-left** — a
generation artefact, which the 18 August quality bar names as a disqualifying
flaw until cropped out.

**Why it is parked rather than filed, in order:**

1. **It depicts a canon entity that does not exist yet.** Tobble is the only
   named member of Tissadelle's system; canon says only that there are more
   members than the forms have boxes for. A named, depicted headmate is new
   canon — Dermot's to declare, not bookkeeping's.
2. **The interiority guardrail** (this file, Tissadelle prompt notes): her
   inner life is *hint, don't show*, and it is load-bearing for the S6–7
   endgame. Whether a published depiction of any headmate breaches that is his
   call and is not obviously no.
3. **The Codex-art route itself is unsettled** — the 18 August ruling left open
   whether it overrides the codex title-card convention, and a codex artefact
   needs an entry with a named in-universe author to live on; none exists.
4. **The watermark and size**, above — mechanical, fixable last.

If it goes forward as Codex art, the natural shape is an in-universe artwork —
some named artist's *idea* of the member behind the registration — which
asserts nothing binding and would be the pool's first test case. Open items
indexed in `open-questions.md` under Images.

**Addendum, same day — the headmate is also called "Asteria the Sage"**
(Dermot's ruling, 2026-08-24, verbatim: *"headmate is also called Asteria the
Sage"*). So the image's original caption was not a mislabel: the appellation
was right, the bearer was not the one on record. Two consequences, one open
question:

- The name decision (open item 1 below) is **part-answered**: the headmate
  carries the appellation *Asteria the Sage*. Whether that is her name, an
  honorific, or a taken title is not yet stated.
- It **collides deliberately with Asteria Wessex**, whose chapter calls her
  Asteria the Sage — an honorific her page says is *"the chapter's word and
  not hers"*. Two bearers of one appellation, one a retired Star Captain and
  one an unregistered member of Tissadelle's system, is a resonance the
  record has not explained. **Do not invent the connection** — homage,
  coincidence, in-world naming custom, or something the S6–7 material makes
  load-bearing are all open, and per the standing rule the epistemology may
  be explained but the fact may not be invented.

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
