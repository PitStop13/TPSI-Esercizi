# Esercitazione 3 - Javascript

In questa esercitazione andremo ad aiutare il team di Facciocose™ con la loro Startup.

![Facciocose Logo](lesson/assets/facciocose-logo.png)

L'obiettivo è la creazione di una semplice piattaforma di Produttività, che consiste nel
mantenere un insieme di "cose da fare" per l'utente e aumentare la sua produttività giornaliera.

## Consegna

Occorre creare un sito web come da seguente registrazione:

<video width="1000" height="600" controls>
  <source src="lesson/assets/recording.mp4" type="video/mp4">
</video>

## Creare nuovi elementi nel DOM

Abbiamo già visto che è possibile creare nuovi elementi all'interno di altri tramite la proprietà
`.innerHTML`. Esiste tuttavia un modo più performante e sicuro per svolgere lo stesso scopo:

&Egrave; infatti possibile usare il metodo `document.createElement(tag)` per creare un nuovo
elemento dato un determinato tag:

``` Javascript
const new_paragraph = document.createElement("p"); // crea un nuovo paragrafo vuoto
new_paragraph.innerText = "Va' che roba!";         // ne aggiungo il testo
```

Un elemento creato in questo modo ha le stesse potenzialità di qualsiasi elemento ottenibile
tramite `document.getElementById(...)`, `document.querySelector(...)` e gli altri metodi di 
selezione nel DOM; quello che cambia è che abbiamo a che fare con un nuovo elemento, che deve
quindi essere ancora aggiunto al DOM per essere visualizzato. 

Possiamo svolgere questo compito tramite il metodo `.appendChild(element)` di qualsiasi altro
elemento:

``` Javascript
const body = document.querySelector("body"); // prendiamo il body come esempio

const new_paragraph = document.createElement("p"); // creiamo un nuovo paragrafo vuoto
new_paragraph.innerText = "Daje Roma!";            // ne aggiungiamo il testo

body.appendChild(new_paragraph); // Aggiungiamo al body l'elemento
```

## Reagire a eventi: il Click

In Javascript è possibile permettere a un determinato componente di "reagire" non appena si
verificano certi eventi (come il click di un bottone, il caricamento della pagina o la pressione
di un tasto).

Oggi vedremo come sfruttare il click di un bottone per i nostri scopi.

Ci sono più modi per ottenere ciò, ma il più semplice è porre un attributo `onclick` su un tag
button e collegarci una nostra funzione:

``` HTML
<button onclick="facciamoCose()">Facciamo cose</button>
```

``` Javascript
function facciamoCose() {
  console.log("FATTO");
}
```

Tuttavia potrebbe essere necessario aggiungere eventi direttamente da codice, ad esempio in casi
di liste dinamiche.

In queste situazioni è anche possibile usare il metodo `.onclick`:

``` HTML
<button id="btn-example">Facciamo cose</button>
```

``` Javascript
function facciamoCose() {
  console.log("FATTO");
}

const btn_example = document.getElementById("btn-example");
btn_example.onclick = facciamoCose;
```

> **NOTA**: Per chi vuole approfondire, c'è anche un altro modo:
>
> `.AddEventListener(...)`
>
> Potete trovare più informazioni qui:
>
> https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
>
> ``` Javascript
> // Function to change the content of t2
> function facciamoCose() {
>   // ...
> }
>
> // Add event listener to table
> const el = document.getElementById("btn-example");
> el.addEventListener("click", facciamoCose, false);
>```

> Esercitazione a opera di [***Alessandro Sanino***](https://linkedin.com/in/alessandrosanino)
