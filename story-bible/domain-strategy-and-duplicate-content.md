# Domain strategy and the duplicate-content reports

**Status: PARTLY DECIDED, 20 August 2026.** Google Search Console warned about
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

## The four families

They are the four reading tiers of `story-bible-summary.md`'s audience-tier
table — children → young adult → general → contemplative — which is also how
the domains were already assigned on 2026-08-05. Grouping by tier rather than
by TLD is what makes it four families instead of three, and it puts the
fellowship and church-space domains in **one** family, which is where the real
problem turned out to live.

| Family (tier) | Thread | Domains | Ranks at |
|---|---|---|---|
| **children** | undercover-pets | undercover-pets.com | itself (family of one) |
| **young adult** | orbital-five-o | starquest.site, starquest.online | **starquest.site** |
| **general** | founding-era + tissadelle-arc | sciencefiction.site | itself (family of one) |
| **contemplative** | church-space | church-space.site/.online, fellowshipoflight .org/.site/.online/.space | **fellowshipoflight.org** |

`fianilchruinne.com` (with GitHub Pages) is not a tier family. It holds
everything and self-canonicalises, unchanged.

### Why those two ranking domains

**starquest.site** over `.online`: older registration, stronger TLD.

**fellowshipoflight.org** over the other five: `.org` is the strongest TLD for a
contemplative order, and *Fellowship of Light* is a name out of the fiction
where *church space* is a generic phrase that competes in search with room
hire. Worth being plain about the consequence, because it is the surprising
one: **church-space.site and church-space.online rank nowhere of their own.**
They keep their palette, their audio, their giscus board and their framing;
what they give up is competing for pages they were never going to win six ways.

## Why one per family, measured

Built the editions from one commit and counted what each actually offers a
crawler. A narrowed build still renders every page at its normal URL, but an
excluded one becomes a `noindex` `excluded.njk` placeholder — so the indexable
count, not the file count, is the number that matters:

| Edition | Total pages | noindex placeholders | **Indexable** | Tier-specific |
|---|---|---|---|---|
| default (full record) | 632 | 66 | 566 | — |
| children | 632 | 542 | 90 | 44 |
| general | 632 | 552 | 80 | 34 |
| young adult | 632 | 570 | 62 | 16 |
| contemplative | 632 | 570 | 62 | 16 |

Two findings came out of it, and the second was not expected:

1. **Two domains in one edition are byte-identical.** Normalising only the
   hostname and the per-build `?v=` asset hash, `fellowshipoflight.org` and
   `.site` match across all 632 pages. Only `version.txt` differs, and it is
   excluded from collections and the sitemap.
2. **The fellowship and church-space editions serve the identical 62 indexable
   pages — 62 common, 0 unique to either.** They are two edition entries
   producing one page set. That is six domains, not four, making the same claim,
   and it is invisible from either entry on its own because they are different
   records with different palettes.

There is also a **46-page navigational shell** — `/about/`, `/lore/`,
`/characters/`, the season and episode indexes, `/threads/` — indexable and
identical on **every** domain. It is included here because it will show up in
the report and look alarming; it is low-value listing pages that were never
going to rank, and consolidating them is not worth distorting the design for.

## The specialisations

The mechanism already exists and asserts nothing: `characters`, `topics`
(matched against page tags) and `threads` narrow what a domain carries, and
`siteName` / `siteTitle` / `heroSubtitle` / `heroCharacterIds` / `themeAudio` /
`theme` reframe it. The canon rule holds throughout — **an edition may
subtract or reframe, never assert** — so a faction focus is emphasis and
filtering, never a claim about the world.

### The contemplative six

The tier already carries three distinct institutions in canon, which is a
better fit than it has any right to be:

- **Fellowship of Light** (12 tagged pages) — contemplative chapter houses
- **Communion of the Called** (4) — the congregational network, and
  **Cnoc na mBeach** (4), Brother Fintan's hive-yard hermitage
- **Monasteries of Mars** (1) — the order that declines the affiliation

So the four fellowshipoflight domains front chapter houses, and the two
church-space domains front the Communion and Cnoc na mBeach. One correction
worth carrying, because it is the obvious mistake to make: **Cnoc na mBeach is
explicitly not a Fellowship house.** Its own entry says it is "not a monastery
in any sense the Fellowship of Light or the Monasteries of Mars would recognize
as their own." It cannot be pressed into service as chapter house number four.

