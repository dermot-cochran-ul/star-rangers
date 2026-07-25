# Firefly Replacement Prompts — July 2026

Planning note (not built into the site). Ready-to-paste Adobe Firefly prompts
for every image the [image audit](image-audit-2026-07.md) flagged as needing
**replacement** (wrong content or unfixable style mismatch). Companion to
`portraits-needed.md`, which covers characters with *no* portrait yet.

## Working tips (learned from the Kai Larsen generation)

- **Content type: Photo**, not Art — the cast convention is photographic.
- **Aspect:** Portrait (3:4) for character portraits; Landscape (16:9) for
  lore/hero banners. The site converts to JPG at ≤1600px — anything Firefly
  outputs is big enough.
- **Firefly garbles text.** Avoid asking for name tapes, lettering, signage,
  or labeled patches — phrase wardrobe as "plain," "unmarked," "no insignia
  lettering." If gibberish text appears anyway, don't re-roll a good image:
  the select-and-blur cleanup used on Larsen's name tape works in-session.
- **Workflow:** drop the generation in `Downloads/`, say the word, and the
  conversion, resize, `image:`/`image_alt:` update, and commit happen
  in-session.
- Some slots below arguably want **your photography**, not Firefly — marked
  where true. The house's strongest images are your own.
- **Tone guardrail (Dermot's rule):** Star Rangers may be *unsettling* but
  never horror — the Doctor Who line not to cross. In images that means no
  body horror, no gore, no machinery-in-flesh: hint at the dark fact, don't
  show it. The Korvain v1→v2 pair below is the worked example. If a
  generation reads as horror, it's a re-roll, not a keeper.

---

## CRITICAL — wrong content

### `characters/ilse-korvain.jpg` — ✔ REPLACED 2026-07-24
*Was: smiling young woman in a real US Army uniform. Now: the v2 toned-down
generation below, approved by Dermot — sealed collar, silver seam at the
temple, depot corridor.*

> Cinematic portrait of a gaunt elderly female officer in an archaic
> high-collared dark military greatcoat with the collar closed to the chin,
> a single faint seam of silver metal tracing one temple and cheekbone,
> standing rigidly at attention in a derelict industrial fuel depot corridor
> lit by failing amber emergency lights, dust motes, long undisturbed
> solitude, composed and dignified expression, muted cold palette,
> photorealistic, plain uniform with no insignia lettering. Portrait
> orientation.

Suggested alt: *"A gaunt elderly officer in an archaic dark greatcoat, a
thin silver seam tracing her temple, standing at attention in a derelict
depot corridor"*

*(v1 note: the first phrasing — "visible partial cybernetic reconstruction
along the jaw and neck" — rendered as exposed throat machinery, far too
grim. The revenant truth stays in the prose; the portrait only hints. If a
generation still shows machinery, close the collar further: "high sealed
collar, no skin visible below the jaw.")*

### `characters/maren-solveig-krast.jpg` — ✔ REPLACED 2026-07-24
*Was: smiling contemporary policewoman. Now: the generation below, approved
by Dermot — archival official portrait with period print border, seated,
hands folded, exactly the photograph an institution would frame.*

> Formal official military portrait of a stern middle-aged woman general in
> an austere slate-grey high-collared uniform, iron-grey hair pulled back,
> unsmiling, seated before a plain dark institutional backdrop, archival
> photographic style as if from an official government record, slightly
> desaturated, hard even lighting, commanding and severe, plain uniform with
> no lettering. Portrait orientation.

Suggested alt: *"An official portrait of a stern grey-haired general in an
austere slate uniform, unsmiling before a plain dark backdrop"*

### `characters/karla-wender.jpg` — ✔ REPLACED 2026-07-24
*Was: generic corporate headshot with "engineer" alt text. Now: the
generation below, approved by Dermot — helm station, control yoke, nav
displays (whose text Firefly rendered legibly for once: "HELM ACTIVE").*

> Cinematic portrait of a confident mid-career woman pilot in a navy flight
> suit seated at the helm of a spacecraft navigation deck, one hand resting
> on a control yoke, face lit by the soft glow of holographic navigation
> displays, starfield through the canopy behind her, composed and capable
> expression, photorealistic, plain flight suit with unmarked patches.
> Portrait orientation.

Suggested alt: *"A woman pilot in a navy flight suit at a navigation deck,
her face lit by holographic displays"*

### `characters/aldera.png` → `aldera.jpg` — ✔ REPLACED 2026-07-24
*Was: painterly fantasy forest at 1024×512, a blue-furred cat contradicting
her own tabby-kitten gallery photos. Now: the generation below, approved by
Dermot — a tabby matching her field photos, implant traced on one ear,
causeway rail at dawn.*

> Photorealistic portrait of an alert intelligent tabby cat with subtle
> sleek cybernetic enhancement — a fine silver implant tracing the edge of
> one ear and a faint lens glint in one eye — sitting upright on a weathered
> wooden causeway rail above a misty marsh at dawn, sharp focus on the eyes,
> shallow depth of field, muted teal and amber palette, dignified and
> watchful, cinematic wildlife photography style. Portrait orientation.

Suggested alt: *"An alert tabby cat with a fine silver implant along one ear,
sitting upright on a causeway rail above a misty marsh"*

### `characters/orla-shepherd.jpg` — ✔ REPLACED 2026-07-24
*Was: businesswoman in an office. Now: the generation below, approved by
Dermot — wool coat, crook, sheep among lichened volcanic stones, mist off
the ridge, and a faint glint of settlement lights on the skyline keeping it
quietly in-universe. Palette sits well beside the Tenerife Boirinn photos.*

> Weathered middle-aged woman in a heavy wool coat and scarf standing on a
> misty rocky upland pasture, shepherd's crook in hand, a few sheep grazing
> behind her among volcanic stone outcrops, low cloud, wind in her hair,
> quiet self-possessed expression, documentary photography style, natural
> light, muted greens and greys. Portrait orientation.

Suggested alt: *"A weathered woman in a wool coat with a crook, on a misty
rocky pasture with sheep grazing behind her"*

### `hero/atlas-chart.jpg` — ✔ REPLACED 2026-07-24
*Was: a Vedic astrological birth chart. Now: the generation below, approved
by Dermot — vintage gold-ink chart with sextant and dividers under
lamplight, kept deliberately antiquarian to match the hero set's register
(vs. a sci-fi hologram alternative, considered and declined).*

> Vintage-style deep space navigation atlas spread across a chart table,
> constellation lines and plotted fold routes in fine gold ink on dark blue
> paper, brass drafting instruments resting on the chart, tiny illegible
> annotations, warm lamplight, photorealistic still life, no readable text.
> Landscape orientation.

### `codex/cosmic-limitation-on-evil.jpg`
*Currently: a stray blurry stock photo breaking the codex cover template.*
Better handled without Firefly: the codex covers are designed
dark-gradient title cards, and I can rebuild this one in-session with the
Adobe Express/HTML design tools so the title renders in real type instead
of Firefly gibberish. Say the word.

---

## STYLE — replacements worth making

### `characters/qiren-tal.jpg` — ✔ REPLACED 2026-07-24
*Was: dark-fantasy monster art. Now: Dermot's own modified prompt
("non-humanoid delicate insectlike alien, matte colour…") after the sheet's
original "stone-textured skin" phrasing produced a golem. The approved
result reads "Basaltborn" as lava-sheen iridescence on chitin rather than
rock — character page physiology updated to match (exoskeletal lattice,
compound eyes). Lesson for the sheet: material-texture words sculpt the
whole body; name the sheen, not the substance.*

> Photorealistic portrait of a stocky humanoid alien with matte basalt-grey
> stone-textured skin and small patient amber eyes, wearing a practical
> engineering harness with unmarked tools, examining a hull plate with a
> thermal probe in a dim ship maintenance bay, warm work-light glow,
> careful precise posture, dignified specialist at work, subdued palette.
> Portrait orientation.

Suggested alt: *"A stone-skinned alien engineer in a tool harness examining
a hull plate with a thermal probe"*

### `characters/rook-7.jpg` — ✔ REPLACED 2026-07-24 (v2)
*Currently: too sleek/premium. Character: an outdated, deliberately
understated chassis with non-standard retrofit sensors.*

*(v1 note: the first generation was charming — "RETIRED?" chalked on its
chest was accidental gold — but "too boxy" per Dermot, and fatally
decorated with legible real-world text: NYC POLICE case folders, NYPD
officers in the background, an Underwood typewriter, and chest stencils
reading SR-09/UNIT 09 for a character named Rook-7. Lesson: name the
office as futuristic, ban lettering explicitly, and never let Firefly
freestyle a police station.)*

> Photorealistic portrait of an aging utilitarian service robot with
> rounded-edge rectangular panels in matte scuffed grey, softened corners
> rather than a plain cube, visibly older design, several mismatched
> retrofit sensor modules and one salvaged camera bolted near its head
> unit, seated at a cluttered desk in a dim futuristic space-station
> police office, loose papers and a steel mug on the desk, unassuming and
> slightly endearing, no sleek surfaces, no glowing accents, no readable
> text anywhere, no lettering, no insignia, plain unmarked folders and
> equipment, documentary style, muted palette. Portrait orientation.

Suggested alt: *"An aging, scuffed service robot with mismatched retrofit
sensors, seated at a cluttered desk in a dim station office"*

### `characters/nessa.jpg` — ✔ REPLACED 2026-07-24
*Was: polished purebred studio pet photo. Now: the generation below,
approved by Dermot — wind-matted, barnacled tideline rock, surf and grey
cliffs, wary stare, no collar. The "your own camera" note below stands as
a future upgrade path, but this one earned its place.*

> Documentary wildlife photograph of a thin scruffy wind-ruffled cat
> standing on wet dark rocks of a tidal island, grey sea and overcast sky
> behind, fur damp and unkempt, wary intelligent stare directly at camera,
> no collar, cold natural light, muted palette, photojournalistic realism.
> Portrait orientation.

### `lore/cerebraun.jpg` — ✔ REPLACED 2026-07-24
*Was: the literal grey-alien-bust cliché the sibling entry explicitly
avoids. Now: the indirection generation below, approved by Dermot — vast
brutalist hall, one robed figure from behind at distance. Happy accident:
a robe conceals eight limbs, so nothing anatomically wrong can show for a
cephalopod-descended species.*

*File-name correction: the audit's target was `lore/cerebraun.jpg` (the
**species** entry). `lore/cerebraun-hegemony.jpg` is a different file — an
on-template designed cover for the **polity** entry — and was deliberately
left alone.*

> A vast brutalist assembly hall in cold light, a single towering robed
> figure seen from behind at great distance walking toward an immense
> doorway, elongated silhouette suggested rather than shown, monumental
> scale, fog and volumetric light, austere and enigmatic, muted cold
> palette, cinematic photography. Landscape orientation.

### `hero/s01e01-corridor.jpg` — ✔ REPLACED 2026-07-24
*Was: glossy CGI corridor among gritty real-photo episode banners. Now: the
generation below, approved by Dermot — wet decking, exposed conduit, one
figure receding under strip lighting. Wall stencils rendered as plausible
deck numbering rather than gibberish, so no blur pass needed.*

> Gritty photorealistic industrial corridor aboard an aging space station,
> scuffed deck plating, exposed conduit and pipework, harsh unshaded strip
> lighting with dark intervals, condensation stains, one distant figure
> walking away, documentary realism, desaturated palette, film grain.
> Landscape orientation.

### `lore/five-layers.jpg` — ✔ UPGRADED 2026-07-24 (not a fix)
*The audit's suspicion that this file held the wrong image was a **false
positive** — it already was a blue spiral galaxy, matching its alt text. The
new generation was installed as a genuine upgrade instead: it carries the
faint translucent layered planes the entry is actually about, which the plain
galaxy didn't. Old version recoverable from git if the plain one is preferred.*

> A luminous blue spiral galaxy seen face-on against deep black space,
> faint layered translucent planes of light stacked in front of it
> suggesting depth strata, subtle and abstract, astronomical photography
> realism, no text. Landscape orientation.

### `lore/saltvik.jpg`
*Currently: a plain text card.* **Your photography slot** — the Knarr Line's
Nordic-heritage coastal world wants a real cold-coast photograph (harbour,
gantries, grey water) far more than a generation. Firefly fallback only if
no photo fits. Also listed in [manual-photo-edits.md](manual-photo-edits.md).

---

## Status summary (2026-07-24)

**✔ Replaced this session (11):** `ilse-korvain` (v2 after a horror-tipping
v1), `aldera` (png→jpg), `maren-solveig-krast`, `karla-wender`,
`orla-shepherd`, `qiren-tal` (Dermot's own reworked prompt), `rook-7` (v2
after an NYPD-contaminated v1), `nessa`, `lore/cerebraun`, `hero/atlas-chart`,
`hero/s01e01-corridor`. Plus `lore/five-layers` upgraded.

**Open, not Firefly's job:** `codex/cosmic-limitation-on-evil.jpg` (designed
title card, in-session rebuild available); `lore/saltvik.jpg` (Dermot's
camera); everything in [manual-photo-edits.md](manual-photo-edits.md)
(Lightroom/Photoshop); the 13-file stock-headshot cluster (deferred).

**Prompt-engineering lessons banked:** name the *sheen*, not the substance
(stone-texture → golem); ban lettering explicitly (or Firefly delivers the
NYPD); state the setting's era, or it defaults to contemporary Earth; and
tone-check every dark subject against the horror line before keeping it.

---

## Deliberately NOT listed

- All dust-spot / soft-zoom / motion-blur items — those are **your photos**
  needing Lightroom or a re-shoot, not replacement by generation.
- The `prismere-*` 11-file cluster — low-res but internally consistent;
  regenerating 11 images risks losing its coherence for a resolution win
  nobody has complained about.
- The stock-headshot cluster (13 files) — real style-consistency work, but
  a batch that size deserves its own deliberate session with you choosing
  each face, not a checklist run.
- The three-way lore alt-text shuffle — needs your eyes on which image
  belongs where before anything is generated or renamed.
