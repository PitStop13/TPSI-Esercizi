<?php
require_once 'models/Gara.php';

class GaraController
{
    // =========================================================================
    // METODO HELPER: jsonResponse
    // Invia una risposta JSON standardizzata al client e interrompe l'esecuzione dello script.
    // =========================================================================
    private function jsonResponse($dati, $status = 200)
    {
        // PASSO 1: Imposta il codice di stato HTTP (es. 200 OK, 201 Created, 400 Bad Request).
        http_response_code($status);

        // PASSO 2: Imposta l'header Content-Type per avvisare il browser che la risposta è un JSON codificato in UTF-8.
        header('Content-Type: application/json; charset=utf-8');

        // PASSO 3: Converte l'array o l'oggetto PHP in una stringa JSON e la stampa nell'output.
        echo json_encode($dati);

        // PASSO 4: Termina lo script per evitare che vengano inviati altri caratteri indesiderati (spazi, newline, ecc.).
        exit;
    }


    // =========================================================================
    // RECUPERO DI TUTTE LE GARE (CON EVENTUALI FILTRI) (GET)
    // =========================================================================
    public function getAll()
    {
        // PASSO 1: Recuperare i parametri di ricerca/filtro dalla query string ($_GET).
        // Se non specificata, la stagione vale -1 (cioè nessun filtro).
        // 'q' è la stringa libera di ricerca per pilota, team o circuito.
        $stagione = (int)($_GET["stagione"] ?? -1);
        $q        = trim($_GET["q"] ?? "");

        // PASSO 2: Creare l'istanza del Model Gara.
        $model = new Gara();

        // PASSO 3: Chiamare il metodo del Model che esegue la SELECT con i filtri
        // e restituire il risultato JSON al client tramite jsonResponse.
        $this->jsonResponse($model->getAll($stagione, $q));
    }


    // =========================================================================
    // RECUPERO DELL'ELENCO DEI PILOTI (GET)
    // =========================================================================
    public function getPiloti()
    {
        // PASSO 1: Istanziare il Model.
        $model = new Gara();

        // PASSO 2: Ottenere l'elenco dei piloti (id, nome, team) e restituirlo come JSON.
        // Questo endpoint viene usato per popolare la tendina <select id="selPilota"> nel form.
        $this->jsonResponse($model->getPiloti());
    }


    // =========================================================================
    // RECUPERO DELL'ELENCO DEI CIRCUITI (GET)
    // =========================================================================
    public function getCircuiti()
    {
        // PASSO 1: Istanziare il Model.
        $model = new Gara();

        // PASSO 2: Ottenere l'elenco dei circuiti (id, nome, paese) e restituirlo come JSON.
        // Questo endpoint viene usato per popolare la tendina <select id="selCircuito"> nel form.
        $this->jsonResponse($model->getCircuiti());
    }


    // =========================================================================
    // 1. INSERIMENTO DI UNA NUOVA GARA (POST)
    // =========================================================================
    public function inserisci()
    {
        // PASSO 1: Leggere il body della richiesta HTTP.
        // Poiché il client invia i dati in formato JSON (application/json),
        // questi non si trovano nel classico $_POST, ma vanno letti dallo stream di input raw:
        // file_get_contents('php://input') legge il testo grezzo JSON,
        // json_decode(..., true) lo converte in un array associativo PHP.
        $dati = json_decode(file_get_contents('php://input'), true);
        if (!$dati) {
            $this->jsonResponse(['errore' => 'Dati non validi o JSON non corretto'], 400);
        }

        // PASSO 2: Estrarre i parametri e fare un casting/sanitizzazione di base.
        // Usiamo l'operatore null-coalescing (??) per evitare warning se una chiave manca.
        $stagione   = (int)($dati['stagione'] ?? 0);
        $round      = (int)($dati['round'] ?? 0);
        $dataOra    = $dati['data_ora'] ?? '';
        $circuitoId = (int)($dati['circuito_id'] ?? 0);
        $pilotaId   = (int)($dati['pilota_id'] ?? 0);

        // PASSO 3: Validazione dei dati ricevuti.
        // Controlliamo che tutti i campi obbligatori siano stati forniti e abbiano valori validi.
        if (!$stagione || !$round || empty($dataOra) || !$circuitoId || !$pilotaId) {
            $this->jsonResponse(['errore' => 'Tutti i campi sono obbligatori'], 400);
        }

        // PASSO 4: Interagire con il Model.
        // Creiamo l'istanza del Model e chiamiamo il metodo dedicato all'inserimento nel DB.
        $model = new Gara();
        $id = $model->inserisci($stagione, $round, $dataOra, $circuitoId, $pilotaId);

        // PASSO 5: Rispondere al client in formato JSON con codice HTTP 201 (Created).
        $this->jsonResponse(['id' => $id, 'messaggio' => 'Gara inserita con successo'], 201);
    }


    // =========================================================================
    // 2. AGGIORNAMENTO DELLA POSIZIONE DI ARRIVO (PATCH)
    // =========================================================================
    public function aggiornaPosizione()
    {
        // PASSO 1: Recuperare l'ID della gara dalla query string (es. ?action=aggiornaPosizione&id=3).
        $id = (int)($_GET['id'] ?? 0);

        // PASSO 2: Leggere il body della richiesta HTTP in formato JSON (contiene posizione_arrivo).
        $dati = json_decode(file_get_contents('php://input'), true);
        $posizione = (int)($dati['posizione_arrivo'] ?? 0);

        // PASSO 3: Validazione dei parametri.
        // L'id deve essere positivo e la posizione deve essere un numero > 0 (1°, 2°, 3°...).
        if ($id <= 0 || $posizione <= 0) {
            $this->jsonResponse(['errore' => 'Parametri non validi o mancanti'], 400);
        }

        // PASSO 4: Chiamare il Model per eseguire l'aggiornamento (UPDATE) sul database.
        $model = new Gara();
        $rows = $model->aggiornaPosizione($id, $posizione);

        // PASSO 5: Restituire l'esito al client in formato JSON.
        $this->jsonResponse(['success' => true, 'righe' => $rows]);
    }


    // =========================================================================
    // 3. ELIMINAZIONE DI UNA GARA (DELETE)
    // =========================================================================
    public function elimina()
    {
        // PASSO 1: Recuperare l'ID della gara da eliminare passato tramite query string (es. ?action=elimina&id=3).
        $id = (int)($_GET['id'] ?? 0);

        // PASSO 2: Validazione dell'ID.
        if ($id <= 0) {
            $this->jsonResponse(['errore' => 'ID non valido'], 400);
        }

        // PASSO 3: Chiamare il Model per effettuare la cancellazione (DELETE) dal database.
        $model = new Gara();
        $rows = $model->elimina($id);

        // PASSO 4: Inviare la risposta JSON al client.
        $this->jsonResponse(['success' => true, 'righe' => $rows]);
    }
}

