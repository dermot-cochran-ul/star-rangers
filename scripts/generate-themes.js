#!/usr/bin/env node
//
// Regenerates every src/css/theme-<name>.css from src/css/main.css plus the
// small per-theme palette registry below.
//
// Every theme file used to be a hand-maintained full copy of main.css with
// a different :root block - which meant any structural change to main.css
// (a new selector, a bugfix like the sitewide `a{}` link-color fallback)
// had to be manually re-applied to every theme file, and silently wasn't:
// theme-fellowship.css, theme-pets.css, and theme-starquest.css had all
// drifted out of sync with main.css before this script existed. This
// script makes "in sync with main.css" structural by construction: it
// takes main.css verbatim and only swaps in each theme's :root custom
// properties, its five .pov-block--<character> colors, and its
// .character-badge--status-active color - nothing else can differ.
//
// Run after ANY change to main.css's rules (not just after adding a
// theme) to re-propagate that change to every theme file:
//
//   npm run generate-themes
//
const fs = require("fs");
const path = require("path");

const CSS_DIR = path.join(__dirname, "..", "src", "css");
const MAIN_CSS_PATH = path.join(CSS_DIR, "main.css");

// POV characters in the fixed order main.css itself lists them.
const POV_CHARACTERS = ["galahad", "elvira", "aldera", "krenyi", "thorn"];

