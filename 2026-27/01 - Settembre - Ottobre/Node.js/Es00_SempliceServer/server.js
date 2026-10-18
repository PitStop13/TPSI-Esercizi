const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
    res.write('Ciao! \n');
    res.write('Come stai? \n');
    res.write('Tutto bene? \n');
    res.write('Qui tutto ok!\n'); //Oppure: res.end('Qui tutto ok!\n');

    res.end(); //Chiude la connessione con il client, è obbligatorio chiamarla altrimenti il client rimane in attesa di una risposta
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});