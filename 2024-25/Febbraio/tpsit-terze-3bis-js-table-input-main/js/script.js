// Adds some code for when I load the page.
window.addEventListener("load", function() {

});

/**
 * paragraphWithEvenRows creates a paragraph with the specified id,
 * with content from specified column values only for even rows.
 * @param {String} table_id The table ID to search into
 * @param {String} column_name The name of the column used to filter into a row
 * @param {String} new_paragraph_id The ID of the paragraph created with result
 */
function paragraphWithEvenRows(table_id, column, new_paragraph_id) {
    const new_p = document.createElement("p");
    new_p.id = new_paragraph_id;

    const table = document.getElementById(table_id);
    // recupero tute le righe della tabella
    const tr = table.querySelectorAll("tr");
    // seliziono solo la prima (contenente l'intestazione)
    const firstTr = tr[0];

    const th = firstTr.querySelectorAll("th");

    let columnIndex = -1;

    // scorrro tutte le celle dell'intestazione
    for(let i = 0; i < th.length; i++)
    {
        // se trovo la colonna salvo l'indice trovato
        if(th[i].textContent == column)
        {
            columnIndex = i;
            break;
        }
    }

    // creo e aggiungo il nuovo paragrafo
    for(let i = 1; i < tr.length; i+= 2)
    {
        // recupero le celle della riga attuale
        const td = tr[i].querySelectorAll("td");
        // aggiungo al pragrafo il contenutto della cella della colonna scelta
        new_p.innerHTML += td[columnIndex.textContent] + "<br>";
    }

    // appendo la tabella al main
    const main = document.querySelector("#student-area > main");
    main.appendChild(new_p);
}

/**
 * createTextInput creates a new input with the specified ID and adds it to the
 * student-area.
 * @param {String} input_id The ID of the text input to create
 */
function createTextInput(input_id) {
    const newTxt = document.createElement("input");
    newTxt.type = "text";
    newTxt.id = input_id;

    // appendo il txt al main
    const main = document.querySelector("#student-area > main");
    main.appendChild(newTxt);
}

/**
 * createCustomizableButton creates a customizable button and 
 * adds it to the student-area, with the text from specified input as value.
 * @param {String} input_id The ID of the text input to take information from.
 * @param {String} button_id The ID of the button to create.
 */
function createCustomizableButton(input_id, button_id) {
    // recupero la textbox con l'id passato
    const txt = document.getElementById(input_id);

    // creo e recupero il nuovo bottone
    const newButton = document.createElement("button");
    newButton.id = button_id;
    newButton.textContent = txt.value;

    // appendo il txt al main
    const main = document.querySelector("#student-area > main");
    main.appendChild(newButton);
}

/**
 * createTable creates a table element, with specified
 * header rows with column names and the specified row values.
 * and appends it to the student-area, with the specified id.
 * @param {String} table_id The ID of the table to create.
 * @param {Array<String>} columns The column names of the table.
 * @param {Array<Array<String>>} rows The rows data of the table.
 */
function createTable(table_id, columns, rows) {
    let table = document.getElementById("student-area");
    table.appendChild(document.createElement("table"));
    for(let i = 0; i < 3; i++)
    {
        let tr = document.createElement("tr");
        table.appendChild(tr);
        for(let j = 0; j < 3; j++)
        {
            let td = document.createElement("td");
           tr.appendChild(td);
           if(i == 0)
           {
            td.innerText = columns[j];
           }
           else{
            td.innerText = rows[j];
           }
        }
    }
    table.id = `${table_id}`;
}
