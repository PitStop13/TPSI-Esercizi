<?php
require_once 'config/database.php';


class Film {


    private $conn;


    public function __construct() {
        $db = new Database();
        $this->conn = $db->connect();
    }


    // Restituisce tutti i film, eventualmente filtrati per titolo
    public function getAll($q = '') {
        if ($q == '') {
            $stmt = $this->conn->prepare('SELECT * FROM film');
            $stmt->execute();
            return($stmt->fetchAll(PDO::FETCH_ASSOC));
        } else {
            $stmt = $this->conn->prepare('SELECT * FROM film WHERE titolo LIKE :q');
            $like = "%$q%";
            $stmt->bindParam(":q", $like);
            $stmt->execute();
            return($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
    }


    // Inserisce un nuovo film nel database e restituisce l'ID del film appena inserito
    public function inserisci($titolo) {
        $stmt = $this->conn->prepare("INSERT INTO film (titolo) values (:titolo)");
        $stmt->bindParam(":titolo", $titolo);
        $stmt->execute();
        return($this->conn->lastInsertId()); // resitutizone del uultimo cosa oinseirto
    }


    // Elimina un film dal database in base al suo ID e restituisce il numero di righe eliminate
    public function elimina($id) {
        $stmt = $this->conn->prepare("DELETE FROM film WHERE id = :id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt->rowCount(); // restituisce il numero di righe eliminate
    }


    // Modifica il titolo di un film esistente nel database e restituisce il numero di righe modificate
    public function modificaTitolo($id, $titolo) {
        $stmt = $this->conn->prepare("UPDATE film SET titolo = :titolo WHERE id = :id");
        $stmt->bindParam(":titolo", $titolo);
        $stmt->bindParam(":id", $id);
        //    $stmt->bindParam(":id", $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->rowCount();
    }
}