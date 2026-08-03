module.exports = function () {
  // SITE_DOMAIN is exported by scripts/cpanel-deploy.sh from deploy.conf's
  // DOMAIN key (see that script) so robots.txt and sitemap.xml carry the
  // right absolute host per cPanel clone. Left unset for local dev and the
  // GitHub Pages workflow, which both want the GH Pages URL itself.
  const domain = String(process.env.SITE_DOMAIN || "dermot-r-cochran.github.io/star-rangers").replace(/\/+$/, "");

  // SITE_NAME and SITE_TITLE are likewise exported by scripts/cpanel-deploy.sh
  // from deploy.conf's own SITE_NAME/SITE_TITLE keys, letting a clone brand
  // itself independently of the shared repo default. SITE_NAME is the short
  // brand shown in the header logo and footer; SITE_TITLE is the browser
  // <title> tag's own suffix (see src/_includes/base.njk) - kept separate so
  // a clone can put a longer/different string in the tab title than in its
  // on-page branding without needing two unrelated overrides.
  // The WORK is titled "Drithane"; the Star Rangers are an organisation
  // INSIDE it. Retitled 2026-08-01 to clear Andre Norton's 1953 novel "Star
  // Rangers" (and a 1987 comic of the same name) - the corps keeps its name in
  // the fiction, and the /star-rangers/ URL paths and alias domains are
  // deliberately unchanged, so only front-of-house branding moved.
  // "Fian-ilchruinne" is the setting umbrella, adopted 2026-08-03 and now
  // the default brand in BOTH slots: the tab carries the settled hyphenated
  // form, the header/footer/homepage-heading carry "Fian Ilchruinne" - the
  // spaced, capitalised display variant Dermot chose for on-page branding
  // the same day. Old Irish fian (the warrior-band) + ilchruinne (Irish for
  // multiverse) - "the multiverse Fianna"; the fused, single-n and fiann-
  // variants are all superseded (story-bible/the-title-and-its-risk.md has
  // the full path). The work is still titled "Drithane" - that name now
  // reaches the default build via the description below and the OG author,
  // not the header. Front of house only: "Grand Ensemble Multiverse"
  // remains the canon in-universe name of the multiverse
  // (src/lore/ensemble-multiverse.md), which is why the description still
  // says it.
  const name = process.env.SITE_NAME || "Fian Ilchruinne";
  const title = process.env.SITE_TITLE || "Fian-ilchruinne";

  // SITE_NOINDEX=true (deploy.conf, threaded per-domain by
  // scripts/cpanel-deploy.sh) marks this build as a testing/staging domain
  // that must not be indexed: robots.txt flips to Disallow: /, every page
  // carries a noindex,nofollow meta, and canonicals are suppressed
  // (see src/robots.njk and src/_includes/base.njk).
  const noindex = String(process.env.SITE_NOINDEX || "").toLowerCase() === "true";

  return {
    name,
    title,
    noindex,
    description: "Drithane is an interactive science-fantasy novel of the Grand Ensemble Multiverse: a station clock forty seconds wrong, and the Star Rangers ordered to measure the drift and guard the public record. The stars call us forward with hope; to protect what is good and to see what is true. One canonical history across the Five Layers and multiple Concordants.",
    url: `https://${domain}/`,
    author: "Drithane",
    language: "en",
    // Open Graph wants a full locale rather than the bare language code above.
    // en_GB rather than en_US because the prose is consistently British/Irish
    // spelling ("licence", "unauthorised", "colour"), and rather than en_IE
    // because the major scrapers' supported-locale lists reliably include
    // en_GB and do not reliably include en_IE - a locale a platform doesn't
    // recognise is worse than the nearest one it does.
    ogLocale: "en_GB"
  };
};
