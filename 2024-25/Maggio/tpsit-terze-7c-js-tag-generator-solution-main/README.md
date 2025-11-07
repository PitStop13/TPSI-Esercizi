# Esercitazione 7a - Javascript

Implementare l'esercizio come da seguente registrazione:

![Recording](.lesson/assets/recording.mp4)

Come potete notare dovete andare a creare e appendere al contenitore `dynamic-area`
il numero di tag desiderati dall'utente, che può scegliere:
>- Tipo di tag (mediante la casella a discesa `lst-tag`)
>- Numero di tag (mediante la casella di testo `txt-number-tags`).
>- Contenuto del tag (mediante la casella di testo `txt-content`).

Al contenuto del tag dovrà anche essere accodato un numero progressivo.
Di seguito un esempio: creazione di tre paragrafi con contenuto "Prova".

```html
<div id="dynamic-area">
  <p>Prova - 1</p>
  <p>Prova - 2</p>
  <p>Prova - 3</p>
</div>
```

> Nota: i tag `a` dovranno avere settato l'attributo `href` a `#` per essere visualizzati come tali.

L'esecuzione di quanto spiegato sopra deve essere eseguita quando l'utente clicca sul
pulsante `btn-create`. Il pulsante `btn-clear` invece provvede a eliminare tutto il 
contenuto della `dynamic-area`.

## Formulario

| **Termine** | **Termine** | **Termine**
| ------- | ------- | -------
| `console.log` | `console.warn` | `console.error`
| `document.getElementById` | `document.querySelector` | `document.querySelectorAll`
| `.addEventListener(...)` | `.onclick` | `.classList` 
| `.value` | `.innerText` | `.innerHTML` 
| `alert` | `const` | `let`
| `for` | `while` | `do...while`
| `parseInt(...)` | `isNaN(...)`

> Esercitazione a opera di [***Alessandro Sanino***](https://linkedin.com/in/alessandrosanino)
