@echo off
title Pull da XAMPP

set "destinazione=C:\Users\pietr\Desktop\Scuola\TPSI\2025-26\Marzo-Aprile\2025_26\4EINF"
set "xampp_sorg=C:\xampp\htdocs\2025_26\4EINF"

if not exist "%xampp_sorg%" (
    echo ERRORE: Cartella XAMPP vuota o non trovata!
    pause
    exit /b 1
)

if not exist "%destinazione%" (
    echo ERRORE: Cartella destinazione non trovata!
    echo %destinazione%
    pause
    exit /b 1
)

robocopy "%xampp_sorg%" "%destinazione%" /MIR /NFL /NDL /NJH /NJS >nul
echo Completato con successo!
timeout /t 2 >nul
exit
