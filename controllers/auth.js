const { transporter } = require("../helpers/mailer")
const { User } = require("../models/user")


const getCode = async function (req, res) {
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
}

const login = async function (req, res) {
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
}

module.exports = {
    getCode,
    login
}