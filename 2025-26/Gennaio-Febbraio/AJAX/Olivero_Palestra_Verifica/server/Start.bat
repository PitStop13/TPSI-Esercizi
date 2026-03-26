@echo off
setlocal

:: Vai nella CARTELLA di questo BAT (dove c'è db.json)
cd /d "%~dp0"

:: Avvia json-server (usa npx = sempre funziona)
start "JSON Server :3000" cmd /k "npx json-server --watch db.json --port 3000"
