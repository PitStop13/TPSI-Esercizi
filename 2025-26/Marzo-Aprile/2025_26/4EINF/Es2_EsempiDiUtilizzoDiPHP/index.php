<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Es 2 - Esempi di Utilizzo di PHP</title>
</head>

<body>

    <h1>Benvenuto nella pagina con PHP</h1>

    <?php
    $nome = "Pietro";
    $cognome = "Olivero";
    $eta = 17;
    echo ("Nome: $nome <br>Cognome: $cognome <br>   Età: $eta");

    // Vado a verificare se è presente la variabile
    echo ("<br>--------------");
    if (isset($miaVariabile)) {
        echo ("<br>Variabile esistente");
    } else {
        echo ("<br>Variabile non esistente");
    }
    if (isset($nome)) {
        echo ("<br>Variabile esistente");
    } else {
        echo ("<br>Variabile non esistente");
    }

    echo ("<br>--------------");
    function somma($a, $b)
    {
        $somma = $a + $b;
        return $somma;
    }

    //uso il punto . per concatenare in php
    echo ("<br>La somma vale " . somma(1, 2));
    //Oppure faccio così
    $val = somma(3, 4);
    echo ("<br>La somma vale $val");

    echo ("<br>--------------<br>");

    $nome = "Paperino";
    $nome = strtoupper($nome);
    echo ("Il mio nome è $nome");

    $nome = strtolower($nome);
    echo ("<br> Il mio nome è $nome");

    echo ("<br>--------------");

    function stampaXNumeri($inizio, $fine)
    {
        for ($i = $inizio; $i <= $fine; $i++) {
            echo ("<br> $i");
        }
    }
    stampaXNumeri(1, 10); //Entrambi inclusi
    
    echo ("<br>--------------");

    echo ("<br>Passaggio per valore:");
    $val = 5;
    function passaggioPerValore($param)
    {
        $param++;
        echo ("<br>Valore dentro alla funzione $param");
    }
    passaggioPerValore($val);
    echo ("<br>Valore fuori dalla funzione $val");

    echo ("<br>--------------");

    echo ("<br>Passaggio per riferimento:");
    function passaggioPerRiferimento(&$param)
    {
        $param++;
        echo ("<br>Valore dentro alla funzione $param");
    }
    passaggioPerRiferimento($val);
    echo ("<br>Valore fuori dalla funzione $val");

    echo ("<br>--------------");

    $mioVettore = [1, 3, 5, 7, 9];
    echo ("<br>Stampa il mio vettore uno per uno:");
    foreach ($mioVettore as $val) {
        echo ("<br>" . $val);
    }

    echo ("<br>--------------<br>");

    //Push aggiunge un elemento alla fine del vettore,il vettore può contenere elementi di diversi tipi
    array_push($mioVettore, "ciao");
    echo ("Vettore di prima con aggiunto un valore");
    foreach ($mioVettore as $val) {
        echo ("<br>" . $val);
    }

    echo ("<br>--------------<br>");

    //Vettori associativi
    $mioVettoreAssociativo["3B"] = 25;
    $mioVettoreAssociativo["4E"] = 21;
    echo ("Il numero di alunni in 3B è " . $mioVettoreAssociativo["3B"] . "<br>");
    echo ("Il numero di alunni in 4E è " . $mioVettoreAssociativo["4E"]);

    echo ("<br>--------------<br>");

    foreach ($mioVettoreAssociativo as $classe => $numeroAlunni) {
        echo ("Il numero di alunni in $classe è $numeroAlunni<br>");
    }
    ?>

</body>

</html>