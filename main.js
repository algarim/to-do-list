let form = document.getElementById('add-new-task');
let inputAddTask = document.getElementById('new-task-input');

let toDoList = document.getElementById('to-do-list');
toDoList.innerHTML = localStorage.getItem('toDoList') || "";

// Variable that tracks number of button presses in order to index each task
let buttonPresses = localStorage.getItem('buttonPresses') || 0;

// Array that save indexes of tasks
let taskIndexes = JSON.parse( localStorage.getItem('taskIndexes') ) || [];

// Function that creates events for Complete Task and Delete Task buttons, given an index
function createTaskButtons (i) {
    let task = document.getElementById('task-' + i);
    let taskText = document.getElementById('task-text-' + i);

    // Complete Task
    let completeButton = document.getElementById("complete-task-" + i);
    completeButton.addEventListener('click', () => {
        taskText.style.color = 'gray';
        taskText.style.textDecoration = 'line-through';

        localStorage.setItem('toDoList', toDoList.innerHTML);
    });

    // Delete Task
    let deleteButton = document.getElementById("delete-task-" + i);
    deleteButton.addEventListener('click', () => {
        task.remove();

        localStorage.setItem('toDoList', toDoList.innerHTML);
    });
};


// Create buttons of already existing tasks
for (const i of taskIndexes) {
    createTaskButtons(i);
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    buttonPresses++;
    localStorage.setItem('buttonPresses', buttonPresses);

    taskIndexes.push(buttonPresses);
    localStorage.setItem('taskIndexes', JSON.stringify(taskIndexes) );

    let newTask = document.createElement('div');
    newTask.className = 'task';
    newTask.id = "task-" + buttonPresses;
    newTask.innerHTML = `
    <span id="task-text-${buttonPresses}">${inputAddTask.value}</span>
    <button id="complete-task-${buttonPresses}">Completada</button>
    <button id="delete-task-${buttonPresses}">Borrar de la lista</button>
    `;

    toDoList.append(newTask);
    localStorage.setItem('toDoList', toDoList.innerHTML);

    createTaskButtons(buttonPresses);
    inputAddTask.value = "";

})