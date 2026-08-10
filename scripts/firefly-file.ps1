# Files chosen Firefly variations into src/images/ and stages them on a branch.
#
# LOCAL AUTHORING TOOL — not part of the build, not run by `npm test`, not
# touched by CI. Windows-only, because it drives import-image.ps1, which is
# (System.Drawing/GDI+). Same standing as make-lore-cards.ps1.
#
# WHY THIS EXISTS: the bottleneck was never the generating. It was typing each
# prompt into Firefly, saving the file somewhere, resizing it, putting it in
# the right directory under the right name, and opening a PR — twenty-three
# times. scripts/firefly-generate.js removes the typing and the saving. This
# removes the resizing, the filing and the branch.
#
# WHAT IS LEFT MANUAL, AND SHOULD STAY THAT WAY:
#
#   - CHOOSING which variation is the one. That is the judgement the whole
#     pipeline exists to leave to Dermot; four variations are generated so
#     there is something to choose between.
#   - Writing `image` / `image_alt` into the page's front matter. Alt text
#     describes what the file ACTUALLY SHOWS, which cannot be derived from the
#     prompt that asked for it — see story-bible/images.md, "Alt text is the
#     prompt of record."
#   - Merging. New portraits and new lore images are the repo's "draft it and
#     stop" tier: the PR is a proposal, and Dermot reviews it.
#
# USAGE
#   # after: node scripts/firefly-generate.js --go
#   .\scripts\firefly-file.ps1 -Pick "characters-naomi-kestrel=2","lore-arilon=1"
#
#   # everything whose variation 1 you're happy with:
#   .\scripts\firefly-file.ps1 -PickAll 1
#
#   # look first, change nothing:
#   .\scripts\firefly-file.ps1 -PickAll 1 -WhatIf
#
# -Branch defaults to a dated name and is created off the current branch.
# Pass -NoBranch to file the images into the working tree and stop, if you'd
# rather stage them yourself.

param(
  [string[]]$Pick,
  [int]$PickAll = 0,
  [string]$Out = "firefly-out",
  [string]$Branch = "",
  [switch]$NoBranch,
  [switch]$WhatIf
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$manifestPath = Join-Path $repoRoot "$Out\manifest.json"

if (-not (Test-Path $manifestPath)) {
  throw "No manifest at $manifestPath. Run: node scripts/firefly-generate.js --go"
}
if (-not $Pick -and $PickAll -lt 1) {
  throw "Nothing chosen. Pass -Pick `"<key>=<n>`",… or -PickAll <n>."
}

$manifest = (Get-Content $manifestPath -Raw | ConvertFrom-Json).generated

# Build key -> chosen variation number.
$choices = @{}
if ($PickAll -ge 1) {
  foreach ($entry in $manifest) {
    if ($entry.PSObject.Properties.Name -contains 'error') { continue }
    $choices[$entry.key] = $PickAll
  }
}
foreach ($p in $Pick) {
  $parts = $p -split '=', 2
  if ($parts.Count -ne 2) { throw "Bad -Pick value '$p'. Expected <key>=<n>." }
  $choices[$parts[0].Trim()] = [int]$parts[1]
}

$filed = @()
$skipped = @()

foreach ($key in $choices.Keys | Sort-Object) {
  $entry = $manifest | Where-Object { $_.key -eq $key } | Select-Object -First 1
  if (-not $entry) { throw "No manifest entry with key '$key'. Keys: $(($manifest.key) -join ', ')" }
  if ($entry.PSObject.Properties.Name -contains 'error') {
    Write-Host "SKIP  $key — generation failed: $($entry.error)" -ForegroundColor Yellow
    $skipped += $key
    continue
  }

  $n = $choices[$key]
  if ($n -lt 1 -or $n -gt $entry.outputs.Count) {
    throw "$key has $($entry.outputs.Count) variation(s); asked for #$n."
  }

  $srcRel = $entry.outputs[$n - 1].file
  $src = Join-Path $repoRoot "$Out\$srcRel"
  if (-not (Test-Path $src)) { throw "Missing generated file: $src" }

  $dest = Join-Path $repoRoot $entry.target
  $destDir = Split-Path -Parent $dest
  if (-not (Test-Path $destDir)) {
    if ($WhatIf) { Write-Host "would create $destDir" } else { New-Item -ItemType Directory -Force $destDir | Out-Null }
  }

  if ($WhatIf) {
    Write-Host ("would file  {0}  ->  {1}  (max edge {2})" -f $srcRel, $entry.target, $entry.maxEdge)
    $filed += $entry
    continue
  }

  & (Join-Path $PSScriptRoot "import-image.ps1") -In $src -Out $dest -MaxEdge $entry.maxEdge
  if ($LASTEXITCODE -ne 0 -and $null -ne $LASTEXITCODE) { throw "import-image.ps1 failed for $key" }
  Write-Host ("filed  {0}  ->  {1}" -f $srcRel, $entry.target) -ForegroundColor Green
  $filed += $entry
}

if ($WhatIf) { Write-Host "`n-WhatIf: nothing changed."; return }
if ($filed.Count -eq 0) { Write-Host "Nothing filed."; return }

if ($NoBranch) {
  Write-Host "`n$($filed.Count) image(s) filed into the working tree. -NoBranch: not staged."
  return
}

if (-not $Branch) {
  $Branch = "lore-art-" + (Get-Date -Format "yyyy-MM-dd-HHmm")
}

Push-Location $repoRoot
try {
  git checkout -b $Branch
  foreach ($entry in $filed) { git add -- $entry.target }
  git status --short
  Write-Host "`nStaged on branch $Branch." -ForegroundColor Green
} finally {
  Pop-Location
}

Write-Host @"

Still to do before this is a PR — deliberately, not oversights:

  1. Add `image` and `image_alt` to each page's front matter. Write the alt
     text from what the file actually shows, not from the prompt.
  2. Commit, push, and open the PR as a proposal for review — new portraits
     and lore images are the repo's "draft it and stop" tier.
  3. Add a CHANGELOG entry under [Unreleased] if these are going out.
"@
