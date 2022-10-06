var initImage;
var greyImage;
var redImage;
var blurImage;
var rainbImage;
var mirrImage;
var canvas1;
var size = document.getElementById("imageSize");

//this function is for making blur
function ensureInImage(coord, size) {
    //returns acceptable coordinate
    if (coord < 0) {
        return 0;
    }
    if (coord >= size) {
        return size-1;
    }
    else {
        return coord;
    }
}

//this function is for making blur too
function getNearbyPixel(x,y) {
    //returns a nearby pixel
    var radius = 10;
    var dx = Math.random()*2*radius - radius;
    var dy = Math.random()*2*radius - radius;
    var newX = ensureInImage(x+dx, blurImage.getWidth());
    var newY = ensureInImage(y+dx, blurImage.getHeight());
    var newPix = blurImage.getPixel(newX,newY);
    return newPix;
}

//if there is no canvas create it, upload an image and draw on canvas
function uploadImage() {
  if (canvas1 == null) {
    canvas1 = document.createElement("canvas");
    var toStick = document.getElementById("forCanvas");
    toStick.appendChild(canvas1);
  }
  size.innerHTML = "";
  var uploadedImage = document.getElementById("fileInput");
  initImage = new SimpleImage(uploadedImage);
  greyImage = new SimpleImage(uploadedImage);
  redImage = new SimpleImage(uploadedImage);
  blurImage = new SimpleImage(uploadedImage);
  rainbImage = new SimpleImage(uploadedImage);
  mirrImage = new SimpleImage(uploadedImage);
  initImage.drawTo(canvas1);
}

function doGrey() {
  if(imageIsLoaded(greyImage)) {
    makeGrey();
    greyImage.drawTo(canvas1);
  }
}

function makeGrey() {
  for (var pixel of greyImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
}

function doRed() {
  if(imageIsLoaded(redImage)) {
    makeRed();
  redImage.drawTo(canvas1);
  }
}

function makeRed() {
  for (var pixel of redImage.values()) {
    pixel.setRed(255);
  }
}

function doBlur() {
  if(imageIsLoaded(blurImage)) {
    makeBlur();
    blurImage.drawTo(canvas1);
  }
}

function makeBlur() {
  for (var pixel of blurImage.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        if (Math.random() < 0.5) {
            //change pixel
            var newPixel = getNearbyPixel(x,y);
            blurImage.setPixel(x,y,newPixel);
        }
    }
}

function doRainb() {
  if(imageIsLoaded(rainbImage)) {
    makeRainb();
    rainbImage.drawTo(canvas1);
  }
}

//devide the image into 7 parts and change each of them
function makeRainb() {
  var height = rainbImage.getHeight();
  for (var pixel of rainbImage.values()) {
    var y = pixel.getY();
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (y < height / 7) {
      //red
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 2 / 7) {
      //orange
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(1.2*avg-51);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 3 / 7) {
      //yellow
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 4 / 7) {
      //green
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 5 / 7) {
      //blue
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else if (y < height * 6 / 7) {
      //indigo
      if (avg < 128) {
        pixel.setRed(.8*avg);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(1.2*avg-51);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else {
      //violet
      if (avg < 128) {
        pixel.setRed(1.6*avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avg);
      } else {
        pixel.setRed(0.4*avg+153);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(0.4*avg+153);
      }
    }
  }
}

function doMirr() {
  if(imageIsLoaded(mirrImage)) {
    makeMirr();
    mirrImage.drawTo(canvas1);
  }
}

function makeMirr() {
  var newImage = new SimpleImage(mirrImage.getWidth(), mirrImage.getHeight());
  for (var pixel of mirrImage.values()) {
    var x = initImage.getWidth() - pixel.getX() -1;
    var y = pixel.getY();
    newImage.setPixel(x, y, pixel)
    mirrImage = newImage;
  }
}

//put the initial image into canvas and reset global variables
function resetCanvas() {
  if(imageIsLoaded(initImage)) {
    initImage.drawTo(canvas1);
    greyImage = new SimpleImage(initImage);
    redImage = new SimpleImage(initImage);
    blurImage = new SimpleImage(initImage);
    rainbImage = new SimpleImage(initImage);
    mirrImage = new SimpleImage(initImage);
  }
}

//check is the image here and loaded complitely
function imageIsLoaded(img) {
  if (img == null || !img.complete()) {
    alert("There is no image");
    return false;
  } else {
    return true;
  }
}

//the only way to show the image size
function showSize() {
  size.innerHTML = initImage.getWidth() + " x " + initImage.getHeight();
}
