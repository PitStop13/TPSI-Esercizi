<?php
    session_start();
    session_unset(); // Rimuove tutte le variabili di sessione
    session_destroy();
    header("Location: index.php");
    exit();
?>