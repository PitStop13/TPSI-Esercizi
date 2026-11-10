@echo off
setlocal

set "NPM_BIN=%APPDATA%\npm"
set "NPM_MODULES=%APPDATA%\npm\node_modules"

echo Configurazione PATH utente per: %USERNAME%
echo.

:: Aggiunge le cartelle npm e node_modules al PATH dell'utente corrente
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$pathsToAdd = @('%NPM_BIN%', '%NPM_MODULES%'); " ^
    "$userPath = [Environment]::GetEnvironmentVariable('Path', 'User'); " ^
    "if (-not $userPath) { $userPath = '' }; " ^
    "$pathList = [System.Collections.Generic.List[string]]($userPath -split ';' | Where-Object { $_ -ne '' }); " ^
    "foreach ($p in $pathsToAdd) { " ^
    "    if (-not ($pathList -contains $p)) { " ^
    "        $pathList.Add($p); " ^
    "        Write-Host '[OK] Aggiunto al Path: ' $p -ForegroundColor Green " ^
    "    } else { " ^
    "        Write-Host '[INFO] Gia'' presente nel Path: ' $p -ForegroundColor Yellow " ^
    "    } " ^
    "}; " ^
    "[Environment]::SetEnvironmentVariable('Path', ($pathList -join ';'), 'User');"

echo.
:: Controlla solo se TypeScript e' presente, senza installare nulla
if exist "%NPM_BIN%\tsc.cmd" (
    echo [OK] TypeScript trovato in "%NPM_BIN%\tsc.cmd"
) else (
    echo [AVVISO] TypeScript non trovato nella cartella globale dell'utente.
)

echo.
pause