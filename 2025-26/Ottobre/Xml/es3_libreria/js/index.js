"use strict";
let idPrec = "tr0";
let selected;
let xmlDoc;


window.addEventListener("load", function () {
    let body = document.getElementsByTagName("body")[0];
    let btnCaricaXml = document.createElement("button");
    body.appendChild(btnCaricaXml);
    btnCaricaXml.textContent = "Caricamento XML";
    btnCaricaXml.addEventListener("click", carica);

    let btn = document.createElement("button");
    body.appendChild(btn);
    btn.textContent = "Clicca per vedere tabella";
    btn.addEventListener("click", btnClicked);
    
    if (sessionStorage.getItem("autoShowTable") == "1") {
        sessionStorage.removeItem("autoShowTable");
        btnClicked.call(btn);
    }
})

function carica() {
    let xml = dati;
    localStorage.setItem("book.xml", xml);
    alert("Documento salvato nel localstorage");
}

let vet = ["Categoria", "Cover", "Titolo", "Autore", "Anno", "Prezzo"];


function btnClicked() {

    this.removeEventListener("click", btnClicked)

    let xml = localStorage.getItem("book.xml")
    let parser = new DOMParser()
    xmlDoc = parser.parseFromString(xml, "text/xml")
    let xmlRoot = xmlDoc.getElementsByTagName("bookstore")[0]

    let body = document.getElementsByTagName("body")[0]
    let table = document.createElement("table")
    table.id = "tableData"
    body.appendChild(table)
    let trHead = document.createElement("tr")
    table.appendChild(trHead)
    for (let i = 0; i < vet.length; i++) {
        let th = document.createElement("th")
        trHead.appendChild(th)
        th.textContent = vet[i]
    }

    for (let i = 0; i < xmlRoot.children.length; i++) {
        let tr = document.createElement("tr")
        tr.id = "tr" + i;
        tr.addEventListener("click",
            function () {
                seleziona(this.id);
            })
        table.appendChild(tr)

        let title = "", author = "", year = "", price = "", category = "", cover = ""
        let book = xmlRoot.children[i]
        if (book.getAttribute("category")) {
            category = book.getAttribute("category")
        }
        let tdCategory = document.createElement("td")
        tdCategory.id = "tr" + i + "_cat";
        tr.appendChild(tdCategory)
        tdCategory.textContent = book.getAttribute("category")
        if (book.getAttribute("cover")) {
            cover = book.getAttribute("cover")
        }
        else {
            cover = ""
        }
        let tdCover = document.createElement("td")
        tdCover.id = "tr" + i + "_cover";
        tr.appendChild(tdCover)
        tdCover.textContent = book.getAttribute("cover")


        for (let j = 0; j < book.children.length; j++) {
            let td = document.createElement("td")
            tr.appendChild(td)
            let field = book.children[j]
            switch (field.nodeName) {
                case "title":
                    title = field.textContent
                    td.textContent = field.textContent
                    td.id = "tr" + i + "_titolo";
                    break;
                case "author":
                    author = field.textContent
                    td.textContent = field.textContent
                    td.id = "tr" + i + "_autore";
                    break;
                case "year":
                    year = field.textContent
                    td.textContent = field.textContent
                    td.id = "tr" + i + "_anno";
                    break;
                case "price":
                    price = field.textContent
                    td.textContent = field.textContent
                    td.id = "tr" + i + "_prezzo";
                    break;

            }
        }

        console.log(cover + " | " + category + " | " + title + " | " + author + " | " + year + " | " + price)
    }

    let tabella = document.createElement("table");
    body.appendChild(tabella);
    let tr = document.createElement("tr");
    tabella.appendChild(tr);
    let td = document.createElement("td");
    tr.appendChild(td);
    let label = document.createElement("label");
    label.innerText = "Titolo"
    td.appendChild(label);
    td = document.createElement("td");
    let input = document.createElement("input");
    input.id = "titolo";
    td.appendChild(input);
    tr.appendChild(td);

    tr = document.createElement("tr");
    tabella.appendChild(tr);
    td = document.createElement("td");
    tr.appendChild(td);
    label = document.createElement("label");
    label.innerText = "Categoria"
    td.appendChild(label);
    td = document.createElement("td");
    input = document.createElement("input");
    input.id = "cat";
    td.appendChild(input);
    tr.appendChild(td);

    tr = document.createElement("tr");
    tabella.appendChild(tr);
    td = document.createElement("td");
    tr.appendChild(td);
    label = document.createElement("label");
    label.innerText = "Cover"
    td.appendChild(label);
    td = document.createElement("td");
    input = document.createElement("input");
    input.id = "cover";
    td.appendChild(input);
    tr.appendChild(td);

    tr = document.createElement("tr");
    tabella.appendChild(tr);
    td = document.createElement("td");
    tr.appendChild(td);
    label = document.createElement("label");
    label.innerText = "Autore"
    td.appendChild(label);
    td = document.createElement("td");
    input = document.createElement("input");
    input.id = "autore";
    td.appendChild(input);
    tr.appendChild(td);

    tr = document.createElement("tr");
    tabella.appendChild(tr);
    td = document.createElement("td");
    tr.appendChild(td);
    label = document.createElement("label");
    label.innerText = "Anno"
    td.appendChild(label);
    td = document.createElement("td");
    input = document.createElement("input");
    input.id = "anno";
    td.appendChild(input);
    tr.appendChild(td);

    tr = document.createElement("tr");
    tabella.appendChild(tr);
    td = document.createElement("td");
    tr.appendChild(td);
    label = document.createElement("label");
    label.innerText = "Prezzo"
    td.appendChild(label);
    td = document.createElement("td");
    input = document.createElement("input");
    input.id = "prezzo";
    td.appendChild(input);
    tr.appendChild(td);

    let btn = document.createElement("button");
    btn.innerText = "Inserisci libro";
    btn.addEventListener("click", eseguiInserimento);
    body.appendChild(btn);

    btn = document.createElement("button");
    btn.innerText = "Modifica libro";
    btn.addEventListener("click", modificaLibro);
    body.appendChild(btn);

    btn = document.createElement("button");
    btn.innerText = "Rimuovi libro";
    btn.addEventListener("click", eseguiRimozione);
    body.appendChild(btn);
}

