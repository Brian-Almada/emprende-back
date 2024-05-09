const createBtn = document.querySelector(".create-tasks");
const input = document.querySelector(".task-name");
const tasksContainer = document.querySelector(".tasks");
const baseBackendUrl = "http://localhost:4000/api"

createBtn.addEventListener("click", function () {
    console.log("CREAR TAREAS");
    console.log({ input })
    fetch(`${baseBackendUrl}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({text: input.value})
    })
    .then((res) => {
        console.log({res})
        return res.json()
    })
    .then((resJSON) => {
        console.log(resJSON)
    })
})

function getTasks() {
    fetch(`${baseBackendUrl}/tasks`)
    .then((res) => {
        return res.json()
    })
    .then((resJSON) => {
        const tasks = resJSON.data

        for (const task of tasks) {
            const taskPharagraph = document.createElement("p")
            taskPharagraph.innerText = task.name
            taskPharagraph.setAttribute("id", task._id)
            tasksContainer.appendChild(taskPharagraph)
        }
    })
}

getTasks()