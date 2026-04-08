<?php
session_start();
unset($_SESSION["prenotazioni"]);
header("Location: index.html");
?>