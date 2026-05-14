<?php
    require_once("libreria.php");
    $con=connection("4e_formulauno");
    $sql="SELECT * FROM results";
    echo(json_encode(eseguiQuery($con,$sql)));
?>