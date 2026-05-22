@echo off
if not exist "C:\xampp\htdocs\2025_26\4EINF" (
    echo ERRORE: Cartella del progetto non trovata!
    pause
    exit /b 1
)

start chrome "http://localhost/2025_26/4EINF/"
start chrome "http://localhost/phpmyadmin/"
