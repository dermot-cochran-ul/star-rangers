// Wires up the header search box to the Pagefind index that `npm run
// build` generates after Eleventy runs (see package.json) - loaded via a
// dynamic import so a page with no index yet (e.g. `npm start`, which
// doesn't run Pagefind) just fails the import and search silently does
// nothing, rather than breaking the page.
(function () {
  const container = document.querySelector(".site-search");
  const input = document.getElementById("site-search-input");
  const results = document.getElementById("site-search-results");
  if (!container || !input || !results) return;

  const bundlePath = container.dataset.pagefindBundle;
  let pagefind = null;

  async function loadPagefind() {
    if (pagefind) return pagefind;
    try {
      pagefind = await import(`${bundlePath}pagefind.js`);
      await pagefind.init();
    } catch (err) {
      // Deliberately no UI: a dev server has no index and that's fine. But a
      // production failure (missing index, CSP blocking Pagefind's WASM)
      // looks identical from the outside, so leave a trace for the console.
      console.warn("Search unavailable:", err);
      pagefind = null;
    }
    return pagefind;
  }

  function closeResults() {
    results.hidden = true;
    results.innerHTML = "";
    input.setAttribute("aria-expanded", "false");
  }

  function renderResults(items) {
    if (!items.length) {
      results.innerHTML = '<p class="site-search__empty">No results.</p>';
    } else {
      const list = document.createElement("ul");
      list.className = "site-search__list";
      for (const item of items) {
        const li = document.createElement("li");
        li.className = "site-search__result";
        const a = document.createElement("a");
        a.href = item.url;
        a.className = "site-search__result-link";
        const title = document.createElement("span");
        title.className = "site-search__result-title";
        title.textContent = item.meta && item.meta.title ? item.meta.title : item.url;
        const excerpt = document.createElement("span");
        excerpt.className = "site-search__result-excerpt";
        excerpt.innerHTML = item.excerpt;
        a.appendChild(title);
        a.appendChild(excerpt);
        li.appendChild(a);
        list.appendChild(li);
      }
      results.innerHTML = "";
      results.appendChild(list);
    }
    results.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  async function runSearch(term) {
    if (!term.trim()) {
      closeResults();
      return;
    }
    const pf = await loadPagefind();
    if (!pf) return;
    const search = await pf.debouncedSearch(term, {}, 200);
    if (!search) return; // superseded by a newer keystroke
    const items = await Promise.all(search.results.slice(0, 8).map((r) => r.data()));
    renderResults(items);
  }

  input.addEventListener("input", (event) => runSearch(event.target.value));

  document.addEventListener("click", (event) => {
    if (!container.contains(event.target)) closeResults();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeResults();
  });
})();
