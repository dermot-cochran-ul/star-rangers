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

### `characters/maren-solveig-krast.jpg`
*Currently: smiling contemporary policewoman. Character: the historical MSC
General (2631–2714), the "I would rather be called a tyrant" of the record.*

> Formal official military portrait of a stern middle-aged woman general in
> an austere slate-grey high-collared uniform, iron-grey hair pulled back,
> unsmiling, seated before a plain dark institutional backdrop, archival
> photographic style as if from an official government record, slightly
> desaturated, hard even lighting, commanding and severe, plain uniform with
> no lettering. Portrait orientation.

Suggested alt: *"An official portrait of a stern grey-haired general in an
austere slate uniform, unsmiling before a plain dark backdrop"*

### `characters/karla-wender.jpg`
*Currently: generic corporate headshot; alt text says "engineer." Character:
Chief Pilot, later High Captain.*

> Cinematic portrait of a confident mid-career woman pilot in a navy flight
> suit seated at the helm of a spacecraft navigation deck, one hand resting
> on a control yoke, face lit by the soft glow of holographic navigation
> displays, starfield through the canopy behind her, composed and capable
> expression, photorealistic, plain flight suit with unmarked patches.
> Portrait orientation.

Suggested alt: *"A woman pilot in a navy flight suit at a navigation deck,
her face lit by holographic displays"*

### `characters/aldera.png` → regenerate as `aldera.jpg`
*Currently: painterly fantasy forest at 1024×512 — the protagonist's own
portrait, wrong style, wrong shape, and no cyber-enhancement visible.
Character: a cyber-enhanced cat, detective agency field observer.*

> Photorealistic portrait of an alert intelligent tabby cat with subtle
> sleek cybernetic enhancement — a fine silver implant tracing the edge of
> one ear and a faint lens glint in one eye — sitting upright on a weathered
> wooden causeway rail above a misty marsh at dawn, sharp focus on the eyes,
> shallow depth of field, muted teal and amber palette, dignified and
> watchful, cinematic wildlife photography style. Portrait orientation.

Suggested alt: *"An alert tabby cat with a fine silver implant along one ear,
sitting upright on a causeway rail above a misty marsh"*

### `characters/orla-shepherd.jpg`
*Currently: businesswoman in an office. Character: sixth-generation
flockholder in the Boirinn Uplands.* **Note:** the Boirinn Uplands lore
images are your Tenerife photography — match that mist-rock-and-green
palette so she looks like she lives where the lore says she does.

> Weathered middle-aged woman in a heavy wool coat and scarf standing on a
> misty rocky upland pasture, shepherd's crook in hand, a few sheep grazing
> behind her among volcanic stone outcrops, low cloud, wind in her hair,
> quiet self-possessed expression, documentary photography style, natural
> light, muted greens and greys. Portrait orientation.

Suggested alt: *"A weathered woman in a wool coat with a crook, on a misty
rocky pasture with sheep grazing behind her"*

### `hero/atlas-chart.jpg`
*Currently: a Vedic astrological birth chart.* Text-risk is high here —
keep annotations illegibly small.

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

### `characters/qiren-tal.jpg`
*Currently: dark-fantasy monster art. Character: a Veyr Basaltborn hull
systems engineer — a careful specialist, not a creature.*

> Photorealistic portrait of a stocky humanoid alien with matte basalt-grey
> stone-textured skin and small patient amber eyes, wearing a practical
> engineering harness with unmarked tools, examining a hull plate with a
> thermal probe in a dim ship maintenance bay, warm work-light glow,
> careful precise posture, dignified specialist at work, subdued palette.
> Portrait orientation.

Suggested alt: *"A stone-skinned alien engineer in a tool harness examining
a hull plate with a thermal probe"*

### `characters/rook-7.jpg`
*Currently: too sleek/premium. Character: an outdated, deliberately
understated chassis with non-standard retrofit sensors.*

> Photorealistic portrait of a boxy utilitarian service robot with matte
> scuffed grey panels, visibly older design, several mismatched retrofit
> sensor modules bolted near its head unit, seated at a cluttered police
> station desk under fluorescent light, unassuming and slightly endearing,
> no sleek surfaces, no glowing accents, documentary style. Portrait
> orientation.

Suggested alt: *"A boxy, scuffed service robot with mismatched retrofit
sensors, seated at a cluttered station desk"*

### `characters/nessa.jpg`
*Currently: polished purebred studio pet photo. Character: a scruffy wild
cat alone on a tidal island.* **Strong candidate for your own camera** —
one scruffy farm cat on a grey day would out-house-style any generation.
Firefly fallback:

> Documentary wildlife photograph of a thin scruffy wind-ruffled cat
> standing on wet dark rocks of a tidal island, grey sea and overcast sky
> behind, fur damp and unkempt, wary intelligent stare directly at camera,
> no collar, cold natural light, muted palette, photojournalistic realism.
> Portrait orientation.

### `lore/cerebraun-hegemony.jpg` (`cerebraun.jpg`)
*Currently: the literal grey-alien-bust cliché the sibling entry explicitly
avoids.* Indirection dodges the cliché entirely:

> A vast brutalist assembly hall in cold light, a single towering robed
> figure seen from behind at great distance walking toward an immense
> doorway, elongated silhouette suggested rather than shown, monumental
> scale, fog and volumetric light, austere and enigmatic, muted cold
> palette, cinematic photography. Landscape orientation.

### `hero/s01e01-corridor.jpg`
*Currently: glossy CGI corridor among gritty real-photo episode banners.*

> Gritty photorealistic industrial corridor aboard an aging space station,
> scuffed deck plating, exposed conduit and pipework, harsh unshaded strip
> lighting with dark intervals, condensation stains, one distant figure
> walking away, documentary realism, desaturated palette, film grain.
> Landscape orientation.

### `lore/five-layers.jpg` (pending the three-way shuffle untangling)
The audit suspects the true "blue spiral galaxy" image is missing entirely.
If so:

> A luminous blue spiral galaxy seen face-on against deep black space,
> faint layered translucent planes of light stacked in front of it
> suggesting depth strata, subtle and abstract, astronomical photography
> realism, no text. Landscape orientation.

### `lore/saltvik.jpg`
*Currently: a plain text card.* **Your photography slot** — the Knarr Line's
Nordic-heritage coastal world wants a real cold-coast photograph (harbour,
gantries, grey water) far more than a generation. Firefly fallback only if
no photo fits.

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
