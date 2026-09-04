# Orbital Five-O, second season — the alien strand

Unpublished planning note, the shape of a season before any of it is drafted.
Dermot's ruling, 4 September 2026, on the three shapes put to him for *"at
least one thread or strand featuring a set of alien protagonists"*: **"an
alien strand in the next Five-O season."** This is the treatment that ruling
asks for: what is already fixed, what the two strands are, where they meet,
and the choices still his. Nothing here is prose and nothing here is canon
until a chapter carries it.

Open questions raised here are indexed in `open-questions.md`, per the
standing convention.

---

## Direction check

Run per `decision-making.md` before anything was written.

- **Extension of the 3 September fifth direction**, not a turn from it. That
  direction put "aliens, perhaps in a specific edition" with the general
  reader, and its confirmed reading was that this is *not* a rule that aliens
  are general-tier only. A strand in Five-O puts an alien ensemble on the
  young-adult tier, which the reading allows — with one consequence the
  life-stage rule supplies: **a character's weight in a tier follows their age
  in that tier's years**, so the ensemble carrying a young-adult strand is
  young in its own species' terms. That is a constraint on casting, not a
  problem, and it is one of the better things about the ruling: a first
  posting is a first posting in any biology.
- **Composes with the 3 September third direction** (the Five-O thread gains a
  young viewpoint, a raw Deputy or trainee, added by new chapters). The human
  strand of this season is that Deputy's; the two rulings were made for each
  other without either saying so.
- **Closes one door the fourth direction left open.** The younger Shepherd may
  guest in Five-O only in 2826, her cadet year on Eden. Season 4 sits at 2827
  Autumn and this season follows it, so **no Shepherd guest here** unless the
  season is deliberately set earlier than its predecessor, which the thread's
  chronological order rules out. Wender's window (pre-2810) is further off
  still. Recorded so nobody reaches for the guest without noticing the year.
- **Leaves the alien edition where it was.** An edition needs a domain and a
  face; a strand needs neither. The prose this season produces is what the
  edition's "wait" was waiting for, and the edition decision is unchanged.

## What is already fixed

