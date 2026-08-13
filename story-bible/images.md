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
| Character portraits | **1200×675 — 16:9 landscape**, not portrait (see below) |
| Codex entries | designed dark-gradient **title cards**, not photographs |
| `image_alt` | must describe what the file *actually shows* |

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
  generated faces otherwise share no house style. The scripts do not send them
  yet; an app takes up to six.
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
- **Ban lettering explicitly** ("no readable text, no insignia, plain unmarked
  folders") or you get gibberish name tapes — and once, an entire NYPD squad
  room with `NYC POLICE` case files.
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

### 0. Replaced with placeholder cards — 28 images, added 2026-08-12

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
| `hero/characters-astronaut.jpg` | Same family, same unverified provenance | A page hero for the whole cast |
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

**The cheapest good answer to several of these is tier 3 of Open work 6** —
Dermot's own photography. An Irish upland standing in for Ynys Wydrin claims
nothing false and needs no prompt at all.

### 1. Missing portraits (11 pages)

None block a build — `character.njk` renders cleanly without an image. Prompts
below are ready to paste; add `image`/`image_alt` after generating.

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
  > Cinematic portrait of a woman of one hundred and five who reads unmistakably as a senior officer, upper body, standing outside a modest stone chapter house on a quiet rural world. She wears the plain working robes of a contemplative order over ordinary clothes - heavy, well-worn, functional cloth with a clear shoulder line, belted at the waist, not draping or billowing and not ceremonial; the robes are the first thing to get right and must be present. Genuinely old and entirely capable at the same time: deeply lined weathered face, thin white hair cut short and practical, hands and neck showing real age - and upright military bearing, square shoulders, weight evenly set, chin level, hands still and unclasped at her sides. Physically strong and undiminished, a person who still does the work. Level and unsmiling, assessing whoever she is looking at, faintly impatient. No stoop, no cane, no walking stick, no staff, no trembling, no frailty, no papery delicacy, no shrunken frame, no beatific warmth, no serenity, no benevolence, no wisdom pose, no hands folded in blessing. Soft overcast daylight, science-fiction pastoral setting, muted natural palette, a commander who happens to be wearing robes rather than a sage who happens to have been a commander, no uniform, no insignia, no rank marks, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

- **`galen.jpg`** — Star Rangers liaison officer at a Celtic Union shuttle gate;
  minor character, correct and quietly decent.
  > Cinematic portrait of a mid-career woman Star Rangers liaison officer in a plain service uniform, upper body, standing in a quiet arrivals hall beside a tall window, courteous professional expression, soft overcast daylight, science-fiction setting, muted palette. Her uniform carries small geometric rank marks only — plain bars and a ring at the collar, shapes and nothing else. No name tape, no name badge, no printed words, no letters and no numerals on her clothing of any kind. The only wayfinding visible is a Compact plainmark: one flat stencilled panel of stacked colour bands in black, slate-blue, bone-white and ochre carrying a simple geometric figure (a chevron, ring, tally stroke or lozenge diamond), painted on the wall beside her. Absolutely no gates, no departure boards, no destination signs, no illuminated panels, no screens, no holograms and no numerals, and no readable text, signage or written characters of any script anywhere in frame. Portrait orientation.

**Alien**

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
  > Cinematic photographic portrait of a lean non-human humanoid scout, upper body, unmistakably not human but not monstrous, and specifically NOT the bald big-eyed grey alien of stock science fiction: he has a **broad, heavy, human-proportioned skull** with a wide flat brow and a strong square jaw, deep-set eyes of ordinary size beneath a pronounced bony brow ridge, a broad nose, and thick coarse pale hair worn cropped short with a heavy stubbled beard. Absolutely no enlarged cranium, no domed bald head, no hairlessness, no oversized or almond eyes, no tapering pointed chin, no spindly neck, no grey skin. His build is compact, dense and weathered rather than slender. His skin is deeply pigmented, dark reddish-brown and thickened against high ultraviolet. Three features mark him plainly as another species and must all be clearly visible: **a pale opaque inner eyelid drawn halfway across each eye**, sitting horizontally like a shutter over the iris and catching the light with a faint prismatic sheen; **fine hard dermal plating** across the brow ridge, temples and cheekbones, like close-set overlapping scales or weathered bark growing out of the skin itself; and **no external ears at all**, only a small recessed opening where a human ear would be. Nothing else about him is inhuman — that is the point. He should read at a glance as a man, and at a second glance as unmistakably not one. He wears a light open-weave respirator across the lower face - worn loosely, plainly for comfort rather than survival - and a practical layered scout's overtunic in undyed desert cloth. He is holding a small handheld survey instrument and looking off past the camera at something far away, calm, measuring, patient. Absolutely no weapons of any kind, no rifle, no sidearm, no armour, no helmet. Cold clear high-altitude daylight, thin dry air, muted sand and bone palette, realistic and grounded rather than stylised, no readable text, signage, insignia lettering or written characters anywhere in frame. Portrait orientation.

**AIs & non-corporeal — abstract emblem, no face**

- **`jeeves.jpg`** — domestic-companion AI, Eden; kitchen-and-gossip competence.
  > Abstract emblematic image representing a domestic household artificial intelligence: a warm pool of low amber light resting on the scrubbed wooden surface of a quiet kitchen table at night, a folded cloth and a single clean cup set neatly beside it, everything tidied and ready for a morning that has not arrived yet. Soft ambient glow with no visible source, deep warm browns and honey tones against a dark room, domestic and calm and companionable. No human face, no figure, no hands, no machine, no robot, no screens, no displays, no consoles, no interface, no glyphs, no icons, no symbols, no numerals and no lettering of any script anywhere in frame. Portrait orientation.

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
  reference. The same photograph survives at `characters/bertram-ashcombe.jpg`.*

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

### 5. Missing lore illustrations (19 pages) — audited 2026-07-30

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

- **`planets/drithane.jpg`** — the crossing night is the planet's whole
  identity, and the custom of going dark to watch it is the human half of
  the frame. Slow sparks, not meteor streaks.

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

### 6. Images that should not stay — audited 2026-08-10

Open work 1 and 5 are the images that are **missing**. This is the other half:
images that **exist and shouldn't**. Prompted by Dermot noticing that Saint
Aoife "looks a bit too much like a dark shadow", which turned out to be the
visible corner of something larger.

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

#### Five images are doing nine jobs

Byte-identical files under different names (MD5-checked):

| Kept by | Also serving as |
|---|---|
| `characters/bertram-ashcombe.jpg` | `lore/planetary-liaisons-and-recruiters.jpg` |
| `characters/elvira.jpg` | `lore/planets/verdance.jpg` |
| `characters/brother-daire.jpg` | `lore/monasteries-of-mars.jpg` |
| `lore/star-rangers-command-hierarchy.jpg` | `lore/frontier-transformation-protocols.jpg` |
| `lore/post-eleven-dimensional-manifold.jpg` | `lore/threnos-omega.jpg` |

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
  — byte-identical. Which page keeps it is Dermot's call; the other needs a
  prompt. **Not written yet: neither file has been opened.**

- **`threnos-omega.jpg`** / **`post-eleven-dimensional-manifold.jpg`** — same
  situation, same reason. **Not written yet.**

#### Convention breaches, separately

- `lore/saltmere-mooring-gantry-1.jpg` and `-2.jpg` are **2560×1920** at
  ~420 KB each, against a ~1600px long-edge convention.
- `lore/moorhen-wetland.jpg` is 1557×2133 — 2133 on the long edge.
- `characters/aldera/field-photo-*` run 557–700 KB.
- Twenty hero images are 1920px. Enough of them that this may be an accepted
  deviation rather than drift, but it is not what the Conventions table says.
  Worth either fixing or amending the table; the table currently reads as
  though it were enforced.

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
