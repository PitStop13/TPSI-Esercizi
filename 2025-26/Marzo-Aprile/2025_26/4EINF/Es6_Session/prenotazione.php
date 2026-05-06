<?php
session_start(); //PHP crea un sessionID e lo salva nel browser come cookie
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    echo "Uso POST";
    $evento = $_POST["evento"];
    $num = intval($_POST["num"]);
    if (!isset($_SESSION["prenotazioni"][ $evento ])) {
        $_SESSION["prenotazioni"][ $evento ] = 0;
    }
    $_SESSION["prenotazioni"][ $evento ] += $num; //salva i dati del modulo in una variabile di sessione

    //Oppure scrivo così...
    // $_prenotazioni = $_SESSION["prenotazioni"];
    // $_prenotazioni[$_POST["evento"]] += $_POST["num"];


} else if ($_SERVER["REQUEST_METHOD"] == "GET") {

    echo "Uso GET";
    $evento = $_GET["evento"];
    $num = intval($_GET["num"]);
    if (!isset($_SESSION["prenotazioni"][ $evento ])) {
        $_SESSION["prenotazioni"][ $evento ] = 0;
    }
    $_SESSION["prenotazioni"][ $evento ] += $num; //salva i dati del modulo in una variabile di sessione
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