const { Task } = require("../models/task")

const getAll = (req, res) => {
    Task.find()
        .then((tasks) => {
            res
            .status(200)
            .json({
                ok: true,
                data:tasks
            })
        })
        .catch((err) => {
            res
            .status(400)
            .json({
                ok: true,
                message: 'Error al obtener tareas'
            })
        })
}

const create = (req, res) => {
    const body = req.body
    console.log({ body })
    Task.create({
        name: body.text,
        done: false
    })
    .then((createdTask) => {
        res
        .status(201)
        .json({
            ok: true,
            message: "tarea creada con exito",
            data: createdTask
        })
    })
    .catch((err) => {
        res
        .status(400)
        .json({
            ok: false,
            message: 'Error al crear tarea'
        })
    })
}

const update = (req, res) => {
    const body = req.body
    const id = req.params.id
    Task.findByIdAndUpdate(id,{
        name: body.text
    })
    .then((updatedTask) => {
        res
        .status(200)
        .json({
            ok: true,
            message: "tarea editada con exito",
            data: updatedTask
        })
    })
    .catch((err) => {
        res
        .status(400)
        .json({
            ok: false,
            message: 'Error al editar tarea'
        })
    })
}

const remove = (req, res) => {
    const id = req.params.id
    Task.findOneAndDelete({ _id: id })
    .then((deletedTask) => {
        res
        .status(200)
        .json({
            ok: true,
            data: deletedTask
        })
    })
    .catch((err) => {
        res
        .status(400)
        .json({
            ok: false,
            message: 'Error al borrar tarea'
        })
    })
}

module.exports = {
    getAll,
    create,
    update,
    remove
}