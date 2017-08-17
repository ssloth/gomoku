import { model } from './config';
import { drawImg } from './util';
export class Game {
  constructor(playerA, playerB, borderMap) {
    this.playerA = playerA;
    this.playerB = playerB;
    this.borderMap = borderMap;
    this.currentPlayer = this.playerA;
    this.borderArr = [];
    this.model = 0;
    this._initBorderArr();
    this._initEventer();
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
        console.log(`玩家${this.currentPlayer.name}在${x} ${y} 落下了子`)
        this.currentPlayer.emit('moves', x, y);
        this.borderArr[x][y] = this.currentPlayer.id;
        this.toggleCurrentPlayer()
      }
    })
  }

  toggleCurrentPlayer() {
    this.currentPlayer = this.currentPlayer === this.playerA ? this.playerB : this.playerA;
    this.render();
  }

  play() {

  }

  render() {
    let row = this.borderMap.getRow();
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < row; j++) {
        if (this.borderArr[i][j] != 0) {
          this.borderMap.readerPieces(i, j, this.borderArr[i][j] === 1 ? 'black' : 'white')
        }
      }
    }
  }

}
