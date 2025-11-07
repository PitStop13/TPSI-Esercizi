"use strict"
const dimX = 4, dimY = 6;

window.addEventListener("load", function () {
    let body = document.getElementsByTagName("body")[0];

    // Centro tutto il contenuto
    body.style.display = "flex";
    body.style.flexDirection = "column";
    body.style.alignItems = "center";
    body.style.justifyContent = "flex-start";
    body.style.minHeight = "100vh";
    body.style.gap = "10px";

    // Bottone per generare la tabella
    let btn = document.createElement("button");
    btn.addEventListener("click", creaTabella);
    btn.textContent = "Clicca qui per vedere l'XML";
    body.appendChild(btn);

    // Contenitore tabella (centrato)
    let tableWrapper = document.createElement("div");
    tableWrapper.id = "tableWrapper";
    tableWrapper.style.display = "flex";
    tableWrapper.style.flexDirection = "column";
    tableWrapper.style.alignItems = "center";
    body.appendChild(tableWrapper);

    // Contenitore dettagli sotto la tabella (centrato)
    let dettagli = document.createElement("div");
    dettagli.setAttribute("id", "dettagliLibro");
    dettagli.style.marginTop = "15px";
    dettagli.style.textAlign = "left"; // testo leggibile a sinistra
    body.appendChild(dettagli);
});

function creaTabella() {
    let tableWrapper = document.getElementById("tableWrapper");
    let dettagli = document.getElementById("dettagliLibro");

    // Pulisci eventuale tabella e dettagli precedenti
    tableWrapper.innerHTML = "";
    dettagli.innerHTML = "";

    // Parsing XML
    let xml = dati;
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml, "text/xml");
    let xmlRoot = xmlDoc.getElementsByTagName("bookstore")[0];

    // Tabella
    let table = document.createElement("table");
    table.setAttribute("border", "1");
    table.style.marginTop = "15px";
    table.style.marginBottom = "15px";
    table.style.borderCollapse = "collapse";

    // Intestazioni
    let thead = document.createElement("thead");
    let trHead = document.createElement("tr");
    let headers = ["Titolo", "Autore", "Anno", "Prezzo", "Categoria", "Cover"];
    for (let h = 0; h < headers.length; h++) {
        let th = document.createElement("th");
        th.textContent = headers[h];
        th.style.padding = "6px 10px";
        trHead.appendChild(th);
    }
    thead.appendChild(trHead);
    table.appendChild(thead);

    let tbody = document.createElement("tbody");

    // Righe dati
    for (let i = 0; i < xmlRoot.children.length; i++) {
        let book = xmlRoot.children[i];

        let category = book.getAttribute("category") || "";
        let cover = book.getAttribute("cover") || "";

        let title = "", author = "", year = "", price = "";

        let tr = document.createElement("tr");
        tr.setAttribute("id", "tr" + i);

        for (let k = 0; k < book.children.length; k++) {
            let td = document.createElement("td");
            td.style.padding = "6px 10px";
            let field = book.children[k];

            switch (field.nodeName) {
                case "title": {
                    title = field.textContent;
                    td.textContent = title;
                    td.setAttribute("id", "tr" + i + "_titolo");
                    break;
                }
                case "author": {
                    author = field.textContent;
                    td.textContent = author;
                    td.setAttribute("id", "tr" + i + "_autore");
                    break;
                }
                case "year": {
                    year = field.textContent;
                    td.textContent = year;
                    td.setAttribute("id", "tr" + i + "_anno");
                    break;
                }
                case "price": {
                    price = field.textContent;
                    td.textContent = price;
                    td.setAttribute("id", "tr" + i + "_prezzo");
                    break;
                }
            }

            tr.appendChild(td);
        }

        // Celle per attributi category e cover
        let tdCategory = document.createElement("td");
        tdCategory.textContent = category;
        tdCategory.setAttribute("id", "tr" + i + "_cat");
        tdCategory.style.padding = "6px 10px";
        tr.appendChild(tdCategory);

        let tdCover = document.createElement("td");
        tdCover.textContent = cover;
        tdCover.setAttribute("id", "tr" + i + "_cover");
        tdCover.style.padding = "6px 10px";
        tr.appendChild(tdCover);

        // Click riga: evidenzia e mostra dettagli sotto la tabella
        tr.addEventListener("click", function () {
            // reset colori
            let tutte = tbody.getElementsByTagName("tr");
            for (let r = 0; r < tutte.length; r++) {
                tutte[r].style.backgroundColor = "";
            }
            // evidenzia
            tr.style.backgroundColor = "yellow";

            // mostra dettagli sotto, in colonna
            mostraDettagli({
                title: title,
                author: author,
                year: year,
                price: price,
                category: category,
                cover: cover
            });
        });

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    tableWrapper.appendChild(table);
}

function mostraDettagli(info) {
    let dettagli = document.getElementById("dettagliLibro");
    dettagli.innerHTML = "";

    // wrapper per centrare i dettagli in colonna
    let col = document.createElement("div");
    col.style.display = "flex";
    col.style.flexDirection = "column";
    col.style.alignItems = "center"; // centra il blocco dettagli
    col.style.gap = "6px";

    function rigaDettaglio(etichetta, valore) {
        let riga = document.createElement("div");
        riga.style.display = "flex";
        riga.style.gap = "6px";
        riga.style.alignItems = "center";

        let lab = document.createElement("span");
        lab.textContent = etichetta;

        let val = document.createElement("span");
        val.textContent = valore;

        riga.appendChild(lab);
        riga.appendChild(val);
        col.appendChild(riga);
    }

    rigaDettaglio("Titolo:", info.title);
    rigaDettaglio("Autore:", info.author);
    rigaDettaglio("Anno:", info.year);
    rigaDettaglio("Prezzo:", info.price);
    rigaDettaglio("Categoria:", info.category);
    rigaDettaglio("Cover:", info.cover);

    dettagli.appendChild(col);
}
