import { Player } from './player';
import { to, directionFn } from './util';
import { modeMapM, modeMapM, modeScore } from './config';
export class AI extends Player {
  constructor({ nickname, id }) {
    super({ nickname, id })
    this.mark = 'ai';
    this.board = null;
    this.boardMode = [];

  }

  _initboardMode() {
    for (let z = 0; z < 4; z++) {
      this.boardMode[z] = []
      for (let i = 0; i < 15; i++) {
        this.boardMode[z][i] = [];
        for (let j = 0; j < 15; j++) {
          this.boardMode[z][i][j] = '';
        }
      }
    }
  }

  _updataBoardMode(board) {
    this.board = board;
    this._initboardMode();
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        if (this.board[i][j] === 0) {} else {
          if (this.id === this.board[i][j]) {
            this._getDirection(i, j).forEach(function(element) {
              let res = directionFn[element](board, i, j, this.board[i][j], to)
              if (this.boardMode[0][i + res.h][j + res.v] < modeScore[modeMapM[res.count]]) {
                this.boardMode[0][i + res.h][j + res.v] = modeScore[modeMapM[res.count]];
                this.boardMode[2][i + res.h][j + res.v] = res.count;
              }
            }, this);
          } else {
            this._getDirection(i, j).forEach(function(element) {
              let res = directionFn[element](board, i, j, this.board[i][j], to)
              if (this.boardMode[1][i + res.h][j + res.v] < modeScore[modeMapM[res.count]]) {
                this.boardMode[1][i + res.h][j + res.v] = modeScore[modeMapM[res.count]];
                this.boardMode[3][i + res.h][j + res.v] = res.count;
              }
            }, this);
          }
        }
      }
    }
  }

  //获取当前棋子的可以落子的方向
  _getDirection(i, j) {
    var ret = [];
    if (i - 1 >= 0 && this.board[i - 1][j] === 0) ret.push('L');
    if (j - 1 >= 0 && this.board[i][j - 1] === 0) ret.push('U');
    if (i + 1 <= 14 && this.board[i + 1][j] === 0) ret.push('R');
    if (j + 1 <= 14 && this.board[i][j + 1] === 0) ret.push('B');
    if (i - 1 >= 0 && j - 1 >= 0 && this.board[i - 1][j - 1] === 0) ret.push('LU');
    if (i + 1 <= 14 && j + 1 <= 14 && this.board[i + 1][j + 1] === 0) ret.push('RB');
    if (i - 1 >= 0 && j + 1 <= 14 && this.board[i - 1][j + 1] === 0) ret.push('LB');
    if (i + 1 <= 14 && j - 1 >= 0 && this.board[i + 1][j - 1] === 0) ret.push('RU');
    return ret;
  }

  move(board) {
    this._updataBoardMode(board);
    let locations = this.findBest();
    console.log(locations)
    var item = locations[Math.floor(Math.random() * locations.length)]
    this.emit('move', this.id, item.i, item.j);
    this._updataBoardMode(board)
    console.table(arr(this.boardMode[3]))
  }

  findBest() {
    let temp = 0;
    let locations = []
    for (let z = 0; z < 2; z++) {
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          if (this.boardMode[z][i][j] !== 0 && this.boardMode[z][i][j] == temp) {
            locations.push({ i, j })
          }
          if (this.boardMode[z][i][j] > temp) {
            temp = this.boardMode[z][i][j]
            locations = []
            locations.push({ i, j })
          }
        }
      }
    }
    return locations;
  }

}

function arr(arr) {
  let ret = []
  for (let i = 0; i < 15; i++) {
    ret[i] = []
    for (let j = 0; j < 15; j++) {
      ret[i][j] = arr[j][i]
    }
  }
  return ret;
}
