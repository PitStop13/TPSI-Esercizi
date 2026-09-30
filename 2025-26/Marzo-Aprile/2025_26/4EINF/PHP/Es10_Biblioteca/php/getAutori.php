<?php
    // Restituisce la lista di tutti gli autori (id, nome, cognome)
    // Usata sia per il filtro che per il form di inserimento libro
    require_once("libreria.php");
    $conn = connection("4e_biblioteca_scuola");
    $sql = "SELECT id, nome, cognome FROM autori ORDER BY cognome";
    echo(json_encode(eseguiQuery($conn, $sql)));
?>
