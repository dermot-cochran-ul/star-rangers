# Domain strategy and the duplicate-content reports

**Status: OPEN — a decision only Dermot can make.** Raised 20 August 2026,
after Google Search Console warned about shared or duplicate content across the
sites. Nothing here has been changed; re-pointing a live domain is
draft-and-stop under CLAUDE.md's authority boundary, and this file is the
draft.

**The one-line version.** Registering defensive TLDs is normal and correct, and
Search Console is not complaining about that. It is complaining that eight
hostnames are running eight full builds of three sites.

## First, the reassurance

**There is no duplicate content penalty.** Google's position is that duplicate
content is not grounds for action unless it is deceptive — scraped, spun, or
built to mislead. None of this is. The Search Console report is a *coverage*
report: it lists URLs that did not make it into the index and says why. It is
not a warning notice, and no manual action is implied by any of it.

What it costs is not ranking but *choice*. Where two URLs carry the same
content, Google indexes one and drops the other. The question this file exists
to answer is whether we are picking the survivor, or Google is.

## Reading the report

"Duplicate content" in Search Console is four distinct statuses, and only two
of them want anything from us. Check which wording the report actually used
before acting — the fix differs completely.

| Status | Meaning | Verdict |
|---|---|---|
| **Page with redirect** | A 301'd URL. | Working as intended — ignore |
| **Alternate page with proper canonical tag** | Duplicate found, our canonical honoured | Working as intended — ignore |
| **Duplicate without user-selected canonical** | No canonical tag; Google guessed | Real gap |
| **Duplicate, Google chose different canonical than user** | We self-canonicalised and Google **overruled us** | Real, and the interesting one |

We have seen the third and fourth before. `CHANGELOG.md`'s 8 August 2026 entry
records four `http://` glossary pages on fianilchruinne.com filed under
"Alternative page with proper canonical tag", fixed with the force-HTTPS 301 in
`src/static/.htaccess`.

## What is already correct, and needs nothing

**The seven alias domains** listed in `lib/editions.js` — `star-rangers.space`,
`star-rangers.site`, `fian-ilchruinne.com` and the four `fianilchruinne.*`
variants. These are cPanel aliases sharing their target's document root, so
they serve HTML built with the *target's* `SITE_DOMAIN`. A page fetched at
`star-rangers.space` already carries a canonical naming `sciencefiction.site`,
and search engines consolidate to the target unasked.

This is exactly the anti-squatting pattern working as intended. If these show
up in Search Console at all it will be as "Alternate page with proper canonical
tag", which is the report telling us it worked. **No action, and the reasoning
in `lib/editions.js` for keeping them out of any `domains` array still
holds** — listing one there would arm it to build its own copy and
self-canonicalise to itself, converting a correctly-consolidated alias into a
genuine competitor of the domain it was meant to point at.

## What is not correct: three multi-TLD families

`base.njk` emits a **self**-canonical — every domain declares itself the
canonical home of its own URLs. The comment there defends this on the grounds
that the domains are *meant to diverge*, and for `undercover-pets.com` versus
`church-space.site` that is plainly right: different threads, different cast,
different framing, and a cross-domain canonical would ask Google not to rank
the branded domains at all.

It is not right where several hostnames resolve to **one edition entry**. Three
do:

| Edition | Hostnames | Distinct builds |
|---|---|---|
| `fellowship` | fellowshipoflight **.org / .site / .online / .space** | 1 |
| `starquest` | starquest **.site / .online** | 1 |
| `church-space` | church-space **.site / .online** | 1 |

Eight hostnames, three sites. `editionForDomain()` returns the same record for
every domain in a family, so all of them get the same `theme`, `threads`,
`siteName`, `siteTitle`, tagline and hero cast. The only build input that
varies is `SITE_DOMAIN`.

And this is the governing rule working exactly as designed, not failing:
**canon is centralised**, so `src/seasons/`, `src/lore/` and `src/glossary/`
are identical on every domain by construction. Editions only ever vary the shop
window. Within one family, they do not vary even that.

### Measured, not assumed

Built two fellowship domains from the same commit and compared them:

```
SITE_DOMAIN=fellowshipoflight.org  EDITION=fellowship THREADS=church-space npx eleventy --output=b1
SITE_DOMAIN=fellowshipoflight.site EDITION=fellowship THREADS=church-space npx eleventy --output=b2
```

**632 HTML pages each.** Normalising only the hostname and the per-build asset
cache-bust string (`?v=…`, which changes between any two runs), the two builds
are **byte-identical across all 632 pages**. The sole remaining difference is
`version.txt`, which carries a build timestamp and is excluded from collections
and the sitemap.

