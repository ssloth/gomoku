import { BoardMap } from './boardMap';
import { Player } from './player';
import { Game } from './game';
import io from 'socket.io-client';

import * as types from './command';

var game = null;
var playerId = null;
var currentPlayerId = 0;
var name = 'lzy' + Math.random();
const socket = io('http://localhost:8080');
socket.emit('join', { nickname: name })

socket.on('connect', () => {
  console.log('connect' + socket.id);
})

socket.on('id', (id) => {
  playerId = id;
  console.log(id);
})

socket.on('start', (data) => {
  game = new Game(new Player(data[0].nickname), new Player(data[1].nickname), new BoardMap());
  game.on('move', (id, x, y) => {
    if (playerId !== currentPlayerId) {
      return console.log('不是你的回合');
    }
    socket.emit('playerMove', { currentPlayerId, x, y })
  })
})
socket.on('board', (data) => {
  console.log(data);
  game.setBoardData(data);
})

socket.on('currentPlayerId', function(id) {
  currentPlayerId = id;
  console.log(currentPlayerId);
})



window.onunload = function() {
  socket.close();
}
