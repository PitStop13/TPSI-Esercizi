@echo off
title Copia da Scuola a XAMPP (4EINF)
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

set "sorgente=%scuola%\TPSI\2025-26\Marzo\2025_26\4EINF"
set "xampp_dest=C:\xampp\htdocs\2025_26\4EINF"

if not exist "C:\xampp\htdocs" (
    echo ERRORE: Cartella XAMPP htdocs non trovata! Controlla installazione.
    pause
    exit /b 1
)

if not exist "%sorgente%" (
    echo ERRORE: Cartella sorgente non trovata: %sorgente%
    pause
    exit /b 1
)

robocopy "%sorgente%" "%xampp_dest%" /MIR /NFL /NDL
set errore=%ERRORLEVEL%

if %errore% LEQ 7 (
    echo COPIA OK da %sorgente% a XAMPP!
) else (
    echo COPIA FALLITA (codice %errore%): controlla percorsi.
)
pause
