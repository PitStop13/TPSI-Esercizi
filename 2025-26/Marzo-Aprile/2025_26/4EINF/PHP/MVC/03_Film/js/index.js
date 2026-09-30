"use strict";

const URL_BASE="http://localhost/2025_26/4EINF/PHP/MVC/03_Film/index.php";
let tuttiIFilm = [];

$(document).ready(function(){
   caricaFilm();
   
   function caricaFilm(){
       let request=inviaRichiesta("GET",URL_BASE+"?action=getAll");
       request.fail(errore);
       request.done(function(film){
           tuttiIFilm = film;
           aggiornaLista(film);
       });
   }

    function aggiornaLista(film){
       let lista = $("#listaFilm");
       lista.empty();

       for(let f of film){
           let li=$("<li>");
           //Aggiungo titolo
           $("<span>").text(f.titolo).appendTo(li);

           //Aggiungo "modifica"
           $("<button>")
               .addClass("btn-modifica")
               .text("Modifica")
               .on("click",function(){
                  modificaFilm(f.id, f.titolo);
               }).appendTo(li);

           //Aggiungo "elimina"
           $("<button>")
               .addClass("btn-elimina")
               .text("Elimina")
               .on("click",function(){
                  eliminaFilm(f.id);
               }).appendTo(li);

           lista.append(li);
       }
   }

   // Form aggiunta film
   $("#formAggiungi").on("submit",function(e){
       e.preventDefault();
       let titolo=$("#inputFilm").val().trim();
       if(!titolo) return;

       let request=inviaRichiesta("POST",URL_BASE+"?action=inserisci",{titolo:titolo});
       request.fail(errore);
       request.done(function(data){
          $("#inputFilm").val("");
          caricaFilm();
       });
   });

   // Ricerca film
   $("#inputCerca").on("keyup",function(){
       let ricerca=$(this).val().toLowerCase().trim();
       if(ricerca === ""){
           aggiornaLista(tuttiIFilm);
       } else {
           let filmFiltrati = tuttiIFilm.filter(f => f.titolo.toLowerCase().includes(ricerca));
           aggiornaLista(filmFiltrati);
       }
   });

   // Modifica film con prompt
   function modificaFilm(id, titoloAttuale){
       let nuovoTitolo = prompt("Nuovo titolo:", titoloAttuale);
       
       if(nuovoTitolo === null) return;
       
       nuovoTitolo = nuovoTitolo.trim();
       if(!nuovoTitolo) {
           alert("Il titolo non può essere vuoto!");
           return;
       }
       
       let request=inviaRichiesta("POST",URL_BASE+"?action=aggiorna",{id:id, titolo:nuovoTitolo});
       request.fail(errore);
       request.done(function(){
          caricaFilm();
       });
   }

   // Elimina film
   function eliminaFilm(id){
       if(confirm("Sei sicuro di voler eliminare questo film?")) {
           let request=inviaRichiesta("DELETE",URL_BASE+"?action=elimina&id="+id);
           request.fail(errore);
           request.done(function(){
               caricaFilm();
           });
       }
   }
});
