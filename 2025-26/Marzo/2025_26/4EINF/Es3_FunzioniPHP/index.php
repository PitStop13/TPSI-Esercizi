<?php require_once("funzioni.php"); ?>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Es 3</title>
</head>

<body>
    <h1>Uso di funzioni tramite moduli esterni</h1>
    <!-- Posso integrare php dentro altri tag HTML -->
    <h4><?php echo "1) Esempio di php integrato in tag HTML"; ?></h4>
    <!-- Questa invece è la forma abbrevviata -->
    <h4><?= "2) Esempio di php integrato in tag HTML" ?></h4>
    <?php
    stampaVettore();
    echo "<br><br>";
    stampaFibonacci(100);
    echo "<br><br>";
    stampaPotenza(2, 3);
    echo "<br><br>";
    echo "Somma di 5 e 3: " . somma(5, 3);
    echo "<br>";
    echo "Sottrazione di 5 e 3: " . sottrazione(5, 3);
    echo "<br>";
    echo "Moltiplicazione di 5 e 3: " . moltiplicazione(5, 3);
    echo "<br>";
    echo "Divisione di 5 e 3: " . divisione(5, 3);
    // Test divisione per zeros
    echo "<br>";
    echo "Divisione di 5 per 0: " . divisione(5, 0);
    echo "<br><br>";
    stampaNomiStudenti();
    ?>
</body>

</html>