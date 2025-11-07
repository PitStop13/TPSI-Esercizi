# Esercitazione 2 - HTML e HTML5

Occorre implementare il sito della nuova startup "Spotify dei poveri", che essendo poveri non si sono
riusciti a permettere un design migliore di quello che vedete in queste immagini.

<video src="lesson/assets/recording.mp4" controls></video>

> **SONO AMMESSE PERSONALIZZAZIONI! Facciamogli vedere che si può fare meglio di così**

# Gli elenchi puntati e numerati

In questa sezione andremo a approfondire i vari tipi di liste (elenchi) che è possibile creare in HTML.

## Elenchi non ordinati (puntati)

L'elenco non ordinato (unordered list) è forse il più usato e si descrive utilizzando il tag
`<ul>`. Al suo interno possiamo inserire gli elementi della lista (list item) utilizzando il tag `<li>`.

Ecco un semplice esempio:

``` HTML
<ul>
  <li>primo elemento</li>
  <li>secondo elemento</li>
  <li>terzo elemento</li>
</ul>
```

![HTML example 1](lesson/assets/example-1.png)

Anche se la resa grafica dipende dal browser, il risultato in genere è quello che otteniamo
quando utilizziamo gli elenchi puntati nei programmi di videoscrittura: 

otteniamo gli elementi uno sotto l'altro con un margine a sinistra e il classico "pallino
pieno" per ogni punto.

## Elenchi ordinati (numerati)

Gli elenchi ordinati (ordered list) sono contraddistinti dall'enumerazione degli elementi
che compongono la lista.

Il tag da utilizzare per aprire un elenco ordinato è `<ol>` e anche in questo caso gli
elementi sono individuati dal tag `<li>`:

``` HTML
Testo che precede la lista
<ol>
	<li>primo elemento</li>
	<li>secondo elemento</li>
	<li>terzo elemento</li>
</ol>
Testo che segue la lista
```

![HTML example 2](lesson/assets/example-2.png)

## Annidare elenchi

In generale possiamo inserire diversi livelli all'interno delle liste, creando delle strutture
"ad albero", utili a definire oggetti come i menù.

Per farlo è sufficiente inserire un nuovo elenco all'interno di un elemento:

``` HTML
<ul>
	<li>primo della 1a lista</li>
	<li>
		<ul>
			<li>primo della 2a lista</li>
			<li>
				<ul>
					<li>primo della 3a lista</li>
				</ul>
			</li>
			<li>terzo della 2a lista</li>
		</ul>
	</li>
</ul>
```

![HTML example 3](lesson/assets/example-3.png)

# Includere altre pagine nella nostra: `<iframe>`

“Iframe” significa “inline frame”: in qualsiasi momento in un documento che non utilizzi una struttura
a frame è possibile creare un frame al volo grazie a questo tag.

Possiamo specificare la larghezza e l’altezza del tag, mentre gli attributi di visualizzazione sono gli
stessi del tag `<frame>`: si tratta di una vera e propria finestra verso l’esterno all’interno di un 
documento ordinario.

Questo tag è correttamente supportato da tutti i browser moderni (Netscape 4 non lo supporta, ma questo
browser oramai sta scomparendo). La sintassi è:

``` HTML
<iframe src="http://replit.com" width="300" height="300">
  Contenuto alternativo per i browser che non leggono gli iframe.
</iframe>
```

Come si può vedere tra l’apertura e la chiusura del tag è possibile specificare un contenuto alternativo
per i browser che non siano in grado di leggere l’`<iframe>`: in realtà questi browser sono ciechi a
questo tag e dunque leggono direttamente il contenuto al suo interno.

Sono invece i browser che supportano questa sintassi a ignorare volutamente quanto viene compreso tra
apertura e chiusura del tag.

Anche in questo caso sarò opportuno utilizzare la possibilità di inserire un contenuto alternativo per
migliorare il posizionamento nei motori di ricerca. Ad esempio:

``` HTML
<iframe src="http://replit.com" width="300" height="300">
  <p>
    Su <a href="http://replit.com">REPLit</a> - Un ambiente cloud
    dove eseguire i tuoi progetti
  </p>
</iframe>
```

## Attributi del tag iFrame

| Attributo | Valori | Descrizione |
| --------- | ------ | ----------- |
| `src`     | URL	   | L'indirizzo che contiene il contenuto dell'iframe |
| `width`   | px     | La larghezza dell'iframe |
| `height`  | px     | L'altezza dell'iframe |

# Vantaggi e Svantaggi

Gli svantaggi che comporta un uso scorretto di un layout a frame sono superiori ai vantaggi
che possono derivare dal loro utilizzo.

I motori di ricerca infatti navigano di link in link attraverso il web per catturare contenuti
da indicizzare.

È frequente allora che una struttura a frame sia inserita all’interno di un motore di ricerca
in modo errato: 

A volte viene catturato solo un menù, altre volte compare soltanto la parte interna con il
contenuto del frame e dunque viene perso ogni menu di navigazione.

Per evitare problematiche di questo genere, è meglio evitare di utilizzare una struttura a frame;
o nel caso in cui la si desideri utilizzare è bene prevedere sin da subito dei metodi che 
ricostruiscano il frameset, nel caso in cui sia catturata soltanto una pagina interna.

> Vedremo più aventi nel programma come sfruttare Javascript per questo scopo

> Esercitazione a opera di [***Alessandro Sanino***](https://linkedin.com/in/alessandrosanino)
