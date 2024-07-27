const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const prioritySelector = document.getElementById("priority-selector");
const dueDate = document.getElementById("due-date");
const searchBox = document.getElementById("search-box");
const filterSelector = document.getElementById("filter-selector");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");

        let taskContent = document.createElement("div");
        taskContent.className = "task-content";

        let taskText = document.createElement("div");
        taskText.className = "task-text";
        taskText.textContent = inputBox.value;
        taskContent.appendChild(taskText);

        let taskDetails = document.createElement("div");
        taskDetails.className = "task-details";

        let taskPriority = document.createElement("span");
        taskPriority.className = `priority ${prioritySelector.value}`;
        taskPriority.textContent = prioritySelector.value;
        taskDetails.appendChild(taskPriority);

        if (dueDate.value) {
            let taskDueDate = document.createElement("span");
            taskDueDate.className = "due-date";
            taskDueDate.textContent = `Due: ${dueDate.value}`;
            taskDetails.appendChild(taskDueDate);
        }

        taskContent.appendChild(taskDetails);
        li.appendChild(taskContent);

        let editButton = document.createElement("button");
        editButton.className = "edit-icon";
        editButton.innerHTML = "✎";
        editButton.onclick = () => editTask(li);
        li.appendChild(editButton);

        let deleteSpan = document.createElement("span");
        deleteSpan.className = "delete-icon";
        deleteSpan.innerHTML = "\u00d7";
        deleteSpan.onclick = () => deleteTask(li);
        li.appendChild(deleteSpan);

        listContainer.appendChild(li);
    }
    inputBox.value = '';
    prioritySelector.value = 'low';
    dueDate.value = '';
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    Array.from(listContainer.getElementsByTagName('li')).forEach(task => {
        task.querySelector('.delete-icon').onclick = () => deleteTask(task);
        task.querySelector('.edit-icon').onclick = () => editTask(task);
    });
}

function deleteTask(task) {
    task.remove();
    saveData();
}

function editTask(task) {
    let taskText = task.querySelector(".task-text");
    let newText = prompt("Edit your task:", taskText.textContent);
    if (newText !== null && newText !== '') {
        taskText.textContent = newText;
        saveData();
    }
}

function searchTasks() {
    let searchText = searchBox.value.toLowerCase();
    Array.from(listContainer.getElementsByTagName('li')).forEach(task => {
        let taskText = task.querySelector(".task-text").textContent.toLowerCase();
        if (taskText.includes(searchText)) {
            task.style.display = "";
        } else {
            task.style.display = "none";
        }
    });
}

function filterTasks() {
    let filterValue = filterSelector.value;
    Array.from(listContainer.getElementsByTagName('li')).forEach(task => {
        let taskPriority = task.querySelector(".priority").textContent;
        if (filterValue === 'all' || taskPriority === filterValue) {
            task.style.display = "";
        } else {
            task.style.display = "none";
        }
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.getElementById("dark-mode-toggle").classList.toggle("dark-mode");
}

showTask();
