"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const headers_json_1 = __importDefault(require("./headers.json"));
const dispatcher_1 = __importDefault(require("./dispatcher"));
const port = 3000;
const server = http_1.default.createServer((req, res) => {
    dispatcher_1.default.dispatch(req, res);
});
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
/* ********** Listener ********** */
dispatcher_1.default.addListener("GET", "/api/servizio1", (req, res) => {
    res.writeHead(200, headers_json_1.default.json);
    res.end(JSON.stringify({ "Benvenuto": req.GET["nome"] }));
});
dispatcher_1.default.addListener("POST", "/api/servizio2", (req, res) => {
    res.writeHead(200, headers_json_1.default.json);
    res.end(JSON.stringify({ "Benvenuto": req.POST["nome"] }));
});
//# sourceMappingURL=server.js.map