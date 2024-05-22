require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const dbConnect = require('./db/connect')
const cookieParser = require('cookie-parser')
const taskRoutes = require('./routes/task')
const authRoutes = require('./routes/auth')
const { jwtValidation } = require('./middlewares/jwtValidation')

dbConnect()

//Middlewares
app.use(express.static('public', { extensions: ['html', 'css', 'js'] }))
app.use(express.json())
app.use(cookieParser())

//Routes
app.use('/api/tasks', taskRoutes)
app.use(jwtValidation)

app.use('/api/auth', authRoutes)

app.listen(port, () => {
    console.log(`App listening on:${port}`)
})