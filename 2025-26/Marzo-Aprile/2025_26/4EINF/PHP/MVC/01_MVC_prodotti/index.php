<?php
    require_once("controllers/ProdottoController.php");

    $controller = new ProdottoController();

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
        default:
            require "views/index.html";
            break;
    }
?>
