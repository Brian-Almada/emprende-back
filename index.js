require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const transporter = require('./helpers/mailer')

mongoose
.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Base de datos conectada")
})
.catch((err) => {
    console.log('Hubo un error para conectar BBDD', {err})
})

const taskSchema = new Schema({
    name: String,
    done: Boolean
})
const userSchema = new Schema({
    firstname: String,
    lastname: Boolean,
    email: String,
    login_code: String
})

const Task = mongoose.model('Task', taskSchema, "Tasks")
const User = mongoose.model('User',userSchema, "Users")

app.use(express.static('public', { extensions: ['html', 'css', 'js'] }))
app.use(express.json())

app.use((req, res, next) => {
    console.log("No especificamos inicio de ruta")
    console.log("middleware1")
    next()
})

app.get('/api/tasks', (req, res) => {
    Task.find().then((tasks) => {
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
})

app.post("/api/tasks", (req, res) => {
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
})
app.delete("/api/tasks/:id", (req, res) => {
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
})
app.put("/api/tasks/:id", (req, res) => {
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
})

app.post("/api/auth/login/:email/code", async function (req, res) {
    const { email } = req.params

    const user = await User.findOne({ email })

    if(!user) {
        return res
        .status(400)
        .json({ ok: false, message: "No existe un correo con ese usuario" })
    }

    let code = ""
    for (let index = 0; index <= 5; index++) {
    let character = Math.floor(Math.random() * 9)
    code += character
    }

    const login_code = code
    await user.save()

    const result = await transporter.sendMail({
        from: `Brian Almada ${process.env.EMAIL}`,
        to: email,
        subjet: "Código de inicio de sesión: " + code,
        body: "Este es tu código para iniciar sesión: ",
    })
    console.log({ result })
    res.status(200).json({ ok: true, message: "Código enviado con éxito!" })
})
app.post("/api/auth/login/:email", async function (req, res) {
    const { email } = req.params
    const { code } = req.body

    const user = await User.findOne({ email, login_code: code })

    if(!user) {
        return res
        .status(400)
        .json({ ok: false, message: "Credenciales Inválidas" })
    }

    res.status(200).json({ ok: true, message: "Inicio de sesión exitoso" })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})