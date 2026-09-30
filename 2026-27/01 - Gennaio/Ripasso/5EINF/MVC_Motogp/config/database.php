<?php
class Database
{
    private $host    = 'localhost';
    private $db_name = 'motogp_mvc';
    private $user    = 'root';
    private $pass    = '';

    public function connect()
    {
        $conn = new PDO(
            "mysql:host=$this->host;dbname=$this->db_name;charset=utf8mb4",
            $this->user,
            $this->pass
        );
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    }
}

