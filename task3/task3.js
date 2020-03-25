const http = require('http');
const qs = require('querystring');
const fs = require('fs');

const port = 40001;

let server = http.createServer();

let sendHTML = (req, res) => {
    res.writeHead(200, { "Text-content": "text/html; charset=utf-8" });
    res.end(fs.readFileSync("./index.html"));
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
        default:
            http_404(req, res);
    }
}
let POST_handler = (req, res) => {
    let result = '';

    req.on('data', data => result += data);
    req.on('end', () => {
        let query = qs.parse(result);
        res.writeHead(200, { "Text-content": "text/plain; charset=utf-8" });

        if (query.submit === "SUM") {
            res.end(`x + y = ${+query.value1 + (+query.value2)}`);
        } else if (query.submit === "SUB") {
            res.end(`x + y = ${+query.value1 - (+query.value2)}`);
        } else if (query.submit === "CONC") {
            res.end(`x + y = ${query.value1 + query.value2}`);
        } else if (query.submit === "CANCEL") {
            res.end(query.cancel);
        }
    });
}

let http_handler = (req, res) => {
    switch (req.method) {
        case "GET":
            GET_handler(req, res);
            break;
        case "POST":
            POST_handler(req, res);
            break;
        default:
            http_404(req, res);
            break;
    }
}

server.listen(port, () => console.log(`Server listening on port ${port}`))
    .on('error', e => console.error(`Server error: ${e.code}, ${e.message}`))
    .on('request', http_handler);