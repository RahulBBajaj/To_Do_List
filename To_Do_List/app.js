document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    var tasks = getTasks();
    tasks.push(taskText);
    saveTasks(tasks);

    taskInput.value = '';
    loadTasks();
}

function deleteTask(index) {
    var tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
}

function loadTasks() {
    var tasks = getTasks();
    var taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    for (var i = 0; i < tasks.length; i++) {
        var taskItem = document.createElement('div');
        taskItem.classList.add('task');

        var taskText = document.createElement('span');
        taskText.textContent = tasks[i];

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = (function (index) {
            return function () {
                deleteTask(index);
            };
        })(i);

        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    }
}

function getTasks() {
    var tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
