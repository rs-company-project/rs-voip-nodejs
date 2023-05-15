const fs = require("fs");

const http = require("http");
const https = require("https");
const app = require("./app");


const httpServer = http.createServer(app);

var privateKey = fs.readFileSync('C:\\key.pem');
var certificate = fs.readFileSync('C:\\cert.pem');

const httpsServer = https.createServer({
    key: privateKey,
    cert: certificate
}, app);

module.exports = {
    httpServer,
    httpsServer
};