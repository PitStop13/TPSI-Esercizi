"use strict"

$(document).ready(function(){
   async function foo(){
       let promise1=new Promise(function(resolve,reject){
          setTimeout(function(){
              resolve("A");
          },5000);
       });

       let promise2=new Promise(function(resolve,reject){
          setTimeout(function(){
              resolve("B")
          },10000);
       });

       let promise3=new Promise(function(resolve,reject){
           setTimeout(function(){
               resolve("C");
           },3000);
       });

       let result1=await promise1;
       console.log(result1);

       let result2=await promise2;
       console.log(result2);

       let result3=await promise3;
       console.log(result3);
   }

   foo();
   console.log("K");
});