
const dotenv = require('dotenv');
dotenv.config();

var io = require('socket.io')(server);

const path  = require('path')

const databaseReference = require('./database');

//connection.mysqlDemo();

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

app.get('/home', function (req, res) {
  res.sendFile(__dirname+'/public/src/home.html');
});

app.post('/data', function (req, res) {    
    //do stuff with the data here
    console.log(req.body)
    res.send("process complete");
});

io.on('connection', function(socket) {
	socket.on('update_dashboard', function(data) {
    databaseReference.getStatistics(socket);
    databaseReference.getUsers(socket);
    databaseReference.getTags(socket);
    databaseReference.getHighestOccuranceUsers(socket);
    databaseReference.getHighestOccuranceTags(socket);
  });
});

server.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});


/*
https://www.quora.com/How-do-I-send-data-from-Node-js-to-Python-and-get-back-JSONN-data-from-Python-to-Node-jss
https://stackoverflow.com/questions/23370718/python-socket-sendall-randomly-fails
https://stackoverflow.com/questions/42415207/send-receive-data-with-python-socket
*/
