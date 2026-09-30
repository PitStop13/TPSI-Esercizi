<?php
    // Restituisce tutti i libri con nome e cognome dell'autore tramite JOIN
    require_once("libreria.php");
    $conn = connection("4e_biblioteca_scuola");
    $sql = "SELECT l.id, l.titolo, l.anno_pubblicazione, a.nome, a.cognome
            FROM libri l
            JOIN autori a ON l.autore_id = a.id
            ORDER BY l.titolo";
    echo(json_encode(eseguiQuery($conn, $sql)));
?>
