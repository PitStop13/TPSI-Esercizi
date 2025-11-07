# Esercitazione 5 - Javascript

In questa esercitazione il risultato deve corrispondere alla registrazione:

<video width="100%" controls>
  <source src="lesson/assets/recording.mp4" type="video/mp4">
</video>

Per svolgere la consegna dovete capire come sfruttare le variabili globali e gli eventi click in maniera
ancora più approfondita, vediamo come.

## L'evento "load"

Abbiamo visto che occorre mettere i file script "in fondo alla pagina" (sia tramite `defer` che 
mettendoli fisicamente alla fine del `body`).

Esiste tuttavia un evento speciale che viene sparato al primo caricamento della pagina: questo 
evento prende il nome di load e può essere agganciato in più modi:

``` javascript
window.onload = function() {
  // fai qualcosa al caricamento della pagina
}

// oppure

window.addEventListener("load", function () {
  // fai qualcosa al caricamento della pagina
});
```

Scrivendo le istruzioni all'interno di queste funzioni, la necessità di mettere al fondo lo
script viene meno, permettendoci di eseguire codice in maniera più ordinata.

## Variabili globali

In Javascript è possibile definire variabili con scope globale. Per farlo è sufficiente dichiarare
tali variabili fuori da qualsiasi funzione:

``` javascript
const variabile_globale = 5;
let variabile_globale_2 = 3;

function stampaGlobale() {
  // Stampa "variabile_globale 5"
  console.log("variabile_globale", variabile_globale);
  
  // Stampa "variabile_globale_2 3"
  console.log("variabile_globale_2", variabile_globale_2); 

  variabile_globale_2 = 10;

  // Stampa "variabile_globale_2 modificata 10"
  console.log("variabile_globale_2 modificata", variabile_globale_2); 
}

stampaGlobale();
```

> **NOTA**: Occorre ricorrere il meno possibile alle variabili globali, usatele il meno possibile!
>
> &Egrave; facile perdersi quando le si usa, a volte però ci sono casi in cui non se ne può fare a
> meno.
>
> Inoltre ricordatevi di non dare lo stesso nome che date a variabili globali a variabili normali
> (possono capitare problemi)
>
> ``` javascript
> const prova = 5;
> 
> function stampaProva() {
>   let prova = 3; // <-- NO!
>   console.log(prova);
> }
> 
> stampaProva();
> ```
>
> ![Example 1](lesson/assets/example-1.png)

## Gli eventi in dettaglio

In Javascript, ogni funzione che colleghiamo a un evento collega anche un cosiddetto "contesto",
che descrive chi lo ha chiamato. Questo contesto si può ottenere tramite la parola chiave `this`
e rappresenta l'oggetto su cui l'evento di svolge. 

Vediamo un esempio pratico

``` HTML
<button id="example-button">I AM A BUTTON</button>
```

``` javascript
window.addEventListener("load", function() {
  const example_button = document.getElementById("example-button");
  example_button.addEventListener("click", function () {
    // Stampa "I AM A BUTTON" quando cliccato
    console.log("example_button text", this.innerText);
  });
  // oppure example_button.onclick = function () { ... };
});
```

> **NOTA**: il `this` esiste solo all'interno delle singole funzioni che gestiscono gli eventi,
> e varia in base all'evento. Tendenzialmente possiamo dire che `this` è sempre "su che cosa viene
> agganciato l'evento".
>
> Nell'esempio precedente `this` dentro la funzione agganciata al "click" è `example_button`.
>
> Il `this` non esiste in tutte le `function` ma solo in quelle agganciate agli eventi.
>
> **Esercizio**: a cosa è uguale il `this` della funzione agganciata al "load"?

> Esercitazione a opera di [***Alessandro Sanino***](https://linkedin.com/in/alessandrosanino)
