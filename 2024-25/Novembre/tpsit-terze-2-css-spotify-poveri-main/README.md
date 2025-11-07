# Esercitazione 2 - CSS

In questa esercitazione dobbiamo riprodurre il sito come da seguente video

<video width="640" height="480" controls>
  <source src=".lesson/assets/recording-consegna.mp4" type="video/mp4">
</video>

## Suggerimenti operativi

In questa sezione valuteremo alcuni suggerimenti operativi per lo svolgimento dell'esercizio

### Le pseudo-classi CSS

Il concetto di pseudo-classe è di assoluto rilievo nel contesto dei CSS. Una pseudo-classe non
definisce la presentazione di un elemento ma di un particolare stato di quest'ultimo.

In buona sostanza, grazie alle pseudo-classipossiamo impostare uno stile per un elemento al
verificarsi di certe condizioni.

Ora vediamo come applicare pseudo-classi generiche:
``` CSS
selettore:pseudo-classe {
  dichiarazione: valore;
  /* ... */
}
```

I nomi delle pseudo-classi, innanzitutto, sono preceduti dai due punti (:). Una pseudo-classe
segue senza spazi il nome del selettore e può essere associata a tutti i tipi di selettore.

## La pseudo-classe `:hover`

Questa pseudo-classe viene applicata quando si passa con il cursore del
mouse (o altro dispositivo di puntamento) su un elemento senza attivarlo,
ovvero senza cliccarci sopra.

``` CSS
/* Tutti i tag "button" che hanno la classe "call-to-action" applicata */
button.call-to-action:hover {
  background-color: yellow;
}
```

``` HTML
<button class="call-to-action">
  Passa il mouse su di me e scopri di che colore divento
</button>
```

## La pseudo-classe `:active`

La pseudo-classe `:active`, come suggerisce il nome, serve a impostare la
presentazione di un elemento quando e mentre esso viene attivato dall'utente.
Tipicamente, interagendo con il mouse, un elemento è in stato `:active` mentre
si tiene premuto il pulsante su di esso, ovvero per tutto il tempo che intercorre
tra il click e il rilascio del pulsante.

``` CSS
/* Tutti i tag "button" che hanno la classe "call-to-action" applicata */
button.call-to-action:active {
  background-color: gray;
  font-style: italic;
}
```

``` HTML
<button class="call-to-action">
  Cliccami e scopri di come cambio mentre mi mantieni attivo
</button>
```

## La pseudoclasse `:focus`
La pseudo-classe `:focus` viene attivata quando un elemento riceve
il focus. Come spiega la specifica CSS, questo stato scatta quando
un elemento può accettare eventi attraverso la tastiera, per esempio
l'inserimento di testo in un modulo, oppure quando ci si clicca sopra.

Appena l'elemento perde il focus (ad esempio quando si clicca qualcos'altro
oppure si preme TAB sulla tastiera), la pseudoclasse perde il suo effetto.

``` CSS
/* Tutti i tag "button" che hanno la classe "call-to-action" applicata */
button.call-to-action:focus {
  background-color: blue;
}
```

``` HTML
<button class="call-to-action">
  Cliccami e scopri di come cambio mentre mi dai il focus
</button>
```

> Esercitazione a opera di [***Alessandro Sanino***](https://linkedin.com/in/alessandrosanino)
