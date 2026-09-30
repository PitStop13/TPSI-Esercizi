<?php
require_once 'models/Film.php';


class FilmController {


    private function jsonResponse($dati, $status = 200) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($dati);
        exit;
    }


    //Ottieniamo tutti i film, eventualmente filtrati da una query di ricerca
    public function getAll() {
        if (isset($_GET["q"])) {
            $q = trim($_GET["q"]); //la vit quello che viene passato
        } else {
            $q = ""; //altirmnti gli do stringa vuota
        }
        //OPPURE q=trim(_GET["q"]??"");
        $model = new Film();
        $film = $model->getAll($q);
        $this->jsonResponse($film);
    }


    //Inseriamo un nuovo film nel database
    public function inserisci() {
        $body = json_decode(file_get_contents("php://input"), true);
        $titolo = trim(($body["titolo"] ?? ""));


        if (!$titolo) {
            $this->jsonResponse(["errore" => "il titolo e obligatorio"], 400); //chiave valore in json
        }


        $model = new Film();
        $newID = $model->inserisci($titolo); //nel model faro in modo che restire l identificativo
        $this->jsonResponse(["id" => $newID, "messaggio" => "Film aggiunto con successo!"], 200);
    }


    //Eliminiamo un film dal database in base al suo ID
    public function elimina() {
        $id = $_GET["id"] ?? null;
        if (!$id) {
            $this->jsonResponse(["errore" => "ID mancante"], 400);
        }
        $model = new Film();
        $righeCoinvolte = $model->elimina($id);
        if($righeCoinvolte > 0) {
            $this->jsonResponse(["messaggio" => "Film eliminato con successo!"]);
        } else {
            $this->jsonResponse(["errore" => "Film non trovato"], 404);
        }
    }


    //Modifichiamo il titolo di un film esistente nel database
    public function modificaTitolo() {
        $id = $_GET["id"] ?? null;
        $body = json_decode(file_get_contents("php://input"), true);
        $titolo = trim($body["titolo"] ?? "");


        if (!$id || !$titolo) {
            $this->jsonResponse(["errore" => "ID e nuovo titolo sono obbligatori"], 400);
        }


        $model = new Film();
        $righeCoinvolte = $model->modificaTitolo($id, $titolo);


        if ($righeCoinvolte > 0) {
            $this->jsonResponse(["messaggio" => "Titolo aggiornato con successo!"]);
        } else {
            $this->jsonResponse(["errore" => "Film non trovato o titolo invariato"], 404);
        }
    }
}