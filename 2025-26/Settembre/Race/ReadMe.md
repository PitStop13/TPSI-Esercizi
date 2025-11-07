Esercizio n. 02 - Race
Realizzare in Java Script il seguente gioco:
 La struttura è costituita da una matrice di 20 righe x 30 colonne (usare a scelta button o div)
 Ogni cella ha dimensione 20px x 20px, padding 0px, margin 1px
 Il wrapper avrà di conseguenza larghezza pari a 660px.
 Assegnare gli ID in modo matriciale del tipo btn-iR-iC.
 In fase di avvio tutti i pulsanti sono ricolorati di grigio con intensità intermedia (RGB 127).
 In fase di avvio posizionare sulla scacchiera 25 bombe in posizione casuale, con esclusione della
prima colonna, e facendo attenzione a non sovrapporle.



In corrispondenza di un pulsante Avvia viene avviata una gara fra due concorrenti che concorrono su due
righe differenti, generate casualmente e necessariamente:
 diverse fra loro
 con esclusione delle ultime 5 righe
 con almeno 4 righe di distanza fra loro (es riga 6 e riga 10).


Alla casella iniziale di ciascuna riga viene assegnato uno sfondo blu.
Ogni 150 ms viene automaticamente richiamata una funzione di avanzamento che, generando un numero
casuale per ciascun concorrente, nel 70 % dei casi provvede a far avanzare il concorrente di una posizione,
mentre nel rimanente 30 % dei casi provvede a mantenerlo fermo in posizione.
Nel momento in cui uno dei due concorrenti raggiunge l’ultima cella della scacchiera la corsa TERMINA
con un messaggio del tipo “Bravo, hai vinto”.
Inoltre:
 Se la cella successiva in cui il concorrente deve spostarsi contiene una bomba, anziché avanzare il
concorrente deve scendere di una riga in verticale (vedasi figura).
 Se anche la cella immediatamente sottostante dovesse essere rossa essa verrà semplicemente
sovrascritta.