"use strict";
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/home.html');
});
app.get('/load/:id', function (req, res) {
    var filePath = '/public/saves/save_' + req.params.id + '.json';
    console.log('Loading : ' + filePath + ' ...');
    res.sendFile(__dirname + filePath);
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