| Fact | Source |
|---|---|
| The thread is `orbital-five-o`; it owns Season 4, one chapter (*Docked Twice*, 2827 UCSD Autumn, Compact Administration and Eden's Dock Ring) | `lib/storyline-threads.js`, `src/seasons/s04/e01/s04e01c01.md` |
| The next free season number is **10** (0–9 claimed) — registered as `seasons: [4, 10]` on the thread when the first chapter exists, not before; engine work, first tier | registry; the 5 August "create additional seasons as needed" direction |
| Seasons within a thread run chronologically, so this season's `timestamp` is later than 2827 Autumn | `story-bible-summary.md`, chronology |
| Setting: the five self-governing habitats around Earth under the Orbital Habitats Compact; Five-O's authority runs across all five "and not one metre further" | `src/lore/orbital-habitats-compact.md`, Alala's page |
| Cast standing: Commander Kai Larsen; Governor Petra Voss; Chief Commissioner Dorian Calloway; Alala, Field Observer (Aerial); Eden's civil bureau under Superintendent Oyelaran as the desk beneath Five-O's notice | the character pages |
| The young-adult block band: 500–800 words, ceiling ~900, the register *Docked Twice* already writes in | `story-bible-summary.md`, POV-block length table |
| A strand's five rules: no shared scenes, no shared POV cast, each satisfying alone, a shared thematic throughline, convergence decided before either is drafted | `story-bible-summary.md`, "What makes two strands independent" |
| Federation first contact is decades after 2723; by 2827 Federation species serve in the Rangers and share facilities in the Solar System | `alien-contact-constraints.md`, `src/lore/chthonari.md` |
| Trope default: refuse the well-known shape unless canon needs it; hard SF by default; unsettling never horror; no generic honorifics; a species may carry its own pronoun system, declared once | `CLAUDE.md` |

## The season in one line

Two crews read the same structure and cannot see each other's reading — a
task force that reads ledgers, and an ensemble that hears the thing itself —
until a raw Deputy carries one account into the other room.

## Strand A — the task force (human)

**Viewpoint:** the young Deputy of the third direction, on their first Five-O
case, with Larsen, Alala and Calloway as the people who have seen it before.
The Deputy is the young-adult reader's body in the room, the way the pets are
the child's; the strand is theirs to be new in. Who they are — name, age,
species, whose Deputy (Zoe Smith's on secondment, or Larsen's inside the task
force) — is still open (3 September) and a character page is draft-and-stop.

**The case:** his to author. What the treatment can say is its shape, which
*Docked Twice* set — a discrepancy that every ledger gets right and something
between the ledgers gets wrong — and that this season's discrepancy should be
one that lives in the **structure** of a habitat rather than in its
paperwork, so that Strand B has something to hear. A drone that berths twice
was a certification record attached to the wrong thing; the natural sequel
is a habitat that reports itself sound and is not, on a scale that no
inspection cycle reads.

**What Strand A cannot do:** meet the ensemble before the convergence, or be
told what they know. Its blocks are complete without Strand B; a reader who
follows only the task force gets a whole case.

## Strand B — the ensemble (alien)

**RULED 4 September 2026 — "option 1": a Chthonari crew.** The three shapes
are kept below as the record of the choice. How the crew thinks — what the
canon already forces about a Chthonari mind, what a young one has not yet
got, the traps the tone and trope rules close — is in `mind-design.md`,
drafted the same day so the crew arrives with a way of thinking before the
first block. Still his: the crew's size and names, whether the species
carries a pronoun system of its own, the convergence, the year.

### 1. A Chthonari crew — recommended, and ruled

**Why they fit.** The Chthonari are the one Federation people the record
already places in the Solar System's working spaces: disproportionately in
the Rangers' Engineering Corps, on fold-scaffold construction and
maintenance, and "interact easily with other Federation species in shared
facilities." A crew contracted to a habitat's structural work, or to a
Lagrange fold scaffold serving the Compact, needs no new contact history and
no new institution. Their body is **already committed** — six-limbed, low,
exoskeletal, substrate-hearing, the vessik Thrum being the same principle in
an animal — so the biology is on the page before the first block, and the
biology generates the strand: they hear structure-borne vibration and are
deaf to airborne sound, blind to a human face, unable to be charmed and
unable to read a ledger the way a human does. A habitat that reports itself
sound and is not is a thing a Chthonari crew would hear *first*, and would
have no standing to report.

**Why an ensemble, and why young.** "Excavation is composition"; a crew cuts
together and reads the Undersong together; a set of protagonists is the
natural unit. Under the life-stage rule the crew is an **apprentice crew on
its first off-Belt posting**, which gives the strand the same first-posting
spine as the Deputy's and a species-specific ache the record already names:
"the one persistent, low-grade loneliness" of serving where the Undersong
does not translate. The young-adult tier's theme, mirrored across a biology
that makes it literal.

**What the strand is not.** Not a hive, not a swarm, not one mind in six
bodies — the charter's insistence that service be individual applies to
Chthonari "exactly as it applies to every other recruit," and a crew argues.
Not engineer-savants either: they are good at one thing the way a raven is,
and the one thing is not the thing the case needs until it is. Not
translators of themselves; the Undersong "does not translate," and the
strand should let that stand rather than explain it away.

**Costs.** Nothing has been written from a Chthonari viewpoint; the species'
*mind* is undescribed where its body is settled. A subtractive tradition —
"decide what the rock will still be doing when the cutting stops, and remove
everything that is not that" — is the seed of a way of thinking, and a
mind-design note (open since the fourth message of 4 September) would do for
the head what `species-design.md` did for the body. Pronouns: the species
page uses none the record has declared; whether the Chthonari carry a system
of their own is a vocabulary decision (7 August rule) to make once, before
the first block.

### 2. A Mnemari delegation

Treaty-witnesses and archivists across the Federation; a delegation at the
Compact on some standing business is plausible without new history. The mind
is the interest — a witness who cannot forget, in a case about records — and
"young" is meaningful for a people whose custom turns institutions over on a
schedule biology does not impose. **Costs:** humanoid, so the body does less
work; the strand tends toward a hearing-room, which is Strand A's register
already; and a memory that never decays is a shape the trope default watches
closely (the infallible witness).

### 3. A Prismeri visit

The strongest body on the page and the worst fit for the place: on a
standard-gravity station a Prismeri "can neither fly nor hang" and spends the
posting on four knuckles. A whole strand of that is a strand about
discomfort. Listed, not offered — unless the season is set at a low-gravity
facility, which would be a setting decision with its own costs.

**Not offered at all:** the Krenyi, the "only other humanoids," whose
long-lived, past-averse cast is the general and contemplative tiers' ground
by the life-stage rule; and any species not yet given a body, which would
mean designing a people to fit a plot.

## The convergence

Decided before either strand is drafted, by the rule. Three shapes:

1. **Two readings of one structure.** The task force's ledgers and the crew's
   ears describe the same habitat and disagree; they meet when the Deputy —
   the one person junior enough to be sent to fetch a contractor's log —
   lays one account beside the other and names what the two have in common.
   The corpus's throughline (*precise naming is what defeats ambiguity*)
   carried into a case, and the reason the viewpoint is the Deputy's.
   **Recommended.**
2. **A jurisdiction meeting.** A Federation crew working Compact structure is
   under whose authority when something is wrong with the structure? Five-O's
   charter stops at the five habitats; the crew's standing is the
   Federation's; the fold scaffold is the Rangers'. The strands meet at the
   wall, which is the thread's founding subject. Institutional, and the
   thread is an institutional thread — but it risks the ensemble arriving as
   a *problem* for the task force rather than as people.
3. **Both, in that order:** the readings meet first, and the meeting raises
   the jurisdiction question the season then answers. The fullest shape and
   the longest season.

Whichever it is, the convergence merges information, not the cast: the crew
does not join Five-O, and Five-O does not learn to hear.

## What stays open — his

- ~~**The species** (Chthonari recommended)~~ — **ruled 4 September 2026:
  the Chthonari.** Still open from it: whether they carry a pronoun system of
  their own (shapes in `mind-design.md`).
- **The crew:** how many, their names, which of them carries which block.
  Character pages are draft-and-stop; the young-adult register wants no more
  than three or four voices.
- **The Deputy** (3 September, still open): who, and whose.
- **The convergence shape**, and the case behind it.
- ~~**The mind-design note:** whether it is wanted before drafting, as
  `species-design.md` was before the Prismeri body.~~ — drafted the same day
  as `mind-design.md`, to keep or drop; two physical costs in it are open.
- **The year:** any time after 2827 Autumn; the Deputy's age and the crew's
  are fixed by it.

## What happens when these are ruled

Season 10 is registered on the thread; `npm run new -- chapter` scaffolds the
first chapter with its `comment_id`; the season carries the two strands in
the established structure (`::::: scene` wrappers, `::: pov` blocks, no shared
scenes); every chapter reports what it commits the story to; and the Reading
Tiers page needs no change, since the thread already sits on the young-adult
tier and the general and contemplative tiers inherit it.
