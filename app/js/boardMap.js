import { drawLine, drawImg } from './util';
export class BoardMap {
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
      drawImg(this.piecesCtx, '/images/black.png', (x - 0.45) * interval, (y - 0.45) * interval, interval * 0.9)
    } else {
      drawImg(this.piecesCtx, '/images/white.png', (x - 0.45) * interval, (y - 0.45) * interval, interval * 0.9)
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
      drawLine(this.boardCtx, 0, i * interval, this.borderMapSize, i * interval)
      drawLine(this.boardCtx, i * interval, 0, i * interval, this.borderMapSize)
    }
  }
}
