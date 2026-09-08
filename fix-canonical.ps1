$dir = "c:\Users\admin\Desktop\portaltivi"
$files = Get-ChildItem $dir -File | Where-Object { $_.Extension -in @('.html','.xml','.txt','.js','.json','.css') }
foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    if ($content -match 'portaltivi\.online') {
        $content = $content -ireplace 'portaltivi\.online', 'portaltivi.store'
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated: $($f.Name)"
    }
}
Write-Host "Canonical domain fixed to portaltivi.store!"
