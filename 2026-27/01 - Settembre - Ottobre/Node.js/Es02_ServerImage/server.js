const fs = require('fs');
const http = require('http');
const port = 3000;


const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url == '/img1') { // localhost:3000/img1
        fs.readFile('Img/img1.png', function (err, data) {
            if (err) {
                console.error(err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(data);
            }
        });
    } else if (req.url == '/img2') { // localhost:3000/img2
        fs.readFile('Img/img2.png', function (err, data) {
            if (err) {
                console.error(err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(data);
            }
        });
    }
    else if (req.url == '/img3') { // localhost:3000/img3
        fs.readFile('Img/img3.png', function (err, data) {
            if (err) {
                console.error(err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(data);
            }
        });
    }
    else if (req.url == '/img4') { // localhost:3000/img4
        fs.readFile('Img/img4.png', function (err, data) {
            if (err) {
                console.error(err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(data);
            }
        });
    }
    else if (req.url == '/img5') { // localhost:3000/img5
        fs.readFile('Img/img5.png', function (err, data) {
            if (err) {
                console.error(err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(data);
            }
        });
    }
    else if (req.url == '/img6') { // localhost:3000/img6
        fs.readFile('Img/img6.png', function (err, data) {
            if (err) {
                console.error(err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(data);
            }
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
    }
});

server.listen(3000, function () {
    console.log(`Server is running on http://localhost:${port}`);
});