const THEMES = {
  // --- Narrative/domain re-skins (existing production themes; palette
  // values below are unchanged from before this script existed - only
  // the surrounding structure is now guaranteed in sync with main.css) ---
  fellowship: {
    label: 'Fian Ilchruinne — "Fellowship of Light" Theme',
    description: "Warm, luminous re-skin for the fellowship-of-light domain.",
    root: {
      "--color-bg": "#fbf8f0",
      "--color-surface": "#f5efdc",
      "--color-surface-2": "#ece0c1",
      "--color-border": "#ddc797",
      "--color-text": "#332c1e",
      "--color-text-muted": "#766b53",
      "--color-accent": "#8a660e",
      "--color-accent-hover": "#b8891f",
      "--color-canon": "#2a577d",
      "--color-pov-active": "#8a660e",
      "--color-pov-bg": "#f5efdc",
      "--color-skip-bg": "#8a660e",
      "--color-skip-text": "#fbf8f0",
      "--font-body": '"Palatino Linotype", "Book Antiqua", Georgia, serif'
    },
    povBlock: {
      galahad: "#2a577d",
      elvira: "#b5567a",
      aldera: "#6a9c5f",
      krenyi: "#8a660e",
      thorn: "#a85a3f"
    },
    statusActive: "#6a9c5f"
  },
  pets: {
    label: 'Fian Ilchruinne — "Pets" Theme (undercover-pets.com)',
    description: "Warm, friendly re-skin.",
    root: {
      "--color-bg": "#fdf6ec",
      "--color-surface": "#fbead4",
      "--color-surface-2": "#f6dfc0",
      "--color-border": "#e8c9a0",
      "--color-text": "#4a3728",
      "--color-text-muted": "#8a6f56",
      "--color-accent": "#e07856",
      "--color-accent-hover": "#c95f3f",
      "--color-canon": "#d98a2b",
      "--color-pov-active": "#e07856",
      "--color-pov-bg": "#fbead4",
      "--color-skip-bg": "#e07856",
      "--color-skip-text": "#fdf6ec"
    },
    povBlock: {
      galahad: "#d97a4e",
      elvira: "#c5638a",
      aldera: "#7fa872",
      krenyi: "#d9a94e",
      thorn: "#c15c4f"
    },
    statusActive: "#7fa872"
  },
  starquest: {
    label: "Fian Ilchruinne — \"Starquest\" Theme",
    description: "Deep-space, neon-accent re-skin for the starquest domain.",
    root: {
      "--color-bg": "#060714",
      "--color-surface": "#0d1128",
      "--color-surface-2": "#161b3d",
      "--color-border": "#2a3166",
      "--color-text": "#e6ecff",
      "--color-text-muted": "#8d95c9",
      "--color-accent": "#35e0c9",
      "--color-accent-hover": "#6ff2de",
      "--color-canon": "#ff9f43",
      "--color-pov-active": "#35e0c9",
      "--color-pov-bg": "#131736",
      "--color-skip-bg": "#35e0c9",
      "--color-skip-text": "#060714"
    },
    povBlock: {
      galahad: "#35e0c9",
      elvira: "#ff5da2",
      aldera: "#7cf58a",
      krenyi: "#ffcc4d",
      thorn: "#ff6b6b"
    },
    statusActive: "#7cf58a"
  },
  "church-space": {
    label: 'Fian Ilchruinne — "Church Space" Theme (church-space.site/.online)',
    description: "Candlelit stone and stained-glass re-skin for the private church-space domain.",
    root: {
      "--color-bg": "#f7f2e6",
      "--color-surface": "#efe4c8",
      "--color-surface-2": "#e2d2a3",
      "--color-border": "#b99a5b",
      "--color-text": "#2c2013",
      "--color-text-muted": "#6e5c40",
      "--color-accent": "#7a1f2b",
      "--color-accent-hover": "#9c2836",
      "--color-canon": "#1f4d6b",
      "--color-pov-active": "#7a1f2b",
      "--color-pov-bg": "#efe4c8",
      "--color-skip-bg": "#7a1f2b",
      "--color-skip-text": "#f7f2e6",
      "--font-body": '"Palatino Linotype", "Book Antiqua", Georgia, serif'
    },
    povBlock: {
      galahad: "#1f4d6b",
      elvira: "#7a1f2b",
      aldera: "#3c6b35",
      krenyi: "#b98a2b",
      thorn: "#5b3b8a"
    },
    statusActive: "#3c6b35"
  },

  // --- Standard, non-domain-specific themes: general-purpose display
  // options any deploy.conf's THEME can pick, independent of narrative
  // branding. See sample-deploy.conf for a one-line summary of each. ---
  light: {
    label: "Fian Ilchruinne — Light Theme",
    description: "Standard light/day mode - the site's only non-dark option.",
    root: {
      "--color-bg": "#f7f8fc",
      "--color-surface": "#ffffff",
      "--color-surface-2": "#e9ecf7",
      "--color-border": "#cbd2e8",
      "--color-text": "#1b1e2e",
      "--color-text-muted": "#565c7a",
      "--color-accent": "#3452c4",
      "--color-accent-hover": "#23349c",
      "--color-canon": "#a8710a",
      "--color-pov-active": "#3452c4",
      "--color-pov-bg": "#eef0fa",
      "--color-skip-bg": "#3452c4",
      "--color-skip-text": "#ffffff"
    },
    povBlock: {
      galahad: "#3452c4",
      elvira: "#b23a68",
      aldera: "#2f7a3c",
      krenyi: "#a8710a",
      thorn: "#b8402f"
    },
    statusActive: "#2f7a3c"
  },
  "high-contrast": {
    label: "Fian Ilchruinne — High-Contrast Theme",
    description: "Maximal-contrast black/white/yellow, for low-vision accessibility.",
    root: {
      "--color-bg": "#000000",
      "--color-surface": "#000000",
      "--color-surface-2": "#1a1a1a",
      "--color-border": "#ffffff",
      "--color-text": "#ffffff",
      "--color-text-muted": "#d0d0d0",
      "--color-accent": "#ffee00",
      "--color-accent-hover": "#fff87a",
      "--color-canon": "#00e5ff",
      "--color-pov-active": "#ffee00",
      "--color-pov-bg": "#1a1a1a",
      "--color-skip-bg": "#ffee00",
      "--color-skip-text": "#000000"
    },
    povBlock: {
      galahad: "#ffee00",
      elvira: "#ff66ff",
      aldera: "#00ff66",
      krenyi: "#ffa500",
      thorn: "#ff3333"
    },
    statusActive: "#00ff66"
  },
  sepia: {
    label: "Fian Ilchruinne — Sepia Theme",
    description: "Warm parchment/e-reader tone for long reading sessions.",
    root: {
      "--color-bg": "#f4ecd8",
      "--color-surface": "#ede0c4",
      "--color-surface-2": "#e3d3ac",
      "--color-border": "#cbb98a",
      "--color-text": "#3b2f1e",
      "--color-text-muted": "#7a6a4c",
      "--color-accent": "#8b5a2b",
      "--color-accent-hover": "#6e4520",
      "--color-canon": "#a13d2b",
      "--color-pov-active": "#8b5a2b",
      "--color-pov-bg": "#ede0c4",
      "--color-skip-bg": "#8b5a2b",
      "--color-skip-text": "#f4ecd8",
      "--font-body": '"Palatino Linotype", "Book Antiqua", Georgia, serif'
    },
    povBlock: {
      galahad: "#8b5a2b",
      elvira: "#a1466b",
      aldera: "#4c7a3d",
      krenyi: "#b8860b",
      thorn: "#a13d2b"
    },
    statusActive: "#4c7a3d"
  },
  solarized: {
    label: "Fian Ilchruinne — Solarized Theme",
    description: "Ethan Schoonover's Solarized Dark palette, for the developer-familiar reader.",
    root: {
      "--color-bg": "#002b36",
      "--color-surface": "#073642",
      "--color-surface-2": "#0a4552",
      "--color-border": "#586e75",
      "--color-text": "#839496",
      "--color-text-muted": "#657b83",
      "--color-accent": "#268bd2",
      "--color-accent-hover": "#2aa198",
      "--color-canon": "#b58900",
      "--color-pov-active": "#268bd2",
      "--color-pov-bg": "#073642",
      "--color-skip-bg": "#268bd2",
      "--color-skip-text": "#002b36"
    },
    povBlock: {
      galahad: "#268bd2",
      elvira: "#d33682",
      aldera: "#859900",
      krenyi: "#b58900",
      thorn: "#dc322f"
    },
    statusActive: "#859900"
  }
};

