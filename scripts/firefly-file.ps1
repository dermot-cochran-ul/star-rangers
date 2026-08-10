# Files downloaded Firefly images into src/images/ at the right size and name,
# and stages them on a branch.
#
# LOCAL AUTHORING TOOL — not part of the build, not run by `npm test`, not
# touched by CI. Windows-only, because it drives import-image.ps1, which is
# (System.Drawing/GDI+). Same standing as make-lore-cards.ps1.
#
# WHY THIS EXISTS: generating twenty-three lore images meant typing each prompt
# into Firefly, saving the file, resizing it, working out which of
# src/images/characters/, src/images/lore/, .../universes/ or .../planets/ it
# belonged in, renaming it, and opening a PR. scripts/firefly-prompts.js
# removes the typing and the place-keeping. This removes everything after the
# download.
#
# HOW PAIRING WORKS: firefly-prompts.js records the order it served prompts in,
# to firefly-out/progress.json. Downloads are taken oldest-first. The two lists
# are zipped together — the Nth prompt you were served pairs with the Nth image
# you downloaded. That holds as long as you download one image per prompt in
# the order you were served them, which is the loop the two scripts describe.
#
# IT IS ALSO WHY -WhatIf EXISTS, AND WHY YOU SHOULD USE IT FIRST. If you
# re-rolled a prompt and downloaded twice, or skipped one, the zip is off by
# one from that point on and every later image lands under the wrong name.
# -WhatIf prints the whole pairing and changes nothing. Read it before you let
# it write. -Map overrides any pair that is wrong.
#
# WHAT STAYS MANUAL, ON PURPOSE:
#
#   - Which download is the keeper. If you generated four variations and saved
#     the best, that choice is already made and this script never second-
#     guesses it.
#   - Writing `image` / `image_alt` into each page's front matter. Alt text
#     describes what the file ACTUALLY SHOWS, which cannot be derived from the
#     prompt that asked for it — see story-bible/images.md, "Alt text is the
#     prompt of record."
#   - Merging. New portraits and lore images are the repo's "draft it and stop"
#     tier: the PR is a proposal.
#
# USAGE
#   .\scripts\firefly-file.ps1 -WhatIf                 # show the pairing, change nothing
#   .\scripts\firefly-file.ps1                         # resize, file, branch
#   .\scripts\firefly-file.ps1 -Map "lore-arilon=Firefly_abc.png"
#   .\scripts\firefly-file.ps1 -From "D:\somewhere"    # not the Downloads folder
#   .\scripts\firefly-file.ps1 -NoBranch               # file into the working tree only
#
# -Since defaults to the last 24 hours, so an old Downloads folder does not
# get dragged in. Widen it if a session ran long.

