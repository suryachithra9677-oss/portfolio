const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearCompleted = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "active") return !task.completed;
        if (currentFilter === "completed") return task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {

        const li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="task-buttons">

                <button class="complete">
                    ✔
                </button>

                <button class="edit">
                    ✏
                </button>

                <button class="delete">
                    🗑
                </button>

            </div>
        `;

        li.querySelector(".complete").onclick = () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        };

        li.querySelector(".edit").onclick = () => {

            let updated = prompt("Edit Task", task.text);

            if(updated !== null && updated.trim() !== ""){
                task.text = updated;
                saveTasks();
                renderTasks();
            }

        };

        li.querySelector(".delete").onclick = () => {

            tasks = tasks.filter(t => t !== task);

            saveTasks();
            renderTasks();

        };

        taskList.appendChild(li);

    });

}

addBtn.onclick = () => {

    const text = taskInput.value.trim();

    if(text === "") return;

    tasks.push({
        text:text,
        completed:false
    });

    taskInput.value = "";

    saveTasks();

    renderTasks();

};

clearCompleted.onclick = () => {

    tasks = tasks.filter(task => !task.completed);

    saveTasks();

    renderTasks();

};

filterButtons.forEach(btn=>{

    btn.onclick = ()=>{

        filterButtons.forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        currentFilter = btn.dataset.filter;

        renderTasks();

    };

});

renderTasks();