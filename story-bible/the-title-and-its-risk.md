# The title, and the one risk still open

**Status: open decision, not settled canon.** The retitle itself is done and
public — see `src/journal/the-name-was-never-mine.md` for the account a reader
gets. This file holds what is *not* public: the risk that survived the rename,
the test that decides it, and the fallback if the test goes badly.

---

## Settled

The work is **Drithane**. From the Irish *drithle* — a spark, a glimmer — and it
happens to look like *drift*, which was not planned and is being kept.

It means **nothing in-story**. No character says it, it is not in the glossary,
and it is not going in. A title that stays outside the story gets to be about all
of it; defining *Drithane* in-world would narrow it to one thing.

The **Star Rangers keep their name** as the in-universe corps. The collision was
on a title; an organisation inside a story is not one, and every substitute
tested was equally occupied.

---

## Open: the Dithane collision

**Found 1 August 2026, the day after the rename.**

Google currently **silently corrects** a search for *Drithane* to **Dithane** — a
mancozeb fungicide brand from UPL and Corteva, EPA-registered, sold globally for
over fifty years. It is **one character away**: delete the `r`.

**Found 2 August 2026: a second edit-distance-1 neighbour.** **Drythane**
(`i`→`y`) is a live polyurethane waterproofing brand — a 100%-solids coating
system from Amchem Products, with both drythane.com and drythane.in active. So
the title sits one edit from two chemical-industry brands on opposite sides,
and the reason is structural: **"-thane" is the polyurethane/alkane chemical
suffix** (methane, ethane, urethane, Dithane, Drythane). Any name keeping that
tail stays in the neighbourhood. A replacement, if one is ever needed, must
change the *ending*, not the front of the word.

**Why it is probably temporary.** Search engines correct to a high-frequency term
when the queried string has near-zero index presence. Drithane had none: the site
went live under the name that day. Statistically, at that moment, it *was* a typo
for Dithane. As the word accumulates genuine occurrences — the site, the journal
entry, the repo, the changelog — engines normally stop correcting and switch to
*showing results for Drithane, did you mean Dithane?*

**Why it might not be.** An edit-distance-1 neighbour of a high-volume commercial
term imposes a permanent tax. Some proportion of searchers get diverted or
mistype, and that never fully goes away.

### The test, and the date

**Re-test around mid-September 2026.** The distinction is sharp and worth holding
to exactly:

| Result | Meaning |
| --- | --- |
| **Silent correction** — results for Dithane, Drithane not offered | Real problem. Worth renaming. |
| **Suggestion** — results for Drithane, *did you mean Dithane?* | Fine. Keep the name. |

Also check **Search Console → Performance → Queries** for `drithane` impressions.
That is an earlier and better signal than eyeballing a search box.

### If the test goes badly

**Fallback vetting done 2–3 August 2026** (exact-phrase search per candidate,
plus near-homograph checks — the two lessons below, actually applied this
time). Results, so none of it is re-walked:

- **The Irish first: *drithleán* is not attested.** The forms the dictionaries
  actually give for *drithle* are the diminutives **drithleog** and
  **drithlín**, and the plural *drithleanna*. An earlier version of this note
  proposed *drithleán* as "the Irish diminutive"; treat any use of *Drithlean*
  as a coinage in the style of one, not a real word.
