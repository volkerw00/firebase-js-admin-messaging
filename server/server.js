const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const https = require('https');
const webpack = require('webpack');
const config = require('../webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const server = express();
const compiler = webpack(config);

server.use(webpackDevMiddleware(compiler));
server.use(webpackHotMiddleware(compiler));
server.use(bodyParser.json());
server.use(express.static(path.resolve('app')));
server.use(require('./fbm-admin.js'));

server.get('/', function response(req, res) {
    res.sendFile(path.resolve('app/index.html'));
});

var privateKey = fs.readFileSync('localhost.key');
var certificate = fs.readFileSync('localhost.crt');
var httpsOptions = {
    key: privateKey,
    cert: certificate
};
var serverOptions = {
    port: 9090,
    host: '0.0.0.0'
};

var httpsServer = https.createServer(httpsOptions, server);
httpsServer.listen(serverOptions, function () {
    console.info('==> 🌎 Server started. Open up https://%s:%s/ in your browser.', serverOptions.host, serverOptions.port);
});