import { EventEmitter } from 'events';
import { mode } from './config';
import { drawImg } from './util';
export class Game extends EventEmitter {
  constructor(playerA, playerB, borderMap, setting) {
    super();
    this.playerA = playerA;
    this.playerB = playerB;
    this.borderMap = borderMap;
    this.localPlayerId = 0;
    this.currentPlayerId = 0;
    this.borderArr = [];
    this.model = 0;

    this.setting = setting;

    this._initBorderArr();
    this._initEventer();
  }

  setGameMode(mode) {
    this.mode = mode;

  }

  setBoardData(data) {
    this.borderArr = data;
    this.render();
  }

  _initBorderArr() {
    let row = this.borderMap.getRow();
    for (let i = 0; i < row; i++) {
      this.borderArr[i] = []
      for (let j = 0; j < row; j++) {
        this.borderArr[i][j] = 0;
      }
    }
  }

  _initEventer() {
    this.borderMap.piecesCanvas.addEventListener('click', (e) => {
      var x = parseInt(e.offsetX / this.borderMap.getInterval() + 0.5);
      var y = parseInt(e.offsetY / this.borderMap.getInterval() + 0.5);
      if (this.borderArr[x][y] === 0) {
        this.emit('move', this.currentPlayer.id, x, y);
        this.borderArr[x][y] = this.currentPlayer.id;
        if (this._checkWin(x, y)) {
          setTimeout(() => { alert(`玩家${this.currentPlayer.name}取得了胜利`) }, 500)
        };
      }
    })
  }

  toggleCurrentPlayer() {
    this.currentPlayer = this.currentPlayer === this.playerA ? this.playerB : this.playerA;
  }

  play() {

  }

  _checkWin(x, y) {
    // 横向检查
    for (let i = 0, count = 0; i < this.borderMap.row; i++) {
      if (this.borderArr[x][i] !== 0 && this.borderArr[x][i] === this.borderArr[x][i + 1]) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }
    //纵向检查
    for (let i = 0, count = 0; i < this.borderMap.row; i++) {
      if (this.borderArr[i][y] !== 0 && this.borderArr[i][y] === this.borderArr[i + 1][y]) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }

    // 斜\检查
    var temp = x < y ? x : y;
    for (let i = 0, x1 = x - temp, y1 = y - temp, count = 0; i < this.borderMap.row; i++) {
      if (x1 + i + 1 > this.borderMap.row || y1 + i + 1 > this.borderMap.row) {
        break;
      }
      if (this.borderArr[x1 + i][y1 + i] !== 0 && this.borderArr[x1 + i][y1 + i] === this.borderArr[x1 + i + 1][y1 + i + 1]) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }

    // 斜/检查
    var temp = x < this.borderMap.row - y ? x : this.borderMap.row - y;
    for (let i = 0, x1 = x - temp, y1 = y + temp, count = 0; i < this.borderMap.row; i++) {
      if (x1 + i + 1 > this.borderMap.row || y1 - i - 1 < 0) {
        break;
      }
      if (this.borderArr[x1 + i][y1 - i] !== 0 && this.borderArr[x1 + i][y1 - i] === this.borderArr[x1 + i + 1][y1 - i - 1]) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }
  }


  render() {
    let row = this.borderMap.getRow();
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < row; j++) {
        if (this.borderArr[i][j] != 0) {
          this.borderMap.readerPiece(i, j, this.borderArr[i][j] === 1 ? 'black' : 'white')
        }
      }
    }
  }

}
