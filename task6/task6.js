let http = require("http");
let parseString = require("xml2js").parseString;
let xmlBuilder = require("xmlbuilder");
let xmlChecker = require("./xmlChecker");

let parseMessage = (obj) => {
    let rc = "<server>parse error</server>";
    try {
        let xmlDoc = xmlBuilder.create("SERVER");
        xmlDoc.raw(obj);

        rc = xmlDoc.toString({ pretty: true });
    } catch (e) {
        console.log(e);
    }
    return rc;
}

let handler = (req, res) => {
    if (req.method == "POST" && req.url == "/" && xmlChecker.isXMLContentType(req.headers)) {
        let xmlText = "";
        req.on("data", chunk => xmlText += chunk);
        req.on("end", () => {
            xmlChecker.write200(res, "", parseMessage(xmlText));
        });
    } else {
        xmlChecker.write400(res, "no xml-post or bad path");
    }
}

let server = http.createServer();
server.listen(40001, () => console.log("Porst is listening on port 40001"))
    .on("request", handler);