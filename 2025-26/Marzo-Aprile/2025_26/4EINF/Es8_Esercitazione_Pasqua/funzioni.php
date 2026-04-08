<?php
function getColoreRandom() {
    $r = rand(0, 255);
    $g = rand(0, 255);
    $b = rand(0, 255);
    return "rgb($r, $g, $b)";
}
function sommaValori($val1, $val2)
{
    return $val1 + $val2;
}

function sottrazioneValori($val1, $val2)
{
    return $val1 - $val2;
}

function moltiplicazioneValori($val1, $val2)
{
    return $val1 * $val2;
}

function divisioneValori($val1, $val2)
{
    return $val1 / $val2;
}

function stampaPotenxza($base, $esponente)
{
    return pow($base, $esponente);
}

function valoriRandom($start, $stop)
{
    return rand($start, $stop);
}

function stampaInMaiuscolo($str)
{
    return strtoupper($str);
}

function stampaInMinuscolo($str)
{
    return strtolower($str);
}

function stampaInizialiMaiuscole($str)
{
    return ucwords(strtolower($str));
}

function sostituisciStringa($sRef, $sDest, $stringa)
{
    return str_replace($sRef, $sDest, $stringa);
}

function estraiCaratteri($stringa, $partenza)
{
    return substr($stringa, $partenza);
}

function stampaTotVettore($vect)
{
    $tot = 0;
    for ($i = 0; $i < count($vect); $i++) {
        $tot += $vect[$i];
    }
    return $tot;
}

$vettoreGlobale = [1, 3, 5, 2, 7, 4, 6];
function stampaTotVettoreAlt()
{
    global $vettoreGlobale;
    $tot = 0;
    for ($i = 0; $i < count($vettoreGlobale); $i++) {
        $tot += $vettoreGlobale[$i];
    }
    return $tot;
}

function stampaHelloWorld()
{
    $output = "";
    for ($i = 0; $i < 3; $i++) {
        $output .= "Hello World<br>";
    }
    return $output;
}
