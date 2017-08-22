import { Player } from './player';
export class AI extends Player {
  constructor({ nickname, id }) {
    super({ nickname, id })
    this.mark = 'ai';
    this.border = null;
    this.borderMode = [];
    this._initBorderMode();
  }

  _initBorderMode() {
    for (let i = 0; i < 15; i++) {
      this.borderMode[i] = [];
      for (let j = 0; j < 15; j++) {
        this.borderMode[i][j] = [];
      }
    }
  }

  _updataBoardMode(border) {
    this.border = border;
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        if (this.border[i][j] === 0) {

        }

        if (this.border[i][j] !== 0) {
          let id = this.border[i][j];
          console.log('toup' + this._toUp(i, j, id));
        }
      }
    }
  }

  _toUp(i, j, id) {
    let me = this;

    function toUp(i, j, id, count) {
      if (j === 0) { return count; }
      if (me.border[i][j - 1] === 0) { return count }
      if (me.border[i][j - 1] !== id) { return -count }
      return toUp(i - 1, j, id, count) + 1;
    }
    return toUp(i, j, id, 0);
  }

  move(border) {
    this._updataBoardMode(border);
  }

}
