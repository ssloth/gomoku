import { EventEmitter } from 'events';
export class Player extends EventEmitter {
  constructor(name = Math.random()) {
    super()
    this.name = name;
    this.id = Player.count;
    this.pieces = [];
    this._initEvent();
    Player.count ++;
  }

  _initEvent() {
    //落子
    this.on('moves', (x, y) => {
      this.pieces.push({ x, y })
    })
  }
}

Player.count = 1;
