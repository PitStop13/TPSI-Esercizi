@echo off
:: Verifica se la cartella esiste (utile per debug)
if not exist "C:\xampp\htdocs\2025_26\4EINF" (
    echo ERRORE: Cartella del progetto non trovata!
    pause
    exit /b 1
)

:: Avvia Chrome sull'indirizzo localhost:8080 puntando alla tua sottocartella
start chrome "http://localhost:8080/2025_26/4EINF/"