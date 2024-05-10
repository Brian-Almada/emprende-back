const createEditBtn = document.querySelector(".create-tasks");
const input = document.querySelector(".task-name");
const tasksDiv = document.querySelector(".tasks");
const baseBackendUrl = "http://localhost:4000/api"

let TASK_TO_EDIT = null;

createEditBtn.addEventListener("click", function () {
    console.log("CREAR TAREAS");
    console.log({ input })
    fetch(`${baseBackendUrl}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({text: input.value})
    })
    .then((res) => {
        getTasks()
        input.value = ""
        return res.json()
    })
    .then((resJSON) => {
        console.log(resJSON)
    })
})

function getTasks() {
    tasksDiv.innerHTML = null
    fetch(`${baseBackendUrl}/tasks`)
    .then((res) => {
        return res.json()
    })
    .then((resJSON) => {
        const tasks = resJSON.data

        for (const task of tasks) {
            const taskPharagraph = document.createElement("p")
            const deleteTaskBtn = document.createElement("button")
            const taskContainerDiv = document.createElement("div")
            deleteTaskBtn.innerText = "BORRAR"
            taskPharagraph.innerText = task.name
            deleteTaskBtn.setAttribute("id", task._id)
            deleteTaskBtn.addEventListener("click", (e) => {
                const taskId = e.target.id
                fetch(`${baseBackendUrl}/tasks/${taskId}`, {
                    method: "DELETE"
                })
                .then(() => {
                    const taskDiv = deleteTaskBtn.parentElement
                    taskDiv.remove()
                })
            })
            taskPharagraph.addEventListener("click", (e) => {
                input.value = task.name
                createEditBtn.innerText = "Editar Tarea"
                TASK_TO_EDIT = task
            })
            taskContainerDiv.appendChild(taskPharagraph)
            taskContainerDiv.appendChild(deleteTaskBtn)
            tasksDiv.appendChild(taskContainerDiv)
        }
    })
}

getTasks()