# Gioco Memory con Matrice di Pulsanti

## Descrizione
Il programma realizza un classico gioco di **Memory** utilizzando una matrice di **36 pulsanti**.

All’avvio, vengono generati:
- **18 coppie di numeri differenti** (una coppia di `1`, una coppia di `2`, … una coppia di `18`).
- Ogni numero viene posizionato **casualmente** all’interno della matrice.

## Regole di visualizzazione
- **Stato iniziale**:  
  Ogni pulsante ha **sfondo grigio (RGB 127,127,127)** e testo grigio della stessa tonalità → il numero risulta **nascosto**.

- **Primo click**:  
  - Il pulsante selezionato rivela il numero.  
  - Lo sfondo diventa **rosso**.

- **Secondo click**:  
  - Anche il secondo pulsante viene rivelato e colorato di **rosso**.  
  - Rimane visibile per **0,5 secondi**.  
  - Durante questo intervallo **tutti i pulsanti vengono disabilitati** (l’utente non può cliccare un terzo pulsante).

- **Dopo 0,5 secondi**:  
  - Se i due numeri sono **uguali**, i pulsanti rimangono rivelati con **sfondo blu** e vengono bloccati definitivamente.  
  - Se i numeri sono **diversi**, entrambi tornano allo stato iniziale (sfondo grigio, testo grigio).  

- Dopo ogni verifica, i pulsanti non ancora indovinati vengono **riabilitati** al click.

## Obiettivo
Trovare tutte le coppie di numeri e completare la matrice.
