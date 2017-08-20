import { BoardMap } from './boardMap';
import { Player } from './player';
import { Game } from './game';
import io from 'socket.io-client';

import * as types from './command';
window.onload = function() {

  var game = null;
  const socket = io('http://localhost:8080');
  socket.on('connect', function() {
    console.log('connect' + socket.id);
  })
}
