const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const url = require('url');
const path = require('path');
const Board = require('./board');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const log = console.log.bind(console);
const PORT = 8088;

var players = [];
var playerCount = 0;
var currentPlayerId = 0;
var board = new Board();


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', function(client) {
  log('a client connect');
  client.on('join', function(nickname) {
    addPlayer(nickname, function() {
      client.emit('localPlayer', players.find(p => p.nickname === nickname));
      log(`player [${nickname}] join,current player : ${playerCount}`);
    });

    if (playerCount === 2) {
      log('--- game start ---');
      io.sockets.emit('start', players);
      currentPlayerId = 1;
      io.sockets.emit('currentPlayerId', currentPlayerId);

    }
  })
  client.on('move', function({ x, y }) {
    board.move(x, y);
    log(currentPlayerId, 4422)
    io.sockets.emit('move', { currentPlayerId, x, y });
    toggleCurrentPlayerId();
    io.sockets.emit('currentPlayerId', currentPlayerId);
  })

  client.on('colse', function(nickname) {
    if (playerCount === 0) { return };
    delPlayer(nickname, function() {
      log(`player [${nickname}] leave, current player : ${playerCount}`);
    })
  })
});

io.on('close', function() {
  log('connenction has colsed');
})

server.listen(PORT, function() {
  log('Listening on %d', server.address().port);
});


function toggleCurrentPlayerId() {
  if (currentPlayerId === 0) {
    return;
  }
  currentPlayerId = currentPlayerId === 1 ? 2 : 1;
}

function addPlayer(nickname, cb) {
  if (playerCount >= 2) { return }
  let id = players.find(player => player.id === 1) ? 2 : 1;
  players.push({ nickname, id })
  playerCount = players.length;
  if (typeof cb === 'function') {
    cb();
  }
}

function delPlayer(nickname, cb) {
  players.forEach((player, index) => {
    if (player.nickname === nickname) {
      players.splice(index, 1);
    }
  })
  playerCount = players.length;
  if (typeof cb === 'function') {
    cb();
  }

}
