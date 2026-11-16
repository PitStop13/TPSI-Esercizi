import * as url from "url";
import * as fs from "fs";
import * as mime from "mime";
import HEADERS from "./headers.json";

let paginaErrore: string;

function init() {
    fs.readFile("./static/error.html", (err, data) => {
        if (err) {
            console.error("Errore durante la lettura del file error.html:", err);
            paginaErrore = "<h1>Errore 404: Pagina non trovata</h1>";
        } else {
            paginaErrore = data.toString();
        }
    });
}

function staticListener(req: any, res: any, risorsa: any) {
    //http://localhost:3000
    if (risorsa === "/") {
        risorsa = "/index.html";
    }
    let filename: string = "./static" + risorsa;
    fs.readFile(filename, (err, data) => {
        if (!err) {
            let header = { "Content-Type": mime.getType(filename) || "text/html" }; //Traduce il mio filename in un tipo di contenuto (es. text/html, image/png, ecc.)
            res.writeHead(200, header);
            res.end(data);
        }
        else {
            res.writeHead(404, HEADERS.html);
            res.end(paginaErrore);
        }
    })
}

class Dispatcher {
    prompt: string = ">>>";
    listeners: any = {
        "GET": {/* "risorsa1": "callBack1", "risorsa2": "callBack2" */ },
        "POST": {},
        "DELETE": {},
        "PUT": {},
        "PATCH": {}
    };
    constructor() {
        init();
    }

    public addListener(metodo: string, risorsa: string, callBack: any) { //questo metodo serve a registrare un metodo http ed una risorsa specifica
        metodo = metodo.toUpperCase();
        if (metodo in this.listeners) {
            this.listeners[metodo][risorsa] = callBack;
        }
        else {
            throw new Error(`Metodo HTTP non supportato: ${metodo}`);
        }
    }

    public dispatch(req: any, res: any) {
        let metodo: string = req.method.toUpperCase();
        if (metodo == "GET") {
            this.innerDispatch(req, res);
        }
        else {
            let parametri: string = "";
            let json_par = {};
            req.on("data", (data: any) => {
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

    private innerDispatch(req: any, res: any) {
        let metodo: string = req.method.toUpperCase();
        let _url: any = url.parse(req.url, true);
        let risorsa: string = _url.pathname;
        let params: any = _url.query;

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
                res.writeHead(404, HEADERS.html);
                res.end("Servizio non disponibile");
            }
        }
    }

}

export default new Dispatcher();