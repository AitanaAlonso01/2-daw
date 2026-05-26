const userController = require("../controllers/user.controller")
const express = require("express")
const router = express.Router()
//TO DO - 3 Protección de rutas JWT y/o filtrar por perfil
//Incluimos ambas funciones para proteger rutas
const { protect } = require("../middlewares/jwt.mw") //Sólo necesita estar logueado
const { restrictTo } = require("../middlewares/profile.mw") //Debes estar logueado y tener cierto PROFILE


//TO DO 1 Register
//GET Show EJS (ruta que mostrará la vista "register.ejs")
router.get("/register", userController.showRegister)

//POST user (ruta que se ejecutará al hacer clic en el botón "Registrar" de la vista renderizada en la ruta de arriba "register.ejs")
router.post("/register", userController.registerUser)

//TO DO 2 Login
//GET Show EJS
router.get("/login", userController.showLogin)

//POST login user
router.post("/login", userController.loginUser)

//Para acceder al listado de usuarios, debes estar logueado (protect) y ser ADMIN (restrictTo)
router.get("/", protect, restrictTo("ADMIN"), userController.getAllUsers)

router.get("/me", userController.getLoguedUser)

//Para acceder a los detalles de usuarios, debes estar logueado (protect) y ser ADMIN (restrictTo) igualmente
router.get("/:id", protect, restrictTo("ADMIN"), userController.getUserById)






router.post("/logout", userController.logoutUser)


//Exportar rutas
module.exports = router