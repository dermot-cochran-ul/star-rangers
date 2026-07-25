# Pages needing your own prose

> **Voice and style approved 2026-07-25 (Dermot's decision):** no longer a
> voice-review queue. After reading the narrative scenes — particularly the
> multi-POV scene structure, which he singled out for the mystery it
> creates — Dermot approved the **voice and style** of all existing prose
> in the repository, including everything listed below. Nothing here is
> waiting on a tone pass or a rewrite for register.
>
> Three things that approval is *not*:
>
> - **Not a canon ruling.** It settles how the prose reads, not whether a
>   given page's events are fixed story. Anything whose *content* is still
>   open — see the Season 6–7 chapters below — stays open.
> - **Not a change to the go-forward rule** in `CLAUDE.md`. Dermot writes
>   the narrative first drafts; unprompted narrative prose is still not
>   wanted. New scenes get drafted at his direction, not on an AI tool's
>   initiative.
> - **Not the end of this list.** It is kept as a **provenance record**: it
>   still answers "which pages has Dermot never personally written a word
>   of," which matters for attribution and for knowing where his own voice
>   is and isn't the base layer.
>
> What it *does* establish: the prose in this repository is the reference
> for the house voice. Draft new work to match it rather than to some
> other register.

Planning note (not built into the site — lives in `story-bible/` like the
other authorial notes). Built 2026-07-23 from git history: every content
file under `src/{seasons,lore,characters,codex,glossary,timeline}/` whose
**entire authorship history has no commit from Dermot Cochran / Avalon
Hope** — i.e. every word currently on the page was written by an AI tool
(the original Copilot bootstrap, or a later Claude Code session), and you
have never personally written or revised it.

This is the front-to-back list. A shorter, separate list —
`prose-needs-review.md` — covers pages you *did* write, that AI has since
edited and which may need a tone check.

## Partly resolved: the Season 6–7 chapters

`src/seasons/s06/` and `src/seasons/s07/` contain drafted chapters
(`s06e01c01/c02/c03.md`, `s07e01c01/c02/c03.md`, dated 2026-07-21) — entirely
AI-authored, and written *after* `story-bible/narrative-gaps-checklist.md`
last claimed "zero chapters exist anywhere in `src/seasons/`" for
Season 6–7 (that checklist was corrected on 2026-07-24 and now lists all
six files by name). This flag originally
asked for a direct look, since Season 6–7 is the climax ("The Last Stand")
and these chapters had appeared without one.

**Status 2026-07-25:** the 2026-07-25 approval covers their voice and
style, so they need no rewrite for register. It does not rule on whether
their *events* are canon — for the climax of the arc, that is a separate
call, and it is still open. Read against
`story-bible/tissadelle-arc-s6-7.md` before treating any beat in them as
fixed.

## Season chapters (actual narrative prose — highest priority)

- Season 0 (Founding Era): all of `s00/e01`, `s00/e02`, `s00/e03` (indexes + 6 chapters)
- Season 1: `s01/e00` (4 chapters, Elvira/Aldera prequel), `s01/e01` (2 ch),
  `s01/e02` (5 ch), `s01/e03/s01e03c02.md`
- Season 2: `s02/e01` (index + 3 chapters) — per the gaps checklist this
  season is "deliberately open," so confirm this drafted content is meant
  to exist at all
- Season 3: `s03/e01` (index + 2 chapters)
- Season 5: `s05/e02` (index + 2 chapters)
- Season 6: `s06/e01` (index + 3 chapters) — see flag above
- Season 7: `s07/e01` (index + 3 chapters) — see flag above
- Section indexes: `src/seasons/index.md`, and the `s00`/`s01` season indexes

## Characters (34 files + index)

`agent-barsik`, `bertram-ashcombe`, `brother-daire`, `brother-fintan`,
`bubochka`, `cormac-dubhghlas`, `dagny-voss`, `demelza-trevithick`,
`dorian-calloway`, `fergus-aonghas`, `idris-bryneth`, `ilsabet-marrowtide`,
`ilse-korvain`, `imogen-petrakis`, `isren-farrowkin`, `jeeves`, `kai-larsen`,
`lorien-the-wanderer`, `maren-solveig-krast`, `mira-of-brine`, `nessa`,
`niamh-o-ceallaigh`, `orla-shepherd`, `petra-voss`, `qiren-tal`,
`rhian-gwynne`, `rhiannon-ceridwen`, `rook-7`, `saint-aoife`, `sen`, `sohrel`,
`wendell-albercombe`, `zara-wayland`, plus `characters/index.md`.

Note the overlap with the image audit: `ilse-korvain`, `orla-shepherd`,
`maren-solveig-krast` also had wrong-content portraits flagged there — these
three characters have never had either their prose or their image
touched/chosen by you.

## Lore (36 files + index)

`arilon`, `boundary-zones`, `cerebraun`, `chthonari`, `cnoc-na-mbeach`,
`concordant-membranes`, `dryadic-trees`, `eden-ring-rail`,
`ensemble-multiverse`, `federation-of-sentient-beings`, `five-layers`,
`formation-of-star-rangers`, `frontier-transformation-protocols`,
`galactic-stardate`, `membrane-shadows`, `military-space-command`,
`mnemari`, `monasteries-of-mars`, `planetary-liaisons-and-recruiters`,
`planets/prismere`, `planets/saltmere`, `planets/sentinel`,
`planets/verdance`, `post-eleven-dimensional-manifold`,
`post-teleport-ascension-stress-disorder`, `prismeri`,
`quantum-space-harmonics`, `saint-aoife`, `solar-time-and-local-calendars`,
`star-rangers-command-hierarchy`, `star-rangers-science-corps`,
`teleportation-limitations`, `universal-cosmic-stardate`,
`universes/tir-tairngire`, `year-zero`, plus `lore/index.md`.

Three of these (`five-layers`, `formation-of-star-rangers`,
`frontier-transformation-protocols`) are also the three lore pages with the
scrambled image/alt-text bug from the image audit — worth tackling image and
prose together on those three.

## Glossary (21 terms + index)

`boundary-zone`, `concordant`, `constraint-literacy`, `cyborg`, `frenar`,
`higher-dimensional-folding`, `hyperomnium`, `instrument-drift`,
`intermembrane-bleed`, `krenyi`, `membrane-shadow`, `metafold`,
`noogenic-protouniverse`, `overfold`, `plural-minds`,
`quantum-space-harmonic-wave`, `slipwave`, `smart-pet`, `universe-overlap`,
`virtual-reality`, plus `glossary/index.md`.

## Codex (4 files + index)

`baby-universe-ballad`, `cosmic-limitation-on-evil` (also the stray/broken
image from the audit), `telling-the-bees-at-cnoc-na-mbeach`,
`the-warm-edge-correlation`, plus `codex/index.md`.

## Timeline (7 files + index)

`2712-eden-fold-route`, `2714-patience-first-departs`,
`2719-outer-stations-consolidation-hearing`,
`year-0-causeway-convergence`, `year-minus-2-aethelrock-rotation-dispute`,
`year-minus-3-aldera-reaches-causeway`, plus `timeline/index.md`.
