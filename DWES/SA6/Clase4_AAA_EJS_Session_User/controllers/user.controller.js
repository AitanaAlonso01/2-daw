const userService = require("../services/user.service")
const { wrapAsync } = require("../utils/functions")
const AppError = require("../utils/AppError")

exports.showLogin = (req,res) => {
    res.render("user/login")
}

exports.showRegister = (req,res) => {
    res.render("user/register")
}

exports.getAllUsers = wrapAsync(async (req,res,next) => {    
    let users = await userService.getAll()
    
    if(users.length > 0){
        res.status(200).json(users)
    }else{
        next(new AppError("Sin usuarios",404))
    }      
})


exports.registerUser = wrapAsync(async (req,res,next) => {    
    const usuarioCreado = await userService.create(req.body)
    if(usuarioCreado){
        //res.status(200).json(usuarioCreado)
        //GUARDAR LO MÍNIMO EN SESIÓN
        req.session.user = {
            id: usuarioCreado._id,
            username: usuarioCreado.username,
            role: usuarioCreado.profile
        }        
        res.redirect(res.locals.baseUrlUsers)
    } else {        
        next(new AppError("Error al registrar el usuario",400)) //BAD REQUEST
    }    
})

exports.loginUser = wrapAsync(async (req,res,next) => {
    const { username, password } = req.body
    const userLogued = await userService.login(username,password)
    if(userLogued){
        //GUARDAR LO MÍNIMO EN SESIÓN
        req.session.user = {
            id: userLogued._id,
            username: userLogued.username,
            role: userLogued.profile
        }
        //res.status(200).json(userLogued)
        res.redirect(res.locals.baseUrlUsers)
    }else{
        next(new AppError("Usuario y/o contraseña incorrectos",401))
    }
})

//Logout
exports.logout = (req,res) => {
    req.session.destroy(()=>{
        res.redirect(res.locals.baseUrlUsers + "/login")
    })
}