The same holds for `starquest` and `church-space`. So four hostnames serve one
identical 632-page site, and each of the four tells Google it is the original.

That is the condition that produces **"Duplicate, Google chose different
canonical than user"** — the report saying our self-canonical was considered and
overruled, because a self-canonical cannot arbitrate between four identical
copies. Google picks one. We do not get told which in advance, and it need not
be the `.org`.

## The decision

`lib/editions.js` records the fellowship list as "Four TLDs of one name, each an
`ALT_DOMAINS` entry with its own build. Confirmed 2026-07-30." So this is a
deliberate arrangement, not a slip, and the question is what it was *for*:

- **If the four TLDs were bought as defensive holdings** — to keep the name off
  a squatter — then serving a full build on each does not further that aim, and
  a 301 defends the name at least as well.
- **If they were meant to widen reach** — four doors into the archive — then it
  does not deliver that either. Four identical copies do not rank four times;
  they compete, and three lose.

Three options, per family and independently:

**A. Consolidate (recommended).** Pick one canonical host per family, 301 the
others to it. Ranking signals, links and any accumulated authority pool onto one
address instead of splitting four ways, and the defensive purpose is untouched —
a redirecting domain is still a registered domain a squatter cannot have. Cost:
the non-canonical TLDs stop being separately reachable sites. If someone types
`fellowshipoflight.space` they land on `.org`, which is very likely what they
wanted anyway.

**B. Differentiate.** Give each TLD an edition of its own — its own tagline,
hero cast, narrowing — so the domains genuinely diverge and the existing
self-canonical becomes correct for them. This is the option that keeps four live
sites, and it is real editorial work, not configuration: four distinct framings
of one archive that a reader could tell apart. Worth noting it cannot be
faked by varying `siteName` alone; 632 identical pages under a different logo
is still 632 identical pages. And the canon rule caps how far it can go —
an edition may never assert a fact, so the *content* stays identical however
the framing moves.

**C. Do nothing.** Legitimate. Google already picks a winner per family, and the
cost is confined to not choosing which. Nothing breaks, no penalty accrues, and
readers reach a working site whichever address they use. The reason not to
default to it is that the choice is being made for us and is invisible until
something moves.

**Recommendation: A for `starquest` and `church-space`, and A for `fellowship`
unless the four-way split was a deliberate editorial plan.** Consolidation
costs least, is reversible, and preserves every reason the domains were bought.
If B appeals for `fellowship` specifically, it is worth doing properly for one
family rather than thinly for all three.

## If A is chosen, what it involves

Not much, and none of it touches content:

1. Pick the canonical host per family. `.org` for fellowship is the obvious
   candidate — oldest TLD, most credible for the name.
2. In `deploy.conf` on the cPanel account, drop the redundant `ALT_DOMAINS`
   entries so they stop building.
3. Point each retired hostname at its canonical with a **301**, via cPanel
   redirects or a `RewriteRule` on the shared document root.
4. In `lib/editions.js`, cut each family's `domains` array to the surviving
   host and record the retired ones in the ALIAS DOMAINS prose block, which
   already exists for exactly this and already explains why they must not stay
   in a `domains` array.
5. In Search Console, keep the retired properties verified — the redirect
   reports are how the consolidation is confirmed to be working.

Step 4 is the one that matters for the future: it is what stops a later session
seeing an unused registration and helpfully giving it a build again.

## What could not be checked from here

- **Live verification.** The session's network policy refused outbound
  connections to all eleven domains, so the reasoning above is from the repo
  rather than from what the servers actually answer. The check worth running:

  ```
  curl -sI https://fellowshipoflight.space/          # 200, or 301 to .org?
  curl -s  https://fellowshipoflight.space/ | grep canonical
  curl -s  https://fellowshipoflight.space/version.txt
  ```

- **`deploy.conf` is untracked and lives on the cPanel account**, so whether a
  live clone overrides `SITE_NAME`/`SITE_TITLE` per TLD is not visible from
  here. `deploy.conf` wins over the registry wherever it sets a value. If one of
  the four fellowship domains is already branded differently in its own
  `deploy.conf`, that changes the picture for that domain — the deploy log
  prints each key's provenance, which is where to look.

## Side finding, unrelated to the decision

Listing pages are **not deterministic between builds**. Comparing four builds,
three produced an identical `/codex/` card order and the fourth differed —
same card set, different order (verified: sorting both lists makes the
difference vanish). `/lore/` and `/official/` moved with it. It is not
domain-dependent; two builds of the same domain can disagree, which points at
async data-file resolution order rather than anything per-clone.

Harmless for readers, mildly annoying for anyone diffing two deploys to check
they match, and it is engine-tier work rather than a decision. Worth an issue
if it ever gets in the way.
