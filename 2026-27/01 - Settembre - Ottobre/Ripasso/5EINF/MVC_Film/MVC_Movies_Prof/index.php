<?php
require_once 'controllers/FilmController.php';

$controller = new FilmController();
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

    default:
        require 'views/index.html';
        break;
}

