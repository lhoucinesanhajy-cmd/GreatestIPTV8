$dir = "c:\Users\admin\Desktop\portaltivi"

# === STEP 1: HTML files ===
Write-Host "--- Processing HTML files ---"
$htmlFiles = Get-ChildItem $dir -Filter "*.html" -File
foreach ($f in $htmlFiles) {
    $c = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    # Fix split logo FIRST (before generic replace picks up strimiotv elsewhere)
    $c = $c -replace 'strimio<span class="logo-accent">tv</span>', 'portal<span class="logo-accent">tivi</span>'
    # Replace all remaining strimiotv instances (case-insensitive)
    $c = $c -ireplace 'strimiotv', 'portaltivi'
    [System.IO.File]::WriteAllText($f.FullName, $c, [System.Text.Encoding]::UTF8)
    Write-Host "  Updated: $($f.Name)"
}

# === STEP 2: Other text files (xml, txt, js, json) ===
Write-Host "--- Processing other files ---"
$others = Get-ChildItem $dir -File | Where-Object { $_.Extension -in @(".txt",".xml",".js",".json") }
foreach ($f in $others) {
    $c = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $c = $c -ireplace 'strimiotv', 'portaltivi'
    [System.IO.File]::WriteAllText($f.FullName, $c, [System.Text.Encoding]::UTF8)
    Write-Host "  Updated: $($f.Name)"
}

# === STEP 3: CSS — brand comment + Lemon-Purple color scheme ===
Write-Host "--- Processing style.css (colors) ---"
$cssPath = "$dir\style.css"
$css = [System.IO.File]::ReadAllText($cssPath, [System.Text.Encoding]::UTF8)

# Brand name in comments
$css = $css -ireplace 'strimiotv', 'portaltivi'

# Primary accent: Blue (#1565C0) → Lemon (#C8D900)
$css = $css -replace '(--red:\s+)#1565C0', '${1}#C8D900'
$css = $css -replace '(--red-dark:\s+)#0d47a1', '${1}#9aaa00'
$css = $css -replace '(--red-light:\s+)#42a5f5', '${1}#e0f000'
$css = $css -replace '(--orange-dark:\s+)#1565C0', '${1}#C8D900'
$css = $css -replace '(--orange-light:\s+)#42a5f5', '${1}#e0f000'
$css = $css -replace 'Blue \. White \. Purple \. Black', 'Lemon . Purple . White . Black'

# Button gradients: Blue → Purple
$css = $css -replace [regex]::Escape('linear-gradient(135deg, #1565C0, #0d47a1)'), 'linear-gradient(135deg, #7c3aed, #5b21b6)'
$css = $css -replace [regex]::Escape('linear-gradient(90deg, #1565C0, #42a5f5)'), 'linear-gradient(90deg, #7c3aed, #a78bfa)'
$css = $css -replace [regex]::Escape('linear-gradient(90deg, #1565C0, #ffffff)'), 'linear-gradient(90deg, #7c3aed, #c4b5fd)'

# All rgba(21,101,192,...) → purple rgba(124,58,237,...)
$css = $css -replace [regex]::Escape('rgba(21,101,192,'), 'rgba(124,58,237,'

# wa-badge solid blue hex
$css = $css -replace [regex]::Escape('background: #1565C0;'), 'background: #7c3aed;'

# Any leftover standalone #1565C0 → lemon (accent text contexts)
$css = $css -replace '#1565C0', '#C8D900'
# Any leftover #0d47a1 → purple dark
$css = $css -replace '#0d47a1', '#5b21b6'
# Any leftover #42a5f5 → lemon light
$css = $css -replace '#42a5f5', '#e0f000'

[System.IO.File]::WriteAllText($cssPath, $css, [System.Text.Encoding]::UTF8)
Write-Host "  Updated: style.css (Lemon-Purple scheme applied)"

Write-Host ""
Write-Host "=== REBRANDING COMPLETE: strimiotv -> portaltivi ==="
Write-Host "=== COLOR SCHEME: Lemon-Purple applied to style.css ==="
