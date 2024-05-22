require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const dbConnect = require('./db/connect')
const transporter = require('./helpers/mailer')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const taskRoutes = require('./routes/task')
const authRoutes = require('./routes/auth')

dbConnect()

//Middlewares
app.use(express.static('public', { extensions: ['html', 'css', 'js'] }))
app.use(express.json())
app.use(cookieParser())

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

//Routes
app.use('/api/tasks', taskRoutes)
app.use('/api/auth', authRoutes)

app.listen(port, () => {
    console.log(`App listening on:${port}`)
})