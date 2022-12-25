let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// empty array to store the tasks
let arrayOfTasks = [];

//check if there ara tasks in local storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
// tigger get from local Storage func.
getDataFromLocalStorage();

// Add task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty Input Field
  }
};

// click on tasks element
tasksDiv.addEventListener("click", (e) => {
  //delete button
  if (e.target.classList.contains("del")) {
    // remove task from local storage
    deleteTasksWith(e.target.parentElement.getAttribute("data.id"));
    // remove element from page
    e.target.parentElement.remove();
  }
  // Task Element
  if (e.target.classList.contains("task")) {
    //toggle completed for the task
    toggleStatusTaskWith(e.target.getAttribute("data.id"));
    // Toggle Done class
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  //add tasks to page
  addElementsToPageForm(arrayOfTasks);
  // Add Tasks to local storage
  addDataToLocalStoageFrom(arrayOfTasks);
  // For Testing
  // console.log(arrayOfTasks);
  // console.log(JSON.stringify(arrayOfTasks));
}

function addElementsToPageForm(arrayOfTasks) {
  // empty the tasks div
  tasksDiv.innerHTML = "";
  // Looping on array of tasks
  arrayOfTasks.forEach((task) => {
    //Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check if task is done -- by defult task.complete == true
    if (task.completed === true) {
      div.className = "task done";
    }
    div.setAttribute("data.id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Create Delete Button
    //console.log(div);
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    // append button to main div
    div.appendChild(span);
    //console.log(div);
    //Add task Div to tasks container
    tasksDiv.appendChild(div);
  });
}
addDataToLocalStoageFrom = (arrayOfTasks) => {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
};
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    // console.log(tasks);
    addElementsToPageForm(tasks);
  }
}
function deleteTasksWith(taskId) {
  // for (let i = 0; i < arrayOfTasks.length; i++) {
  //   console.log(`${arrayOfTasks.filter((task) => task.id != taskId)}`);
  // }
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStoageFrom(arrayOfTasks);
}
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStoageFrom(arrayOfTasks);
}
