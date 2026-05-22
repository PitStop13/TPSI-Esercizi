<?php
    require_once("libreria.php");
    $con=connection("2024_onlitest");
    $domanda=$_POST["domanda"];
    $sql="insert into Domande(Testo) value ('$domanda')";
    echo(json_encode(eseguiQuery($con,$sql)));
?>

