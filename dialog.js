// Add task button and dialog
const addTaskButton = document.getElementById("addTaskButton");
const taskFormDialog = document.getElementById("taskFormDialog");

// Task form fields
const taskForm = document.getElementById("taskForm");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const assigneeInput = document.getElementById("assignee");

// Task list container
const taskList = document.getElementById("taskList");

// Array to store tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to display tasks in the task list
function displayTasks() {
  taskList.innerHTML = ""; // Clear existing task list
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.innerHTML = `
      <p><strong>Title:</strong> ${task.title}</p>
      <p><strong>Description:</strong> ${task.description}</p>
      <p><strong>Assignee:</strong> ${task.assignee}</p>
      <button onclick="markAsCompleted(${index})">Mark Completed</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(taskItem);
  });
}


function addTask(event) {
  event.preventDefault();
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const assignee = assigneeInput.value.trim();
  if (!title || !description || !assignee) {
    alert("Please fill in all fields.");
    return;
  }
  if (!title.match(/^[a-zA-Z0-9\s]+$/)) {
    alert("Title should only contain alphanumeric characters.");
    return;
  }
  if (title.length > 50) {
    alert("Title should not be longer than 50 characters.");
    return;
  }
  if (description.length > 250) {
    alert("Description should not be longer than 250 characters.");
    return;
  }

  const newTask = { title, description, assignee, completed: false };
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
  taskForm.reset();
  taskFormDialog.close();
}

function markAsCompleted(index) {
  tasks[index].completed = true;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}


function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}


addTaskButton.addEventListener("click", () => taskFormDialog.showModal());
taskForm.addEventListener("submit", addTask);
document.getElementById("cancelButton").addEventListener("click", () => taskFormDialog.close());


displayTasks();