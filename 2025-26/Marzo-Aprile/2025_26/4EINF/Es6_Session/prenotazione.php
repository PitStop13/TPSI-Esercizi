<?php
session_start(); //PHP crea un sessionID e lo salva nel browser come cookie
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    echo "Uso POST";
    if (!isset($_SESSION["prenotazioni"][$_POST["evento"]])) {
        $_SESSION["prenotazioni"][$_POST["evento"]] = 0;
    }
    $_SESSION["prenotazioni"][$_POST["evento"]] += $_POST["num"]; //salva i dati del modulo in una variabile di sessione

    //Oppure scrivo così...
    // $_prenotazioni = $_SESSION["prenotazioni"];
    // $_prenotazioni[$_POST["evento"]] += $_POST["num"];


} else if ($_SERVER["REQUEST_METHOD"] == "GET") {

    echo "Uso GET";
    if (!isset($_SESSION["prenotazioni"][$_GET["evento"]])) {
        $_SESSION["prenotazioni"][$_GET["evento"]] = 0;
    }
    $_SESSION["prenotazioni"][$_GET["evento"]] += $_GET["num"]; //salva i dati del modulo in una variabile di sessione
}

?>

<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prenotazione eventi</title>
</head>

<body>
    <?php
    echo ("Inserito: ") . $_REQUEST["evento"] . " per " . $_REQUEST["num"] . " persone.";
    echo ("<br><br>");
    echo ("Totale: ") . $_SESSION["prenotazioni"][$_REQUEST["evento"]];
    echo ("<br><br>");

    ?>
    <br><br>
    <a href="index.html">Nuova prenotazione</a>
    <a href="lista_prenotazioni.php">Visualizza storico prenotazioni</a>
</body>

</html>