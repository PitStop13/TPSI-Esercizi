<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <title>Esercitazione PHP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
        }

        h1 {
            text-align: center;
            background: #ddd;
            padding: 10px;
        }

        h2 {
            font-size: 1em;
            margin: 6px 0;
        }

        hr {
            margin: 20px 0;
        }
    </style>
</head>

<body>

    <?php require_once "funzioni.php"; ?>

    <h1>Esercitazione di PHP</h1>
    <hr>

    <h2 style="color: <?= getColoreRandom() ?>;">Somma di valori: <?= sommaValori(3, 8) ?></h2>

    <h2 style="color: <?= getColoreRandom() ?>;">Sottrazione di valori: <?= sottrazioneValori(3, 8) ?></h2>

    <h2 style="color: <?= getColoreRandom() ?>;">Moltiplicazione di valori: <?= moltiplicazioneValori(3, 8) ?></h2>

    <h2 style="color: <?= getColoreRandom() ?>;">Divisione di valori: <?= divisioneValori(3, 8) ?></h2>

    <h2 style="color: <?= getColoreRandom() ?>;">Potenza di valori: <?= stampaPotenxza(3, 3) ?></h2>

    <h2 style="color: <?= getColoreRandom() ?>;">Sorteggia valori random: <?= valoriRandom(1, 10) ?></h2>

    <h2 style="color: <?= getColoreRandom() ?>;">Stampa "ciao" tutto in maiuscolo: <?= stampaInMaiuscolo("ciao") ?></h2>

    <h2 style="color: <?= getColoreRandom() ?>;">Stampa "CIAO" tutto in minuscolo: <?= stampaInMinuscolo("CIAO") ?></h2>

    <h2 style="color: <?= getColoreRandom() ?>;">Stampa "Come quando fuori piove" con iniziali maiuscole:
        <?= stampaInizialiMaiuscole("Come quando fuori piove") ?>
    </h2>

    <h2 style="color: <?= getColoreRandom() ?>;">Sostituisci "Filippo" con "Francesco" nella frase "Filippo è andato a giocare a calcio": <?= sostituisciStringa('Filippo', 'Francesco', 'Filippo è andato a giocare a calcio') ?></h2>

    <h2 style="color: <?= getColoreRandom() ?>;">Dalla stringa "I topi non avevano nipoti" estrarre una sottostringa a
        partire dalla decima posizione: <?= estraiCaratteri("I topi non avevano nipoti", 10) ?></h2>

    <h2 style="color: <?= getColoreRandom() ?>;">Tot vettore: <?= stampaTotVettore([1, 4]) ?></h2>

    <h2 style="color: <?= getColoreRandom() ?>;">Tot vettore: <?= stampaTotVettoreAlt() ?></h2>

    <h2 style="color: <?= getColoreRandom() ?>;">
        Stampa 3 volte "Hello World":<br>
        <?= stampaHelloWorld() ?>
    </h2>

    <hr>

</body>

</html>