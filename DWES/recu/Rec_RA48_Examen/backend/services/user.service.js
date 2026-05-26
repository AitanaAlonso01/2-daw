const userModel = require("../models/user.model")
const { compareLogin, hashPassword } = require("../utils/bcrypt")

//Función creada para validar la contraseña (mayúsculas, minúsculas, 8 caracteres...)
const validatePasswordPolicy = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    return passwordRegex.test(password)
}

//Devolver todos los comentarios
exports.getAll = async () => await userModel.find()
//Get User By Id
exports.getById = async (id) => await userModel.findById(id)

//Crear un nuevo usuario
//TO DO 1 Register (Validando y encriptando contraseña)
exports.register = async(usernameParam, passwordParam) => {
    //Antes de crear, validamos la contraseña con la función de arriba, llamada "validatePasswordPolicy"
    if(validatePasswordPolicy(passwordParam)){
        //Se ha validado la contraseña, debemos codificarla con la función hashPassword (del archivo bycrpt.js)
        const passwordCodificada = await hashPassword(passwordParam)
        //Componemos el objeto de usuario para poder crear el modelo en MongoDB
        const datos = {
            username:usernameParam,
            password:passwordCodificada
        }
        const nuevoUsuario = new userModel(datos) //objeto creado
        return await nuevoUsuario.save() //usuario GUARDADO en MongoDB
    } else {
        return {err:"Formato de contraseña no válido (mayúsculas, minúsculas y 8 caracteres)"} //En caso de que falle la validación de contraseña devolvemos un error indicando que NO se ha creado el usuario por problemas de validación
    }
}

//TO DO 2 Login (Guardando usuario en cookie / sessión)
exports.login = async(usernameParam, passwordParam) => {
    const userFound = await userModel.findOne({username:usernameParam})

    if(userFound){
        //Compara con bcrypt
        const validado = await compareLogin(passwordParam,userFound.password)

        if(validado){
            return userFound
        }else{
            return null
        }
        
    } else {
        //NO hay datos de ese usuario
        return null
    }
}