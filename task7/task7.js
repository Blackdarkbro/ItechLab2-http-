const http = require("http");
const fs = require("fs");
const util = require("util");
const qs = require("querystring");
const mp = require("multiparty");



let http_404 = (req, res) => {
    console.log(`${req.method}:${req.url} HTTP status 404`);
    res.writeHead(404, { "Text-content": "text/plain; charset=utf-8" });
    res.end(`${req.method}:${req.url} HTTP status 404`);
}

let handler = (req, res) => {
    if (req.method === "GET" && req.url == "/") {
        res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
        res.end(fs.readFileSync('./index.html'));

    } else if (req.method === "POST" && req.url === "/upload") {

        let form = new mp.Form({ uploadDir: "./fileStore" });

        form.parse(req, (err, fields, files) => {
            res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
            if (fields.upload) res.end(`Файл отправлен`);
            if (fields.cancel) res.end(`CANCEL`);
        });
    } else {
        http_404(req, res);
    }
}

let server = http.createServer();
server.listen(40001, () => console.log("server is listening on port 40001"))
    .on("request", handler);