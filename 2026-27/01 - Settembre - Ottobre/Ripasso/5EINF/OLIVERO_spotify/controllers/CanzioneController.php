<?php
require_once 'models/Canzone.php';

class CanzioneController
{

    private function jsonResponse($dati, $status = 200)
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($dati);
        exit;
    }

    //Consente di ottenere tutte le canzoni, eventualmente filtrate da una query di ricerca
    public function getAll()
    {
        if (isset($_GET["q"])) {
            $q = trim($_GET["q"]);
        } else {
            $q = "";
        }
        $model = new Canzone();
        $canzoni = $model->getAll($q);
        $this->jsonResponse($canzoni);
    }

    //Consente di inserire una nuova canzone nel database
    public function inserisci()
    {
        $dati = json_decode(file_get_contents('php://input'), true);
        if (!$dati) {
            $this->jsonResponse(['errore' => 'Dati non validi o JSON non corretto'], 400);
        }

        $titolo = ($dati['titolo'] ?? '');
        $artista = ($dati['artista'] ?? '');
        $album = $dati['album'] ?? '';
        $anno = (int) ($dati['anno'] ?? null);

        if (empty($titolo) || empty($artista) || empty($album) || !$anno) {
            $this->jsonResponse(['errore' => 'Tutti i campi sono obbligatori'], 400);
        }

        $model = new Canzone();
        $id = $model->inserisci($titolo, $artista, $album, $anno);

        $this->jsonResponse(['id' => $id, 'messaggio' => 'Canzone inserita con successo'], 201);


    }

    //Consente di eliminare una canzone dal database in base al suo ID
    public function elimina()
    {
        $id = (int) ($_GET['id'] ?? 0);

        if ($id <= 0) {
            $this->jsonResponse(['errore' => 'ID non valido'], 400);
        }

        $model = new Canzone();
        $rows = $model->elimina($id);

        $this->jsonResponse(['success' => true, 'righe' => $rows]);
    }

    //Consente di modificare il titolo di una canzone esistente nel database in base al suo ID
    public function modificaTitolo()
    {
        $id = (int) ($_GET['id'] ?? 0);

        $dati = json_decode(file_get_contents('php://input'), true);
        $titolo = ($dati['titolo'] ?? '');

        if ($id <= 0 || empty($titolo)) {
            $this->jsonResponse(['errore' => 'Parametri non validi o mancanti'], 400);
        }

        $model = new Canzone();
        $rows = $model->modificaTitolo($id, $titolo);

        $this->jsonResponse(['success' => true, 'righe' => $rows]);
    }

    //Consente di modificare l'artista di una canzone esistente nel database in base al suo ID
    public function modificaArtista()
    {
        $id = (int) ($_GET['id'] ?? 0);

        $dati = json_decode(file_get_contents('php://input'), true);
        $artista = ($dati['artista'] ?? '');

        if ($id <= 0 || empty($artista)) {
            $this->jsonResponse(['errore' => 'Parametri non validi o mancanti'], 400);
        }

        $model = new Canzone();
        $rows = $model->modificaArtista($id, $artista);

        $this->jsonResponse(['success' => true, 'righe' => $rows]);
    }
}


