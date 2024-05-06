require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

app.use(express.static('public'))

app.use((req, res, next) => {
    console.log("No especificamos inicio de ruta")
    console.log("middleware1")
    next()
})

app.get('/api/tasks', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})