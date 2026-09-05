# Narrative Gaps Checklist

What's actually written versus what the story bible and site copy have committed to. **Re-derived from `src/seasons/` on 2026-08-10**, per this file's own standing instruction not to trust it once stale — the previous derivation was 2026-07-14 with patches through 07-29, and by August it was describing a different book.

**44 chapter files exist across nine seasons and five storyline threads.**

---

## What the re-derivation changed

The old list was organised as *the Tissadelle arc, plus some reserved slots*. That is no longer what the work is. Three of its structural claims were false against disk:

| It said | Disk says |
|---|---|
| **Season 2** — "intentionally unwritten… not a gap to fill by default" | **Ten chapters**, six episodes. The second-most-written thread in the book. |
| **Season 4** — "intentionally unwritten, same as Season 2" | **One chapter** — *Docked Twice*. |
| *(Season 8 not mentioned at all)* | **Exists** — *The Night Office*, its own thread. |

None of this is a contradiction, and nothing was written that shouldn't have been. Seasons 2 and 4 were *reserved* for storylines that don't run through Tissadelle — and those storylines have since been written, which is the reservation being honoured rather than broken. The checklist simply never noticed, because it was watching one thread and filing the other four as absence.

**The lesson for the next re-derivation:** count threads, not seasons. A season reading "empty" in a Tissadelle-shaped list may be full.

---

## By thread

Per `lib/storyline-threads.js`. Each is a self-contained narrative with its own cast.

| Thread | Seasons | Chapters | State |
|---|---|---|---|
| **Founding Era** | 0 | 6 | **Complete** — 2712 departure through the 2723 signing |
| **Tissadelle Shepherd's Arc** | 1, 3, 5, 6, 7 | 27 | The spine. Ends written; middle thin |
| **Undercover Pets** | 2 | 9 | Substantial and unlisted until now |
| **Orbital Five-O** | 4 | 1 | **A thread on one chapter** |
| **Church Space** | 8 | 1 | **A thread on one chapter** |

---

## The actual gaps, in order of how much they cost

### 1. Two threads are one chapter each

**Orbital Five-O** (S4, *Docked Twice*) and **Church Space** (S8, *The Night Office*) each have a single chapter carrying an entire named thread. Both are advertised on the site as threads in their own right, and a reader following either arrives at the end almost immediately.

Church Space additionally has a **deployment** built around it — the church-space.site/.online domains filter to that thread, with their own comments repo. A domain whose whole reason for existing is one chapter is the sharpest instance of this on the site.

*This is the largest gap in the book and the old checklist could not see it, because both seasons were filed as deliberately blank.*

### 2. Season 3 is two chapters for a whole rank-era

Carried over from the previous derivation, still true. *Filed Under Noise* and *Independent Verification* stand in for Principal → Section Lead → Chief Ranger. The season intro promises "two years into her service… an archive backlog nobody else wanted"; two chapters cover it.

- [ ] The Sentinel–Meridian connection: Sohrel has now declined to raise it four times without stating a reason on the record. Either a fifth declination that finally costs her something, or the raising.

### 3. Season 5 opens at E01

- [x] **E01C01 — *Refusal to Certify*** (added since the last derivation; the old list said S5 E00/E01 were "skipped entirely"). Shepherd's first dispute in rank, solved by empathy where six weeks of confidence had failed.
- [x] E02C01–C03 — *What the Hill Keeps*, *A Fraction of a Second*, *What Came Off the Ship* (the Last Stand).
- [ ] **E00** — still absent. The only season that opens without one.

### 4. Standing waypoints, still unpaid

From `story-bible-summary.md`'s "Established future-canon waypoints" — hooks that exist in character entries and have never landed in prose:

- [ ] **Karla Wender: Chief Pilot → High Captain.** A progression asserted on her page and dramatised nowhere.
- [ ] **The Tissadelle/Wender relationship**, developing "across early seasons" per her character entry — but the early seasons are written and it isn't in them.
- [ ] **Founding-era open questions:** fold terminus contact, other fold routes, whether Threshold's drift is Eden-class phenomena.

### 5. Season 1 has a chapter the old list never counted

- [x] **E00C00 — *Below the Bells***. The old entry read "E00 (3 ch)"; there are four. Prequel backstory now runs c00–c03.

---

## Complete, and deliberately so

Recorded here so a later pass doesn't reopen them.

- **Founding Era** — fully dramatised, 2712 to 2723. Nothing outstanding.
- **The Last Stand** — written as `s05e02c03`, in Season 5 rather than at the S5/S6 seam. Seen from five viewpoints, **none of which can name what they saw**; the record still fails to close, and now the reader knows what it is failing to close over.
- **Seasons 6–7** — ratified canon as of 2026-07-25. Strand A in `s06e01c02`, Strand B in `s06e01c01`/`c03`, the strands meeting in `s07e01c03` — later than the treatment outlined, noted rather than "fixed", because the arc reads as written. `tissadelle-arc-s6-7.md` is background reasoning now, not a specification the chapters must match; where they differ, the chapters won.
- **"Who gets to name the truth" stays live**, not settled: `s07e01c03` holds the Council's citation, the Codex's account and what Wender privately knows permanently unreconciled — true for the reader, contested in-universe.
- **The arc's cosmological endgame** — the protouniverse's "Saint Aoife" is a Telearch avatar. In `tissadelle-arc-s6-7.md`, spoiler-safe, deliberately not in public lore.

---

*Cross-reference: `story-bible-summary.md` (Narrative Structure, per-season breakdowns), `tissadelle-arc-s6-7.md` (full S6–7 treatment), and `lib/storyline-threads.js` (the thread definitions this list is now organised by).*
