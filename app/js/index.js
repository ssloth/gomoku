import {BoardMap} from './boardMap';
import {Player}from './player';
import {Game} from './game';
window.onload = function(){
  const socket = new WebSocket('ws:localhost:8080');
  const game = new Game(new Player('lzy'),new Player('xy'),new BoardMap());
}


