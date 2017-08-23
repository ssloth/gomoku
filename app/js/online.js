import io from 'socket.io-client';
import { EventEmitter } from 'events';
import { POTR } from './config';


export class Online extends EventEmitter {
  constructor() {
    super();
    this.socket = io('http://localhost:' + POTR);
    this._initEvent();
  }

  _initEvent() {
    this.socket.on('connect', () => {
      console.log('^_^');
    })

    this.socket.on('start', function(players) {
      this.emit('start', players);
    })
  }

  join(nickname, cb) {
    console.log(nickname);
    this.socket.emit('join', nickname);

    if (typeof cb === 'function') {
      cb();
    }
  }

  move({ x, y }, cb) {
    this.socket.emit('move', { x, y });
    if (typeof cb === 'function') {
      cb(this.socket);
    }

  }

  close(nickname) {
    this.socket.emit('colse', nickname);
  }

}
