// npm install _nomeLibreria_ ---> vado a installare i pacchetti che mi servono per il progetto, in questo caso bootstrap e colors e li prende da npmjs.org

const http = require('http');
const url = require('url');
const port = 3000;

const server = http.createServer(function(req, res) {
    let metodo = req.method;
    console.log(`Metodo: ${metodo}`);
    
    let reqUrl = url.parse(req.url, true);
    console.log(reqUrl);

    let risorsa = reqUrl.pathname; // /nome della risorsa che sto richiedendo
    let param = reqUrl.query; // parametri passati nella query string (?nome=valore)
    
    // FIX: headers si trova dentro 'req' (la richiesta HTTP), non dentro 'reqUrl'
    let dominio = req.headers.host; 

    // Imposto l'header per dire al browser che sto mandando HTML con codifica UTF-8
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    res.write(`<h1>Informazioni sulla richiesta</h1>`);
    res.write(`<p><strong>Metodo:</strong> ${metodo}</p>`);
    res.write(`<p><strong>Risorsa richiesta:</strong> ${risorsa}</p>`);
    res.write(`<p><strong>Parametri passati:</strong> ${JSON.stringify(param)}</p>`);
    res.write(`<p><strong>Dominio del server:</strong> ${dominio}</p>`);
    res.end();
});

server.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}/`);
});