function eseguiRimozione() {
    if (selected == undefined) {
        alert("Selezionare il libro da cancellare.");

    } else {
        let indice = selected.substring(2);//dalla pos 2 in fondo //tr-0
        let root = xmlDoc.documentElement;//xmldoc.getElementByTagName
        let book = root.children[indice];
        root.removeChild(book); //deve passaer direttamente il nodo
        salva();
    }
}

function modificaLibro() {
    console.log(selected);//devo effettuare solo se ho selezionato qualcosa
    if (selected == undefined) {
        alert("Selezionare il libro da modificare.");

    } else {
        let indice = selected.substring(2);//dalla pos 2 in fondo //tr-0
        let root = xmlDoc.documentElement;//xmldoc.getElementByTagName
        let book = root.children[indice];

        book.children[0].textContent = document.getElementById("titolo").value;
        book.children[1].textContent = document.getElementById("autore").value;
        book.children[2].textContent = document.getElementById("anno").value;
        book.children[3].textContent = document.getElementById("prezzo").value;
        book.setAttribute("category",document.getElementById("cat").value);
        book.setAttribute("cover",document.getElementById("cover").value);
        salva();
    }
}

function eseguiInserimento() {
    let root = xmlDoc.documentElement;
    let libro = xmlDoc.createElement("book");
    libro.setAttribute("category", document.getElementById("cat").value);
    libro.setAttribute("cover", document.getElementById("cover").value);
    //Creazione titolo
    let titolo = xmlDoc.createElement("title");
    let valTitolo = xmlDoc.createTextNode(document.getElementById("titolo").value);
    titolo.appendChild(valTitolo);
    libro.appendChild(titolo);

    //Creazione autore
    let autore = xmlDoc.createElement("author");
    let valAutore = xmlDoc.createTextNode(document.getElementById("autore").value);
    autore.appendChild(valAutore);
    libro.appendChild(autore);

    //Creazione anno
    let anno = xmlDoc.createElement("year");
    let valAnno = xmlDoc.createTextNode(document.getElementById("anno").value);
    anno.appendChild(valAnno);
    libro.appendChild(anno);

    //Creazione prezzo
    let prezzo = xmlDoc.createElement("price");
    let valPrezzo = xmlDoc.createTextNode(document.getElementById("prezzo").value);
    prezzo.appendChild(valPrezzo);
    libro.appendChild(prezzo);

    //Aggiungo a xml
    root.appendChild(libro);
    salva();
}

function salva() {
    let serializer = new XMLSerializer();
    let xmlTesto = serializer.serializeToString(xmlDoc);
    localStorage.setItem("book.xml", xmlTesto);
    sessionStorage.setItem("autoShowTable", "1"); // mostra tabella al prossimo load
    window.location.reload();
}


function seleziona(id) {
    if (document.getElementById(idPrec) != null)
        document.getElementById(idPrec).style.backgroundColor = "white";
    document.getElementById(id).style.backgroundColor = "yellow";
    idPrec = id;
    caricaCampi(id);
    selected = id;
}

function caricaCampi(id) { // id=tr0, tr1, tr2, ...
    document.getElementById("titolo").value = document.getElementById(id + "_titolo").innerText;
    document.getElementById("cover").value = document.getElementById(id + "_cover").innerText;
    document.getElementById("cat").value = document.getElementById(id + "_cat").innerText;
    document.getElementById("autore").value = document.getElementById(id + "_autore").innerText;
    document.getElementById("anno").value = document.getElementById(id + "_anno").innerText;
    document.getElementById("prezzo").value = document.getElementById(id + "_prezzo").innerText;
}
