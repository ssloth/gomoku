export function drawLine(context, x1, y1, x2, y2, color = '#9bc0f0') {
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

export function drawImg(context, imgUrl, x, y, size) {
  let image = new Image()
  image.src = imgUrl;
  image.onload = function() {
    context.beginPath();
    context.drawImage(image, x, y, size, size);
    context.closePath();
  }
}

export function tip() {

}

export const directionFn = {
  ['L'](board, i, j, id, fn) { return { count: fn(board, i, j, id, { h: -1, v: 0 }), i: i - 1, j: j } },
  ['R'](board, i, j, id, fn) { return { count: fn(board, i, j, id, { h: 1, v: 0 }), i: i + 1, j: j } },
  ['U'](board, i, j, id, fn) { return { count: fn(board, i, j, id, { h: 0, v: -1 }), i: i, j: j - 1 } },
  ['B'](board, i, j, id, fn) { return { count: fn(board, i, j, id, { h: 0, v: 1 }), i: i, j: j + 1 } },
  ['LU'](board, i, j, id, fn) { return { count: fn(board, i, j, id, { h: -1, v: -1 }), i: i - 1, j: j - 1 } },
  ['LB'](board, i, j, id, fn) { return { count: fn(board, i, j, id, { h: -1, v: 1 }), i: i - 1, j: j + 1 } },
  ['RU'](board, i, j, id, fn) { return { count: fn(board, i, j, id, { h: 1, v: -1 }), i: i + 1, j: j + -1 } },
  ['RB'](board, i, j, id, fn) { return { count: fn(board, i, j, id, { h: 1, v: 1 }), i: i + 1, j: j + 1 } }
}

export function to(board, i, j, id, { h, v }) {
  function _to(i, j, id, count) {
    if (j === 0 || i === 0 || i === 14 || j === 14) { return count; }
    if (board[i - h][j - v] === 0) {
      return count;
    }
    if (board[i - h][j - v] !== id) {
      return -count;
    }
    return _to(i - h, j - v, id, count + 1);
  }
  return _to(i, j, id, 1);
}


export function assign(oldSocre, newSocre) {
  if (oldSocre.direction === newSocre.direction && oldSocre.score > newSocre.score) {
    Object.assign.Object(newSocre, oldSocre);
  }
  return Object.assign.Object(oldSocre, newSocre)
}
