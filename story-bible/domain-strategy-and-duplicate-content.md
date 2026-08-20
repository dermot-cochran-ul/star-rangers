# Domain strategy and the duplicate-content reports

**Status: DECIDED, 20 August 2026, in three passes.** Google Search Console warned about
shared or duplicate content across the sites. Dermot's direction that day:
**each tier family picks one site to rank**, there are **four families, one per
reading tier** (not the three accidental TLD groupings this file first
described), and **each independent deployment inside a family gets a slight
variation or specialisation** — ideally a different faction, with the four
Fellowship of Light domains fronting different **chapter houses**.

What is settled is the shape. What still needs him is named in *Still open* at
the end — chiefly the fourth chapter house, which does not exist in canon.

## First, the reassurance

**There is no duplicate content penalty.** Google acts on duplication only
where it is deceptive — scraped, spun, built to mislead. None of this is. The
Search Console report is a *coverage* report: it lists URLs that did not make
the index and why.

What it costs is not ranking but **choice**. Where two URLs carry the same
content, Google indexes one and drops the other. Everything below is about
picking the survivor ourselves.

## Reading the report

Four distinct statuses, and only two want anything from us. Check which wording
the report used before acting.

| Status | Meaning | Verdict |
|---|---|---|
| **Page with redirect** | A 301'd URL | Working as intended — ignore |
| **Alternate page with proper canonical tag** | Duplicate found, our canonical honoured | Working as intended — ignore |
| **Duplicate without user-selected canonical** | No canonical tag; Google guessed | Real gap |
| **Duplicate, Google chose different canonical than user** | We self-canonicalised and Google **overruled us** | Real, and what the families produce |

`CHANGELOG.md`'s 8 August 2026 entry records the third of these on
fianilchruinne.com, fixed with the force-HTTPS 301 in `src/static/.htaccess`.

## What is already correct and needs nothing

The **seven alias domains** in `lib/editions.js` share their target's document
root, so they serve HTML built with the *target's* `SITE_DOMAIN`. A page at
`star-rangers.space` already carries a canonical naming `sciencefiction.site`.
That is the anti-squatting pattern working, and the reasoning for keeping them
out of any `domains` array still holds.

## The governing principle

**A registration defends the name; a build has to earn its keep.** Adopted
20 August 2026, and it is what the rest of this file follows from. Several
domains were defensive registrations that had been promoted to full builds
without having anything of their own to serve — which is precisely how a
duplicate is manufactured out of an anti-squatting measure. Promote a TLD to a
build when it has a face of its own to show. Until then an alias already does
the job, and does it better: an alias *cannot* become a duplicate, because it
never had its own `SITE_DOMAIN` to self-canonicalise to.

## Families, and why there are five of them across four tiers

The first pass here said "four families, one per reading tier". That held for
three tiers and broke on the fourth, and the corrected definition is the useful
one:

- A **tier** is a *readership* — children → young adult → general →
  contemplative, from `story-bible-summary.md`'s audience-tier table.
- A **family** is a set of domains *serving the same pages*, which therefore has
  to consolidate on one ranking host.

They coincide wherever a tier has one brand. The contemplative tier has two
institutions in it, so it has two families.

| Family | Tier | Builds | Aliases | Ranks at |
|---|---|---|---|---|
| **children** | children | undercover-pets.com | — | itself |
| **young adult** | young adult | starquest.site | starquest.online | itself |
| **general** | general | sciencefiction.site | — | itself |
| **Fellowship of Light** | contemplative | fellowshipoflight .org/.site/.online/.space | — | **fellowshipoflight.org** |
| **Communion of the Called** | contemplative | church-space.site/.online | — | **church-space.site** |

`fianilchruinne.com` (with GitHub Pages) is not in a family. It holds everything
and self-canonicalises, unchanged.

### The split is by institution, not by TLD

That is the whole justification, and it is the test to apply if a third family
is ever proposed. `fellowshipoflight.org` and `church-space.site` are **two
orders that exist separately in the fiction**; `fellowshipoflight.org` and
`.site` are **two spellings of one name**. Consolidating the second is obvious.
Consolidating the first would be telling search engines that the Communion is a
copy of the Fellowship, which the record does not say.

The door is open for a third: the **Monasteries of Mars** are the tier's third
order in canon — currently one tagged page and no domain, and they have spent
four centuries declining affiliation, which is rather the point of them.

