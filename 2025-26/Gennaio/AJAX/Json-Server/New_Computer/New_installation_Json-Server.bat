@echo off
setlocal

where npm >nul 2>nul
if errorlevel 1 (
  echo ERRORE: npm non trovato nel PATH. Installa Node.js prima.
  pause
  exit /b
)

echo Installo json-server globalmente...
call npm install -g json-server
if errorlevel 1 (
  echo ERRORE: installazione json-server fallita.
  pause
  exit /b
)

set "TARGET=C:\Users\p.olivero.3584\AppData\Roaming\npm"

echo Copio people.json in %TARGET% ...
copy /Y "%~dp0people.json" "%TARGET%"
if errorlevel 1 (
  echo ERRORE: copia fallita (controlla permessi/percorso).
  pause
  exit /b
)

echo OK: installazione + copia completate.
pause
