# Esercitazione 4 - CSS e CSS3

In questa esercitazione dobbiamo creare i seguenti componenti

<video width="1200" height="800" controls>
  <source src=".lesson/assets/recording.mp4" type="video/mp4">
</video>

## Le @-rules

Le cosiddette @-rules sono tipi particolari di costrutti che hanno una caratteristica comune:

sono tutti introdotti dal simbolo della chiocciola!

``` HTML
<style type="text/css">
@rule
</style>
```

Le @-rules si usano per gli scopi più disparati, ma il loro uso principale è introdurre una
qualche forma di funzionalità aggiuntiva che nelle versioni di CSS precendenti alla CSS3 
non era prevista

### @media
La regola `@media` permette di definire una serie di classi CSS che si applicano solo a un
determinato media.

#### Ok, ma cosa è un media?
Per media si intende una particolare classe di dispositivi, dei tipi più disparati.
Fondamentalmente i più importanti sono 2:

- `@media screen`: si riferisce a qualsiasi tipo di schermo.
- `@media print`: si riferisce a qualsiasi tipo di stampante.

In particolare, anteponendo ad esempio 
``` HTML
<style>
@media screen {
  body {
    background-color: yellow;
  }
}
  
@media screen and (max-width: 1200px) {
  body {
    background-color: orange;
  }
}
  
@media screen and (max-width: 600px) {
  body {
    background-color: green;
  }
}

@media print {
  body {
    background-color: transparent;
  }
}
</style>
```

Stiamo dicendo che diversi colori si mettono di sfondo in base sia al tipo di media che, 
per gli schermi, in base alla larghezza in px dello schermo stesso.

Per quanto riguarda le stampanti, stiamo dicendo che lo sfondo al body sparisce e diventa
trasparente.

#### File CSS applicati solo a determinati media
&Egrave; possibile specificare se un determinato file
CSS va applicato a un solo media

``` HTML
<html>
  <head>
    <link 
      href="css/mio-file.css"
      rel="stylesheet"
      type="text/css"
      media="print">
  </head>
</html>
```

### @import

La regola `@import` permette di importare un altro file css all'interno.

``` HTML
<style type="text/css">
@import url(stile-1.css);
@import url(stile-2.css);
</style>
```

Oltre a ciò possiamo collegare la import a un determinato media definito, in quel modo le classi
verranno applicate solo a quel media

``` HTML
<style type="text/css">
@import url(stile-1.css) print;
</style>
```

## Extra: il media print - best practices

Esiste una serie di buone pratiche da adottare al fine di avere un buon CSS
di stampa.

Tali regole servono a eliminare il superfluo e risparmiare l'inchiostro:

1. Ridurre le immagini di sfondo al minimo indispensabile
2. Ridurre il più possibile sfondi a tinta unita
3. Preferire i bordi per delineare gli elementi piuttosto che uno sfondo
   di qualsiasi tipo
4. Utilizzare dimensioni dei font in `pt` (è un formato per la stampa)
5. Eliminare le sezioni non necessarie alla stampa (ad esempio la barra di navigazione)
   nascondendole (ad esempio usando `display: none`)
6. Utilizzare gli stili di stampa specifici: si può trovare una lista non esaustiva qui:

   https://www.html.it/articoli/migliorare-il-css-per-la-stampa

> Esercitazione a opera di [***Alessandro Sanino***](https://linkedin.com/in/alessandrosanino)
