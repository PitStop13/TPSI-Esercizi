import http from "http";
import HEADERS from "./headers.json";
import dispatcher from "./dispatcher";

const port: number = 3000;

const server = http.createServer((req, res) => {
    dispatcher.dispatch(req, res);
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

/* ********** Listener ********** */

dispatcher.addListener("GET", "/api/servizio1", (req: any, res: any) => {
    res.writeHead(200, HEADERS.json);
    res.end(JSON.stringify({ "Benvenuto": req.GET["nome"] }));
});

dispatcher.addListener("POST", "/api/servizio2", (req: any, res: any) => {
    res.writeHead(200, HEADERS.json);
    res.end(JSON.stringify({ "Benvenuto": req.BODY["nome"] }));
});

