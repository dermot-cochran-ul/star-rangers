# Images Needing Your Hands — Lightroom / Photoshop

Planning note (not built into the site). The items here **cannot** be fixed by
the tools available in-session: there is no spot-healing, no content-aware
removal, no upscaler, and no compositing. Every one needs Lightroom or
Photoshop — or, in a few cases, a re-shoot.

All dimensions below were re-measured 2026-07-24, not taken on trust from the
[image audit](image-audit-2026-07.md) — which turned out to have at least one
false positive (see that file's status section).

---

## 1. Lightroom — the dust spot (highest priority)

### `src/images/lore/archipelago-palm-avenue.jpg` — 1600×1200
Sensor-dust blemish in the sky at roughly **53% across, 40% down**. Matches the
known Tamron-body artifact ([camera-gear notes](../story-bible/) — the main
body's dust spot, not the macro body's). Standard heal, same recipe as the
Kenya 2025 raws.

**Worth doing at the same time:** run the same check across any other sky-heavy
frame from that body. The audit found only this one occurrence in the repo, but
it checked visually, not systematically.

---

## 2. Photoshop Super Resolution — under-spec files

Everything in this section is *content-correct* and simply too small. Site
conventions: ~1600px long edge for lore images, ~1200px for character
portraits. **Upscaling is the one thing I definitively cannot do** — resizing
in-session would add pixels without detail.

### Characters
| File | Current | Notes |
|---|---|---|
| `characters/agent-barsik.jpg` | 512×1024 | one of the smallest in the cast |
| `characters/bubochka.jpg` | 512×1024 | |
| `characters/bubochka-alert.jpg` | 512×1024 | |
| `characters/tissadelle-shepherd.jpg` | 768×1022 | a major character, worth doing first |
| `characters/aldera/field-photo-03.jpg` | 512×1120 | unusually narrow; large file for its size (669 KB) |
| `characters/aldera/field-photo-04.jpg` | 512×1120 | same |

### The Prismere / Prismeri cluster — 11 files, all 768×1152
`prismere-driftjellies`, `prismere-flowering-glasswood`, `prismere-glass-spires`,
`prismere-glasswood-grove`, `prismere-luminous-towers`, `prismere-orbital-vista`,
`prismere-twilight-lattice`, `prismere-umbral-ray`, `prismeri-first-wings`,
`prismeri-full-wings`, `prismeri-lattice-gathering`.

Internally consistent as a block, so if you upscale them, **do all eleven** —
a half-upscaled series looks worse than a uniformly small one. Batch-friendly
via Photoshop Actions or Lightroom Enhance.

---

## 3. Photoshop — softness and blur (your call whether these are faults)

| File | Current | Issue |
|---|---|---|
| `lore/highland-summit-snowfields.jpg` | 1600×1200 | soft/smeared detail, consistent with extreme digital zoom — not the dust spot |
| `lore/highland-rock-spires.jpg` | 1600×1200 | same |
| `lore/boirinn-uplands-waterfall.jpg` | 1600×1462 | same |
| `lore/moorhen-wetland.jpg` | 1600×2133 | mild motion blur on the bird; acceptable, just softer than the rest of the wildlife set |

Sharpening will only go so far on zoom-smear. These may be re-shoot candidates
rather than edits — and the Boirinn/highland set is now doing double duty as
[Órla Shepherd's](../src/characters/orla-shepherd.md) home landscape, so it
earns the attention.

---

## 4. Photoshop — composite and crop work

### `lore/highland-sentinel-lizard.jpg` — 1168×880
Creature composited onto the same base photograph as
`highland-rock-spires.jpg`. The cutout edges are visibly soft next to the plain
photo version sitting beside it in the same entry set. Needs mask refinement —
edge feathering, and ideally a light colour/grain match between subject and
plate.

### `lore/noogenic-seeding-system.jpg` — 1200×614
Unusually short and wide against the site's other lore images. Either re-crop
to a conventional ratio or regenerate; nothing wrong with the content.

---

## 5. Deliberate — verify then leave alone

### `lore/trigrian.jpg` — 1600×1067
Blown highlights on the three suns. Almost certainly intentional (it *is* a
trinary-star world), but it reads as overexposure to a fresh eye. If you want
the effect kept, no action — noting it only so a future audit doesn't "fix" it.

---

## Your-camera slots (not edits — new photographs)

- **`lore/saltvik.jpg`** — currently a plain text card while its sibling
  Saltmere entries have two full photographs each. The Knarr Line's
  Nordic-heritage coastal world wants a real cold-coast frame: harbour,
  gantries, grey water.
- **`characters/nessa.jpg`** — now filled by an approved Firefly generation
  (wind-matted cat on barnacled rock), but one real scruffy farm cat on a grey
  day would still beat it. Low priority; the current image is good.

---

## Explicitly NOT on this list

- Everything Firefly could fix — all eleven of those were replaced 2026-07-24;
  see [firefly-replacement-prompts.md](firefly-replacement-prompts.md) for the
  ✔ REPLACED markers.
- `codex/cosmic-limitation-on-evil.jpg` — a broken codex cover, but the fix is
  a designed title card I can rebuild in-session with the Adobe/HTML design
  tools. Not your job unless you want it to be.
- The 13-file contemporary-stock-headshot cluster — a real style-consistency
  question, but that's replacement-by-generation work, not editing.
