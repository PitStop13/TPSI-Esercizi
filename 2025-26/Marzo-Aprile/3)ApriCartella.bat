@echo off
if not exist "C:\xampp\htdocs" (
    echo ERRORE: Cartella XAMPP htdocs non trovata!
    pause
    exit /b 1
)
start "" "C:\xampp\htdocs\2025_26\4EINF"
