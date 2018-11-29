var express = require('express');
var app = express();
var kook = require('./src/index');
var path = require('path');
app.locals.pretty = true;
app.set('views', '/views_file');
app.set('view engine', 'jade');

//app.get('/', function (req, res) {
//    res.send('hello world');
//});

app.use('/', kook);

app.listen(3000, function () {
    console.log('connected, 3000');
});
