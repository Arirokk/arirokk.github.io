function addTask() {

  //read what we wrote in text input
  var input = document.getElementById("input");
  var newTask = input.value;
  //if there is something, crete a new list in line
  if (newTask != "") {
    var item = document.createElement("li");
    item.innerHTML = '<input type="button" class="done" onclick="markDone(this.parentNode)" value="&#x2713;" /> '
      +
    '<input type="button" class="remove" onclick="remove(this.parentNode)" value="&#x2715;" /> '
      +
     '<input type="button" class="important" onclick="importantMark(this.parentNode)" value="!" />'
      +
    newTask;

    //add new list to priveous list
    document.getElementById("tasks").appendChild(item);
    //change placeholder
    input.value = "";
    input.placeholder="enter next task..."
  }
}

function markDone(item) {
    item.className = 'finished';
}

function remove (item) {
  if (item.className == 'finished') {
    item.remove();
  } else if (confirm("The task has not been completed. Cancel?")) {
    item.remove()
  }
}

function doAbout() {
  var author = document.getElementById("divabout");
  author.innerHTML = "Hello I'm Artur!";
  //add the best background
  author.className = "yellowbackground";
}

function clearAbout() {
  var author = document.getElementById("divabout");
  author.innerHTML = "";
  author.className = "";
}

function importantMark(item) {
  item.className = "important";
}
