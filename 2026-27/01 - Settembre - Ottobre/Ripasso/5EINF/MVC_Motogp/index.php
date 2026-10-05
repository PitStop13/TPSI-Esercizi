<?php
// =============================================================================
// FRONT CONTROLLER / ROUTER (index.php)
// Questo file è l'unico punto di ingresso (Single Entry Point) per tutte le richieste HTTP.
// In base al parametro ?action=... passato nell'URL, instrada la richiesta al
// metodo corrispondente del Controller, oppure carica la vista HTML principale.
// =============================================================================

// PASSO 1: Includere il Controller principale dell'applicazione.
require_once 'controllers/GaraController.php';

// PASSO 2: Istanziare il Controller per poter chiamare i suoi metodi.
$controller = new GaraController();

// PASSO 3: Leggere il parametro 'action' passato tramite query string ($_GET).
// Se 'action' non è presente nell'URL (es. l'utente apre semplicemente la home page),
// usiamo l'operatore '??' per assegnare il valore di default 'index'.
$action = $_GET['action'] ?? 'index';

// PASSO 4: Smistamento della richiesta (Routing).
// Tramite lo switch controlliamo quale azione è stata richiesta dal client (via browser o AJAX).
switch ($action) {

    // 1. Chiamata AJAX per recuperare le gare (con eventuali filtri stagione/testo)
    case 'getAll':
        $controller->getAll();
        break;

    // 2. Chiamata AJAX per popolare la select dei piloti
    case 'getPiloti':
        $controller->getPiloti();
        break;

    // 3. Chiamata AJAX per popolare la select dei circuiti
    case 'getCircuiti':
        $controller->getCircuiti();
        break;

    // 4. Chiamata AJAX (POST) per inserire una nuova gara
    case 'inserisci':
        $controller->inserisci();
        break;

    // 5. Chiamata AJAX (PATCH) per impostare la posizione di arrivo
    case 'aggiornaPosizione':
        $controller->aggiornaPosizione();
        break;

    // 6. Chiamata AJAX (DELETE) per cancellare una gara
    case 'elimina':
        $controller->elimina();
        break;

    // 7. DEFAULT: Se l'azione non corrisponde a nessuna API (o è 'index'),
    // carichiamo la vista grafica dell'applicazione (file HTML con i form e le card).
    default:
        require 'views/index.html';
        break;
}

