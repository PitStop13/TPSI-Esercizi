@echo off
title Pull da XAMPP
setlocal enabledelayedexpansion

set "found="
set "target_path=\TPSI\2025-26\Marzo-Aprile\2025_26\4EINF"
set "xampp_sorg=C:\xampp\htdocs\2025_26\4EINF"

for %%D in (D E F G H I J K L M N O P Q R S T U V W X Y Z) do (
    if exist "%%D:!target_path!" (
        set "found=%%D:!target_path!"
        goto :procedi
    )
)

echo ERRORE: Impossibile trovare la destinazione sulla USB. Controlla che la cartella esista! [cite: 4]
pause
exit /b 1

:procedi
if not exist "%xampp_sorg%" (
    echo ERRORE: Cartella XAMPP vuota o non trovata!
    pause
    exit /b 1
)

robocopy "%xampp_sorg%" "!found!" /MIR /NFL /NDL /NJH /NJS >nul
echo Completato con successo!
timeout /t 2 >nul
exit