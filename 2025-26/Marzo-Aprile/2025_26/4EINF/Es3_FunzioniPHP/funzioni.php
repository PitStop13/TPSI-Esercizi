<?php
function stampaVettore()
{
    $vect = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
    foreach ($vect as $value) {
        echo $value . " ";
    }
}

function stampaFibonacci($n)
{
    $a = 0;
    $b = 1;
    echo "Serie di Fibonacci fino a $n: ";
    while ($a <= $n) {
        echo $a . " ";
        $temp = $a;
        $a = $b;
        $b = $temp + $b;
    }
}

function stampaPotenza($base, $esponente)
{
    $result = pow($base, $esponente);
    echo "$base elevato a $esponente è uguale a: $result";
}

function somma($numero1, $numero2)
{
    return $numero1 + $numero2;
}
function sottrazione($numero1, $numero2)
{
    return $numero1 - $numero2;
}
function moltiplicazione($numero1, $numero2)
{
    return $numero1 * $numero2;
}
function divisione($numero1, $numero2)
{
    if ($numero2 != 0) {
        return $numero1 / $numero2;
    } else {
        return "Errore: divisione per zero!";
    }
}

// Esempio di variabile globale
$nomiStudenti = ["Alice", "Bob", "Charlie", "Diana", "Eve"];
function stampaNomiStudenti()
{
    global $nomiStudenti;
    echo "Nomi degli studenti: ";
    foreach ($nomiStudenti as $nome) {
        echo $nome . " ";
    }
}

?>