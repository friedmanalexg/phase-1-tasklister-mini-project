class Task {
  constructor(completetask) {
    this.completetask = completetask;
  }

  render() {
    return `
      <li>
        ${this.completetask}
        <button data-description="${this.completetask}">✅</button>
      </li>
      `;
  }
}

class TaskList {
  constructor() {
    this.tasks = [];
  }

  createNewTask(completetask) {
    const newTask = new Task(completetask);
    this.tasks.push(newTask);
  }
//this populates the list with user input
  renderTasks() {
    return this.tasks.map((task) => task.render()).join("");
  }

  deleteTask(completetask) {
    this.tasks = this.tasks.filter((task) => task.completetask !== completetask);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  //first initiallize a taskList class
  const taskList = new TaskList();
  //might need to grab DOM elements here for a gotcha
  //placeholder for grabbing DOM elements

  //here is the form
  const newTaskForm = document.getElementById("create-task-form");
  //input fields follow
  const newTaskDescription = document.getElementById("new-task-description");
  const newTaskPriority = document.getElementById("new-task-priority");
  //here's where new tasks will go on the DOM
  const taskUl = document.getElementById("tasks");
  const renderApp = () => (taskUl.innerHTML = taskList.renderTasks());

  //event listeners for the form
  newTaskForm.addEventListener("submit", (submittask) => {
    submittask.preventDefault();
    taskList.createNewTask(newTaskDescription.value + newTaskPriority.value);
    // reset form
    submittask.target.reset();
    renderApp();
  });
  //this old boy checks off your task and deletes it
  taskUl.addEventListener("click", (checkoff) => {
    if (checkoff.target.nodeName === "BUTTON") {
      taskList.deleteTask(checkoff.target.dataset.description);
      renderApp();
    }
  });   
});