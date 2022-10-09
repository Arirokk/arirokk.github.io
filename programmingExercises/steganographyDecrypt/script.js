//a var to get from different fuctions
var encImage;

//func upload and draw encrypted image
function uploadEcrypedImage() {
  var image = document.getElementById("imageInput");
  var can = document.getElementById("canvas1");
  encImage = new SimpleImage(image);
  encImage.drawTo(can);
}

//func processes a whole image and draw result
function decrypt() {
  var can = document.getElementById("canvas2");
  getHidden(encImage);
  encImage.drawTo(can);
}

//func changes original pixels
function getHidden(image) {
  for (var px of image.values()) {
    px.setRed(treatPx(px.getRed()));
    px.setGreen(treatPx(px.getGreen()));
    px.setBlue(treatPx(px.getBlue()));
  }
}

//func processes each of pixels
function treatPx(pxVal) {
  var x = pxVal % 16 * 16;
  return x;
}