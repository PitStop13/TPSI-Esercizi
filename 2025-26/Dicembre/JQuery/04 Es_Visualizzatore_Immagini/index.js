"use strict";

$(document).ready(function(){
   let nImmagine=1;

   $("#btnIndietro").css({
      backgroundColor:"orange",
      width:"160px",
      height:"40px",
      textAlign:"center",
      borderRadius:"100%",
      fontWeight:"bold",
      margin:"20px 10px"
   }).prop("disabled",true);

   $("#btnAvanti").css({
      backgroundColor:"orange",
      width:"160px",
      height:"40px",
      textAlign: "center",
      borderRadius:"100%",
      fontWeight: "bold",
      margin:"20px 10px"
   });

   $("#img").prop("src","img/img1.jpg").css(
       {
          width:"400px",
          height:"400px",
          verticalAlign:"middle"
       }
   );
   
   $("#btnAvanti").click(function(){
      nImmagine++;
      $("#img").fadeOut(500,function(){
         $("#img").prop("src","img/img"+nImmagine+".jpg");
         $("#img").fadeIn(500);
      });
      if(nImmagine==7)
      {
         $("#btnAvanti").prop("disabled",true);
      }
      $("#btnIndietro").prop("disabled",false);
   });
   
   $("#btnIndietro").click(function(){
      nImmagine--;
      $("#img").fadeOut(500,function(){
         $("#img").prop("src","img/img"+nImmagine+".jpg");
         $("#img").fadeIn(500);
      });
      if(nImmagine==1)
      {
         $("#btnIndietro").prop("disabled",true);
      }
      $("#btnAvanti").prop("disabled",false);
   });

});