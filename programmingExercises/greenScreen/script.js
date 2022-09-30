//create global variables to get from different funcs
var fgImage;
var bgImage;
var canvas1;
var canvas2;

//check if there is no canvas - create it
//take the image from input and put in var, then draw
function uploadFgImage() {
  if (canvas1 == null) {
    canvas1 = document.createElement("canvas");
    var toStick = document.getElementById("canvasesHere");
    toStick.appendChild(canvas1);
  }
  var uploadedImage = document.getElementById("fgImageInput");
  fgImage = new SimpleImage(uploadedImage);
  //alert("The foreground image have been uploaded");
  fgImage.drawTo(canvas1);
}

function uploadBgImage() {
  if (canvas2 == null) {
    canvas2 = document.createElement("canvas");
    var toStick = document.getElementById("canvasesHere");
    toStick.appendChild(canvas2);
  }
  var uploadedImage = document.getElementById("bgImageInput");
  bgImage = new SimpleImage(uploadedImage);
  //alert("The background image have been uploaded");
  bgImage.drawTo(canvas2);
}

//check if there is files in vars and they're uploaded complitely
//clean both canvases
//get pixel from fgImage one by one
//compare green component with others
//if lots of green, take pixel from bgImage
//if not, take pixel from fgImage and put into output
//draw resilting picture
function create() {
  if (fgImage == null || ! fgImage.complete()) {
    alert("Foreground image isn't uploaded");
    return;
  }
  if (bgImage == null || ! bgImage.complete()) {
    alert("Background image isn't uploaded");
    return;
  }

  //check if the images have the same dimensions
  //if not suggest to crop them
  if (fgImage.getWidth() !== bgImage.getWidth() || fgImage.getHeight() !== bgImage.getHeight()) {
    if (fgImage.getWidth() > bgImage.getWidth()) {
      if (confirm("Do you want to scale foreground image width?")) {
        fgImage.setSize(bgImage.getWidth(), fgImage.getHeight());
      }
    } else {
      if (confirm("Do you want to scale background image width?")) {
        bgImage.setSize(fgImage.getWidth(), bgImage.getHeight());
      }
    }
    if (fgImage.getHeight() > bgImage.getHeight()) {
      if (confirm("Do you want to scale foreground image height?")) {
        fgImage.setSize(fgImage.getWidth(), bgImage.getHeight());
      }
    } else {
      if (confirm("Do you want to scale background image height?")) {
        bgImage.setSize(bgImage.getWidth(), fgImage.getHeight());
      }
    }
  }
  clearCanvases();

  var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());
  for (var pixel of fgImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen() > pixel.getRed() + pixel.getBlue()) {
      var bgPixel = bgImage.getPixel(x, y);
      output.setPixel(x, y, bgPixel);
    }
    else {
      output.setPixel(x, y, pixel);
    }
  }
  output.drawTo(canvas1);
}

//to clean just nullify the size of the canvases
function clearCanvases() {
  canvas1.height = 0;
  canvas1.width = 0;
  canvas2.height = 0;
  canvas2.width = 0;
  //alert("cleared");
}
