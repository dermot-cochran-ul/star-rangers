// Shared markdown-it setup for the :::pov and ::::: scene custom containers
// used in chapter content. Used both by .eleventy.js (for the normal
// chapter-page render) and src/_data/scenePovPages.js (which needs the raw
// token stream to split a chapter's body into individual scene/POV pages).
//
// Chapter authors must write a scene wrapper with *more* colons than any
// :::pov block nested inside it (5 is the convention here; any count above
// 3 works) - NOT via markdown-it-container's `marker` option, which sets
// the repeating marker *character/string unit* rather than how many colons
// are required (`marker: ":".repeat(5)` was tried here first and actually
// required 15 colons - 3 reps of a 5-char unit - not 5). The real
// mechanism: each container instance's required closing-fence length is
// however many colons its own opening line actually used (at least 3), so
// a plain "::::: scene 1" / ":::::" pair (still the ':' marker both rules
// share) naturally can't be closed early by a nested "::: pov ... :::"
// block, since 3 < 5. Existing chapters with no scene wrapper at all are
// treated as one implicit scene - see extractScenes() in scenePovPages.js.
//
// TIER-GATED POV BLOCKS (Dermot's direction, 2026-09-03, confirmed the same
// day - story-bible/intake-2026-09-03.md): the reading tiers nest, and "the
// contemplative edition may have additional POV scenes for any chapter". A
// block written as
//
//   ::: pov brother-fintan tier=contemplative
//
// renders only on a build whose edition sits at that tier or above
// (lib/editions.js TIER_ORDER); on every lower tier it is dropped from the
// token stream before rendering - absent, not a placeholder - so a chapter
// reads as if it were never there. That is the overlay rule: every tier's
// reading of a chapter must be complete without the blocks the tier above
// adds, the children's self-containment rule climbing the ladder. A block
// with no tier= is visible everywhere, which is every block written before
// this existed. The build's own tier comes from its edition (`getEdition().tier`,
// resolved from EDITION/THEME); an unfiltered local build with no edition
// resolves to the default edition, which Dermot placed at the general tier,
// so a contemplative block never leaks into a build that did not ask for it.
const markdownIt = require("markdown-it");
const container = require("markdown-it-container");
const { tierVisible } = require("./editions");

const POV_INFO = /^pov\s+(\S+)(?:\s+tier=(\S+))?\s*$/;

function parseInfo(pattern, info) {
  const match = info.trim().match(pattern);
  return match ? match[1] : "";
}

// { id, tier } from a pov container's info string, or null if it is not a
// well-formed pov opener. Shared with scenePovPages.js so the two parsers
// cannot disagree about what a block's tier is.
function parsePovInfo(info) {
  const match = String(info || "").trim().match(POV_INFO);
  if (!match) return null;
  return { id: match[1], tier: match[2] || null };
}

// A block is visible on a build when it names no tier, or names one at or
// below the build's own - lib/editions.js's tierVisible, the one predicate
// shared with the thread gate in lib/content-filter.js (since 2026-09-04), so
// a POV block and a whole thread can never disagree about what "at or below"
// means. Kept under this name because it is what the renderer and .eleventy.js
// call; it IS tierVisible.
const povTierVisible = tierVisible;

// Removes every tier-gated pov block the build may not show, opener to closer
// inclusive. Runs as a core rule after block parsing, so both the normal
// chapter render and scenePovPages' walk over md.parse() see the same stream.
function tierGateRule(buildTier) {
  return function tierGate(state) {
    const out = [];
    let dropping = false;
    for (const token of state.tokens) {
      if (!dropping && token.type === "container_pov_open") {
        const info = parsePovInfo(token.info);
        if (info && !povTierVisible(info.tier, buildTier)) {
          dropping = true;
          continue;
        }
      }
      if (dropping) {
        if (token.type === "container_pov_close") dropping = false;
        continue;
      }
      out.push(token);
    }
    state.tokens = out;
  };
}

function createMarkdownRenderer(options = {}) {
  const buildTier = options.buildTier || "general";
  const md = markdownIt({ html: true });

  md.use(container, "scene", {
    validate: (params) => /^scene\s+(\S.*)$/.test(params.trim()),
    render(tokens, idx) {
      if (tokens[idx].nesting === 1) {
        const num = md.utils.escapeHtml(parseInfo(/^scene\s+(\S.*)$/, tokens[idx].info));
        return `<section class="scene" data-scene="${num}">\n`;
      }
      return "</section>\n";
    }
  });

  md.use(container, "pov", {
    validate: (params) => POV_INFO.test(params.trim()),
    render(tokens, idx) {
      if (tokens[idx].nesting === 1) {
        const info = parsePovInfo(tokens[idx].info) || { id: "", tier: null };
        const id = md.utils.escapeHtml(info.id);
        const tierAttr = info.tier ? ` data-tier="${md.utils.escapeHtml(info.tier)}"` : "";
        return (
          `<section class="pov-block" data-pov="${id}"${tierAttr} aria-label="POV: ${id}">\n` +
          `<header class="pov-header"><span class="pov-header__name">${id}</span></header>\n`
        );
      }
      return "</section>\n";
    }
  });

  md.core.ruler.push("tier_gate", tierGateRule(buildTier));

  return md;
}

module.exports = { createMarkdownRenderer, parsePovInfo, povTierVisible };
