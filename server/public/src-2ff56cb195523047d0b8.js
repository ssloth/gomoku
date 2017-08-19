/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = drawLine;
/* harmony export (immutable) */ __webpack_exports__["a"] = drawImg;
function drawLine(context, x1, y1, x2, y2, color = '#989796') {
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

function drawImg(context, imgUrl, x, y, size) {
  let image = new Image()
  image.src = imgUrl;
  image.onload = function() {
    context.beginPath();
    context.drawImage(image, x, y, size, size);
    context.closePath();
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boardMap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__command__ = __webpack_require__(9);




window.onload = function() {
  if (!"WebSocket" in window) {
    alert('你的浏览器不支持websockrt！')
    return false;
  }
  var game = null;
  const socket = new WebSocket('ws:localhost:8080');
  socket.onopen = function(event) {
    var playerName = 'lzy' + Math.random();
    socket.send(JSON.stringify({ code: 'setPlayerName', playerName: playerName }))
    socket.onmessage = function(event) {
      var data = JSON.parse(event.data);
      var commands = {
        [__WEBPACK_IMPORTED_MODULE_3__command__["b" /* MSG */]](msg) {
          console.log(msg)
        },
        [__WEBPACK_IMPORTED_MODULE_3__command__["c" /* START */]](players) {
          game = new __WEBPACK_IMPORTED_MODULE_2__game__["a" /* Game */](new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* Player */](players[0]),new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* Player */](players[1]),new __WEBPACK_IMPORTED_MODULE_0__boardMap__["a" /* BoardMap */]())
        },
        [__WEBPACK_IMPORTED_MODULE_3__command__["a" /* BOARD */]](board) {
          console.log(board)
        }
      }
      commands[data.code](data.data);
    };
    socket.onclose = function(event) {
      console.log('Client notified socket has closed', event.data);
    };
  };
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__images_black_png__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__images_black_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__images_black_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__images_white_png__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__images_white_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__images_white_png__);




class BoardMap {
  constructor(row = 15) {
    this.wrapper = document.getElementById('wrapper');
    this.boardCanvas = document.getElementById('board');
    this.boardCtx = this.boardCanvas.getContext('2d');
    this.piecesCanvas = document.getElementById('pieces');
    this.piecesCtx = this.piecesCanvas.getContext('2d');
    this.row = row;
    this._init();
  }

  readerPiece(x, y, color) {
    let interval = this.getInterval();
    if (color === 'black') {
      Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* drawImg */])(this.piecesCtx, __WEBPACK_IMPORTED_MODULE_1__images_black_png___default.a, (x - 0.45) * interval, (y - 0.45) * interval, interval * 0.9)
    } else {
      Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* drawImg */])(this.piecesCtx, __WEBPACK_IMPORTED_MODULE_2__images_white_png___default.a, (x - 0.45) * interval, (y - 0.45) * interval, interval * 0.9)
    }
  }

  getInterval() {
    return this.borderMapSize / (this.row - 1);
  }

  getBorderMapSize() {
    return this.borderMapSize;
  }

  getRow() {
    return this.row;
  }

  _init() {
    this.wrapperSize = this._getWrapperSize();
    this.boardCanvas.width = this.wrapperSize - 50;
    this.boardCanvas.height = this.wrapperSize - 50;
    this.piecesCanvas.width = this.wrapperSize - 50;
    this.piecesCanvas.height = this.wrapperSize - 50;
    this.borderMapSize = this.boardCanvas.width;
    this._renderBoard()
  }

  _getWrapperSize() {
    let height = this.wrapper.offsetHeight;
    let width = this.wrapper.offsetWidth;
    if (height !== width) {
      return height > width ? width : height;
    }
    return width;
  }


  _renderBoard() {
    let interval = this.borderMapSize / (this.row - 1);
    for (let i = 0; i < this.row; i++) {
      Object(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* drawLine */])(this.boardCtx, 0, i * interval, this.borderMapSize, i * interval)
      Object(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* drawLine */])(this.boardCtx, i * interval, 0, i * interval, this.borderMapSize)
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BoardMap;



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "app/images/black.af1a93c81128349af114bd1567bf77d8.png";

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "app/images/white.b7d0737483a0e1c8d3a5a478fa20bd27.png";

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_events__);

class Player extends __WEBPACK_IMPORTED_MODULE_0_events__["EventEmitter"] {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;


Player.count = 1;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);


class Game {
  constructor(playerA, playerB, borderMap, isOnline = false) {
    this.playerA = playerA;
    this.playerB = playerB;
    this.borderMap = borderMap;
    this.isOnline = isOnline;
    this.currentPlayer = this.playerA;
    this.borderArr = [];
    this.model = 0;
    this._initBorderArr();
    this._initEventer();
  }

  setGameMode(mode) {
    this.mode = mode;
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
        this.currentPlayer.emit('moves', x, y);
        this.borderArr[x][y] = this.currentPlayer.id;
        this.render();
        if (this._checkWin(x, y)) {
          setTimeout(() => { alert(`玩家${this.currentPlayer.name}取得了胜利`) }, 500)
        };
        this._toggleCurrentPlayer()
      }
    })
  }

  _toggleCurrentPlayer() {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const model = {
  'local': 0,
  'normal': 1,
}
/* unused harmony export model */



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const MSG = 'msg';
/* harmony export (immutable) */ __webpack_exports__["b"] = MSG;

const START = 'start';
/* harmony export (immutable) */ __webpack_exports__["c"] = START;

const BOARD = 'board';
/* harmony export (immutable) */ __webpack_exports__["a"] = BOARD;



/***/ })
/******/ ]);