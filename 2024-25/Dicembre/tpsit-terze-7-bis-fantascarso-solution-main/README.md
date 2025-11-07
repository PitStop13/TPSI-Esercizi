# Esercitazione 7bis - CSS e CSS3

In questa esercitazione dobbiamo riprodurre il layout mostrato nel seguente video

<video width="1200" height="800" controls>
  <source src="lesson/assets/tutorial.mp4" type="video/mp4">
</video>

Vi è una sola pagina da implementare (`index.html`). Si ponga particolare attenzione
ai cambiamenti della pagina al variare della larghezza della finestra (la larghezza di 
cambio layout è `768px`. Gestire anche la SEO (tramite meta tags e Open Graph).

Inoltre la i colori (sia di sfondo che del testo) e la font-family vanno gestiti
tramite CSS custom properties.

La palette dei colori è la seguente:
- Blu chiaro: [#2F6BE7](https://www.color-hex.com/color/2F6BE7)
- Arancio: [#FA824D](https://www.color-hex.com/color/FA824D)
- Bianco: [#FFFFFF](https://www.color-hex.com/color/FFFFFF)
- Colore sfondo scuro: [#1E2233](https://www.color-hex.com/color/1E2233)
- Colore sfondo chiaro: [#4A5582](https://www.color-hex.com/color/4A5582)

Il font utilizzato è il Courier. Nel caso non sia disponibile utilizzare il font
monospace di default del browser.

Le immagini dei loghi delle squadre sono repiribili tramite il seguente link, modificato a 
dovere in base alla squadra della quale si vuole 
inserire il logo: `https://content.fantacalcio.it/web/img/team/ico/[Nome squadra in minuscolo]_d.png`.

La favicon del sito (quella che viene mostrata come icona della scheda e nei preferiti) 
è invece disponibile al seguente link: https://www.fantacalcio.it/favicon.ico.

Il logo FantaScarso della barra di navigazione è alto 45px, il logo della Dunder Mifflin è alto 100px e il logo della Serie A Vodaphon è alto 100px.

## Definire la favicon di un sito

Per definire la favicon di un sito viene utilizzato il tag `<link>` con degli attributi specifici, 
specificati nel seguente esempio.

``` HTML
<head>
  <link rel="icon" href="[Link icona]">
</head>
```

## CSS custom properties

Le CSS custom properties (a volte chiamate anche CSS variables) sono delle entità che vengono
definite a livello CSS e hanno la funzione di poter salvare dei valori CSS applicabili successivamente 
alle properties, in modo da poterli riutilizzare più volte senza doverli ripetere singolarmente ogni volta. 
In questo modo il codice viene parametrizzato.

È possibile definire queste variabili in 2 modi:
- tramite custom property syntax `--variabile` (definizione più semplice ma meno precisa)
- tramite la @-rule `@property` (definizione più precisa ma più complessa)

## Custom property syntax

Per dichiare una variabile tramite questa sintassi è necessario anteporre al nome della variabile
due trattini `--`. Successivamente è necessario inserire `:` e il valore che vogliamo dara alla
variabile (può essere un qualsiasi valore CSS).

Se inseriamo la dichiarazione in un selettore CSS, la variabile sarà visibile solo localmente all'interno di 
quella selezione. Nell'esempio seguente la variabile sarà visibile solo all'interno del selettore specificato.

```CSS
div {
  --backgroundColor: #000000;
}
```

Se vogliamo dichiarare delle variabili globali dobbiamo inserirle nella pseudo-classe CSS `:root`.
Nell'esempio seguente la variabile dichiarata sarà visibile in tutto il file CSS.

```CSS
:root {
  --backgroundColor: #000000;
}
```
> ### Nota
> - È buona prassi gestire la visibilità di queste variabili in base all'utilizzo che hanno.
> - Le variabili CSS **sono case sensitive** (`--color` != `--Color`).

## @-rule `@property`

Tramite la @-rule `@property` possiamo andare a gestire con più precisione le variabili CSS. 
È possibile specificare, ad esempio, il tipo della proprietà a cui la variabile può essere associata, 
i valori di default e la gestione dell'ereditarietà.

```CSS
@property --backgroundColor {
  syntax: "<color>";
  inherits: false;
  initial-value: #000000;
}
```
> Per approfondire: https://developer.mozilla.org/en-US/docs/Web/CSS/@property

## Accesso alle CSS custom properties - var()

![Referee VAR](lesson/assets/referee-var.gif)

L' accesso alle variabili CSS è possibile tramite il metodo `var()`, indipendentemente dalla tipologia 
di sintassi utilizzata per la dichiarazione. Nell'esempio successivo andiamo a settare per tutti i tag `<div>` 
la proprietà `background-color` al valore contenuto nella variabile CSS `--backgroundColor`, definita 
globalmente in precedenza.

```CSS
:root {
  --backgroundColor: #000000;
}

div {
  background-color: var(--backgroundColor);
}
```

Un approfondimento completo sulle CSS custom properties, che contiene anche alcuni esempi, è disponibile 
al seguente link: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties.

> Esercitazione a opera di [***Alessandro Sanino***](https://linkedin.com/in/alessandrosanino)
