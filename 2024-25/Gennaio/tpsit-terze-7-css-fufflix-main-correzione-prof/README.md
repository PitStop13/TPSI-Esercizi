# Esercitazione 7 - FUFFLIX and SEO

In questa esercitazione andremo a vedere fin dove si sono spinti finora i deliri del team di 
Prodotto di **FUFFLIX**, la nostra azienda di streaming di corsi preferita.

![FUFFLIX logo](lesson/assets/fufflix-logo-full.png)

Ora il team di prodotto, dopo aver avuto una estenuante riunione nel ristorante sushi più esclusivo
di Bugliano, è venuto a conoscenza di una cosa chiamata **SEO**, e noi sviluppatori dobbiamo aggiungerla
al sito di FUFFLIX per fare in modo che i motori di ricerca siano buoni nei nostri confronti.

In aggiunta a ciò, abbiamo un nuovo design da implementare, come da seguente registrazione.

<video width="1000" height="600" controls>
  <source src="lesson/assets/recording.mp4" type="video/mp4">
</video>

## Controllare lo stile degli elementi figli

&Egrave; possibile controllare lo stile degli elementi figli di altri elementi tramite le pseudoclassi
relative, vediamole insieme

### `:first-child` e `:last-child`

Queste pseudoclassi controllano lo stile rispettivamente del primo e ultimo elemento di una serie di
elementi uguali catturati da un determinato selettore

``` HTML
<style>
  p {
    color: blue;
  }

  p:first-child {
    color: yellow;
  }

  p:last-child {
    color: red;
  }
</style>
<p>Giallo</p>
<p>Blu</p>
<p>Rosso</p>
```

### `nth-child`

Questa pseudoclasse, in base al parametro passato permette di dare uno stile a un elemento ogni N
catturato dal selettore

L'esempio più classico è quello di quando si vuole fare una tabella a righe:
``` HTML
<style>
  table > tbody > tr:nth-child(2n) {
    background-color: whitesmoke;
  }
</style>
<table>
  <thead>
    ...
  </thead>
  <tbody>
    <tr><td>Riga Bianca</td></tr>
    <tr><td>Riga Fumo</td></tr>
    <tr><td>Riga Bianca</td></tr>
    <tr><td>Riga Fumo</td></tr>
  </tbody>
</table>
```

In questo esempio una riga ogni 2 è colorata di color fumo.

> **ATTENZIONE**: la prima riga si considera di indice 1
>
> Qualora volessimo shiftare avanti o indietro è sufficiente usare (2n + 1) ad esempio.

## Cosa è la SEO?

Per SEO (Search Engine Optimization) intendiamo tutta quella branca del marketing volta a ottimizzare
l'esposizione di una azienda o ente ai motori di ricerca. 

Banalmente, con una buona SEO veniamo trovati più facilmente su internet!

La SEO si divide in 2 grandi gruppi:

- **Technical SEO** -> La SEO tecnologica, quella che riguarda gli sviluppatori e richiede codice
- **Marketing SEO** -> La SEO relativa al marketing, di solito non richiede codice da impostare a
  priori

In questa esercitazione andremo a dare una buona technical SEO a FUFFLIX, tramite l'ausilio di `<meta>`
tags diversi, ognuno con il suo decisivo approccio verso questo obiettivo.

## `<meta>` tags
I meta tags sono dei particolari tag che non vengono visualizzati a schermo:

Il loro obiettivo infatti è quello di dare ai motori di ricerca le informazioni necessarie a dare
più semantica possibile alla pagina, aggiungendo contesto su chi ne è il creatore, chi è rappresentato,
in quali modi posso condividere con altri sui social le informazioni riguardo al sito, ecc...

I meta tag sono contraddistinti in particolare da un attributo `name` o un attributo `property`,
tranne alcuni casi particolari come i meta `charset` (che servono a stabilire la codifica testo del sito) 

Partiamo subito identificando i meta tag di base:

Ognuno di questi tag si crea con la formula

``` HTML
<meta name="<name>" value="<value>">
```

Per esempio 

``` HTML
<meta name="author" value="Alessandro Sanino">
```

| name          | valore di esempio                       | Descrizione                                                          |
| ------------- | --------------------------------------- | -------------------------------------------------------------------- |
| `author`      | `Alessandro Sanino`                     | Indica chi è l'autore del sito                                       |
| `description` | `The FUFFLIX awesome website`           | Indica una breve descrizione del sito                                |
| `keywords`    | `fuffa streaming corsi web`             | Indica una serie di parole chiave con cui si può indicizzare il sito |
| `viewport`    | `width=device-width, initial-scale=1.0` | Indica la dimensione iniziale dell'area visibile dello schermo, che viene usata come base per la responsiveness fra dispositivi e lo zoom |

Oltre a questi, si ricorda anche il meta charset

``` HTML
<meta charset="utf-8">
```

> **NOTA**: Provare a inserire keywords che non c'entrano nulla con il sito, con lo scopo di far
> trovare il sito il più possibile in maniera scorretta, prende il nome di Black Hat SEO ed è un
> comportamento di cui i motori di ricerca moderni si accorgono.
>
> Quando questo succede il sito è eliminato dal motore di ricerca e non sarà più visibile
>
> Approfondimento QUI: https://www.seozoom.it/black-hat-seo-quali-sono-le-tecniche-proibite-su-google

### Open Graph meta tags

Open Graph è uno standard sviluppato da Facebook e rappresenta di fatto come è possibile dire a 
tutti i crawler presenti nel web (I motori di ricerca, ma anche i social ad esempio) che tipo di
dati far vedere quando condividiamo un contenuto.

La caratteristica comune di questi meta tags è che cominciano tutti con `og:` e sono lo standard 
de facto per i vari bottoni "Condividi" nei siti di tutto il mondo, oltre che base per quando
inviate i link agli amici su whatsapp, telegram, ecc...

Vediamo i più usati

| name             | valore di esempio                             | Descrizione                                    |
| ---------------- | --------------------------------------------- | ---------------------------------------------- |
| `og:title`       | `FUFFLIX`                                     | Il titolo del sito, di solito è uguale al contenuto del tag `<title>` |
| `og:type`        | `website`                                     | Di solito è quasi sempre `website`, ma identifica il tipo di applicazione rappresentata dal sito |
| `og:image`       | `https://i.picsum.photos /id/378/200/200.jpg` | L'url dell'immagine da far vedere come anteprima quando si condivide il sito |
| `og:url`         | `https://google.com`                          | L'indirizzo web della pagina che avete aperto del sito | 
| `og:description` | `The FUFFLIX awesome website`                 | Un equivalente del meta tag `description`, di solito ha lo stesso contenuto |

> **NOTA**: la lista completa si può trovare qui: https://ogp.me


> Esercitazione a opera di [***Alessandro Sanino***](https://linkedin.com/in/alessandrosanino)
