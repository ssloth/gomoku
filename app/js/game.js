import { EventEmitter } from 'events';
import { mode } from './config';
import { drawImg } from './util';
import { Online } from './online';
import { AI } from './ai';
import { Player } from './player';
export class Game extends EventEmitter {
  constructor({ nickname, sence, setting }) {
    super();
    this.players = [];
    this.borderArr = [];
    this.sence = sence;
    this.localPlayer = { nickname, id: null };
    this.currentPlayerId = 0;
    this.winFlag = false;
    this.setting = setting;
    this._init();
  }

  /**
   * 初始化地图和游戏模式
   */
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
      this._initFree();
    }
  }

  /**
   * 单机模式
   */
  _initPersonal() {
    let me = this;
    me.addPlayer(new Player({ nickname: '黑', id: 1 }));
    me.addPlayer(new AI({ nickname: '白', id: 2 }));

    
    me.players[1].on('move', function(currentPlayerId, x, y) {
      me._updataBoard({ currentPlayerId, x, y });
      me._toggleCurrentPlayerId();
    })

    me.on('move', function(currentPlayerId, x, y) {
      me._updataBoard({ currentPlayerId, x, y });
      me._toggleCurrentPlayerId();
      me.players[1].move(this.borderArr);
    })
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
    this.addPlayer(new Player({ nickname: '黑', id: 1 }));
    this.addPlayer(new Player({ nickname: '白', id: 2 }));
    // this.addPlayer(new AI({ nickname: 'AI', id: 2 }));
    this.on('move', function(currentPlayerId, x, y) {
      this._updataBoard({ currentPlayerId, x, y });
      this._toggleCurrentPlayerId();
      this.players[2]._updataBoardMode(this.borderArr);
      console.table(arr(this.players[2].boardMode[2]))
    })
  }

  _initBorderArr() {
    for (let i = 0; i < 15; i++) {
      this.borderArr[i] = []
      for (let j = 0; j < 15; j++) {
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
    for (let i = 0, count = 0; i < 14; i++) {
      if (this.borderArr[x][i] !== 0 && this.borderArr[x][i] === this.borderArr[x][i + 1]) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }
    // 纵向检查
    for (let i = 0, count = 0; i < 14; i++) {
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
    for (let i = 0, x1 = x - temp, y1 = y - temp, count = 0; i < 15; i++) {
      if (x1 + i + 1 > 15 - 1 || y1 + i + 1 > 15 - 1) {
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
    var temp = x < 15 - y ? x : 15 - y;
    for (let i = 0, x1 = x - temp, y1 = y + temp, count = 0; i < 15; i++) {
      if (x1 + i + 1 > 15 - 1 || y1 - i - 1 < 0) {
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
    this.sence.clean();
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        if (this.borderArr[i][j] != 0) {
          this.sence.readerPiece(i, j, this.borderArr[i][j] === 1 ? 'black' : 'white')
        }
      }
    }
  }

  addPlayer(player) {
    this.players.push(player);
    if (this.players.length === 2) {
      this._initEventer();
    }
  }

}

/**
 * 将数组转置，不改变原数组
 * @param {Array} arr 
 */
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
