const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Event listener to add tasks
addButton.addEventListener('click', addTask);

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = {
    id: new Date().toISOString(),
    text: taskText
  };

  // Add task to localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  taskInput.value = ''; // Clear the input field
  loadTasks(); // Reload the tasks
}

// Function to load tasks from localStorage and render them
function loadTasks() {
  taskList.innerHTML = ''; // Clear the current list

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="edit" onclick="editTask('${task.id}')">Edit</button>
      <button class="delete" onclick="deleteTask('${task.id}')">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Function to delete a task
function deleteTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  
  loadTasks(); // Reload the tasks
}

// Function to edit a task
function editTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = tasks.find(task => task.id === taskId);
  
  if (task) {
    taskInput.value = task.text;
    deleteTask(taskId); // Delete the task so it can be re-added with the edited text
  }
}
