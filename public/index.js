const createEditBtn = document.querySelector(".create-tasks");
const input = document.querySelector(".task-name");
const tasksDiv = document.querySelector(".tasks");

const baseBackendUrl = `${window.origin}/api`

let TASK_TO_EDIT = null;

createEditBtn.addEventListener("click", async function () {
    console.log("CREAR TAREAS");
    const creating = !TASK_TO_EDIT;
    const path = creating ? "tasks" : `tasks/${TASK_TO_EDIT._id}`
    const method = creating ? "POST" : "PUT"
    const res = await fetch(`${baseBackendUrl}/${path}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({text: input.value})
    })
    getTasks()
    input.value = ""
    createEditBtn.innerText = "Crear Tarea"
    const resJSON = await res.json()

    console.log({resJSON})
})

async function getTasks() {
    tasksDiv.innerHTML = null
    const res = await fetch(`${baseBackendUrl}/tasks`)
    const resJSON = await res.json()
    const tasks = resJSON.data
    for (const task of tasks) {
        const taskPharagraph = document.createElement("p")
        const deleteTaskIcon = document.createElement("i")
        const taskContainerDiv = document.createElement("div")
        deleteTaskIcon.classList.add("fa-solid", "fa-trash-can")
        taskPharagraph.innerText = task.name
        deleteTaskIcon.setAttribute("id", task._id)
        deleteTaskIcon.addEventListener("click", (e) => {
                const taskId = e.target.id
                fetch(`${baseBackendUrl}/tasks/${taskId}`, {
                    method: "DELETE"
                })
                .then(() => {
                    const taskDiv = deleteTaskIcon.parentElement
                    taskDiv.remove()
                })
        })
        taskPharagraph.addEventListener("click", (e) => {
            input.value = task.name
            createEditBtn.innerText = "Editar Tarea"
            TASK_TO_EDIT = task
        })
        taskContainerDiv.appendChild(taskPharagraph)
        taskContainerDiv.appendChild(deleteTaskIcon)
        tasksDiv.appendChild(taskContainerDiv)
    }
}

getTasks()