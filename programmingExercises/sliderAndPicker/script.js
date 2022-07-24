var canvas = document.getElementById("canvas");
var canvasCTX = canvas.getContext("2d");
var inputcolor = document.getElementById("inputColor");
var inputSize = document.getElementById("slider");

function inputColor() {
  var color = inputcolor.value;
  canvas.style.backgroundColor = color;
}

function doSquare() {
  var size = inputSize.value;
  canvasCTX.clearRect(0, 0, canvas.width, canvas.height);
  canvasCTX.fillStyle = "black";
  canvasCTX.fillRect(10, 10, size, size);
  canvasCTX.fillRect(parseInt(size)+10, parseInt(size)+10, size, size);
}