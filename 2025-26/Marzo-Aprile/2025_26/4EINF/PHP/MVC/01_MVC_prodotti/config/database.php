<?php
class Database {
    private $host    = "localhost";
    private $db_name = "spesa";
    private $user    = "root";
    private $pass    = "";

    public function connect() {
        $conn = new PDO(
            "mysql:host=$this->host;dbname=$this->db_name;charset=utf8",
            $this->user,
            $this->pass
        );
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    }
}

