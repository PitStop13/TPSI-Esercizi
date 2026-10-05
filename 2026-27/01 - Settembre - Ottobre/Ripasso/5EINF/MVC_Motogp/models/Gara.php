<?php
require_once 'config/database.php';

class Gara
{
    private $conn;

    // =========================================================================
    // COSTRUTTORE
    // Crea la connessione al database tramite la classe Database (PDO)
    // =========================================================================
    public function __construct()
    {
        // PASSO 1: Istanziare la classe Database (definita in config/database.php).
        $db = new Database();

        // PASSO 2: Ottenere l'oggetto PDO della connessione attiva e salvarlo nell'attributo privato $conn.
        $this->conn = $db->connect();
    }

    // =========================================================================
    // RECUPERO PILOTI
    // Restituisce tutti i piloti ordinati alfabeticamente per nome
    // =========================================================================
    public function getPiloti()
    {
        // PASSO 1: Preparare la query SELECT per recuperare tutti i record della tabella piloti.
        $stmt = $this->conn->prepare("SELECT * FROM piloti ORDER BY nome");

        // PASSO 2: Eseguire la query.
        $stmt->execute();

        // PASSO 3: Restituire tutti i risultati come array associativo con PDO::FETCH_ASSOC.
        return ($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    // =========================================================================
    // RECUPERO CIRCUITI
    // Restituisce tutti i circuiti ordinati alfabeticamente per nome
    // =========================================================================
    public function getCircuiti()
    {
        // PASSO 1: Preparare la query SELECT sulla tabella circuiti.
        $stmt = $this->conn->prepare("SELECT * FROM circuiti ORDER BY nome");

        // PASSO 2: Eseguire la query.
        $stmt->execute();

        // PASSO 3: Restituire i risultati come array associativo.
        return ($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    // =========================================================================
    // RECUPERO GARE CON JOIN E FILTRI DINAMICI
    // Restituisce l'elenco delle gare unendo i dati di circuiti e piloti.
    // Permette di filtrare opzionalmente per stagione e/o stringa di ricerca q.
    // =========================================================================
    public function getAll($stagione = 0, $q = '')
    {
        // PASSO 1: Scrivere la query base con le JOIN (tramite clausola WHERE o INNER JOIN)
        // per recuperare i nomi di pilota e circuito insieme ai dettagli della gara.
        $sql = "SELECT g.id, g.stagione, g.round, g.data_ora, g.stato, g.posizione_arrivo, 
                       p.nome as pilota, p.team, c.nome as circuito, c.paese
                FROM gare g, circuiti c, piloti p
                WHERE g.circuito_id = c.id AND g.pilota_id = p.id";

        // PASSO 2: Aggiungere dinamicamente la condizione della stagione se fornita (> 0).
        if ($stagione > 0) {
            $sql = $sql . " AND g.stagione = :stagione";
        }

        // PASSO 3: Aggiungere dinamicamente il filtro testuale con LIKE su pilota, team o circuito.
        if ($q != "") {
            $sql = $sql . " AND (p.nome LIKE :q OR c.nome LIKE :q OR p.team LIKE :q)";
        }

        // PASSO 4: Preparare lo statement SQL.
        $stmt = $this->conn->prepare($sql);

        // PASSO 5: Eseguire il bindParam solo per i parametri che sono stati effettivamente inseriti nella query.
        if ($stagione > 0) {
            $stmt->bindParam(":stagione", $stagione);
        }

        if ($q != "") {
            // Aggiungere i caratteri jolly '%' prima e dopo la stringa per cercare sottostringhe
            $like = '%' . $q . '%';
            $stmt->bindParam(":q", $like);
        }

        // PASSO 6: Eseguire lo statement.
        $stmt->execute();

        // PASSO 7: Restituire tutte le righe trovate come array di dizionari/array associativi.
        return ($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    // =========================================================================
    // 1. INSERIMENTO DI UNA NUOVA GARA
    // Inserisce una nuova gara con stato='programmata'; restituisce l'id generato
    // =========================================================================
    public function inserisci($stagione, $round, $dataOra, $circuitoId, $pilotaId)
    {
        // PASSO 1: Scrivere la query SQL con i segnaposto (placeholder con due punti ':')
        // per prevenire la SQL Injection.
        // Come da specifica, le nuove gare partono con stato='programmata' e posizione_arrivo=NULL.
        $sql = "INSERT INTO gare (stagione, round, data_ora, circuito_id, pilota_id, stato, posizione_arrivo)
                VALUES (:stagione, :round, :data_ora, :circuito_id, :pilota_id, 'programmata', NULL)";

        // PASSO 2: Preparare lo statement PDO (prepared statement).
        $stmt = $this->conn->prepare($sql);

        // PASSO 3: Associare i parametri effettivi ai placeholder (:parametro).
        $stmt->bindParam(':stagione', $stagione);
        $stmt->bindParam(':round', $round);
        $stmt->bindParam(':data_ora', $dataOra);
        $stmt->bindParam(':circuito_id', $circuitoId);
        $stmt->bindParam(':pilota_id', $pilotaId);

        // PASSO 4: Eseguire la query sul database.
        $stmt->execute();

        // PASSO 5: Restituire l'ID autoincrementale appena creato.
        return $this->conn->lastInsertId();
    }

    // =========================================================================
    // 2. AGGIORNAMENTO DELLA POSIZIONE DI ARRIVO
    // Aggiorna posizione_arrivo e passa lo stato a 'finale'; restituisce il numero di righe modificate
    // =========================================================================
    public function aggiornaPosizione($id, $posizione)
    {
        // PASSO 1: Scrivere la query UPDATE.
        // Quando si assegna una posizione d'arrivo, lo stato della gara diventa 'finale'.
        $sql = "UPDATE gare SET posizione_arrivo = :posizione, stato = 'finale' WHERE id = :id";

        // PASSO 2: Preparare lo statement PDO.
        $stmt = $this->conn->prepare($sql);

        // PASSO 3: Associare i valori ai placeholder.
        $stmt->bindParam(':posizione', $posizione);
        $stmt->bindParam(':id', $id);

        // PASSO 4: Eseguire l'UPDATE.
        $stmt->execute();

        // PASSO 5: Restituire il conteggio delle righe modificate (1 se ha avuto successo, 0 altrimenti).
        return $stmt->rowCount();
    }

    // =========================================================================
    // 3. ELIMINAZIONE DI UNA GARA
    // Elimina la gara per ID; restituisce il numero di righe rimosse
    // =========================================================================
    public function elimina($id)
    {
        // PASSO 1: Query DELETE filtrando sulla chiave primaria `id`.
        $sql = "DELETE FROM gare WHERE id = :id";

        // PASSO 2: Preparare lo statement PDO.
        $stmt = $this->conn->prepare($sql);

        // PASSO 3: Associare il parametro :id.
        $stmt->bindParam(':id', $id);

        // PASSO 4: Eseguire la cancellazione.
        $stmt->execute();

        // PASSO 5: Restituire il conteggio delle righe eliminate (1 se eliminata con successo).
        return $stmt->rowCount();
    }
}

