<?php
require_once 'models/Gara.php';

class GaraController
{
    private function jsonResponse($dati, $status = 200)
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($dati);
        exit;
    }


    public function getAll()
    {

    }


    public function getPiloti()
    {

    }


    public function getCircuiti()
    {

    }


    public function inserisci()
    {

    }


    public function aggiornaPosizione()
    {

    }


    public function elimina()
    {

    }
}

