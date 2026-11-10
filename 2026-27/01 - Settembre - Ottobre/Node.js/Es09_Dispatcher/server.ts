import http from "http";
import HEADERS from "./headers.json";

const port:number = 3000;

const server = http.createServer((req, res) => {



});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Listener

