$baseUrl = "http://localhost:5000/api/auth"
$headers = @{ "Content-Type" = "application/json" }

Write-Host "Registering user..."
$registerBody = @{
    name = "Test Student"
    collegeEmail = "student@college.edu"
    enrollmentNumber = "EN12345"
    password = "password123"
} | ConvertTo-Json

try {
    $regResponse = Invoke-RestMethod -Uri "$baseUrl/register" -Method Post -Headers $headers -Body $registerBody
    Write-Host "Register Response:"
    $regResponse | ConvertTo-Json -Depth 5
    $token = $regResponse.data.token
} catch {
    Write-Host "Error during registration:"
    $_.Exception.Response.Content
    exit
}

Write-Host "Logging in..."
$loginBody = @{
    collegeEmail = "student@college.edu"
    password = "password123"
} | ConvertTo-Json

try {
    $logResponse = Invoke-RestMethod -Uri "$baseUrl/login" -Method Post -Headers $headers -Body $loginBody
    Write-Host "Login Response:"
    $logResponse | ConvertTo-Json -Depth 5
} catch {
    Write-Host "Error during login:"
    $_.Exception.Response.Content
}

$authHeaders = @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer $token"
}

Write-Host "Getting profile..."
try {
    $meResponse = Invoke-RestMethod -Uri "$baseUrl/me" -Method Get -Headers $authHeaders
    Write-Host "Profile Response:"
    $meResponse | ConvertTo-Json -Depth 5
} catch {
    Write-Host "Error getting profile:"
    $_.Exception.Response.Content
}
