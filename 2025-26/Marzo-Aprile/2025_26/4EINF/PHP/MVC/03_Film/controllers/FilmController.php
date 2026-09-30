<?php
require_once("models/Film.php");

class FilmController
{

    private function jsonResponse($dati, $status = 200)
    {
        http_response_code($status);
        header("Content-Type: application/json; charset=utf-8");
        echo (json_encode($dati));
        exit;
    }

    //GET index.php?action=getAll
    public function getAll()
    {
        $model = new Film();
        $film = $model->getAll();
        $this->jsonResponse($film);
    }

    public function inserisci()
    {
        $datiJSON = file_get_contents("php://input");
        $body = json_decode($datiJSON, true);

        $titolo = $body["titolo"] ?? "";

        if (empty($titolo)) {
            $this->jsonResponse(["errore" => "Il titolo è obbligatorio!"], 400);
        }

        $model = new Film();
        $newId = $model->inserisci($titolo);

        $this->jsonResponse(["id" => $newId, "messaggio" => "Film aggiunto con successo!"], 200);
    }

    public function elimina()
    {
        if (isset($_GET["id"]))
            $id = $_GET["id"];
        else
            $id = null;

        if (!$id)
            $this->jsonResponse(["errore" => "ID non specificato"], 400);

        $model = new Film();
        $model->elimina($id);
        $this->jsonResponse(["messaggio" => "Film eliminato con successo!"]);
    }

    public function aggiorna()
    {
        $datiJSON = file_get_contents("php://input");
        $body = json_decode($datiJSON, true);

        $id = $body["id"] ?? null;
        $titolo = $body["titolo"] ?? "";

        if (empty($id) || empty($titolo)) {
            $this->jsonResponse(["errore" => "ID e titolo sono obbligatori"], 400);
        }

        $model = new Film();
        $model->aggiorna($id, $titolo);

        $this->jsonResponse(["messaggio" => "Film aggiornato con successo!"], 200);
    }
}
?>