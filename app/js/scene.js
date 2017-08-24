import { drawLine, drawImg } from './util';
import black from '../images/black.png';
import white from '../images/white.png';

export class Scene {
  constructor() {
    this.wrapper = document.getElementById('wrapper');
    this.boardCanvas = document.getElementById('board');
    this.boardCtx = this.boardCanvas.getContext('2d');
    this.piecesCanvas = document.getElementById('pieces');
    this.piecesCtx = this.piecesCanvas.getContext('2d');
    this._init();
  }

  readerPiece(x, y, color) {
    let interval = this.getInterval();
    if (color === 'black') {
      drawImg(this.piecesCtx, black, (x - 0.45) * interval, (y - 0.45) * interval, interval )
    } else {
      drawImg(this.piecesCtx, white, (x - 0.45) * interval, (y - 0.45) * interval, interval )
    }
  }

  clean() {
    this.piecesCtx.clearRect(0,0,this.piecesCanvas.width,this.piecesCanvas.width)
  }

  getInterval() {
    return this.borderMapSize / 14;
  }

  getBorderMapSize() {
    return this.borderMapSize;
  }


  refresh() {
    this._init();
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
    let interval = this.borderMapSize / 14;
    for (let i = 0; i < 15; i++) {
      drawLine(this.boardCtx, 0, i * interval, this.borderMapSize, i * interval)
      drawLine(this.boardCtx, i * interval, 0, i * interval, this.borderMapSize)
    }
  }
}
