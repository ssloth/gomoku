const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const url = require('url');
const path = require('path');
const GameData = require('./gameData');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

var players = [];
var playerCount = 0;
var gameData = null;


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', function(client) {

});
io.on('close', function() {

})

server.listen(8080, function() {
  console.log('Listening on %d', server.address().port);
});
