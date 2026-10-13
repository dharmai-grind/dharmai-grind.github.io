# Deploys worker/worker.js to the Cloudflare Worker named "dharmai".
# The API token is read from a private file outside this folder and is never printed.
# Usage (PowerShell):  powershell -ExecutionPolicy Bypass -File tools\deploy-worker.ps1
param(
  [string]$TokenFile = "$env:USERPROFILE\.dharmai\cloudflare-token.txt",
  [string]$ScriptName = "dharmai"
)
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Net.Http

if (-not (Test-Path $TokenFile)) { throw "Token file not found: $TokenFile" }
$token = (Get-Content $TokenFile -Raw).Trim()
if (-not $token) { throw "Token file is empty: $TokenFile" }

$client = New-Object System.Net.Http.HttpClient
$client.DefaultRequestHeaders.Authorization = New-Object System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", $token)
$api = "https://api.cloudflare.com/client/v4"

function Get-Json($url) {
  $res = $client.GetAsync($url).Result
  $body = $res.Content.ReadAsStringAsync().Result
  $json = $body | ConvertFrom-Json
  if (-not $json.success) { throw "Cloudflare API error for $url : $(($json.errors | ForEach-Object { $_.message }) -join '; ')" }
  return $json.result
}

# 1. Check the token works.
$check = Get-Json "$api/user/tokens/verify"
Write-Output "Token OK (status: $($check.status))"

# 2. Find the account that owns the "dharmai" Worker.
$accounts = Get-Json "$api/accounts"
$account = $null; $settings = $null
foreach ($a in $accounts) {
  try { $settings = Get-Json "$api/accounts/$($a.id)/workers/scripts/$ScriptName/settings"; $account = $a; break } catch { }
}
if (-not $account) { throw "Couldn't find a Worker named '$ScriptName' in your accounts (check the token's permissions)." }
Write-Output "Found Worker '$ScriptName' in account '$($account.name)'"

# 3. Keep the existing bindings (AI, DB) and compatibility date.
# Secrets (like ADMIN_CODE) can't be re-sent here; keep_bindings tells Cloudflare to keep them.
$bindings = @($settings.bindings | Where-Object { $_.type -ne "secret_text" })
Write-Output ("Keeping bindings: " + (($settings.bindings | ForEach-Object { "$($_.name) ($($_.type))" }) -join ", "))
$compat = if ($settings.compatibility_date) { $settings.compatibility_date } else { "2025-01-01" }
$metadata = @{ main_module = "worker.js"; compatibility_date = $compat; bindings = $bindings; keep_bindings = @("secret_text") }
if ($settings.compatibility_flags) { $metadata.compatibility_flags = @($settings.compatibility_flags) }
$metaJson = $metadata | ConvertTo-Json -Depth 10 -Compress

# 4. Upload the code.
$code = [System.IO.File]::ReadAllText((Join-Path $PSScriptRoot "..\worker\worker.js"))
$form = New-Object System.Net.Http.MultipartFormDataContent
$metaPart = New-Object System.Net.Http.StringContent($metaJson, [System.Text.Encoding]::UTF8, "application/json")
$form.Add($metaPart, "metadata")
$codePart = New-Object System.Net.Http.StringContent($code, [System.Text.Encoding]::UTF8)
$codePart.Headers.ContentType = New-Object System.Net.Http.Headers.MediaTypeHeaderValue("application/javascript+module")
$form.Add($codePart, "worker.js", "worker.js")
$res = $client.PutAsync("$api/accounts/$($account.id)/workers/scripts/$ScriptName", $form).Result
$json = $res.Content.ReadAsStringAsync().Result | ConvertFrom-Json
if (-not $json.success) { throw "Upload failed: $(($json.errors | ForEach-Object { $_.message }) -join '; ')" }
Write-Output "Uploaded worker.js ($([math]::Round($code.Length / 1024, 1)) KB)"

# 5. Check it's answering.
Start-Sleep -Seconds 3
$probe = New-Object System.Net.Http.HttpClient
$r = $probe.GetAsync("https://$ScriptName.ananya-s13156.workers.dev/").Result
Write-Output ("Worker responds: " + $r.Content.ReadAsStringAsync().Result)
