# Esercitazione 7b - Bootstrap 5

In questa esercitazione occorre implementare il sito come da
seguente registrazione:

<video controls width="100%">
  <source src="lesson/assets/recording.mp4" type="video/mp4">
</video>

Il sito mostra una libreria personale di un servizio di streaming, mostrando per ogni
canzone la cover e le informazioni relative ad essa.

Le canzoni presenti inizialmente nella libreria (da mostrare in fase di caricamento della pagina)
sono salvate nel vettore `songs` contenuto nel file `script.js`. Deve essere anche mostrato il
numero di canzoni presenti.

In corrispondenza del click sull'icona degli amici (prima icona a destra nella navbar)
deve essere mostrato l'avviso di assenza di amici, che deve rimanere visibile per 5.5 secondi.

In corrispondenza del click sull'icona di ricerca (seconda icona a destra nella navbar)
la casella di ricerca deve essere mostrata se non è presente e nascosta se è presente.

In corrispondenza del click su uno qualsiasi dei pulsanti di play deve essere mostrata una modale, la quale
avvisa che la canzone scelta non può essere riprodotta (come da video).

# Note

- Attenzione a come viene visualizzata la durata delle canzoni (Aiuto: utilizzare la funzione
  `Math.floor(number)` per troncare all'intero inferiore un numero).
- Per aggiungere il bordo ad un elemento si può usare la classe Bootstrap 5 `border`.
- Per rendere un bordo arrotondato si può usare la classe Bootstrap 5 `rounded`.
- Nella cartella `img` sono presenti tutte le cover delle canzoni.
- Si noti che il breakpoint di riferimento è `md`.
- La applicazione deve risultare responsive su tutti i dispositivi.

&Egrave; **obbligatoriamente necessario l'uso delle sole classi di Bootstrap 5** per le seguenti operazioni:
1. Definizione del layout (dimensionamento di contenitori): per questo bisogna usare il grid system.
2. Definizione di componenti grafici (ci sono i componenti Bootstrap per quello).

> Non è consentito l'uso di layout flex per nessun motivo, ad eccezione della navbar.

# Formulario

| valore      | valore | valore | valore |
| ----------- | ------ | ------ | ------ |
| `container` | `container-fluid`  | `row` | `col` |  
| `btn` | `primary` | `secondary` | `alert` |
| `table` | `modal` | `text-light` | `d-none` |
| `warning` | `text-center` | `w-100` |

Si forniscono inoltre i seguenti templates.

## Navbar

``` HTML
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

## Modal
``` HTML
<!-- Modal showed with JS -->
<div class="modal" id="example-modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

``` JS
const myModal = new bootstrap.Modal("#example-modal");
myModal.show();
```

## Icone
``` HTML
<i class="..."></i>
```

Lista di icone necessarie:
1. `bi bi-boombox-fill` (icona navbar brand)
2. `bi bi-people-fill` (icona amici)
3. `bi bi-search` (icona ricerca)
4. `bi bi-emoji-frown-fill` (icona faccina triste)

Le icone sono da considerarsi come testo, quindi per ingrandirle lavorare sulla proprietà CSS
`font-size` e per cambiarne il colore usare le classi Bootstrap o lavorare sulla proprietà CSS `color`.

# Consegna
Caricare la cartella del progetto compressa nominandola `Cognome_Nome` su Classroom.