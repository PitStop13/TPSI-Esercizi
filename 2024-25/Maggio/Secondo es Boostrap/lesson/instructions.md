# Esercitazione 7a - Bootstrap 5

In questa esercitazione occorre implementare il sito come da
seguente registrazione:

<video width="100%" controls autoplay>
  <source src="assets/recording.mp4" type="video/mp4">
</video>

Il sito mostra una lista di film, specificando per ognuno i vari dettagli.

I film presenti inizialmente nella libreria (da mostrare in fase di caricamento della pagina)
sono salvati nel vettore `films` contenuto nel file `script.js`.

In corrispondenza del click sull'icona del profilo (posta in alto a destra nella pagina e grande una 
volta e mezzo rispetto alla dimensione di default) deve essere mostrato l'avviso di login fallito, che deve 
rimanere visibile per 4 secondi.

Sono poi presenti 4 pulsanti:
1. **Aggiungi Film**: alla lista corrente deve essere aggiunto un nuovo film con:
    - Id casuale (tra 1 e 100).
    - Non preferito.
    - Titolo "Nuovo Film".
    - Data di visione "Oggi".
    - Rating casuale (tra 1 e 5).
2. **Pulisci Lista**: svuota la lista di film corrente.
3. **Ricarica Lista**: ricarica la lista di film iniziale (presente nel vettore `films` in `script.js`).
4. **Conta Film**: conta quanti film sono presenti attualmente in lista e mostra una modale che comunica questo valore.

# Note

- Si noti che il breakpoint di riferimento è `md`.
- La applicazione deve risultare responsive su tutti i dispositivi.

&Egrave; **obbligatoriamente necessario l'uso delle sole classi di Bootstrap 5** per le seguenti operazioni:
1. Definizione del layout (dimensionamento di contenitori): per questo bisogna usare il grid system.
2. Definizione di componenti grafici (ci sono i componenti Bootstrap per quello).

> Non è consentito l'uso di layout flex per nessun motivo, nessuna eccezione.

# Formulario Bootstrap 5

| valore      | valore | valore | valore |
| ----------- | ------ | ------ | ------ |
| `container` | `container-fluid`  | `row` | `col` |  
| `btn` | `primary` | `secondary` | `alert` |
| `table` | `modal` | `text-light` | `d-none` |
| `danger` | `text-center` | `w-100` |

# Formulario JS
| valore | valore | valore |
| ------ | ------ | ------ |
| `document.getElementById` | `document.querySelector` | `document.querySelectorAll`
| `.addEventListener(...)` | `.onclick` | `.classList` |
| `const` | `let`

## Random [A,B)
``` JS
Math.floor(Math.random() * (B-A)) + A
```

# Templates

## Navbar

``` HTML
<nav class="navbar navbar-dark navbar-expand-md bg-primary px-2">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      Navbar
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
            <a class="nav-link active" href="#">Active link</a>
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
1. `bi bi-collection-play` (icona navbar brand)
2. `bi bi-person-circle` (icona user)
3. `bi bi-exclamation-triangle` (icona !)
4. `bi bi-star` (icona stella vuota)
5. `bi bi-star-fill` (icona stella piena)

Le icone sono da considerarsi come testo, quindi per ingrandirle lavorare sulla proprietà CSS
`font-size` e per cambiarne il colore usare le classi Bootstrap o lavorare sulla proprietà CSS `color`.