- **Drithlean** — viable but weakened. The exact string is unoccupied (only
  Gaelic dictionary hits), it exits the -thane tail, and it is 4 edits from
  Dithane and 4 from Drythane (the "three edits" a previous version of this
  note claimed was an undercount). But its h-dropped neighbourhood has
  distance-2 clutter — *Drilean* (a small Brazilian leather-goods brand on
  Instagram) and *Dritlein* (an NFL player's surname). Neither is a
  high-volume term with autocorrect gravity, so this fails no test the note
  sets; it is just muddier than it first looked, and the Irish behind it is
  invented.
- **Drithleog** — dead. *An Drithleog* ("The Spark") was a republican prison
  newsletter (Derry Jail 1943, revived in the 1970s USA), and it is an ability
  name in the game *Another Eden*. Same class of hit that killed Caldreth and
  Eirath.
- **Overfold** (added 3 August 2026) — a different kind of candidate: not
  a coinage but a real dictionary word (OED 1883, geology — an overturned
  fold, strata forced past 90° so younger rock lies beneath older; after
  German *Überfaltung*), and already a canon glossary term (the
  Fellowship's contemplative name for boundary-zone Etheric phenomena).
  Scoring against the three gates: exact match *not* empty but occupied
  only by vocabulary — no work, brand or product holds it, the softest
  failure of any candidate vetted; edit distance — **watch *overload***,
  2 edits away and high-volume, mitigated by "overfold" being a real
  indexed word (engines suggest rather than silently correct dictionary
  words), but an early "did you mean overload" tax is plausible; **radio
  test — passes cleanly, the only candidate on this shelf that does.**
  One obvious spelling, recoverable from sound. The geology collision is
  resonant rather than embarrassing — layers pressed over layers — and
  reads as deliberate scientific loan-vocabulary, like "membrane".
  Placement: **title tier, not umbrella.** In-world the Overfold is one
  tradition's term for one phenomenon, so "the Overfold universe" would
  name the continuity after the Fellowship's lens on boundaries —
  narrower than GEM, which names everything. As a *title* it is resonant
  rather than definitional (folds run through the cosmology from transit
  to Metafold to *Protectors of the Fold*), which is the side of the
  title-stays-outside-the-story line the settled exceptions live on. It
  does breach the strict form of that rule — it is a defined in-story
  term — so adopting it would be a knowing exception, not an oversight.
- **Drithlin** — **strongest coinage.** Attested Irish (*drithlín* — a
  tingle, a thrill of joy: still on-theme), 4 edits from Dithane and 4 from
  Drythane, ends in "-lin" rather than "-thane". Exact-phrase search returns
  only Irish dictionary entries, and the h-dropped neighbour *dritlean/dritlin*
  is also unoccupied — the nearest entities are bare "Drit" (a tablet, an FMEA
  software product, a music act), all shorter strings with no pull on an
  8-letter query. The only nearby chemical is Dithranol (a psoriasis drug) at
  a comfortable distance. Passes both the exact-match test and the
  near-homograph test that Drithane itself failed.

Do not rename twice on a pre-indexing result. The journal entry, the 1.11.0
release, the tags and any domain would all have to move. This vetting sharpens
the fallback; the September test still decides whether a fallback is needed.

### The naming tiers, and the umbrella (3 August 2026)

Three tiers, three different rules — keeping them distinct is what this
week's vetting kept converging on:

- **Title of the work** — out-of-story word, strict vetting regime below.
  *Drithane*, pending the September test. If a replacement single word is
  ever hunted, it must pass **three gates**, not one: empty exact match;
  edit distance ≥2 (ideally 3) from any high-volume term; and the **radio
  test** — the spelling must be recoverable from sound alone. Drithane
  fails the third quietly: *Drithane* and *Drythane* are homophones, so a
  spoken recommendation can land a typed search on the waterproofing brand
  with no autocorrect involved. A clean single word beats everything; a
  clean multi-word phrase beats a compromised single word, and passes the
  radio test almost automatically.
- **Setting umbrella** — the Cosmere-style name for the whole continuity.
  **Adopted 3 August 2026: Grand Ensemble Multiverse**, in exactly that
  canon form (the lore page's own title), is the working umbrella —
  **explicitly interim, until a shorter word or phrase is found** that
  passes the three gates above. The "title stays outside the story" rule
  does not bind here — an umbrella naming the cosmology in-world is the
  established pattern — and the full phrase is unowned; its neighbours
  (grand canonical ensemble, Tegmark's ensemble multiverse) read as
  intended hard-SF register, not confusion. Do not coin variants ("Grand
  Ensemble Universe"): one canon form. Its known cost, accepted at
  adoption: it names the stage, not the corps — and the work is as much
  about the Star Rangers. Candidates to shorten to, when the time comes:
  the title itself ("the Drithane universe") if it survives September, or
  a new find.
  **On the shelf for that succession (recorded 3 August 2026):
  Fianilchruinne** — *fian* (the warrior-band, the Fianna) + *ilchruinne*
  (the real modern Irish word for multiverse): literally "the multiverse
  Fianna", i.e. Rangers of the Grand Ensemble Multiverse compressed into
  one Irish word. The only candidate of the August vetting that unites
  corps and stage in a single term, repairing GEM's stage-not-corps cost,
  and shorter than GEM as the interim decision asked. Scoring: exact
  match empty (nothing anywhere; nearest neighbours are the Fianna
  themselves); no high-volume edit-distance neighbour, so no autocorrect
  predator — once indexed, an exact search is a fortress; **radio test —
  hardest fail of any candidate vetted**, thirteen letters of Irish
  orthography no anglophone can spell from sound, survivable only at
  this tier because an umbrella is navigated by link and branding rather
  than by ear, with *Drithane* as the radio-friendly front door covering
  for it. Spelling is settled as **Fianilchruinne** (double n — *cruinne*
  is the Irish; the single-n form first proposed was a misspelling).
  **Irish verified 3 August 2026** (via dictionary content in search
  snippets; teanglann.ie and tearma.ie are blocked from the session
  environment): *cruinne* ✓ (f., double n, "universe/globe", from
  *cruinn* "round"); *il-* + lenition → *ilchruinne* ✓ well-formed and
  genuinely attested as Irish for "multiverse"; the vowel-initial
  junction needs no mutation, so a hyphen (*Fian-ilchruinne*) is
  optional clarity, not a requirement. Two open points, both judgement
  rather than error: (1) the **modern** headword is *fiann* (f., gs.
  *féinne*, pl. *fianna*) — *fían* is the Old Irish spelling, so
  "Fianilchruinne" pairs an archaic first element with a modern second.
  Keeping it is a defensible deliberate archaism (the Fianna are the
  oldest thing in the word); the fully modern *Fiannilchruinne* is
  correct but uglier at the *-nnil-* seam; the idiomatic escape is the
  genitive phrase *Fiann na hIlchruinne*, real syntax but three words
  again. (2) **resolved by Dermot's direct check, 3 August 2026**:
  *ilchruinne* IS recognized on téarma.ie — the "superseded" reading
  came from a search snippet and the direct check overrides it.
  *Fian-ilchruinne* is not in the database, which is the correct state
  for a coinage: a compound the terminology database already held would
  be a word someone else owns. Unrecognized-but-well-formed is the
  target. So the base is current standard Irish, the compound is
  unique, and the only remaining choice is (1) above — archaic *fian-*
  versus modern *fiann-*. Let it sit — a name this committed deserves a
  deliberate yes, not a same-day one. Not adopted; GEM remains the
  working umbrella. A corps-flavoured umbrella ("Star Rangers Universe") stays
  off the table — the corps keeps its name inside the fiction, and an
  umbrella is front-of-house, so that would quietly reverse the
  2026-08-01 retitle. Ranger emphasis belongs one tier down, in the
  tagline: *The Edges Hold* is already the corps' phrase, and **Rangers
  of the Grand Ensemble Multiverse** is vetted available as a subtitle
  (collision-free by inheritance from GEM; unites corps and stage;
  Golden-Age-serial register, warmer than the house voice — a deliberate
  choice if used; too long to be the spoken handle, which stays the
  title).
  **Scope of the adoption (revised later on 3 August 2026 — supersedes
  the planning-tier-only reading briefly recorded here):** GEM is now
  front-of-house by default. `SITE_TITLE`'s repo default is **"Grand
  Ensemble Multiverse"** (the browser-tab brand) and the default meta
  description reads "…an interactive science-fantasy novel *of the Grand
  Ensemble Multiverse*…" (`src/_data/site.js`). `SITE_NAME` — the header
  and footer brand — stays **"Drithane"**: the header carries the work's
  title, the tab carries the setting. Clones still override both via
  `deploy.conf`/`lib/editions.js`, so branded editions are unaffected
  unless they inherit the default.
- **Tagline/descriptor** — three-word out-of-story phrases, cheap to vet
  (one exact-phrase search; no autocorrect gravity at three words).
  Vetted available 3 August 2026: *Sparks Between Worlds* (unowned; busy
  generic-fantasy neighbourhood), *The Edges Hold* (unowned; one indie
  album permutation-neighbour, *Hold the Edges*), *Chorus of Worlds*
  (one art print). None adopted; recorded so they aren't re-vetted.

### Domain, deliberately deferred

No `drithane` domain has been bought, and that is a decision rather than an
oversight: owning it would bias the September test toward keeping the name.
`sciencefiction.site` is canonical, live, and sufficient meanwhile.

If the name survives, the case for **drithane.com** is strong — not as a mirror
or a redirect, but as the eventual replacement for `sciencefiction.site` in the
*default* edition, which `lib/editions.js` already labels "Drithane (unbranded
full site)". The branded editions — StarQuest, Church Space, Fellowship of Light,
Undercover Pets — are correctly named for their framings and need nothing.

---

## The vetting lesson, for whoever names the next thing

First, the scope of the regime below: **it applies to titles, domains and
front-of-house branding — not to in-universe vocabulary.** The note already
draws this line for Star Rangers ("the collision was on a title; an
organisation inside a story is not one"), and a sweep on 3 August 2026
confirmed it generalises: *Levril* is an Italian intimate-hygiene product
line (Horus Salus) and, separately, a character in an unrelated Fandom
fiction — "The Fellowship of the Light of Christ" wiki — whose universe also
independently contains a *Frenar*; *frenat* is the everyday Catalan word for
"braked" plus an Aragonese water company; *Kieme* is the ordinary German noun
for "gill". None of that matters, and chasing term-level uniqueness would be
chasing the unattainable — every pronounceable coinage is a word somewhere or
a small brand somewhere else (the invented-name graveyard below proved the
same thing from the other side). A title is the front door and gets searched
bare, so it needs edit-distance safety from high-volume terms. A term is met
and searched in context, where a foreign gel or a fish organ is no
competition. The term-level bar is only: no *high-volume or embarrassing*
homograph, no trademark exposure, and instant disambiguation in context.

For the title tier, two failures, both worth avoiding deliberately.

**Search each candidate individually, as an exact phrase.** A combined `"A" OR
"B"` query reports on the loudest member of the set and hides the rest. Two names
were cleared this way and both were already taken — *Slipwave* (a game, a surf
brand, a seismology term) and *Worldwrights* (a novel by Max Grant, an AI
tabletop-tools company, a podcast).

**Test for near-homographs, not just exact matches.** This is the failure that
produced the Dithane problem. Checking "does another work hold this name" and "is
the exact string unique" is not enough — a name one edit from a high-volume
commercial term gets autocorrected away regardless of how unique it is. The
warning was visible and misread: searches for *Drithane* returned Drimane,
Dristan, Drano and Draethen, and a dense phonetic neighbourhood was taken as
evidence of cleanliness rather than of risk.

**The graveyard**, so it is not re-walked: *Cosmic Drift* (music acts),
*Five Layers* (collision-free but buried under the OSI model, software
architecture, skin anatomy and yoga), *Star Wardens* (a D&D subclass, a Warhammer
40,000 chapter, Jason McCuiston's *The Last Star Warden*), *Charter Wardens*
(municipal election officials, a New Jersey fishing charter), and the invented
*Caldreth*, *Eirath* and *Aveldrin*, all three already in World of Warcraft,
Final Fantasy XIV, Forgotten Realms and World Anvil.

Added 3 August 2026, from vetting the *drift-* direction as a Drithane
variant: ***Drifthane* / *Driftane* / *Driptane*** — the whole cluster is
dead. *Driftane* is an active e-liquids/e-cigarette brand (driftaneplaza.com)
and an ambient-music YouTube channel (@driftane); *Driptane* is a
pharmaceutical carried on multiple drug-information sites; *Drifthane* would
sit one edit from the first, two from the second, and still end in the
"-thane" chemical suffix that produced the Dithane and Drythane collisions in
the first place. The front of the word (*dri-*, *drif-*, *drit-*) is a dense
commercial and pharmaceutical phonetic cluster; the tail is a chemical suffix;
a workable variant keeps the *drithle* root and changes the tail.
