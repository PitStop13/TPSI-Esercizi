<?php
    // Restituisce il numero totale di libri nel database (sempre, senza filtri)
    require_once("libreria.php");
    $conn = connection("4e_biblioteca_scuola");
    $sql = "SELECT COUNT(*) AS totale FROM libri";
    $result = eseguiQuery($conn, $sql);
    // $result è un array associativo, prendo solo il numero
    echo(json_encode($result[0]["totale"]));
?>