### The chapter houses, audited against canon

Dermot's instruction was four chapter houses for the four Fellowship domains.
Canon supplies three, only one of them named:

| # | House | Status | Anchor |
|---|---|---|---|
| 1 | **Eden chapter house** | **Named in canon** | Holds the cross-chapter correspondence and the comparative archive filing; `codex/jehu-among-the-comparanda`, `codex/the-captain-who-drove-furiously` |
| 2 | Brother Daire's abbey on a tidal river | Canon, **unnamed** | Trained Elvira informally; `seasons/s01/e00/s01e00c01` *The Garden Gate* |
| 3 | Asteria's house — stone, a green hill, a track past it | Canon, **unnamed** | Where she went as a Sage at about a hundred; `characters/asteria-the-sage` |
| 4 | — | **Does not exist** | — |

Naming 2 and 3 and inventing 4 asserts facts about the world, so all three are
Dermot's call, not a session's. Two ways to close it:

- **(a) Name a fourth house.** New canon, his to write.
- **(b) Front the Fellowship's operational chapter instead** — already canon,
  and the Fellowship's own two-fold structure: "contemplative chapters" and
  "operational chapters," the latter being where the Star Rangers fit. Four
  domains would then be three contemplative houses and the operational face,
  which reads as the institution describing itself rather than as a gap being
  filled. **Recommended**, because it needs no invention and is arguably the
  more interesting split.

### The honest limit on all of this

**Specialisation by framing does not make a duplicate page non-duplicate, and
the tier does not yet have the content to specialise by narrowing.** The
contemplative tier has **16 tier-specific indexable pages**. Split six ways
that is under three pages each, and the other 46 are the shell every domain
shares.

So the chapter-house editions can be *framed* distinctly today and cannot be
*filled* distinctly yet. That is not an argument against the plan; it is the
sequence the plan has to run in:

1. **Now** — consolidate ranking (done, below) and give each domain its own
   framing. Fixes the Search Console problem immediately.
2. **As material lands** — each house accumulates its own pages, and its
   edition narrows to them.
3. **Then** — relax that domain's canonical, per domain, when it has enough of
   its own to be worth ranking separately.

Which makes "four chapter houses" a **writing programme** rather than a
configuration change. The config is ready for it either way.

## The mechanism, implemented

`ranksAt` on an edition names the host in its family that carries the ranking
signal. Empty (the default) means self-canonical, which is right for a family
of one.

It names a **host, not a page**: any build whose `SITE_DOMAIN` differs emits a
cross-domain canonical at the same path, and the named host compares equal and
keeps its self-canonical. One value per family, read correctly by every member
— and it keeps working unchanged when a family is later split into one edition
per chapter house, since each entry carries the same `ranksAt`.

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
Keeping the ranking domain on the family's widest filter satisfies this by
construction: **narrow the siblings, never the one that ranks.**

Verified on the built output rather than asserted — all **62** indexable pages
on `fellowshipoflight.site` canonical to `fellowshipoflight.org`, and all 62
targets are indexable there. 0 violations. (45 further canonicals on that
build are the `/c/…/` citation-alias stubs from `chapter-aliases.njk`, which
hand-write their own head and stay host-relative. They are `noindex`, and their
canonical chains through the sibling's real page to the ranking domain, so they
are correct as they stand.)

Worth adding a check for this to `npm test` if the families ever get more
complicated than they are now.

## Still open — Dermot's calls

1. **The fourth Fellowship domain** — name a fourth chapter house, or front the
   operational chapter. Recommendation (b), above.
2. **Naming houses 2 and 3.** Both are canon and neither has a name. They can
   stay unnamed and be fronted descriptively, but a domain wants a label.
3. **Whether church-space.site and .online really give up ranking.** This is
   what "one site per family" means with families as tiers, and it is the line
   most worth a second look before merging.
4. **Which faction fronts each young-adult domain.** `starquest.online` needs a
   specialisation; the orbital-five-o thread's tags (`orbital-five-o` 16,
   `detective-agency` 16) are the obvious starting point but nobody has chosen.

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
