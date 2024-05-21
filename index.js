require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT
const dbConnect = require('./db/connect')
const Schema = mongoose.Schema
const transporter = require('./helpers/mailer')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

dbConnect()


const taskSchema = new Schema({
    name: String,
    done: Boolean
})
const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    login_code: String
})

const Task = mongoose.model('Task', taskSchema, "Tasks")
const User = mongoose.model('User',userSchema, "Users")

//Middlewares
app.use(express.static('public', { extensions: ['html', 'css', 'js'] }))
app.use(express.json())
app.use(cookieParser())


app.post("/api/auth/login/:email/code", async function (req, res) {
    const { email } = req.params


    console.log({email})
    const user = await User.findOne({ email })
    console.log({user})

    if(!user) {
        /*await User.create({email, firstname: "Brian", lastname: "Almada"})*/
        return res
        .status(400)
        .json({ ok: false, message: "No existe un correo con ese usuario" })
    }

    let code = ""
    for (let index = 0; index <= 5; index++) {
    let character = Math.floor(Math.random() * 9)
    code += character
    }

    console.log({code})

    user.login_code = code
    console.log({user})
    await user.save()

    const result = await transporter.sendMail({
        from: `Brian Almada ${process.env.EMAIL}`,
        to: email,
        subject: "Código de inicio de sesión: " + code,
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

    const tokenPayload = {
        _id: user._id,
        firstname: user.firstname,
        email: user.email
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY)
    console.log({token})
    res.cookie("jwt", token)

    res
    .status(200)
    .json({
        ok: true,
        data: tokenPayload,
        message: "Inicio de sesión exitoso"
    })
})


const jwtValidation =  (req, res, next) => {
    try {
    const token = req.cookies.jwt
    const validPayload = jwt.verify(token, process.env.JWT_SECRET_KEY)
    console.log(validPayload)
    next()
} catch (error) {
    res
    .status(401)
    .json({
        ok: false,
        message: 'TOKEN inválido'
    })
}
}
app.use(jwtValidation)

//Configurar RUTAS
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

app.listen(port, () => {
    console.log(`App listening on:${port}`)
})