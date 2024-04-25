require('dotenv').config()
const http = require('http')
const fs = require('fs')

function requestController(req, res) {
    const url = req.url
    const method = req.method
    console.log({ url, method })

    if (method === 'GET' && url === "/") {
        res.setHeader("content-type", "text/html")
        fs.readFile('./public/index.html', function (err, file) {
            if (err) {
                console.log('HUBO UN ERROR')
            }
            res.write(file)
            res.end()
        })
        return
    }

    if (method === 'GET' && url === "/about") {
        res.setHeader("content-type", "text/html")
        fs.readFile('./public/about.html', function (err, file) {
            if (err) {
                console.log('HUBO UN ERROR')
            }
            res.write(file)
            res.end()
        })
        return
    }

    res.setHeader("content-type", "text/html; charset=utf-8")
    res.write("<h1>404</h1>")
    res.end()
}
server = http.createServer(requestController)

const PORT = process.env.PORT

server.listen(PORT, function (){
    console.log("Aplicación corriendo en el puerto: " + PORT)
})