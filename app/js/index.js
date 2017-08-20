import { Scene } from './Scene';
import { Player } from './player';
import { Game } from './game';
import io from 'socket.io-client';
const socket = io('http://localhost:8080');
const control = document.getElementById('control');

var setting = {
  isOnlie: false,
  mode: 0,
  add: 0,
}

document.querySelector('.ok').onclick = function() {
  let nickname = document.getElementById('nickname').value;
  socket.emit({ nickname });
  socket.on('connect', () => {
    socket.on('start', (data) => {
      const game = new Game(new Player(data[0].nickname), new Player(data[1].nickname), new Scene());

      socket.on('id', (id) => {
        game.localPlayerId = id;
      })

      socket.on('board', (data) => {
        game.setBoardData(data);
      })

      socket.on('currentPlayerId', function(id) {
        game.currentPlayerId = id;
      })

      game.on('move', (id, x, y) => {
        if (game.localPlayerId !== game.currentPlayerId) {
          return console.log('不是你的回合');
        }
        socket.emit('playerMove', { currentPlayerId, x, y })
      })

    })
  })
  control.style.display = 'none';
}

document.querySelector('.reset').onclick = function() {

}



document.querySelector('.close').onclick = function() {
  control.style.display = 'none';
}

window.onunload = function() {
  socket.close();
}
