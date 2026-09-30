<?php
    require_once("config/database.php");

    class Prodotto{
        private $conn;

        //Costruttore della classe
        public function __construct(){
            $db=new Database();
            $this->conn=$db->connect();
        }

        public function getAll(){
            $stmt=$this->conn->prepare("SELECT * FROM film");
            $stmt->execute();
            return($stmt->fetchAll(PDO::FETCH_ASSOC));
        }

        public function inserisci($prodotto){
            $stmt=$this->conn->prepare("INSERT INTO film (titolo) VALUES (:prodotto)");
            $stmt->bindParam(":prodotto",$prodotto);
            $stmt->execute();
            return($this->conn->lastInsertId());
        }

        public function elimina($id){
            $stmt=$this->conn->prepare("DELETE FROM film WHERE id=:id");
            $stmt->bindParam(":id",$id,PDO::PARAM_INT);
            $stmt->execute();
        }

        public function aggiorna($id,$prodotto){
            $stmt=$this->conn->prepare("UPDATE film SET titolo=:prodotto WHERE id=:id");
            $stmt->bindParam(":id",$id);
            $stmt->bindParam(":prodotto",$prodotto);
            $stmt->execute();
        }
    }
?>