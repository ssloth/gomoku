class GameData {
  constructor() {
    this.board = [];
    this._initBoard();
  }

  _initBoard() {
    for (let i = 0; i < 15; i++) {
      this.board[i] = [];
      for (let j = 0; j < 15; j++) {
        this.board[i][j] = 0;
      }
    }
  }

  move(x, y, id) {
    this.board[x][y] = id;
  }

}

module.exports = GameData;
