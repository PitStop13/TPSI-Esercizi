<?php
// =============================================================================
// CLASSE DATABASE (config/database.php)
// Gestisce la connessione al database MySQL tramite estensione PDO (PHP Data Objects).
// =============================================================================
class Database
{
    // Parametri di connessione per l'ambiente locale (XAMPP):
    private $host    = 'localhost';    // Server del database
    private $db_name = 'motogp_mvc';   // Nome del database
    private $user    = 'root';         // Username predefinito in XAMPP
    private $pass    = '';             // Password predefinita (vuota in XAMPP)

    // Metodo che crea e restituisce l'oggetto di connessione PDO
    public function connect()
    {
        // PASSO 1: Creazione della stringa DSN (Data Source Name) che indica il driver (mysql),
        // l'host, il nome del database e il set di caratteri (utf8mb4 per supportare accenti/simboli).
        // Si crea l'istanza PDO passando DSN, username e password.
        $conn = new PDO(
            "mysql:host=$this->host;dbname=$this->db_name;charset=utf8mb4",
            $this->user,
            $this->pass
        );

        // PASSO 2: Configurare la modalità di gestione degli errori su ECCEZIONE (ERRMODE_EXCEPTION).
        // In questo modo, in caso di errore SQL o di connessione, PDO lancia un PDOException
        // invece di fallire silenziosamente, rendendo facile il debug.
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // PASSO 3: Restituire l'istanza di connessione attiva.
        return $conn;
    }
}

