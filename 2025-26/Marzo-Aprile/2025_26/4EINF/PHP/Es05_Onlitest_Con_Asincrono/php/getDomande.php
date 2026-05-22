<?php
    require_once("libreria.php");
    $con=connection("2024_onlitest");
    $sql="SELECT DISTINCT Domande.Testo as domanda, Domande.ID as id FROM Domande";
    echo(json_encode(eseguiQuery($con,$sql)));
?>
