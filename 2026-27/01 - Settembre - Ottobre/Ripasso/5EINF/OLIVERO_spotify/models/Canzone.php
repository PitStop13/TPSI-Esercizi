<?php
require_once 'config/database.php';

class Canzone
{

    private $conn;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    // Consente di ottenere tutte le canzoni, eventualmente filtrate da una query di ricerca
    public function getAll($q = '')
    {
        if ($q == '') {
            $stmt = $this->conn->prepare('SELECT * FROM canzoni ');
            $stmt->execute();
            return ($stmt->fetchAll(PDO::FETCH_ASSOC));
        } else {
            $stmt = $this->conn->prepare('SELECT * FROM canzoni WHERE titolo LIKE :q OR artista LIKE :q');
            $like = "%$q%";
            $stmt->bindParam(":q", $like);
            $stmt->execute();
            return ($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
    }

    // Consente di inserire una nuova canzone nel database
    public function inserisci($titolo, $artista, $album = '', $anno = null)
    {
        $sql = "INSERT INTO canzoni (titolo, artista, album, anno)
                VALUES (:titolo, :artista, :album, :anno)";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':titolo', $titolo);
        $stmt->bindParam(':artista', $artista);
        $stmt->bindParam(':album', $album);
        $stmt->bindParam(':anno', $anno);

        $stmt->execute();

        return $this->conn->lastInsertId();

    }

    // Consente di eliminare una canzone dal database in base al suo ID
    public function elimina($id)
    {
        $sql = "DELETE FROM canzoni WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':id', $id);

        $stmt->execute();

        return $stmt->rowCount();
    }

    // Consente di modificare il titolo di una canzone esistente nel database in base al suo ID
    public function modificaTitolo($id, $titolo)
    {
        $sql = "UPDATE canzoni SET titolo = :titolo WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':titolo', $titolo);
        $stmt->bindParam(':id', $id);

        $stmt->execute();

        return $stmt->rowCount();
    }

    // Consente di modificare l'artista di una canzone esistente nel database in base al suo ID
    public function modificaArtista($id, $artista)
    {
        $sql = "UPDATE canzoni SET artista = :artista WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':artista', $artista);
        $stmt->bindParam(':id', $id);

        $stmt->execute();

        return $stmt->rowCount();
    }
}


