import { BoardMap } from './boardMap';
import { Player } from './player';
import { Game } from './game';
import * as types from './command';
window.onload = function() {
  if (!"WebSocket" in window) {
    alert('你的浏览器不支持websockrt！')
    return false;
  }
  var game = null;
  const socket = new WebSocket('ws:localhost:8080');
  socket.onopen = function(event) {
    var playerName = 'lzy' + Math.random();
    socket.send(JSON.stringify({ code: 'setPlayerName', playerName: playerName }))
    socket.onmessage = function(event) {
      var data = JSON.parse(event.data);
      var commands = {
        [types.MSG](msg) {
          console.log(msg)
        },
        [types.START](players) {
          game = new Game(new Player(players[0]),new Player(players[1]),new BoardMap())
        },
        [types.BOARD](board) {
          console.log(board)
        }
      }
      commands[data.code](data.data);
    };
    socket.onclose = function(event) {
      console.log('Client notified socket has closed', event.data);
    };
  };
}
