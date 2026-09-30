<?php
    require_once("models/Prodotto.php");

    class ProdottoController{

        private function jsonResponse($dati, $status=200)
        {
            http_response_code($status);
            header("Contet-Type: application/json; charset=utf-8");
            echo(json_encode($dati));
            exit;
        }

        //GET index.php?action=getAll
        public function getAll(){
            $model=new Prodotto();
            $prodotti=$model->getAll();
            $this->jsonResponse($prodotti);
        }

        public function inserisci(){
            $body=json_decode(file_get_contents("php://input"),true);
            if(isset($body["prod"]))
                $prodotto=$body["prod"];
            else
                $prodotto="";

            if(!$prodotto)
                $this->jsonResponse(["errore"=>"Il nome è obbligatorio!"],400);

            $model=new Prodotto();
            $newId=$model->inserisci($prodotto);
            $this->jsonResponse(["id"=>$newId, "messaggio"=>"Prodotto aggiunto con successo!"],200);

        }

        public function elimina(){
            if(isset($_GET["id"]))
                $id=$_GET["id"];
            else
                $id=null;

            if(!$id)
                $this->jsonResponse(["errore"=>"ID non specificato"],400);

            $model=new Prodotto();
            $model->elimina($id);
            $this->jsonResponse(["messaggio"=>"Prodotto eliminato con successo!"]);

        }

        public function aggiorna(){
            if(isset($_GET["id"]))
                $id=$_GET["id"];
            else
                $id=null;

            if(!$id)
                $this->jsonResponse(["errore"=>"ID non specificato"],400);

            if(isset($_GET["prodotto"]))
                $prodotto=$_GET["prodotto"];
            else
                $prodotto=null;

            if(!$id)
                $this->jsonResponse(["errore"=>"ID non specificato"],400);

            if(!$prodotto)
                $this->jsonResponse(["errore"=>"PRODOTTO non specificato"],400);

            $model=new Prodotto();
            $model->aggiorna($id,$prodotto);
            $this->jsonResponse(["messaggio"=>"Prodotto aggiornato con successo!"]);

        }
    }
?>
