const userService = require("../services/user.service")
//TO DO - 5 protección síncrona y asíncrona de errores
const AppError = require("../utils/AppError") //Control de errores síncrono
const jwt = require("jsonwebtoken") //usamos la librería para crear el token
const {wrapAsync} = require("../utils/functions") //Control de errores asíncrono

//Zustand
exports.getLoguedUser = (req,res,next) => {
    // authMiddleware ya validó la cookie y puso req.user
  if(!req.user) return res.status(401).json({ success: false, message: "No estás logueado" });

  res.json({
    success: true,
    user: req.user
  });

}

//Todas las funciones asíncronas las debemos "envolver" en la función wrapAsync, sin olvidarnos incluir el parámetro next
//exports.getAllUsers = async (req,res) => {    
exports.getAllUsers = wrapAsync(async (req,res,next) => {    
    let users = await userService.getAll()
    
    if(users.length > 0){
        res.status(200).json(users)
    }else{
        //res.status(401).json({msg:"Sin usuarios"})
        next(new AppError("Sin usuarios ", 401)) //Usamos AppError mejor para tratar los errores asíncronos, lanzando un error síncrono
    }     
})

//exports.getUserById = async(req,res) => {
exports.getUserById = wrapAsync(async(req,res,next) => {
    const { id } = req.params
    const user = await userService.getById(id)
    if(user){
        res.status(200).json(user)
    }else{
        //res.status(401).json({msg:"Sin usuario encontrado con ese id"})
        next(new AppError("Sin usuario encontrado con ese id ", 401)) //Usamos AppError mejor para tratar los errores asíncronos, lanzando un error síncrono
    }   
})


//TO DO 1 Register
exports.showRegister = (req,res) => {
  res.render("register.ejs")
}

//TO DO 2 Login
exports.showLogin = (req,res) => {
  res.render("login.ejs")
}

exports.loginUser = wrapAsync(async(req,res,next) => {
  const { username, password } = req.body
  const userLogued = await userService.login(username,password)
  if(userLogued){
    /*Una vez el usuario está logueado, creamos el token
      ¿Cómo se crea el token? Firmándolo con:
      - Un PAYLOAD compuesto por los datos del usuario logueado --> _id, username y perfil (nada de contraseña)
      - JWT_SECRET --> La contraseña para FIRMAR el token. Será la misma que luego usaremos para comprobar si hay o no token
      - Tiempo de Expiración --> 24 horas
    */
    const token = jwt.sign(
        { id: userLogued._id, username: userLogued.username, profile: userLogued.profile },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    
    //Guardamos el token en la sessión y también en COOKIES
    //Guardarla en cookies
    res.cookie("token", token, {
            httpOnly: true, 
            secure: false   
        });
    
    //Guardarlas en Sesión
    req.session.user = {
            id: userLogued._id,
            username: userLogued.username,
            profile: userLogued.profile
        };

    //Devolver el usuario logueado
    res.json(userLogued)
  }else{
    next(new AppError("Usuario y/o password incorrectos",401))
  }
})

exports.registerUser = wrapAsync(async(req,res,next) => {
  const { username, password } = req.body
  //Creamos el usuario (o lo registramos, como prefiramos decirlo)
  const userCreated = await userService.register(username,password)
  if(userCreated){
    if(userCreated.err){
      //Existe un error
      next(new AppError(userCreated.err,401))
    }else{    
      res.json(userCreated)
    }
  }else{
    next(new AppError("Error creando el usuario",500))
  }
})

//Zustand
//exports.logoutUser = async (req, res) => {
exports.logoutUser = wrapAsync(async (req, res,next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    return res.status(200).json({
      success: true,
      message: "Sesión cerrada correctamente"
    });

  } catch (error) {    
    //res.status(500).json({msg:error})
    next(new AppError(error,500))
  }
})