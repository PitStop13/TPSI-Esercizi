<?php
    require_once("config/database.php");

    class Film{
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

        public function inserisci($titolo){
            $stmt=$this->conn->prepare("INSERT INTO film (titolo) VALUES (:titolo)");
            $stmt->bindParam(":titolo",$titolo);
            $stmt->execute();
            return($this->conn->lastInsertId());
        }

        public function elimina($id){
            $stmt=$this->conn->prepare("DELETE FROM film WHERE id=:id");
            $stmt->bindParam(":id",$id,PDO::PARAM_INT);
            $stmt->execute();
        }

        public function aggiorna($id,$titolo){
            $stmt=$this->conn->prepare("UPDATE film SET titolo=:titolo WHERE id=:id");
            $stmt->bindParam(":id",$id);
            $stmt->bindParam(":titolo",$titolo);
            $stmt->execute();
        }
    }
?>
