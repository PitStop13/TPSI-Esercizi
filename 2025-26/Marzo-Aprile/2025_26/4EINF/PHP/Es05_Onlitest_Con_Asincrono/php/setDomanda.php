<?php
    $con = new mysqli("localhost", "root", "", "4e_onlitest");
    if ($con->connect_errno) {
        $txtConnectErrno = $con->connect_errno;
        $txtConnectError = $con->connect_error;
        die("Connessione fallita: $txtConnectErrno : $txtConnectError");
    }
    $domanda = $_POST["domanda"];
    $sql = "INSERT INTO domande(Testo) VALUE ('$domanda')";
    $result = $con->query($sql);
    if (!$result) {
        $txtErrno = $con->errno;
        $txtError = $con->error;
        $con->close();
        die("Query fallita: $txtErrno : $txtError");
    }
    echo(json_encode("Domanda inserita con successo"));
    $con->close();
?>