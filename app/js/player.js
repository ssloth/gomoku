import { EventEmitter } from 'events';

export class Player extends EventEmitter{
  constructor({ nickname, id }) {
    super();
    this.nickname = nickname;
    this.id = id;
  }

}
