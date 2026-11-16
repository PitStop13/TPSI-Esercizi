"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url = __importStar(require("url"));
const fs = __importStar(require("fs"));
const mime = __importStar(require("mime"));
const headers_json_1 = __importDefault(require("./headers.json"));
let paginaErrore;
function init() {
    fs.readFile("./static/error.html", (err, data) => {
        if (err) {
            console.error("Errore durante la lettura del file error.html:", err);
            paginaErrore = "<h1>Errore 404: Pagina non trovata</h1>";
        }
        else {
            paginaErrore = data.toString();
        }
    });
}
function staticListener(req, res, risorsa) {
    //http://localhost:3000
    if (risorsa === "/") {
        risorsa = "/index.html";
    }
    let filename = "./static" + risorsa;
    fs.readFile(filename, (err, data) => {
        if (!err) {
            let header = { "Content-Type": mime.getType(filename) || "text/html" }; //Traduce il mio filename in un tipo di contenuto (es. text/html, image/png, ecc.)
            res.writeHead(200, header);
            res.end(data);
        }
        else {
            res.writeHead(404, headers_json_1.default.html);
            res.end(paginaErrore);
        }
    });
}
class Dispatcher {
    prompt = ">>>";
    listeners = {
        "GET": { /* "risorsa1": "callBack1", "risorsa2": "callBack2" */},
        "POST": {},
        "DELETE": {},
        "PUT": {},
        "PATCH": {}
    };
    constructor() {
        init();
    }
    addListener(metodo, risorsa, callBack) {
        metodo = metodo.toUpperCase();
        if (metodo in this.listeners) {
            this.listeners[metodo][risorsa] = callBack;
        }
        else {
            throw new Error(`Metodo HTTP non supportato: ${metodo}`);
        }
    }
    dispatch(req, res) {
        let metodo = req.method.toUpperCase();
        if (metodo == "GET") {
            this.innerDispatch(req, res);
        }
        else {
            let parametri = "";
            let json_par = {};
            req.on("data", (data) => {
                parametri += data;
            });
            req.on("end", () => {
                try {
                    json_par = JSON.parse(parametri);
                }
                catch (e) {
                    console.error("Errore durante il parsing dei parametri:", e);
                    json_par = {};
                }
                if (Object.keys(json_par).length > 0) {
                    req.body = json_par;
                }
                this.innerDispatch(req, res);
            });
        }
    }
    innerDispatch(req, res) {
        let metodo = req.method.toUpperCase();
        let _url = url.parse(req.url, true);
        let risorsa = _url.pathname;
        let params = _url.query;
        //log
        console.log(`${this.prompt} ${metodo} ${risorsa}, params: ${JSON.stringify(params)}`);
        req["GET"] = params; //aggiungo i parametri della query string all'oggetto req
        if (req["BODY"]) {
            console.log(`PARAMETRI ${metodo}: ${JSON.stringify(req["BODY"])}`);
        }
        if (!risorsa.startsWith("/api/")) {
            staticListener(req, res, risorsa);
        }
        else {
            if (metodo in this.listeners && risorsa in this.listeners[metodo]) {
                let callBack = this.listeners[metodo][risorsa];
                callBack(req, res);
            }
            else {
                res.writeHead(404, headers_json_1.default.html);
                res.end("Servizio non disponibile");
            }
        }
    }
}
exports.default = new Dispatcher();
//# sourceMappingURL=dispatcher.js.map