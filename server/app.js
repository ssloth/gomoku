const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const url = require('url');
const path = require('path');
const Board = require('./board');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

var players = [];
var playerCount = 0;
var currentPlayerId = 0;
var board = new Board();


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', function(client) {
  console.log('a client connect');

  client.on('join', function(data) {
    players.push({ nickname: data.nickname, id: ++playerCount })
    client.emit('id', playerCount);
    console.log('a player join,current player : ' + playerCount);
    if (playerCount === 2) {
      console.log('--- game start ---');
      io.sockets.emit('start', players);
      currentPlayerId = 1;
      io.sockets.emit('currentPlayerId', currentPlayerId);

    }
  })
  client.on('playerMove', function(data) {
    console.log(data)
    board.move(data.currentPlayerId, data.x, data.y);
    io.sockets.emit('board', board.board);
    toggleCurrentPlayerId();
    io.sockets.emit('currentPlayerId', currentPlayerId);
  })

  client.on('disconnect', function() {
    if (playerCount === 0) { return };
    console.log('a player leave, current player :' + --playerCount);
    players.pop()
  })
});

io.on('close', function() {
  console.log('connenction has colsed');
})

server.listen(8080, function() {
  console.log('Listening on %d', server.address().port);
});


function toggleCurrentPlayerId() {
  if (currentPlayerId === 0) {
    return;
  }
  currentPlayerId = currentPlayerId === 1 ? 2 : 1;
}
