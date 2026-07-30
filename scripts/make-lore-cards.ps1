# Batch driver: generates the designed title cards for lore entries that have
# no image, by calling make-codex-cover.ps1 once per row of the table below.
#
# LOCAL AUTHORING TOOL — not part of the build, not run by `npm test`, not
# touched by CI. Windows-only, because make-codex-cover.ps1 is (System.Drawing/
# GDI+).
#
# WHY THIS EXISTS: the nine cards below are data, not decisions. The decisions
# are already made and recorded in story-bible/images.md's Open work 5. Pasting
# nine seven-line invocations into a shell re-creates exactly the problem
# make-codex-cover.ps1 was written to solve — its own header notes that the
# original codex covers "were produced ad hoc and never scripted, so a broken or
# missing cover had no reproducible way to be rebuilt." That reasoning covers
# *which* cards exist as much as how one is drawn. Same rationale as
# generate-themes.js: a mechanical derivation belongs in a script so nobody
# hand-maintains its outputs.
#
# READ THIS BEFORE RUNNING — what these cards will and will not look like:
#
#   make-codex-cover.ps1 emits a SQUARE 1600x1600 card in a fixed blue palette,
#   with no emblem. The four existing lore cards (lore/cerebraun-hegemony.jpg,
#   celtic-union-of-planets.jpg, orbital-habitats-compact.jpg, levrils.jpg) are
#   1600x900 landscape, individually tinted, and carry a device inside a ringed
#   seal. They did NOT come from this generator and it cannot reproduce them —
#   how they were made is unrecorded (they landed in #187 with no entry in
#   story-bible/image-prompts.md). See images.md Open work 5.
#
#   So these nine will read as *codex-style* title cards, consistent with
#   src/images/codex/*.jpg and not with those four lore cards. That is a real
#   inconsistency and it is Dermot's call whether to accept it, extend the
#   generator with a landscape/emblem mode first, or drop the batch.
#
# Usage:
#   .\scripts\make-lore-cards.ps1                 # generate any that are missing
#   .\scripts\make-lore-cards.ps1 -Only institute # just the rows matching "institute"
#   .\scripts\make-lore-cards.ps1 -Force          # overwrite files that already exist
#   .\scripts\make-lore-cards.ps1 -List           # print the table, generate nothing
#
# Existing files are SKIPPED unless -Force, so a re-run cannot clobber a card
# that has since been replaced by hand.
#
# After generating, add `image` and `image_alt` to the entry's front matter.
# Per the standing rule in images.md, write the alt text from what the file
# actually shows — for one of these that means the card's layout and text, not
# the prose of the entry it fronts.

param(
  [string]$Only = "",
  [switch]$Force,
  [switch]$List
)

$ErrorActionPreference = "Stop"

# Subtitles are NOT auto-fitted by the generator (only the title is), so keep
# them to roughly 34 characters or they will run past the canvas edge. The two
# longest shipped examples are 32 chars ("Governing State of the Cerebraun")
# and 26 ("The One Confirmed Exception").
$MaxSubtitle = 34

