@echo off
title Push a XAMPP

set "sorgente=C:\Users\pietr\Desktop\Scuola\TPSI\2025-26\Marzo-Aprile\2025_26\4EINF"
set "xampp_dest=C:\xampp\htdocs\2025_26\4EINF"

if not exist "%sorgente%" (
    echo ERRORE: Cartella sorgente non trovata!
    echo %sorgente%
    pause
    exit /b 1
)

if not exist "C:\xampp\htdocs" (
    echo ERRORE: Cartella XAMPP htdocs non trovata!
    pause
    exit /b 1
)

robocopy "%sorgente%" "%xampp_dest%" /MIR /NFL /NDL /NJH /NJS >nul
echo Completato con successo!
timeout /t 2 >nul
exit
