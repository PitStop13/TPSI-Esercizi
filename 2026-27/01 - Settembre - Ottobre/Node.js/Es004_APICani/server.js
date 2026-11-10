const http = require("http");
const url = require("url")
const axios = require("axios")
const port = 3000;

const requestHeandler = async function (req, res) {
    console.log(`Richiesta ricevuta: ${req.method} ${req.url}`);
    if (req.url == "/dog/random") {
        try {
            const response = await axios.get("https://api.thedogapi.com/v1/images/search");
            const dogImageUrl = response.data[0];
            /*
            Output atteso: 
                <h1>Razza: Golden Retriever</h1> 
                <img src="https://cdn2.thedogapi.com/images/B1uW7l5VX.jpg" alt="Golden Retriever"> 
                */
            res.writeHead(200, { "Content-Type": "text/html", "charset": "utf-8" });
            res.end(`
                <html>
                    <body>
                        <h1>Razza: Golden Retriever</h1>
                        <img width="500px" src="${dogImageUrl.url}" alt="Golden Retriever">
                    </body>
                </html>`);
        } catch (error) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Errore nella richiesta all'API dei cani");
        }
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Risorsa non disponibile");
    }
}

const server = http.createServer(requestHeandler);

server.listen(port, function () {
    console.log(`Server in ascolto su http://localhost:${port}`);
});