<?php
require_once 'config/database.php';

class Gara
{
    private $conn;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    // Restituisce tutti i piloti (id, nome, team)
    public function getPiloti()
    {

    }

    // Restituisce tutti i circuiti (id, nome, paese)
    public function getCircuiti()
    {

    }

    // Restituisce gare con JOIN su piloti e circuiti
    // Filtra per stagione (se > 0) e testo su pilota/team/circuito (se non vuoto)
    public function getAll($stagione = 0, $q = '')
    {

    }

    // Inserisce una nuova gara con stato='programmata'; restituisce l'id generato
    public function inserisci($stagione, $round, $dataOra, $circuitoId, $pilotaId)
    {

    }

    // Aggiorna posizione_arrivo e stato='finale'; restituisce il numero di righe modificate
    public function aggiornaPosizione($id, $posizione)
    {

    }

    // Elimina la gara; restituisce il numero di righe modificate
    public function elimina($id)
    {

    }
}

