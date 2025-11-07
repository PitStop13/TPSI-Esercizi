"use strict"

window.onload = function () {
    //let studente = {}; Oggetto JSON vuoto

    let studente = { //Oggetto JSON
        "nome": "Mario", //Stringa
        "cognome": "Rossi", //String
        "eta": 19, //Numerico
        "studente": true, //bool
        "images": ["smile.gif", "bomb.gif"], //Vettore per indicare che ci possono essere pià elementi
        "hobbies": [], //Vettore al momento vuoto
        "pos": { "X": 40, "Y": 300 } //oggetto JSON annidato
    };

    console.log(studente.eta); //Prima di modifica
    studente["eta"]++;
    console.log(studente.eta); //Dopo MOdifica
    
    console.log(studente.nome); // Oppure....console.log(studente["nome"]); stampo prima della modifica
    studente.nome = "Giulia"; // Oppure....studente["nome"] = "Giulia";
    console.log(studente.nome); //stampo dopo la modifica
    
    studente.residenza = "Fossano";  // Oppure....studente["residenza"] = "Fossano"; Se c'è la sovrascrive,se non c'è la crea
    console.log(studente.residenza);
    
    if("residenza" in studente){ //Controllo se è presente la chiave residenza
        console.log("Residenza presente");
    }
    else{
        console.log("Residenza assente");
    }

    delete studente.residenza; //cancello un elemento tramite la chiave

    if("residenza" in studente){ //Controllo se è ancora presente dopo la cancellazione
        console.log("Residenza presente");
    }
    else{
        console.log("Residenza assente");
    }

    for(let key in studente){
        console.log(key + ":" + studente[key]);
    }

    let s = JSON.stringify(studente); //serveperconvertire da un ogetto JSON  a string 
    console.log(s);

    let objStudente= JSON.parse(s);//da string a oggetto
    console.log(objStudente);


    // let bookstore = [
    //     {
    //         "title":"Mio titolo",
    //         "author": "Rossi M.",
    //         "year": 2019,
    //         "price": 10.99
    //     },
    //     {
    //         "title":"Il libro di rolfo",
    //         "author": "Rolfo R.",
    //         "year": 2018,
    //         "price": 9.99
    //     }
    // ]
    let bookstore = {
        "bookstore":[{
            "title":"Mio titolo",
            "author": ["Rossi M.","Barbero A."],
            "year": 2019,
            "price": 10.99
        },
        {
            "title":"Il libro di rolfo",
            "author": "Rolfo R.",
            "year": 2018,
            "price": 9.99
        }]
    }


    let key = Object.keys(studente);
    console.log(key);
    for(let i  = 0;i<key.length;i++){
        console.log(key[i]+" : " + studente[key[i]]);
    }

    for (let keys of key){
        console.log(keys);
    } 
}

//Una volta scritto il JSON vado su un sito online che valida e controlla se il JSON che ho scritto funzioni
