<?php
    require_once("controllers/FilmController.php");

    $controller = new FilmController();

    if(isset($_GET["action"]))
        $action=$_GET["action"];
    else
        $action="index";

    switch($action){
        case "getAll":
            $controller->getAll();
            break;
        case "inserisci":
            $controller->inserisci();
            break;
        case "elimina":
            $controller->elimina();
            break;
        case "aggiorna":
            $controller->aggiorna();
            break;
        default:
            require "views/index.html";
            break;
    }
?>
