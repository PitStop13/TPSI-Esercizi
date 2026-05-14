<?php
    require_once("libreria.php");
    $con=connection("4e_formulauno");
    $sql="SELECT * FROM races";
    echo(json_encode(eseguiQuery($con,$sql)));
?>