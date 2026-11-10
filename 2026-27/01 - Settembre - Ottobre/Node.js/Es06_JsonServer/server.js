const http = require('http');
const port = 3000;

let database = {
    utenti: [
        { id: 1, username: 'mario', cognome: 'Rossi', nome: 'Mario', citta: 'Roma' },
        { id: 2, username: 'luigi', cognome: 'Verdi', nome: 'Luigi', citta: 'Milano' },
        { id: 3, username: 'giovanni', cognome: 'Bianchi', nome: 'Giovanni', citta: 'Napoli' },
        { id: 4, username: 'anna', cognome: 'Negri', nome: 'Anna', citta: 'Torino' }
    ]
}
sendJSONResponse = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
    //gestisco le risposte ch ese l'utente fa  http://localhost:3000/api/utenti mostra tutti gli utenti, se indica
    // http://localhost:3000/api/utenti/1 mostra l'utente con id 1, se indica un id inesistente mostra un messaggio di errore

    // const method = req.method;
    // const url = req.url;
    const { method, url } = req;
    if (url == '/api/utenti' && method == 'GET') {
        sendJSONResponse(res, 200, database.utenti);
    }
    else if (url.startsWith('/api/utenti/') && method == 'GET') {
        
        const id = parseInt(url.split('/')[3]);
        const utente = database.utenti.find(u => u.id === id);
        if (utente) {
            sendJSONResponse(res, 200, utente);
        } else {
            sendJSONResponse(res, 404, { message: 'Utente non trovato' });
        }
    }



});

server.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});
