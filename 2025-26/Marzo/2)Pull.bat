@echo off
title Copia da XAMPP a Scuola (4EINF)
setlocal enabledelayedexpansion

echo Scegli drive scuola:
echo 1. D: (scuola)
echo 2. F: (casa)
set /p scelta="Inserisci 1 o 2: "

if "%scelta%"=="1" set "scuola=D:"
if "%scelta%"=="2" set "scuola=F:"
if not defined scuola (
    echo Errore: scelta non valida.
    pause
    exit /b 1
)

set "xampp_sorg=C:\xampp\htdocs\2025_26\4EINF"
set "dest=%scuola%\TPSI\2025-26\Marzo\2025_26\4EINF"

if not exist "C:\xampp\htdocs" (
    echo ERRORE: Cartella XAMPP htdocs non trovata!
    pause
    exit /b 1
)

if not exist "%xampp_sorg%" (
    echo ERRORE: Cartella XAMPP vuota o non trovata: %xampp_sorg%
    pause
    exit /b 1
)

robocopy "%xampp_sorg%" "%dest%" /MIR /NFL /NDL
set errore=%ERRORLEVEL%

if %errore% LEQ 7 (
    echo COPIA OK da XAMPP a %dest%!
) else (
    echo COPIA FALLITA (codice %errore%).
)
pause
