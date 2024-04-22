const http = require('http')

function requestController() {
    console.log('request recibida')
}

server = http.createServer(requestController)

server.listen(4000)