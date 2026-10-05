@echo off
title Pull da XAMPP

set "destinazione=C:\Users\pietr\Desktop\Scuola\TPSI\2026-27\01 - Settembre - Ottobre\Ripasso\5EINF"
set "xampp_sorg=C:\xampp\htdocs\2026_27\5EINF"

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
