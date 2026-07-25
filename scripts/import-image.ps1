# Converts a source image (typically a Firefly PNG from Downloads) into a
# repo-ready JPG: resized to the site's conventions and re-encoded at a
# sensible quality.
#
# LOCAL AUTHORING TOOL — not part of the build, not run by `npm test`, not
# touched by CI. Windows-only (uses System.Drawing/GDI+).
#
# Site conventions (see story-bible/image-audit-2026-07.md):
#   lore / hero images  ~1600px long edge
#   character portraits ~1200px long edge
#
# Examples:
#   .\scripts\import-image.ps1 -In "$env:USERPROFILE\Downloads\Firefly_xyz.png" `
#       -Out src\images\characters\someone.jpg -MaxEdge 1200
#
#   # keep native size (most Firefly output is already within convention):
#   .\scripts\import-image.ps1 -In ".\foo.png" -Out src\images\lore\bar.jpg

param(
  [Parameter(Mandatory = $true)][string]$In,
  [Parameter(Mandatory = $true)][string]$Out,
  [int]$MaxEdge = 0,          # 0 = leave dimensions alone
  [int]$Quality = 85
)

Add-Type -AssemblyName System.Drawing

if (-not (Test-Path $In)) { throw "Source not found: $In" }

$src = [System.Drawing.Image]::FromFile((Resolve-Path $In))
$srcW = $src.Width; $srcH = $src.Height

$w = $srcW; $h = $srcH
if ($MaxEdge -gt 0) {
  $longEdge = [Math]::Max($srcW, $srcH)
  if ($longEdge -gt $MaxEdge) {
    $scale = $MaxEdge / [double]$longEdge
    $w = [int][Math]::Round($srcW * $scale)
    $h = [int][Math]::Round($srcH * $scale)
  }
}

$outFull = $Out
if (-not [System.IO.Path]::IsPathRooted($outFull)) {
  $outFull = Join-Path (Get-Location) $Out
}
$outDir = Split-Path $outFull -Parent
if (-not (Test-Path $outDir)) { throw "Output directory does not exist: $outDir" }

$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

if ($w -eq $srcW -and $h -eq $srcH) {
  $src.Save($outFull, $enc, $ep)
}
else {
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.DrawImage($src, 0, 0, $w, $h)
  $bmp.Save($outFull, $enc, $ep)
  $g.Dispose(); $bmp.Dispose()
}
$src.Dispose()

Write-Output ("{0}: {1}x{2} -> {3}x{4}, {5} KB" -f (Split-Path $outFull -Leaf), $srcW, $srcH, $w, $h, [int]((Get-Item $outFull).Length / 1KB))
Write-Output "Remember: update the entry's image / image_alt front matter, then run npm test."
