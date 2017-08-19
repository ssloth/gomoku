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

  }
}

Player.count = 1;
