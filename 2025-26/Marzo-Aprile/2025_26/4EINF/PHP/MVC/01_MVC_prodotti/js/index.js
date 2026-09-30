"use strict";

const URL_BASE="http://localhost:8080/2025_26/4EINF/MVC_prodotti/index.php";

$(document).ready(function(){
   caricaProdotti();
   function caricaProdotti(){
       let request=inviaRichiesta("GET",URL_BASE+"?action=getAll");
       request.fail(errore);
       request.done(function(prodotti){
           //console.log(prodotti);
           let lista = $("#listaProdotti");
           lista.empty();

           for(let prodotto of prodotti){
               let li=$("<li>");
               //Aggiungo prodotto
               $("<span>").text(prodotto.nome).appendTo(li);

               //Aggiungo pulsante "elimina"
               $("<button>")
                   .addClass("btn-elimina")
                   .text("Elimina")
                   .on("click",function(){
                      eliminaProdotto(prodotto.id);
                   }).appendTo(li);

               lista.append(li);
           }
       });
   }

   $("#formAggiungi").on("submit",function(e){
       e.preventDefault(); //impedisce caricamento pagina
       let prodotto=$("#inputProdotto").val().trim();
       if(!prodotto) return;

       let request=inviaRichiesta("POST",URL_BASE+"?action=inserisci",{prod:prodotto});
       request.fail(errore);
       request.done(function(data){
          console.log(data);
          $("#inputProdotto").val(""); //svuoto campo di inserimento
          caricaProdotti(); //ricarico la lista aggiornata
       });
   })

    //Creo funzione "eliminaProdotto"
    function eliminaProdotto(id){
       let request=inviaRichiesta("DELETE",URL_BASE+"?action=elimina&id="+id);
       request.fail(errore);
       request.done(function(){
           caricaProdotti();
       });
    }

});
