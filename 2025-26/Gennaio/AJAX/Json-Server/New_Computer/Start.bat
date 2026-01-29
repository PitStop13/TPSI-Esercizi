@echo off
setlocal

set "TARGET=C:\Users\p.olivero.3584\AppData\Roaming\npm"

REM Avvia in una finestra separata e la lascia aperta (/k)
start "JSON Server :3000" cmd /k "cd /D %TARGET% && json-server --host 127.0.0.1 --port 3000 people.json"
