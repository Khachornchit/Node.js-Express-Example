var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var port = 5000;
var cssMap = '/style';
var cssDir = '/Content/css';
var htmlDir = '/Html/';

console.log(__dirname);

app.use(cssMap, express.static(__dirname + cssDir));

app.get('/', function (request, response) {
    response.sendFile('index.html', { root: path.join(__dirname, htmlDir) });
});

app.get('/start', function (request, response) {
    response.send('I come from Express !');
});

app.get(/^(.+)$/, function (req, resp) {
    try {
        if (fs.statSync(path.join(__dirname, htmlDir) + req.params[0] + '.html').isFile()) {
            resp.sendFile(req.params[0] + '.html', { root: path.join(__dirname, htmlDir) });
        };
    } catch (e) {
        console.log(e);
        resp.sendFile('404.html', { root: path.join(__dirname, htmlDir) });
    }
});

app.listen(port, function () {
    console.log('Express listen port' + port);
});