let form = document.getElementById('add-new-task');
let inputAddTask = document.getElementById('new-task-input');

let toDoList = document.getElementById('to-do-list');
toDoList.innerHTML = localStorage.getItem('toDoList') || "";

// Variable that tracks number of button presses in order to index each task
let buttonPresses = localStorage.getItem('buttonPresses') || 0;

// Array that save indexes of tasks
let taskIndexes = JSON.parse(localStorage.getItem('taskIndexes')) || [];

// Function that creates events for Complete Task and Delete Task buttons, given an index
function makeTaskButtons(i) {
    let task = document.getElementById('task-' + i);
    let taskText = document.getElementById('task-text-' + i);

    // Complete Task
    let completeButton = document.getElementById("complete-task-" + i);
    completeButton.addEventListener('click', () => {
        if (taskText.style.color !== 'gray') {
        taskText.style.color = 'gray';
        taskText.style.textDecoration = 'line-through';
        } else {
            taskText.style.color = 'black';
            taskText.style.textDecoration = 'none';
        }

        localStorage.setItem('toDoList', toDoList.innerHTML);
    });

    // Delete Task
    let deleteButton = document.getElementById("delete-task-" + i);
    deleteButton.addEventListener('click', () => {

        task.remove();
        localStorage.setItem('toDoList', toDoList.innerHTML);

        let taskIndex = taskIndexes.indexOf(i);
        if (taskIndex > -1) {
            taskIndexes.splice(taskIndex, 1)
        }

        localStorage.setItem('taskIndexes', JSON.stringify(taskIndexes));

    });
};


// Create buttons of already existing tasks
for (const i of taskIndexes) {
    makeTaskButtons(i);
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inputAddTask.value.trim() !== "") {

        buttonPresses++;
        localStorage.setItem('buttonPresses', buttonPresses);

        taskIndexes.push(buttonPresses);
        localStorage.setItem('taskIndexes', JSON.stringify(taskIndexes));

        let newTask = document.createElement('li');
        newTask.className = 'task';
        newTask.id = "task-" + buttonPresses;
        newTask.innerHTML = `
    <span class="task-text" id="task-text-${buttonPresses}">${inputAddTask.value}</span>
    <button class="complete-task" id="complete-task-${buttonPresses}">Completada</button>
    <button class="delete-task" id="delete-task-${buttonPresses}">Borrar</button>
    `;

        toDoList.append(newTask);
        localStorage.setItem('toDoList', toDoList.innerHTML);

        makeTaskButtons(buttonPresses);
        inputAddTask.value = "";

    }

})


// Implement button to delete all tasks

let deleteAllTasksButton = document.getElementById('delete-all-tasks');

deleteAllTasksButton.addEventListener('click', () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción es irreversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar todas las tareas',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                '¡Listo!',
                'Todas las tareas fueron eliminadas.',
                'success'
            )

            toDoList.innerHTML = '';
            buttonPresses = 0;

            localStorage.clear();
        }
    })

})