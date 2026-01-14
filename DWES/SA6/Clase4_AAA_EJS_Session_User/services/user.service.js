const userModel = require("../models/user.model")
const bcrypt = require("../utils/bcrypt")

//Devolver todos los comentarios
exports.getAll = async () => await userModel.find()

//Crear un nuevo usuario
exports.create = async(datos) => {     
    datos.password = await bcrypt.hashPassword(datos.password)
    const newUser = new userModel(datos)    
    return await newUser.save()
}

//exports.getByUsername = async (usernameParam) => await userModel.findOne({username:usernameParam})

exports.login = async(usernameParam, passwordParam) => {    
    const userFound = await userModel.findOne({username:usernameParam})//await this.getByUsername(usernameParam)
    if(userFound){
        console.log(userFound)
        const validado = await bcrypt.compareLogin(passwordParam,userFound.password)
        if(validado){
            return userFound
        }else{
            return null
        }
    }else{
        return null
    }
}