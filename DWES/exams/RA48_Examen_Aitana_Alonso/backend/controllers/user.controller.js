const UserModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.findAllUsers = async (req, res) => {
  await UserModel.findAll({}, function (err, usuarios) {
    if (err) {
      res.status(404).json(err)
    } else {
      res.status(200).json(usuarios)
    }
  })
}

exports.findUserById = async (req, res) => {
  const { id } = req.params
  await UserModel.findUserById(id, function (err, usuario) {
    if (err) {
      res.status(404).json(err)
    } else {
      res.status(200).json(usuario)
    }
  })
}

exports.editUser = async (req, res) => {
  const { id } = req.params
  const { username, password, nombre, apellido, email } = req.body
  const usuarioActualizado = {
    username: username,
    password: password,
    nombre: nombre,
    apellido: apellido,
    email: email,
  }
  await UserModel.updateUserById(
    id,
    usuarioActualizado,
    function (err, datosActualizados) {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(200).json(datosActualizados)
      }
    }
  )
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params
  await UserModel.deleteUserById(id, function (err, datosEliminados) {
    if (err) {
      res.status(400).json(err)
    } else {
      res.status(200).json(datosEliminados)
    }
  })
}

// Muestra el formulario de registro
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
      nombre, // <--- Obligatorio según el modelo
      apellido, // <--- Obligatorio según el modelo
      email, // <--- Obligatorio según el modelo
      profile: 'USER', // <--- Se llama 'profile' en el esquema
    })

    await nuevoUsuario.save()
    res.redirect(`/api/${process.env.API_VERSION}/users/login`)
  } catch (error) {
    res.status(500).send('Error en el registro: ' + error.message)
  }
}

// Muestra el formulario de login
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
