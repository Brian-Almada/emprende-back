const getBtn = document.querySelector(".get-tasks");
const createBtn = document.querySelector(".create-tasks");
const input = document.querySelector(".task-name");

getBtn.addEventListener("click", function () {
    console.log("GET TAREAS");
    fetch("http://localhost:4000/api/tasks")
});

createBtn.addEventListener("click", function () {
    console.log("CREAR TAREAS");
})