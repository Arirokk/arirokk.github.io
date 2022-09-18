var initialImage;
var grayImage;
var canvas1;
var canvas2;

//upload an image, create a canvas and draw the image on it
function upload() {
  //check if canvas1 already exists to not to add one more
  if (canvas1 == null) {
    canvas1 = document.createElement("canvas");
    var toStick = document.getElementById("canvasHere");
    toStick.appendChild(canvas1);
  }
  //get an image from the input
  var uploadedImage = document.getElementById("uploadImage");
  //use the duke university library
  initialImage = new SimpleImage(uploadedImage);
  //to show both initial and modified later
  grayImage = initialImage;
  //add the new canvas to certain place
  initialImage.drawTo(canvas1);
  //clear previous gray image
  canvas2.height = 0;
  canvas2.width = 0;
}
function makeGray() {
  //check canvas2 existance to not add one more
  if (canvas2 == null) {
    canvas2 = document.createElement("canvas");
    var toStick = document.getElementById("canvasHere");
    toStick.appendChild(canvas2);
  }
  //use the duke univercity library to get every pixel of the image
  //and turn it into grayscale
  for (var pixel of grayImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  grayImage.drawTo(canvas2);
}