param(
  [string]$From = "$env:USERPROFILE\Downloads",
  [string[]]$Map,
  [int]$Since = 24,
  [string]$Branch = "",
  [switch]$NoBranch,
  [switch]$WhatIf
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$progressPath = Join-Path $repoRoot "firefly-out\progress.json"

if (-not (Test-Path $From)) { throw "Source folder not found: $From" }

# --- the served order, and the prompt metadata behind each key -------------
if (-not (Test-Path $progressPath)) {
  throw "No $progressPath. Serve some prompts first: node scripts/firefly-prompts.js --next"
}
$served = (Get-Content $progressPath -Raw | ConvertFrom-Json).served
if (-not $served -or $served.Count -eq 0) { throw "Nothing has been served yet." }

# Targets and sizes come from firefly-prompts.js's own --all listing rather
# than being re-derived here. One parser, not two: images.md stays the only
# place a prompt or a target is written down, and this script cannot drift
# from it. Format: '### src/images/<...>  [<n>px]'
$targets = @{}
$lines = & node (Join-Path $PSScriptRoot "firefly-prompts.js") --all
foreach ($l in $lines) {
  if ($l -match '^###\s+(src/images/(characters|lore)/(.+?))\s+\[(\d+)px\]$') {
    $targetRel = $Matches[1]; $dir = $Matches[2]; $rel = $Matches[3] -replace '\.jpg$',''
    $key = ("$dir-$rel" -replace '[/\\]', '-')
    $targets[$key] = @{ Target = $targetRel; MaxEdge = [int]$Matches[4] }
  }
}
if ($targets.Count -eq 0) { throw "Could not read targets from firefly-prompts.js --all." }

# --- the downloads, oldest first -------------------------------------------
$cutoff = (Get-Date).AddHours(-$Since)
$downloads = Get-ChildItem -Path $From -File |
  Where-Object { $_.Extension -match '^\.(png|jpg|jpeg|webp)$' -and $_.LastWriteTime -ge $cutoff } |
  Sort-Object LastWriteTime

# --- build the pairing ------------------------------------------------------
$explicit = @{}
foreach ($m in $Map) {
  $parts = $m -split '=', 2
  if ($parts.Count -ne 2) { throw "Bad -Map value '$m'. Expected <key>=<filename>." }
  $explicit[$parts[0].Trim()] = $parts[1].Trim()
}

$pairs = @()
$autoQueue = [System.Collections.ArrayList]@($downloads)

# Explicit maps claim their file first, so they never consume a slot in the
# positional zip and shift everything after them.
foreach ($key in $served) {
  if ($explicit.ContainsKey($key)) {
    $f = $autoQueue | Where-Object { $_.Name -eq $explicit[$key] } | Select-Object -First 1
    if (-not $f) { throw "-Map named '$($explicit[$key])' for $key, but no such file in $From (within $Since h)." }
    $autoQueue.Remove($f)
  }
}
foreach ($key in $served) {
  if (-not $targets.ContainsKey($key)) {
    Write-Host "SKIP  $key — no prompt with that key in images.md any more" -ForegroundColor Yellow
    continue
  }
  $src = $null
  if ($explicit.ContainsKey($key)) {
    $src = Get-ChildItem -Path $From -File | Where-Object { $_.Name -eq $explicit[$key] } | Select-Object -First 1
  } elseif ($autoQueue.Count -gt 0) {
    $src = $autoQueue[0]; $autoQueue.RemoveAt(0)
  }
  if (-not $src) {
    Write-Host "SKIP  $key — ran out of downloads to pair with" -ForegroundColor Yellow
    continue
  }
  $pairs += [pscustomobject]@{
    Key     = $key
    Source  = $src
    Target  = $targets[$key].Target
    MaxEdge = $targets[$key].MaxEdge
  }
}

if ($pairs.Count -eq 0) { throw "Nothing to pair. Downloads found: $($downloads.Count) in the last $Since h." }

Write-Host "`nPairing $($pairs.Count) of $($served.Count) served prompt(s), from $From (last $Since h):`n"
foreach ($p in $pairs) {
  Write-Host ("  {0,-46} <- {1}" -f $p.Target, $p.Source.Name)
}
if ($autoQueue.Count -gt 0) {
  Write-Host "`n$($autoQueue.Count) download(s) left over and ignored:" -ForegroundColor Yellow
  foreach ($f in $autoQueue) { Write-Host "  $($f.Name)" -ForegroundColor Yellow }
  Write-Host "If that is a surprise, the order is off — use -Map." -ForegroundColor Yellow
}

if ($WhatIf) { Write-Host "`n-WhatIf: nothing changed."; return }

# --- file them --------------------------------------------------------------
Write-Host ""
foreach ($p in $pairs) {
  $dest = Join-Path $repoRoot $p.Target
  $destDir = Split-Path -Parent $dest
  if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Force $destDir | Out-Null }
  & (Join-Path $PSScriptRoot "import-image.ps1") -In $p.Source.FullName -Out $dest -MaxEdge $p.MaxEdge
  Write-Host ("filed  {0}" -f $p.Target) -ForegroundColor Green
}

if ($NoBranch) {
  Write-Host "`n$($pairs.Count) image(s) filed. -NoBranch: not staged."
  return
}

if (-not $Branch) { $Branch = "lore-art-" + (Get-Date -Format "yyyy-MM-dd-HHmm") }

Push-Location $repoRoot
try {
  git checkout -b $Branch
  foreach ($p in $pairs) { git add -- $p.Target }
  git status --short
  Write-Host "`nStaged on branch $Branch." -ForegroundColor Green
} finally {
  Pop-Location
}

Write-Host @"

Still to do — deliberately, not oversights:

  1. Add `image` and `image_alt` to each page's front matter. Write the alt
     text from what the file actually shows, not from the prompt.
  2. Commit, push, open the PR as a proposal — new portraits and lore images
     are the "draft it and stop" tier.
  3. CHANGELOG entry under [Unreleased] if these are going out.
  4. node scripts/firefly-prompts.js --reset   (clears the served list once
     these have landed; entries with a file in src/images/ read as done anyway)
"@
