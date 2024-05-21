const mongoose = require('mongoose')

const dbConnect = () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Base de datos conectada")
        })
        .catch((err) => {
            console.log('Hubo un error para conectar BBDD', {err})
        })
}

module.exports = dbConnect