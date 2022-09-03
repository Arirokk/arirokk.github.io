//strengh counter
var x = 0;

//single access to canvas
var canvas = document.getElementById("gameWindow");
var ctx = canvas.getContext("2d");

function startGame() {

  //delete title
  document.getElementById("beginning").remove();

  //change button name and use
  var startButton = document.getElementById("startButton");
  startButton.value = "Start Another Game";
  startButton.setAttribute("onclick", "nullScore()");

  //to see game field
  canvas.style.backgroundColor = "#ADADAD";

  //show text
  ctx.fillStyle = "black";
  ctx.font = "25px Arial";
  ctx.fillText("Your stregth is " + x, 10, 30);

  //create a new button for training
  var trainButton = document.createElement("input");
  trainButton.setAttribute("type", "button");
  trainButton.setAttribute("value", "Let's train hard!");
  trainButton.setAttribute("onclick", "train()");
  trainButton.setAttribute("id", "trainButton");
  document.getElementById("forTrainButton").appendChild(trainButton);

  //create a new button for trying to compete
  var competeButton = document.createElement("input");
  competeButton.setAttribute("type", "button");
  competeButton.setAttribute("value", "Take part in a competition");
  competeButton.setAttribute("onclick", "compete()");
  competeButton.setAttribute("id", "competeButton");
  document.getElementById("forCompeteButton").appendChild(competeButton);

}

//zeroing score, show buttons again
function nullScore() {
  x = 0;
  ctx.fillStyle = "#ADADAD";
  ctx.fillRect(0, 0, 300, 45);
  ctx.fillStyle = "black";
  ctx.fillText("Your stregth is " + x, 10, 30);
  document.getElementById("trainButton").style.visibility = "visible";
  document.getElementById("competeButton").style.visibility = "visible";

}

//start count, show score
function train() {
  x = x + 1;
  ctx.fillStyle = "#ADADAD";
  ctx.fillRect(0, 0, 300, 45);
  ctx.fillStyle = "black";
  ctx.fillText("Your stregth is " + x, 10, 30);

  //condition for overtraining
  if (x > 10) {
    ctx.fillStyle = "#ADADAD";
    ctx.fillRect(0, 0, 300, 45);
    ctx.fillStyle = "black";
    ctx.fillText("Wow, you got torn apart", 10, 30);
    document.getElementById("trainButton").style.visibility = "hidden";
    document.getElementById("competeButton").style.visibility = "hidden";
  }
}

//compete
function compete() {
  if (x >= 8) {

    //if won
    ctx.fillStyle = "#ADADAD";
    ctx.fillRect(0, 0, 300, 45);
    ctx.fillStyle = "black";
    ctx.fillText("Yahoo! You won!", 10, 30);
    document.getElementById("trainButton").style.visibility = "hidden";
    document.getElementById("competeButton").style.visibility = "hidden";
  } else {
    
    //if didn't win
    ctx.fillStyle = "#ADADAD";
    ctx.fillRect(0, 0, 300, 45);
    ctx.fillStyle = "black";
    ctx.fillText("You should train more...", 10, 30);
  }
}
