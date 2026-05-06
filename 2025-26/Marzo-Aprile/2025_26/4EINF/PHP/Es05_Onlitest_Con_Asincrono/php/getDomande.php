<?php
    $con = new mysqli("localhost", "root", "", "4e_onlitest");
    if ($con->connect_errno) {
        $txtConnectErrno = $con->connect_errno;
        $txtConnectError = $con->connect_error;
        die("Connessione fallita: $txtConnectErrno : $txtConnectError");
    }
    $sql = "SELECT Testo as domanda FROM domande";
    $result = $con->query($sql);
    if (!$result) {
        $txtErrno = $con->errno;
        $txtError = $con->error;
        $con->close();
        die("Query fallita: $txtErrno : $txtError");
    }
    $result = $result->fetch_all(MYSQLI_ASSOC); // Ottieni tutte le domande come array associativo
    echo (json_encode($result)); // Restituisci le domande in formato JSON associativo
    $con->close();
?>