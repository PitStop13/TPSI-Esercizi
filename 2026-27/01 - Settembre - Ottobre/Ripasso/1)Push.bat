@echo off
title Push a XAMPP

set "sorgente=C:\Users\pietr\Desktop\Scuola\TPSI\2026-27\01 - Settembre - Ottobre\Ripasso\5EINF"
set "xampp_dest=C:\xampp\htdocs\2026_27\5EINF"

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
