<?php
    // Inserisce un nuovo libro nel database
    // Si aspetta via POST: titolo, anno_pubblicazione, autore_id
    require_once("libreria.php");
    $conn = connection("4e_biblioteca_scuola");

    $titolo    = $_POST["titolo"];
    $anno      = intval($_POST["anno_pubblicazione"]);
    $autore_id = intval($_POST["autore_id"]);

    $sql = "INSERT INTO libri (titolo, anno_pubblicazione, autore_id)
            VALUES ('$titolo', $anno, $autore_id)";

    eseguiQuery($conn, $sql);
    echo json_encode("Libro inserito con successo!");
?>
