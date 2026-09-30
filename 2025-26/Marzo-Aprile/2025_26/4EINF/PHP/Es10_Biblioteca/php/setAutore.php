<?php
    require_once("libreria.php");
    $conn = connection("4e_biblioteca_scuola");

    $nome    = $_POST["nome"];
    $cognome = $_POST["cognome"];

    $sql = "INSERT INTO autori (nome, cognome) VALUES ('$nome', '$cognome')";
    eseguiQuery($conn, $sql);
    echo json_encode("Autore inserito con successo!");
?>
