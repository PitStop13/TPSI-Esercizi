# Esercitazione 6 - Bootstrap 5

![Duck's street view](.lesson/assets/ducks-street-img.png)

In questa esercitazione occorre implementare un sito come da seguente registrazione:

<video width="100%" controls>
  <source src="lesson/assets/recording.mp4" type="video/mp4">
</video>

A differenza delle precedenti registrazioni, è stato fornito un file `store-db.js` che
contiene i prodotti in vendita nello store, e altre informazioni.

> **NOTA**: Occorre generare dinamicamente i vari risultati di ricerca, come occorre generare
> dinamicamente la pagina di dettaglio prodotto a partire dai dati a disposizione.

## Generazione dinamica di contenuti

Abbiamo già visto come generare tramite Javascript elementi HTML, ovvero con `document.createElement(...)` e `parent_element.appendChild(...)`.

Per creare elementi di Bootstrap non ci comportiamo diversamente. Per esempio dato il seguente HTML

``` HTML
<!-- page.html -->
<div id="example-container" class="container">
  <div class="row"></div>
</div>
```

Abbiamo 2 modi per generare dinamicamente gli elementi a partire dall'array `element_names`
che troviamo qua sotto:

``` Javascript
// script.js
window.addEventListener("load", function() {
  const element_names = ["Pippo", "Pluto", "Paperino"];

  const container_row = document.querySelector("#example-container > .row");
  for (let i = 0; i < element_names.length; i++) {
    // Creiamo un container sfruttando il grid system (4 colonne + padding)
    const example_paragraph = document.createElement("div");
    example_paragraph.classList.add("col-sm-4", "p-2");

    // Creiamo un paragrafo che inseriamo dentro il nostro contenitore
    const inner_paragraph = document.createElement("p");
    inner_paragraph.innerText = element_names[i];
    example_paragraph.appendChild(inner_paragraph);

    container_row.appendChild(example_paragraph);
  }
})
```

Oppure 

``` Javascript
// script.js
window.addEventListener("load", function() {
  const element_names = ["Pippo", "Pluto", "Paperino"];

  const container_row = document.querySelector("#example-container > .row");
  for (let i = 0; i < element_names.length; i++) {
    // Creiamo un container sfruttando il grid system (4 colonne + padding)
    const example_paragraph = document.createElement("div");
    // usiamo className al posto di classList (sconsigliato!)
    example_paragraph.className = "col-sm-4 p-2";
    
    // e inseriamo il paragrafo direttamente dentro
    example_paragraph.innerHTML = "<p>" + element_names[i] + "</p>";

    container_row.appendChild(example_paragraph);
  }
})
```

## Attivare modali da Javascript

Oltre alla citata "modalità trigger", la comparsa di modali si può ottenere anche dall'uso
di Javascript:

Ad esempio, dato il seguente HTML

``` HTML
<div class="modal" tabindex="-1" id="my-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

Possiamo mostrare questa modale in questo modo:

``` Javascript
const my_modal = new bootstrap.Modal("#my-modal");
my_modal.show();
```

## Leggere la query string in Javascript

La query string è quella parte di un URL che appare dopo un `?`.

```
https://miosito.it/product.html?id=c14a0211-39b0-49ab-ae69-0d3f8a06ea89

"?id=c14a0211-39b0-49ab-ae69-0d3f8a06ea89" è la query string
```

Essa è un modo molto utile per passare informazioni fra una pagina e un'altra

In Javascript possiamo leggere la query string e le variabili in essa contenute:

``` Javascript
const query_string = new URLSearchParams(window.location.search);

if (query_string.has("id")) {
  // il parametro "id" c'è e il suo valore ora è nella variabile id
  const id = query_string.get("id");

  // e ci facciamo cose
} else {
  // il parametro "id" non c'è nella query string
}
```

> Esercitazione a opera di [***Alessandro Sanino***](https://linkedin.com/in/alessandrosanino)
