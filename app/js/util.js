export function drawLine(context, x1, y1, x2, y2, color = '#989796') {
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
