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

The direction that keeps the etymology and adds edit distance is the Irish
diminutive *drithleán* — anglicised **Drithlean**, three edits from Dithane
rather than one. **Verify the Irish before committing to it**, and search it
individually as an exact phrase.

Do not rename twice on a pre-indexing result. The journal entry, the 1.11.0
release, the tags and any domain would all have to move.

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

Two failures, both worth avoiding deliberately.

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
