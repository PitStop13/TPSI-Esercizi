"use strict"

$(document).ready(function(){
   let request=new Promise(function(resolve, reject){ //posso chiamarle come voglio,l'unico vincolo è l'ordine
      setTimeout(function(){
         let num=Math.round(10*Math.random()); // 0 - 9
         if(num>4)
            resolve("Ok ce l'abbiamo fatta! il numero era "+num);
         else
            reject("Chiamata fallita, il numero era "+num);
      },2000);
   });

   //Evento then scatta se  tutto ok
   request.then(function(res){
      alert("THEN:"+res);
   });

   //Evento catch scatta se errore
   request.catch(function(err){
      alert("CATCH:"+err);
   })

   //Evento finally scatta sempre
   request.finally(function(){
      alert("Operazione ultimata");
   })

});