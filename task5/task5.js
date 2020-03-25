const http = require('http');
let jc = require('./jsonChecker');


let handler = (req, res) => {

    if (req.method == 'POST' && jc.isJsonContentType(req.headers) && req.url == "/") {
        let result = "";
        req.on('data', data => result += data);
        req.on('end', () => {
            try {
                let obj = JSON.parse(result);

                jc.write200(res, "SERVER: ", JSON.stringify(obj));
            } catch (e) {
                jc.write400(res, "catch: bad json");
            }
        });
    } else jc.write400(res, "no json-post or bad path");
}

let server = http.createServer((req, res) => {

});
server.listen(40001, v => { console.log('server is listening on port 40001') })
    .on('request', handler);