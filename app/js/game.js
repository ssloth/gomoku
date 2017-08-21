import { EventEmitter } from 'events';
import { mode } from './config';
import { drawImg } from './util';
import { Online } from './online';
export class Game extends EventEmitter {
  constructor({ nickname, sence, setting }) {
    super();
    this.players = [];
    this.sence = sence;
    this.localPlayer = { nickname, id: null };
    this.currentPlayerId = 0;
    this.borderArr = [];
    this.winFlag = false;
    this.setting = setting;
    this._init();
  }

  _init() {
    this._initBorderArr();
    this.currentPlayerId = 1;
    if (this.setting.mode === mode.personal) {
      this._initPersonal();
    } else if (this.setting.mode === mode.online) {
      this._initOnline();
    } else if (this.setting.mode === mode.observer) {
      this._initObserver();
    } else {
      this.addPlayer({ nickname: '黑', id: 1 });
      this.addPlayer({ nickname: '白', id: 2 });
      this._initFree();
    }
  }


  _initPersonal() {

  }

  _initOnline() {
    let me = this;
    me.online = new Online();
    me.online.join(this.localPlayer.nickname)
    me.online.socket.on('start', function(players) {
      me.addPlayer(players[0]);
      me.addPlayer(players[1]);
    })

    me.online.socket.on('currentPlayerId', function(currentPlayerId) {
      me.currentPlayerId = currentPlayerId;
    })

    me.online.socket.on('localPlayer', function(localPlayer) {
      me.localPlayer = localPlayer;
    });

    me.online.socket.on('move', function({ currentPlayerId, x, y }) {
      console.log(currentPlayerId, x, y);
      me._updataBoard({ currentPlayerId, x, y });
    })


    me.on('move', function(currentPlayerId, x, y) {
      if (me.localPlayer.id === currentPlayerId) {
        me.online.move({ currentPlayerId, x, y });
      }

    })
  }

  _initObserver() {

  }

  _initFree() {
    this.on('move', function(id, x, y) {
      this._updataBoard({ id, x, y });
      this._toggleCurrentPlayerId();
    })
  }

  _initBorderArr() {
    let row = this.sence.getRow();
    for (let i = 0; i < row; i++) {
      this.borderArr[i] = []
      for (let j = 0; j < row; j++) {
        this.borderArr[i][j] = 0;
      }
    }
  }

  _initEventer() {
    this.sence.piecesCanvas.addEventListener('click', (e) => {
      var x = parseInt(e.offsetX / this.sence.getInterval() + 0.5);
      var y = parseInt(e.offsetY / this.sence.getInterval() + 0.5);
      if (this.borderArr[x][y] === 0) {
        this.emit('move', this.currentPlayerId, x, y);
      }
    })
  }

  addPlayer(player) {
    this.players.push(player);
    if (this.players.length === 2) {
      this._initEventer();
    }
  }

  _toggleCurrentPlayerId() {
    if (this.winFlag) {
      return
    }
    this.currentPlayerId = this.currentPlayerId === 1 ? 2 : 1;
  }

  _updataBoard({ currentPlayerId, x, y }) {
    this.borderArr[x][y] = currentPlayerId;
    if (this._checkWin(x, y)) {
      this.winFlag = true;
      setTimeout(() => {
        alert(`玩家${this.players.find(p => p.id === this.currentPlayerId).nickname}取得了胜利`)
      }, 100)
    };
    this.render();
  }

  _checkWin(x, y) {
    // 横向检查
    for (let i = 0, count = 0; i < this.sence.row; i++) {
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
    for (let i = 0, count = 0; i < this.sence.row; i++) {
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
    for (let i = 0, x1 = x - temp, y1 = y - temp, count = 0; i < this.sence.row; i++) {
      if (x1 + i + 1 > this.sence.row || y1 + i + 1 > this.sence.row) {
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
    var temp = x < this.sence.row - y ? x : this.sence.row - y;
    for (let i = 0, x1 = x - temp, y1 = y + temp, count = 0; i < this.sence.row; i++) {
      if (x1 + i + 1 > this.sence.row || y1 - i - 1 < 0) {
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
    let row = this.sence.getRow();
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < row; j++) {
        if (this.borderArr[i][j] != 0) {
          this.sence.readerPiece(i, j, this.borderArr[i][j] === 1 ? 'black' : 'white')
        }
      }
    }
  }

}
