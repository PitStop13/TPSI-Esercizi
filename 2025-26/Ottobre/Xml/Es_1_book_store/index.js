"use strict"

window.onload = function(){
    
    //let xmlRoot = xml.firstElementChild;
    //let xmlRoot = xmlDoc.documentElement;
    let xmlRoot = xmlDoc.getElementsByTagName("bookstore")[0];
    console.log("Numero di elementi figli di bookstore: "+xmlRoot.children.length);
    for(let i = 0;i<xmlRoot.children.length;i++){
        let book= xmlRoot.children[i];
        /*
        let category = book.getAttribute("category");
        let title = book.firstElementChild.textContent;
        let authors = "";
        for(let author of book.querySelectorAll("author")){
            if(authors==""){
            authors+=author.textContent;
            }
            else{
                authors+="-"+author.textContent;
            }
            let price=book.lastElementChild.textContent;
            alert(title+" | "+category+" | "+authors+" | "+price);*
    
        }
        */
       for (let j = 0; j < book.children.length; j++) {
        let filed=book.children[j];
        if(filed.nodeName=="title")
            {
                console.log(filed.textContent);
            }
            else if (filed.nodeName=="author") {
                
            }
            else if (filed.nodeName=="year") {
                
            }
            else if(filed.nodeName=="price")
            {

            }

       }
    }
}