### What two families costs, and it is a real cost

Both families currently serve the **same 62 indexable pages**. So this
consolidates six competing domains down to **two, not to one**, and Google will
still choose between `fellowshipoflight.org` and `church-space.site` for those
pages.

The trade is brand independence for some consolidation. It is worth making —
the two institutions are genuinely distinct and the reader-facing case is
strong — but it is a trade rather than a free win, and it stops costing anything
only when the two families' content actually diverges. Which is, again, the
writing programme.

### The contemplative six

| Domain | Face | Canon status |
|---|---|---|
| **fellowshipoflight.org** | The Fellowship entire — **ranks** | — |
| fellowshipoflight.site | The Eden chapter house | **Named in canon** |
| fellowshipoflight.online | The abbey on the tidal river | Canon, unnamed |
| fellowshipoflight.space | The house on the green hill | Canon, unnamed |
| **church-space.site** | The Communion of the Called — **ranks** | Canon |
| church-space.online | Cnoc na mBeach | Canon |

`.org` ranks its family because it is the strongest TLD for a contemplative
order, and *Fellowship of Light* is a name out of the fiction where *church
space* is a generic phrase competing in search with room hire. `church-space.site`
ranks its own on the same logic applied within its pair — the `.site` over the
`.online`, older and stronger.

**Why three houses and not four.** The instruction was four chapter houses for
four domains. Canon supplies three — the Eden chapter house (named), Brother
Daire's abbey on a tidal river (unnamed), Asteria's house on a green hill
(unnamed) — and there is no fourth. Putting the **whole Fellowship** on the
ranking domain and the three real houses on the three siblings needs no fourth
to be invented, and it satisfies the ranking invariant by construction, since
the entry that ranks is the one carrying the family's widest filter. Two
constraints resolving each other rather than fighting.

One trap worth keeping written down: **Cnoc na mBeach cannot be the fourth
house.** Its own entry says it is "not a monastery in any sense the Fellowship
of Light or the Monasteries of Mars would recognize as their own." It belongs to
the Communion of the Called — which is exactly why it is the second face of
*that* family rather than a fifth face of the Fellowship's.

**Houses 2 and 3 are fronted by description, not name.** Both are canon and
neither has one. The descriptions are better than a proper noun would be, cost
nothing, and assert nothing; naming is a one-way door that pulls in a corpus
sweep and a migration-map row, and belongs to a scene that needs the name spoken
aloud rather than to a domain that wants a title.

