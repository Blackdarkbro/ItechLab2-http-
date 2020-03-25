const isJson = (headers, header, mime) => {
    let rc = false;
    let h = headers[header];
    if (h) rc = h.indexOf(mime) >= 0;
    return rc;
}

exports.write400 = (res, smess) => {
    console.log(smess);
    res.writeHead(400, { "content-type": "text/html; charset=utf-8" });
    res.statusMessage = smess;
    res.end(smess);
}

exports.write200 = (res, smess, mess) => {
    console.log(smess, mess);
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.statusMessage = smess;
    res.end(`${smess} ${mess}`);
}

exports.isJsonContentType = hs => { return isJson(hs, "content-type", "application/json") }