const path  = require('path')

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send("hello world");
  //res.sendFile(__dirname+'/public/src/login.html');
});

server.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});