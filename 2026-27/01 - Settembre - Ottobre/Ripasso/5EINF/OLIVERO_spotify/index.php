<?php
require_once 'controllers/CanzioneController.php';

$controller = new CanzioneController();
$action = $_GET['action'] ?? 'index';

switch ($action) {
    case 'getAll':
        $controller->getAll();
        break;

    case 'inserisci':
        $controller->inserisci();
        break;

    case 'elimina':
        $controller->elimina();
        break;

    case 'modificaTitolo':
        $controller->modificaTitolo();
        break;

    case 'modificaArtista':
        $controller->modificaArtista();
        break;

    default:
        require 'views/index.html';
        break;
}


