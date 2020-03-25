const http = require('http');
const url = require('url');
const qs = require('querystring');
const tt = require('body-parser');

const port = 40001;

let server = http.createServer((req, res) => {});

let http_404 = (req, res) => {
    console.log(`${req.method}:${req.url} HTTP status 404`);
    res.writeHead(404, { "Text-content": "text/plain; charset=utf-8" });
    res.end(`${req.method}:${req.url} HTTP status 404`);
}

let POST_handler = (req, res) => {
    let result = "";

    req.on('data', data => result += data);
    req.on('end', () => {
        let query = qs.parse(result);

        res.writeHead(200, { "Text-content": "text/html; charset=utf-8" });

        if (query.text) {
            let text = query.text;
            console.log("SERVER: ", text);
            res.end(`SERVER: ${text}`);
        } else {
            http_404(req, res);
        }
    });

}

let http_handler = (req, res) => {
    switch (req.method) {
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