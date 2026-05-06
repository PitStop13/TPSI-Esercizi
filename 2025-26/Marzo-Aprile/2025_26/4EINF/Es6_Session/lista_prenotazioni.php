<?php
session_start(); //NON azzare i dati precedenti ma recupera una sessione se è attiv o la apre se non è presente

?>

<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista delle prenotazioni</title>
</head>

<body>
    <h1>Lista delle prenotazioni:</h1>
    <?php
    $tot = 0;
    $maxNum = 0;
    $maxEvent = "";
    if (!isset($_SESSION["prenotazioni"]) || empty($_SESSION["prenotazioni"])) {
        echo "<p>Nessuna prenotazione presente.</p>";
    } else {
        foreach ($_SESSION["prenotazioni"] as $evento => $num) {
            $num = intval($num);
            echo ("$evento: $num persone. <br>");
            $tot += $num;
            if ($num > $maxNum) {
                $maxNum = $num;
                $maxEvent = $evento;
            }
        }
        echo ("<br>Totale: $tot persone.");
        echo ("<br>Evento con più persone: $maxEvent ($maxNum persone)<br>");
        echo ("Svuota prenotazioni: <a href='svuota_prenotazioni.php'>Svuota</a>");
    }
?>
</body>

</html>