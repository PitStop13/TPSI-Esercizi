<?php
    require_once("libreria.php");
    $con=connection("4e_formulauno");
    if(isset($_GET["idTeams"])){
        $id = $_GET["idTeams"];
    }else
        die("idTeams non settato");
    $sqlDrivers = "SELECT DISTINCT t.name as NomeTeam,d.Name as NomePilota, d.Nationality as Nazionalità, d.DateOfBirth as DataDiNascita FROM drivers d , results r, teams t
                   WHERE r.driverID = d.DriverID AND r.teamID = t.teamID AND r.teamID = $id";
    echo(json_encode(eseguiQuery($con,$sqlDrivers)));
?>  