// The rest of :root (spacing/radius/transition/font-ui/font-mono, and
// font-body when a theme doesn't override it) is shared boilerplate every
// theme keeps identical to main.css.
const SHARED_ROOT_DEFAULTS = {
  "--font-body": '"Georgia", "Times New Roman", serif',
  "--font-ui": 'system-ui, "Segoe UI", Roboto, sans-serif',
  "--font-mono": '"Courier New", Courier, monospace',
  "--max-prose": "72ch",
  "--radius": "4px",
  "--radius-lg": "8px",
  "--spacing-xs": "0.25rem",
  "--spacing-sm": "0.5rem",
  "--spacing-md": "1rem",
  "--spacing-lg": "2rem",
  "--spacing-xl": "3rem",
  "--transition": "200ms ease"
};

const ROOT_KEY_ORDER = [
  "--color-bg", "--color-surface", "--color-surface-2", "--color-border",
  "--color-text", "--color-text-muted", "--color-accent", "--color-accent-hover",
  "--color-canon", "--color-pov-active", "--color-pov-bg", "--color-skip-bg",
  "--color-skip-text", "--font-body", "--font-ui", "--font-mono", "--max-prose",
  "--radius", "--radius-lg", "--spacing-xs", "--spacing-sm", "--spacing-md",
  "--spacing-lg", "--spacing-xl", "--transition"
];

function buildRootBlock(theme) {
  const merged = { ...SHARED_ROOT_DEFAULTS, ...theme.root };
  const lines = ROOT_KEY_ORDER.map((key) => `  ${key}: ${merged[key]};`);
  return `:root {\n${lines.join("\n")}\n}`;
}

function buildBanner(theme) {
  return [
    "/* =============================================",
    `   ${theme.label}`,
    `   ${theme.description}`,
    "   Generated by scripts/generate-themes.js from",
    "   main.css - do not hand-edit; edit this theme's",
    "   entry in that script's THEMES registry instead.",
    "   ============================================= */"
  ].join("\n");
}

function generate(name, theme) {
  const main = fs.readFileSync(MAIN_CSS_PATH, "utf8");

  let out = main.replace(
    /\/\* =+\n[\s\S]*?=+ \*\//,
    buildBanner(theme)
  );

  out = out.replace(/:root \{[\s\S]*?\n\}/, buildRootBlock(theme));

  for (const character of POV_CHARACTERS) {
    const color = theme.povBlock[character];
    const re = new RegExp(
      `(\\.pov-block--${character}\\s*\\{ border-left-color: )#[0-9a-fA-F]{3,8}(; \\})`
    );
    if (!re.test(out)) {
      throw new Error(`theme "${name}": .pov-block--${character} rule not found in main.css`);
    }
    out = out.replace(re, `$1${color}$2`);
  }

  const statusRe = /(\.character-badge--status-active \{\n {2}color: )#[0-9a-fA-F]{3,8};(\n {2}border-color: )#[0-9a-fA-F]{3,8};/;
  if (!statusRe.test(out)) {
    throw new Error(`theme "${name}": .character-badge--status-active rule not found in main.css`);
  }
  out = out.replace(statusRe, `$1${theme.statusActive};$2${theme.statusActive};`);

  const outPath = path.join(CSS_DIR, `theme-${name}.css`);
  fs.writeFileSync(outPath, out);
  console.log(`wrote ${path.relative(process.cwd(), outPath)}`);
}

for (const [name, theme] of Object.entries(THEMES)) {
  generate(name, theme);
}
