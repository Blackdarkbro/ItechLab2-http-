const http = require('http');
const url = require('url');
const fs = require('fs');


http.createServer(function(req, res) {

    if (req.method === "GET" && req.url === "/download/text.txt") {
        //specify Content will be an attachment
        res.setHeader('Content-disposition', 'attachment; filename=text.txt');
        res.setHeader('Content-type', 'text/plain');
        res.end("Hello, here is a file for you!");
    } else {
        res.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
        res.end("code 404. Bad path or no such file");
    }

}).listen(40001, () => console.log("server is listening on port 40001"));