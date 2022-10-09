var can1 = document.getElementById("canvas1");
var can2 = document.getElementById("canvas2");
var storingImage;
var hidingImage;
var resultImage;

//upload and draw storing image
function uploadStoringImage() {
  var image = document.getElementById("storingImage");
  storingImage = new SimpleImage(image);
  scaleInit(storingImage);
  storingImage.drawTo(can1);
}

//upload crop and draw hiding image
function uploadHidingImage() {
  if (storingImage == null || ! storingImage.complete()) {
    alert("Please, upload the image for store first");
    return;
  }
  var image = document.getElementById("hidingImage");
  hidingImage = new SimpleImage(image);
  scaleHidig(storingImage, hidingImage);
  hidingImage.drawTo(can2);
}

//func for making finish image
function process() {
  procStoringImage(storingImage);
  procHidingImage(hidingImage);
  sumPxs(storingImage, hidingImage);
  resultImage.drawTo(can1);
  deleteText();
  can2.width = 0;
  can2.height = 0;
}

//func processes image to store info
function procStoringImage(image) {
  for (var px of image.values()) {
    px.setRed(treatStoringPx(px.getRed()));
    px.setGreen(treatStoringPx(px.getGreen()));
    px.setBlue(treatStoringPx(px.getBlue()));
  }
}

//func processes hiding image
function procHidingImage(image) {
  for (var px of image.values()) {
    px.setRed(treatHidingPx(px.getRed()));
    px.setGreen(treatHidingPx(px.getGreen()));
    px.setBlue(treatHidingPx(px.getBlue()));
  }
}

//func processes pixels in the image to store information
//clean up the unimportant bits
function treatStoringPx(pxVal) {
  var x = Math.floor(pxVal/16) * 16;
  return x;
}

//func processes pixels in the hiding image
//clean up the unimportant bits and shift the remaining
function treatHidingPx(pxVal) {
  var x = Math.floor(pxVal/16);
  return x;
}

//func ciphers one image into another image
function sumPxs(image1, image2) {
  resultImage = new SimpleImage(image1.getWidth(), image1.getHeight());
  for (var px of resultImage.values()) {
    var x = px.getX();
    var y = px.getY();
    var sPx = image1.getPixel(x, y);
    var hPx = image2.getPixel(x, y);
    px.setRed(sPx.getRed() + hPx.getRed());
    px.setGreen(sPx.getGreen() + hPx.getGreen());
    px.setBlue(sPx.getBlue() + hPx.getBlue());
  }
}

//scale hiding image to fit into storing image
function scaleHidig(image1, image2) {
  //without this alert scaling doesn't work :)
  alert("The image to hide will be scaled");
  var image1;
  var image2;
  if (image1.getWidth() != image2.getWidth() || image1.getHeight() != image2.getHeight()) {
    image2.setSize(image1.getWidth(), image1.getHeight());
  }
}

//func scale initial image to fit into display
function scaleInit(image) {
  alert("The image to store the information will be scaled");
  var image;
  if (image.getWidth() > 700) {
    image.setSize(700, image.getHeight()*700/image.getWidth());
  }
  if (image.getHeight() > 500) {
    image.setSize(image.getWidth()*500/image.getHeight(), 500);
  }
}

//func changes text in div1 after processing
function deleteText() {
  var text = document.getElementById("div1");
  text.innerHTML = "Now take this image and go to decrypt it!";
}