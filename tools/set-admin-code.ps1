# Creates a new admin code for the private analytics dashboard, saves it to a
# private file outside this folder, and stores it as the Worker secret ADMIN_CODE.
# The code is never printed here. Run again any time to replace the code.
# Usage: powershell -ExecutionPolicy Bypass -File tools\set-admin-code.ps1
param(
  [string]$TokenFile = "$env:USERPROFILE\.dharmai\cloudflare-token.txt",
  [string]$CodeFile = "$env:USERPROFILE\.dharmai\admin-code.txt",
  [string]$ScriptName = "dharmai"
)
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Net.Http

$token = (Get-Content $TokenFile -Raw).Trim()
$client = New-Object System.Net.Http.HttpClient
$client.DefaultRequestHeaders.Authorization = New-Object System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", $token)
$api = "https://api.cloudflare.com/client/v4"

# Find the account that owns the Worker.
$accounts = ($client.GetAsync("$api/accounts").Result.Content.ReadAsStringAsync().Result | ConvertFrom-Json).result
$accountId = $null
foreach ($a in $accounts) {
  $r = $client.GetAsync("$api/accounts/$($a.id)/workers/scripts/$ScriptName/settings").Result
  if ($r.IsSuccessStatusCode) { $accountId = $a.id; break }
}
if (-not $accountId) { throw "Worker '$ScriptName' not found." }

# A readable random code like "DHARMA-7KQ2-M9XT-4HPW".
$abc = "ABCDEFGHJKMNPQRSTUVWXYZ23456789".ToCharArray()
$rng = New-Object System.Security.Cryptography.RNGCryptoServiceProvider
$bytes = New-Object byte[] 12; $rng.GetBytes($bytes)
$chars = $bytes | ForEach-Object { $abc[$_ % $abc.Length] }
$code = "DHARMA-" + (-join $chars[0..3]) + "-" + (-join $chars[4..7]) + "-" + (-join $chars[8..11])

$body = @{ name = "ADMIN_CODE"; text = $code; type = "secret_text" } | ConvertTo-Json -Compress
$content = New-Object System.Net.Http.StringContent($body, [System.Text.Encoding]::UTF8, "application/json")
$res = $client.PutAsync("$api/accounts/$accountId/workers/scripts/$ScriptName/secrets", $content).Result
$json = $res.Content.ReadAsStringAsync().Result | ConvertFrom-Json
if (-not $json.success) { throw "Couldn't save the secret: $(($json.errors | ForEach-Object { $_.message }) -join '; ')" }

Set-Content -Path $CodeFile -Value $code -Encoding UTF8 -NoNewline
Write-Output "Admin code saved to $CodeFile and set on the Worker."
