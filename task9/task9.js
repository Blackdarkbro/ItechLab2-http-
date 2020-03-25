const http = require('http');
const qs = require('querystring');
const fs = require('fs');

const port = 40001;

let server = http.createServer();

let sendHTML = (req, res) => {
    fs.readFile("./index.html", (err, data) => {
        if (err) throw err;

        res.writeHead(200, { "Text-content": "text/html; charset=utf-8" });
        res.write(data);
        res.end();
    })
}
let sendCSS = (req, res) => {
    fs.readFile("styles.css", (err, data) => {
        if (err) throw err;

        res.writeHead(200, { "Text-content": "text/css" });
        res.write(data);
        res.end();
    });

}
let sendJs = (req, res) => {

    fs.readFile("script.js", (err, data) => {
        if (err) throw err;

        res.writeHead(200, { "Text-content": "text/javascript" });
        res.write(data);
        res.end();
    });
}

let http_404 = (req, res) => {
    console.log(`${req.method}:${req.url} HTTP status 404`);
    res.writeHead(404, { "Text-content": "text/plain; charset=utf-8" });
    res.end(`${req.method}:${req.url} HTTP status 404`);
}

let GET_handler = (req, res) => {
    switch (req.url) {
        case "/":
            sendHTML(req, res);
            break;
        case "/styles.css":
            sendCSS(req, res);
            break;
        case "/script.js":
            sendJs(req, res);
            break;
        default:
            http_404(req, res);
    }
    // handler(req, res);
}


let http_handler = (req, res) => {
    switch (req.method) {
        case "GET":
            GET_handler(req, res);
            break;
        default:
            http_404(req, res);
            break;
    }
}

server.listen(port, () => console.log(`Server listening on port ${port}`))
    .on('error', e => console.error(`Server error: ${e.code}, ${e.message}`))
    .on('request', http_handler);