# Institution and Author are deliberately left empty on every row. Codex covers
# carry them because a codex entry is one named source's account; lore is the
# Archive's own settled voice and has no author to name.
$cards = @(
  @{ Slug = "communion-of-the-called"
     Title = @("THE COMMUNION", "OF THE CALLED")
     Category = "INSTITUTIONS"
     Subtitle = "No Rank Inside It"
     Motif = "rules" }

  @{ Slug = "solar-system-concord"
     Title = @("THE SOLAR SYSTEM", "CONCORD")
     Category = "CIVIL LAW"
     Subtitle = "The Concordant, Restyled 2790"
     Motif = "rules" }

  @{ Slug = "the-commonwealth"
     Title = @("THE COMMONWEALTH")
     Category = "INSTITUTIONS"
     Subtitle = "A Table, and a Protocol"
     Motif = "rules" }

  @{ Slug = "star-rangers-frontier-corps"
     Title = @("THE FRONTIER CORPS")
     Category = "STAR RANGERS"
     Subtitle = "A Mandate Designed to End"
     Motif = "rules" }

  @{ Slug = "star-rangers-science-corps"
     Title = @("THE SCIENCE CORPS")
     Category = "STAR RANGERS"
     Subtitle = "Interpreting What Survey Collects"
     Motif = "rules" }

  # dissolution rather than rules: the entry's whole stance is that nothing has
  # been established beyond the disagreement between instruments.
  @{ Slug = "the-institute"
     Title = @("THE INSTITUTE")
     Category = "SCEPTICAL TRADITION"
     Subtitle = "Nothing Established Beyond It"
     Motif = "dissolution" }

  # The only row with a stamp. Reading as a lawful trading entity is the point —
  # everything about the Combine was licensed — so the stamp records its end
  # rather than branding it as an offender.
  @{ Slug = "hyperfold-yield-combine"
     Title = @("HYPERFOLD", "YIELD COMBINE")
     Category = "COMMERCIAL CONCERN"
     Subtitle = "Licensed, Audited, Lawful"
     Stamp = "DISSOLVED"
     Motif = "dissolution" }

  @{ Slug = "habitat-threshold"
     Title = @("THE HABITAT", "THRESHOLD")
     Category = "CHARTER LAW"
     Subtitle = "Where a Station Becomes a Polity"
     Motif = "rules" }

  @{ Slug = "eden-ring-rail"
     Title = @("THE RING-RAIL")
     Category = "EDEN HABITAT"
     Subtitle = "The Inner Rim, All the Way Round"
     Motif = "rules" }
)

$repoRoot = Split-Path -Parent $PSScriptRoot
$generator = Join-Path $PSScriptRoot "make-codex-cover.ps1"

if (-not (Test-Path $generator)) {
  throw "Cannot find make-codex-cover.ps1 next to this script (looked in $PSScriptRoot)."
}

$selected = $cards
if (-not [string]::IsNullOrWhiteSpace($Only)) {
  $selected = $cards | Where-Object { $_.Slug -like "*$Only*" }
  if (-not $selected) {
    throw "-Only '$Only' matched none of: $(($cards | ForEach-Object { $_.Slug }) -join ', ')"
  }
}

# Fail before writing anything rather than halfway through the batch.
foreach ($c in $selected) {
  if ($c.Subtitle.Length -gt $MaxSubtitle) {
    throw ("Subtitle for '{0}' is {1} chars; the generator does not auto-fit subtitles, so keep it to {2}. Value: '{3}'" -f $c.Slug, $c.Subtitle.Length, $MaxSubtitle, $c.Subtitle)
  }
}

if ($List) {
  $selected | ForEach-Object {
    [pscustomobject]@{
      Slug     = $_.Slug
      Title    = ($_.Title -join " / ")
      Category = $_.Category
      Subtitle = $_.Subtitle
      Motif    = $_.Motif
      Stamp    = $(if ($_.ContainsKey("Stamp")) { $_.Stamp } else { "" })
    }
  } | Format-Table -AutoSize
  return
}

$made = 0; $skipped = 0
foreach ($c in $selected) {
  $out = Join-Path $repoRoot ("src\images\lore\{0}.jpg" -f $c.Slug)

  if ((Test-Path $out) -and (-not $Force)) {
    Write-Output ("SKIP  {0} (exists; -Force to overwrite)" -f $c.Slug)
    $skipped++
    continue
  }

  # Deliberately not named $args — that is an automatic variable in PowerShell.
  $params = @{
    TitleLines = $c.Title
    Category   = $c.Category
    Subtitle   = $c.Subtitle
    Motif      = $c.Motif
    Out        = $out
  }
  if ($c.ContainsKey("Stamp")) { $params["Stamp"] = $c.Stamp }

  & $generator @params
  $made++
}

Write-Output ("`nDone: {0} written, {1} skipped." -f $made, $skipped)
Write-Output "Next: add image/image_alt to each entry's front matter, and record"
Write-Output "the run in story-bible/image-prompts.md per that file's own rule."
