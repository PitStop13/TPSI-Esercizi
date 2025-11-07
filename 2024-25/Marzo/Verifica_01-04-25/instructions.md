# Esercitazione 8 - Sette e mezzo - Javascript

Implementare l'esercizio come da seguente registrazione:

<video width="100%" controls>
  <source src="lesson/recording.mp4" type="video/mp4">
</video>

## Regole del gioco
Il gioco utilizza un mazzo di 40 carte, composto da:
- Carte numeriche: 1, 2, 3, 4, 5, 6, 7 per ognuno dei 4 semi (Cuori, Fiori, Picche e Quadri).
- Figure: Fante, Donna e Re sempre per ognuno dei 4 semi.

### Valore delle carte
- Le carte da 1 a 7 hanno valore nominale (1 vale 1 punto, 2 vale 2 punti, ..., 7 vale 7 punti).
- Le carte Fante, Donna e Re hanno valore 0.5.

### Obiettivo del gioco
L'obiettivo del giocatore è avvicinarsi il più possibile al punteggio 7.5, senza superarlo (sballare).

### Punteggio
- Il banco:
  - Pesca carte fino a quando il punteggio del banco è inferiore o uguale a 5.5.
  - Si ferma se il punteggio del banco è maggiore di 5.5.
- Il giocatore vince se supera il punteggio del banco o se il banco sballa.
- Il giocatore perde se sballa o se il banco supera o pareggia il suo punteggio.

## Istruzioni
All'avvio dell'applicazione le carte del giocatore devono avere come immagine `img/back.gif`.

Quando l'utente clicca sul pulsante `Pesca Carta` il programma deve:
- Generare una carta (valore e seme).
- Mostrarla all'utente nel primo spazio vuoto disponibile.
- Incrementare il punteggio del giocatore.
- Controllare:
  - Se il giocatore ha sballato (nel caso i pulsanti `Stop` e `Pesca Carta` devono essere disabilitati e deve essere mostrato un messaggio al giocatore). 
  - Se il giocatore ha fatto sette e mezzo (nel caso i pulsanti `Stop` e `Pesca Carta` devono essere disabilitati e deve essere lanciata la procedura di generazione punteggio del banco, siccome l'utente ha raggiunto il punteggio massimo).
  
Quando l'utente clicca sul pulsante `Stop` il programma deve:
- Disabilitare i pulsanti `Stop` e `Pesca Carta`.
- Generare il punteggio del banco.
- Mostrare il punteggio del banco.
- Mostrare il risultato della partita.