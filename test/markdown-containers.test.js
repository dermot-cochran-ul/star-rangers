// Pins lib/markdown-containers.js — above all the fence-length rule the
// scene/POV structure depends on: a 5-colon "::::: scene" wrapper must not be
// closed early by a nested 3-colon "::: pov" block's closing fence. That
// behaviour lives in markdown-it-container, not in our code, so a dependency
// bump that changed it would silently corrupt scene splitting for every
// chapter (src/_data/scenePovPages.js parses the same token stream). Nothing
// pinned it until now.
const test = require("node:test");
const assert = require("node:assert/strict");

const { createMarkdownRenderer } = require("../lib/markdown-containers");

const md = createMarkdownRenderer();

function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

test("a scene wrapper survives nested pov blocks (the fence-length rule)", () => {
  const html = md.render(
    [
      "::::: scene 1",
      "::: pov aldera",
      "Text A.",
      ":::",
      "::: pov brin",
      "Text B.",
      ":::",
      ":::::",
      ""
    ].join("\n")
  );

  assert.ok(html.includes('<section class="scene" data-scene="1">'));
  assert.equal(count(html, 'class="pov-block"'), 2);
  // The nested ::: closes only its own pov block: both povs render INSIDE
  // the scene, so the output ends pov-close then scene-close. If the
  // fence-length rule regressed, the first ::: would close the scene and
  // this trailing shape would break.
  assert.ok(html.trimEnd().endsWith("</section>\n</section>"));
  assert.ok(html.indexOf("Text B.") < html.lastIndexOf("</section>"));
});

test("a pov block carries its id in data-pov, aria-label and the header", () => {
  const html = md.render("::: pov aldera\nHer view.\n:::\n");
  assert.ok(html.includes('data-pov="aldera"'));
  assert.ok(html.includes('aria-label="POV: aldera"'));
  assert.ok(html.includes('<span class="pov-header__name">aldera</span>'));
});

test("pov blocks render standalone when a chapter has no scene wrapper", () => {
  const html = md.render("::: pov aldera\nHer view.\n:::\n");
  assert.equal(count(html, 'class="pov-block"'), 1);
  assert.ok(!html.includes('class="scene"'));
});

test("the scene number and pov id are HTML-escaped into attributes", () => {
  const scene = md.render('::::: scene 1 "extra"\nBody.\n:::::\n');
  assert.ok(scene.includes('data-scene="1 &quot;extra&quot;"'));

  const pov = md.render('::: pov x"y\nBody.\n:::\n');
  assert.ok(pov.includes('data-pov="x&quot;y"'));
  assert.ok(!pov.includes('data-pov="x"y"'));
});

test("an info string that fails validation renders as plain text, not a container", () => {
  // "::: pov" with no id and ":::: sceneless" match neither validator.
  const html = md.render("::: pov\nBody.\n:::\n");
  assert.ok(!html.includes("pov-block"));

  const scene = md.render("::::: scene\nBody.\n:::::\n");
  assert.ok(!scene.includes('class="scene"'));
});
