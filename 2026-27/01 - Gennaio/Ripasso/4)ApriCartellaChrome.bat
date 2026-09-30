@echo off
if not exist "C:\xampp\htdocs\2026_27\5EINF" (
    echo ERRORE: Cartella del progetto non trovata!
    pause
    exit /b 1
)

start chrome "http://localhost/2026_27/5EINF/"
start chrome "http://localhost/phpmyadmin/"
