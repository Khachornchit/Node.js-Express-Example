let express = require('express');
let path = require('path');
let fs = require('fs');
let app = express();
let port = 5000;

let html = '/html/';
let style = '/style';
let images = '/images'

console.log(__dirname);

app.use(style, express.static(__dirname + '/content/css'));
app.use(images, express.static(__dirname + '/content/images'));

app.get('/', function (request, response) {
    response.sendFile('index.html', { root: path.join(__dirname, html) });
});

app.get('/start', function (request, response) {
    response.send('I come from Express !');
});

app.get(/^(.+)$/, function (req, resp) {
    try {
        if (fs.statSync(path.join(__dirname, html) + req.params[0] + '.html').isFile()) {
            resp.sendFile(req.params[0] + '.html', { root: path.join(__dirname, html) });
        };
    } catch (e) {
        console.log(e);
        resp.sendFile('404.html', { root: path.join(__dirname, html) });
    }
});

app.listen(port, function () {
    console.log('Express listen port' + port);
});