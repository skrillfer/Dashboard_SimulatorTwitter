const path  = require('path')

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send("hello world");
  //res.sendFile(__dirname+'/public/src/login.html');
});

app.post('/data', function (req, res) {    
    //do stuff with the data here
    console.log(req.body)
    res.send("process complete");
});
server.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});