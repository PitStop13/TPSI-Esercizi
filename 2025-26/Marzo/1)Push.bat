@echo off
title Push a XAMPP
setlocal enabledelayedexpansion

set "found="
set "target_path=\TPSI\2025-26\Marzo\2025_26\4EINF"
set "xampp_dest=C:\xampp\htdocs\2025_26\4EINF"

for %%D in (D E F G H I J K L M N O P Q R S T U V W X Y Z) do (
    if exist "%%D:!target_path!" (
        set "found=%%D:!target_path!"
        goto :procedi
    )
)

:errore
echo ERRORE: Cartella sorgente non trovata su nessuna USB collegata!
pause
exit /b 1

:procedi
if not exist "C:\xampp\htdocs" (
    echo ERRORE: Cartella XAMPP htdocs non trovata!
    pause
    exit /b 1
)

robocopy "!found!" "%xampp_dest%" /MIR /NFL /NDL /NJH /NJS >nul
echo Completato con successo!
timeout /t 2 >nul
exit