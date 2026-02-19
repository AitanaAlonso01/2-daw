const userService = require('../services/user.service')
const bcrypt = require('../utils/bcrypt')
const jwt = require('../middlewares/jwt.mw')

//TO DO - 5 protección síncrona y asíncrona de errores

//Zustand
exports.getLoguedUser = (req, res, next) => {
  // authMiddleware ya validó la cookie y puso req.user
  if (!req.user)
    return res
      .status(401)
      .json({ success: false, message: 'No estás logueado' })

  res.json({
    success: true,
    user: req.user,
  })
}

exports.getAllUsers = async (req, res) => {
  let users = await userService.getAll()

  if (users.length > 0) {
    res.status(200).json(users)
  } else {
    res.status(401).json({ msg: 'Sin usuarios' })
  }
}

exports.getUserById = async (req, res) => {
  const { id } = req.params
  const user = await userService.getById(id)
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(401).json({ msg: 'Sin usuario encontrado con ese id' })
  }
}

//TO DO 1 Register
exports.renderRegister = (req, res) => {
  res.render('users/register', { tituloEJS: 'Registro de Usuario' })
}

exports.register = async (req, res) => {
  try {
    // 1. Extraemos todos los campos que el modelo pide como obligatorios
    const { username, password, nombre, apellido, email } = req.body

    // 2. Validación de contraseña (la que pide el PDF)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .send(
          'La contraseña debe tener 8 caracteres, una mayúscula y una minúscula.'
        )
    }

    // 3. Encriptación
    const hashedPassword = await bcrypt.hash(password, 10)

    // 4. GUARDAR (Cuidado: usamos 'profile' y no 'role')
    const nuevoUsuario = new UserModel({
      username,
      password: hashedPassword,
      profile,
    })

    await nuevoUsuario.save()
    res.redirect(`/api/${process.env.API_VERSION}/users/login`)
  } catch (error) {
    res.status(500).send('Error en el registro: ' + error.message)
  }
}

//TO DO 2 Login
exports.renderLogin = (req, res) => {
  res.render('users/login', { tituloEJS: 'Iniciar Sesión' })
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const usuario = await UserModel.findOne({ username: username })

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' }) // Cambiado .send por .json
    }

    // OJO: Si en Atlas tu usuario 'jdoe' tiene la clave "password123" sin encriptar,
    // bcrypt.compare FALLARÁ. Para el examen, asegúrate de que todos tengan hash
    // o compara en texto plano si son datos de prueba.
    const esValida = await bcrypt.compare(password, usuario.password)
    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' })
    }

    const token = jwt.sign(
      { id: usuario._id, profile: usuario.profile },
      'SECRETO_DEL_EXAMEN',
      { expiresIn: '24h' }
    )

    // Guardar token en COOKIE
    res.cookie('token', token, {
      httpOnly: true, // Esto protege la cookie de hackers
      secure: false, // Ponlo en false porque estás en localhost (HTTP)
      sameSite: 'lax',
      path: '/', // Esto es vital para que la cookie valga en todas las rutas
    })

    // Redirigimos a la raíz del FrontEnd
    res.redirect('http://localhost:5173/')
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

//Zustand
exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    return res.status(200).json({
      success: true,
      message: 'Sesión cerrada correctamente',
    })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
