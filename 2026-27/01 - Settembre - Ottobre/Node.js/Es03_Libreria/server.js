const http = require("http");
const url = require("url");
const axios = require("axios");

const port = 3000;

// const requestHandler = function(req, res) {
//     let metodo = req.method;
//     console.log(`Metodo: ${metodo}`);
// };

const requestHandler = (req, res) => {
    const localUrl = url.parse(req.url, true);
    //console.log(localUrl);

    //http://localhost:3000/books/123456
    if (localUrl.pathname.startsWith("/books/") && localUrl.pathname.length > "/books/".length) {
        // /books/123456 ---> 123456
        const isbn = localUrl.pathname.split("/")[2];
        //console.log(`ISBN: ${isbn}`);
        axios.get(`https://openlibrary.org/search.json?isbn=${isbn}`).then(response => {
            const docs = response.data.docs;
            //console.log(docs);
            if (docs.length === 0) {
                //console.log("Book not found");
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Book not found" }));
                return;

            }else{
                const bookData = docs[0];
                // bookData.title, bookData.author_name, bookData.first_publish_year
                res.writeHead(200, { "Content-Type": "text/html ; charset=utf-8" });
                res.write(`<h1>Titolo: ${bookData.title}</h1>`);
                res.write(`<h2>ISBN: ${isbn}</h2>`);
                res.write(`<hr>`);

                res.write(`<h2>Autore/i:</h2>`);
                if (!bookData.author_name || bookData.author_name.length === 0) {
                    res.write(`<h3>Autore sconosciuto</h3>`);
                }
                for (let i = 0; i < bookData.author_name.length; i++) {
                    res.write(`<h2>${bookData.author_name[i]}</h2>`);
                }
                res.write(`<hr>`);
                if (!bookData.first_publish_year) {
                    res.write(`<h3>Anno di pubblicazione sconosciuto</h3>`);
                }else{
                    res.write(`<h3>Anno di pubblicazione: ${bookData.first_publish_year}</h3>`);
                }
                res.end();
            }

        }).catch(error => {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal server error" }));
        });

    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Book not found" }));
    }


};

// const requestHandler = async (req, res) => {
//     const localUrl = url.parse(req.url, true);
//     //console.log(localUrl);

//     //http://localhost:3000/books/123456
//     if (localUrl.pathname.startsWith("/books/") && localUrl.pathname.length > "/books/".length) {
//         const isbn = localUrl.pathname.split("/")[2];
//         try {
//             const response = await axios.get(`https://openlibrary.org/search.json?isbn=${isbn}`);
//             const docs = response.data.docs;
//             //console.log(docs);
//             if (docs.length === 0) {
//                 //console.log("Book not found");
//                 res.writeHead(404, { "Content-Type": "application/json" });
//                 res.end(JSON.stringify({ error: "Book not found" }));
//                 return;

//             }else{
//                 const bookData = docs[0];
//                 // bookData.title, bookData.author_name, bookData.first_publish_year
//                 res.writeHead(200, { "Content-Type": "text/html ; charset=utf-8" });
//                 res.write(`<h1>Titolo: ${bookData.title}</h1>`);
//                 res.write(`<h2>ISBN: ${isbn}</h2>`);
//                 res.write(`<hr>`);

//                 res.write(`<h2>Autore/i:</h2>`);
//                 if (!bookData.author_name || bookData.author_name.length === 0) {
//                     res.write(`<h3>Autore sconosciuto</h3>`);
//                 }
//                 for (let i = 0; i < bookData.author_name.length; i++) {
//                     res.write(`<h2>${bookData.author_name[i]}</h2>`);
//                 }
//                 res.write(`<hr>`);
//                 if (!bookData.first_publish_year) {
//                     res.write(`<h3>Anno di pubblicazione sconosciuto</h3>`);
//                 }else{
//                     res.write(`<h3>Anno di pubblicazione: ${bookData.first_publish_year}</h3>`);
//                 }
//                 res.end();
//             }

//         }
//         catch (error) {
//             res.writeHead(500, { "Content-Type": "application/json" });
//             res.end(JSON.stringify({"Message": "An error occurred" +  error.message }));
//         }
//     }


// }

const server = http.createServer(requestHandler);


server.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}/`);
});