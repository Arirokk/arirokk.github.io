var paintcanvas = document.getElementById("canvas1");
var context = paintcanvas.getContext("2d");
var color = 'black';
var radius = 10;
// only paint if mouse is being dragged (moved while the button is pressed)
var isPainting = false;

//a trying to show brush size value in the initial screen
document.addEventListener("DOMContentLoaded", function() {
  startSize();
})

function startSize() {
  document.getElementById("brushSize").value = radius;
  document.getElementById("sizeOutput").value = document.getElementById("brushSize").value;
}

function setWidth(value) {
  if (isNumeric(value) == true) {
    paintcanvas.width = value;
  }
}

function setHeight(value) {
  if (isNumeric(value) == true) {
    paintcanvas.height = value;
  }
}

function startPaint() {
  isPainting = true;
}

function endPaint() {
  isPainting = false;
}

function doPaint(x, y) {
  if (isPainting == true) {
    paintCircle(x, y);
  }
}

function clearCanvas() {
  context.clearRect(0, 0, paintcanvas.width, paintcanvas.height);
}

function paintCircle(x, y) {
    // make sure to start a new circle each time
    context.beginPath();
    // draw a circle using a complete (2*PI) arc around given point
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.fillStyle = color;
    context.fill();
}

function changeColor(newColor) {
  color = newColor;
}

function resizeBrush(newSize) {
  radius = newSize;
  document.getElementById("sizeOutput").value = newSize;
}




// verify the given value is actually a number
function isNumeric(value) {
  // standard JavaScript function to determine whether a string is an illegal number (Not-a-Number)
  return !isNaN(value);
}
