<?php
require_once 'controllers/GaraController.php';

$controller = new GaraController();
$action = $_GET['action'] ?? 'index';

switch ($action) {
    case 'getAll':
        $controller->getAll();
        break;

    case 'getPiloti':
        $controller->getPiloti();
        break;

    case 'getCircuiti':
        $controller->getCircuiti();
        break;

    case 'inserisci':
        $controller->inserisci();
        break;

    case 'aggiornaPosizione':
        $controller->aggiornaPosizione();
        break;

    case 'elimina':
        $controller->elimina();
        break;

    default:
        require 'views/index.html';
        break;
}