**starquest.online was demoted from a build to an alias.** It had a build and
nothing of its own to put in it: the orbital-five-o thread is *one* task force
(the Governor's Investigative Task Force) and Season 4 is *one* chapter, so
there was no second face to give it. A faction split there would have been
invented rather than found — unlike the chapter houses, which are a real
in-world structure. That returns the young-adult tier to a family of one, so it
needs no `ranksAt` at all.

## What a specialisation can and cannot be

**Framing only, and that is a property of the filter rather than a lack of
ambition.** `lib/content-filter.js` **unions** characters, topics and threads —
a page is in if it matches *any* of them — so a tag cannot subdivide a thread.
Measured 20 August:

| Filter on church-space.site | Indexable |
|---|---|
| `threads: [church-space]` | 62 |
| `threads: [church-space]` + `topics: [communion-of-the-called]` | **62** — a topic cannot narrow |
| `topics: [communion-of-the-called]` alone | **46** — the bare shell; Season 8 and the private opt-in gone |

So each domain's face is its name, title, tagline, palette and audio, and that
is where this correction bites: an **earlier draft of this file claimed the
church-space pair could be "filled for real today" because the Communion and
Cnoc na mBeach carry their own tags. They do, and it changes nothing** — those
pages are already inside the thread. Nothing in the tier can be content-narrowed
without gutting it.

`heroCharacterIds` is nearly as constrained: a contemplative build renders
exactly **one** character page as real content (Brother Fintan), so only
church-space.online can set a meaningful hero cast.

Framing is enough to give a reader arriving at church-space.online a hermitage
rather than a generic contemplative site. It is *not* enough to make the page a
crawler sees any less of a duplicate — which is why `ranksAt` exists and why all
six point at one host.

**So "four chapter houses" is a writing programme, not a configuration change.**
The sequence: consolidate ranking and framing now (done); let each house
accumulate pages of its own; then narrow that entry and relax its canonical,
one domain at a time. The config is ready for it either way.

## The mechanism, implemented

`ranksAt` on an edition names the host in its family that carries the ranking
signal. Empty (the default) means self-canonical, which is right for a family
of one.

It names a **host, not a page**: any build whose `SITE_DOMAIN` differs emits a
cross-domain canonical at the same path, and the named host compares equal and
keeps its self-canonical. One value per family, read correctly by every member —
which is what let the family split into six entries with no change to the
mechanism, exactly as the field was designed for.

Threaded registry → `resolve-edition.js` → `cpanel-deploy.sh` → `SITE_RANKS_AT`
→ `site.js` → `base.njk`. Two deliberate consequences:

- **A non-ranking domain drops its sitemap entries and its robots.txt Sitemap
  line.** Advertising URLs we have just told Google not to index is
  contradictory, and Google's guidance is to keep non-canonical URLs out of
  sitemaps.
- **`og:url` stays self-referential** and now diverges from `rel=canonical`.
  They answer different questions: the canonical tells a crawler which copy to
  index, `og:url` is what a reader hands a friend. Someone sharing a
  church-space page should be sharing a church-space link. Consolidating the
  search signal was the decision; rebranding the reader's own share was not.

### The invariant, and it is load-bearing

**The ranking domain must include every page its siblings include.** A
cross-domain canonical pointing at a URL the target renders as a `noindex`
placeholder would send Google to a dead end and lose the content altogether.
**Narrow the siblings, never the one that ranks.**

Both halves are now enforced in `validateEditions`, which fails the build on a
`ranksAt` naming a host no edition claims (a typo, or an entry deleted out from
under it — every page would canonical to a host nothing builds, while the deploy
logged success), and on a ranking domain whose filters are not a superset of a
sibling's.

Verified on built output as well as asserted — all **62** indexable pages on
`fellowshipoflight.site` canonical to `fellowshipoflight.org`, and all 62 targets
are indexable there. 0 violations. (45 further canonicals on that build are the
`/c/…/` citation-alias stubs from `chapter-aliases.njk`, which hand-write their
own head and stay host-relative. They are `noindex`, and their canonical chains
through the sibling's real page to the ranking domain, so they are correct as
they stand.)

## Still open — Dermot's call

Of the four questions open at the start, three were settled in the second pass
(the fourth house dissolves into "the ranking domain carries the whole"; houses
2 and 3 stay unnamed and descriptive; starquest.online becomes an alias) and the
fourth in the third (contemplative is two families, split by institution). One
remains:

1. **Whether framing-only specialisation justifies six contemplative builds.**
   By the principle at the top of this file, a build earns its keep by having a
   face of its own — all six now do. A stricter reading of the same rule would
   say a face is not *content*, and demote the three unnamed-house domains to
   aliases until they have pages. Both readings are honest; this file has taken
   the looser one because the framing is written and the writing programme is
   the point. The two **ranking** domains are unaffected either way.

## What could not be checked from here

- **Live verification.** The session's network policy refused outbound
  connections to all eleven domains, so everything above is from the repo and
  the built output, not from what the servers answer. Worth running:

  ```
  curl -sI https://fellowshipoflight.space/
  curl -s  https://fellowshipoflight.space/ | grep canonical
  curl -s  https://fellowshipoflight.space/version.txt
  ```

- **`deploy.conf` is untracked** and lives on the cPanel account, so whether a
  live clone overrides `SITE_NAME`/`SITE_TITLE` per TLD is not visible here.
  `deploy.conf` wins over the registry wherever it sets a value — but *not* for
  `ranksAt`, which is deliberately registry-only: which domain carries a
  family's ranking signal is a decision about live sites, and belongs in a file
  that gets reviewed in a pull request.

## Side finding, unrelated to the decision

Listing pages are **not deterministic between builds**. Of four builds, three
produced an identical `/codex/` card order and the fourth differed — same card
set, different order (sorting both lists makes the difference vanish);
`/lore/` and `/official/` moved with it. Not domain-dependent: two builds of
the same domain can disagree, which points at async data-file resolution order.
Harmless for readers, annoying for anyone diffing two deploys. Worth an issue if
it gets in the way.
