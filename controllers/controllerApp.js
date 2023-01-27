const { registrarUsuario, checkToken, checkUser} = require("../model/modelApp")
const jwt = require("jsonwebtoken")

const nuevoUsuario = async (req, res) => {
    try {
        const usuario = req.body
        await registrarUsuario(usuario)
        res.send("Usuario registrado con éxito.")
    } catch (error) {
        res.status(500).send(error)
    }
}

const mostrarUsuarios = async (req,res) => {
    try {
        const Authorization = req.header("Authorization")
        const token = Authorization.split("Bearer ")[1]
        jwt.verify(token, "az_AZ")
        const { email } = jwt.decode(token)
        // const {email} = req.body
        const data = await checkToken(email)
        res.send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        await checkUser(email, password)
        const token = jwt.sign({email}, "az_AZ")
        res.send(token)
        
    } catch (error) {
        res.status(500).send(error)
    }
}
module.exports = {nuevoUsuario, mostrarUsuarios, login};