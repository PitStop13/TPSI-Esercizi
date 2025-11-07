# Esercitazione 4bis - Javascript

In questa esercitazione andremo ad implementare il gioco "Alto o basso" tramite Javascript.

Lo scopo del gioco è indovinare il numero segreto generato dal dispositivo, che è compreso fra
1 e 100, entro 10 tentativi. Ad ogni tentativo verrà visualizzato se il numero inserito è più 
basso o più alto rispetto al numero segreto. Il gioco termina se il giocatore trova il numero 
o se il giocatore esaurisce il numero di tentativi a disposizione.

**ATTENZIONE!** Il numero generato va tassativamente scritto dentro la textbox con id 
`txt-secret-number` e successivamente letto da lì. Nel caso in cui questo procedimento non venga 
eseguito o nel caso in cui venga utilizzata una variabile globale i test non funzioneranno.

> I file `.html`, `.test.js` e `.test.css` non devono essere assolutamente modificati.

## Consegna

Occorre creare un sito web come da seguente registrazione

<video width="100%" controls>
    <source src="lesson/assets/recording.mp4" type="video/mp4">
</video>

## Attributo `.disabled`
L'attributo `.disabled` permette di andare a disabilitare un controllo generico (`<button>`, `<input>`, ecc.).
Quando un controllo è disabilitato non è possibile interagire in nessun modo con esso.

È legato all'attributo HTML `disabled` ed è un attributo di tipo booleano:
- `true`: il controllo viene disabilitato
- `false`: il controllo non viene disabilitato

> Per approfondire: https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/disabled

> Esercitazione a opera di [***Alessandro Sanino***](https://linkedin.com/in/alessandrosanino)
