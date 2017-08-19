const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const url = require('url');
const path = require('path');
const GameData = require('./gameData');
const app = express();

var players = [];
var playerCount = 0;
var gameData = null;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function(ws, req) {
  const location = url.parse(req.url, true);
  ws.send(JSON.stringify({ code: 'msg', data: `玩家接入,当前连接数量 ：${++playerCount}` }));
  ws.on('message', function incoming(message) {
    var data = JSON.parse(message)
    let commands = {
      ['msg'](msg) { console.log(msg) },
      ['setPlayerName'](name) {
        players[playerCount - 1] = { name: name, id: playerCount - 1 }
        if (playerCount === 2) {
          console.log('---game start---');
          wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              console.log('~~~~');
              ws.send(JSON.stringify({
                code: 'start',
                data: [players[0].name, players[1].name]
              }));
            }
          });
          gameData = new GameData();
        }
      },
      ['setPiece'](playerId, x, y) {
        gameData.move(x, y, playerId)
      }
    }
    commands[data.code](data.data);
  });
  ws.on('close', function() {
    ws.send(`玩家退出，当前连接数量 ：${playerCount--}`);
  })
})

server.listen(8080, function() {
  console.log('Listening on %d', server.address().port);
});
