const http = require('http');
const url = require('url');
const port = 40001;

let server = http.createServer();


let SUM_handler = (req, res) => {
    let url = new URL(req.url, `http://localhost:${port}`);

    let x = +url.searchParams.get('x');
    let y = +url.searchParams.get('y');
    let result = `x + y = ${x + y}`;

    console.log(result);
    res.writeHead(200, { "Text-content": "text/plain; charset=utf-8" });
    res.end(result);
}

let SUB_handler = (req, res) => {
    let url = new URL(req.url, `http://localhost:${port}`);

    let x = +url.searchParams.get('x');
    let y = +url.searchParams.get('y');
    let result = `x - y = ${x - y}`;

    console.log(result);
    res.writeHead(200, { "Text-content": "text/plain; charset=utf-8" });
    res.end(result);
}

let CONC_handler = (req, res) => {
    let url = new URL(req.url, `http://localhost:${port}`);

    let x = +url.searchParams.get('x');
    let y = +url.searchParams.get('y');
    let result = `x + y = ${x + y}`;

    console.log(result);
    res.writeHead(200, { "Text-content": "text/plain; charset=utf-8" });
    res.end(result);
}

let http_404 = (req, res) => {
    console.log(`${req.method}:${req.url} HTTP status 404`);
    res.writeHead(404, { "Text-content": "text/plain; charset=utf-8" });
    res.end(`${req.method}:${req.url} HTTP status 404`);
}

let GET_handler = (req, res) => {
    let pathname = url.parse(req.url).pathname;

    switch (pathname) {
        case "/SUM":
            SUM_handler(req, res);
            break;
        case "/SUB":
            SUB_handler(req, res);
            break;
        case "/CONC":
            CONC_handler(req, res);
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
        default:
            http_404(req, res);
            break;
    }
}

server.listen(port, () => console.log(`Server listening on port ${port}`))
    .on('error', e => console.error(`Server error: ${e.code}, ${e.message}`))
    .on('request', http_handler);