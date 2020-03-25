const http = require('http');
const port = 40001;

let server = http.createServer();

let debug_handler = (req, res) => {
    console.log(`${req.method}:${req.url}`);
    res.writeHead(200, { "Text-content": "text/plain; charset=utf-8" });
    res.end(`${req.method}:${req.url}`);
}

let http_404 = (req, res) => {
    console.log(`${req.method}:${req.url} HTTP status 404`);
    res.writeHead(404, { "Text-content": "text/plain; charset=utf-8" });
    res.end(`${req.method}:${req.url} HTTP status 404`);
}

let GET_handler = (req, res) => {
    switch (req.url) {
        case "/":
            debug_handler(req, res);
            break;
        case "/A":
            debug_handler(req, res);
            break;
        case "/A/B":
            debug_handler(req, res);
            break;
        default:
            http_404(req, res);
    }
}
let POST_handler = (req, res) => {
    switch (req.url) {
        case "/":
            debug_handler(req, res);
            break;
        case "/C":
            debug_handler(req, res);
            break;
        case "/C/D":
            debug_handler(req, res);
            break;
        default:
            http_404(req, res);
    }
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