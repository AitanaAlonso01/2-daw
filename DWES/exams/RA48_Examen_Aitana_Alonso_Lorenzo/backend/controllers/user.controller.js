const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// --- VISTAS EJS ---
exports.renderRegistro = (req, res) => res.render('register')
exports.renderLogin = (req, res) => res.render('login')

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

// --- LÓGICA AAA (RA4) ---
// --- Lógica de Registro ---
exports.registrar = async (req, res) => {
  try {
    const { username, password, nombre, apellido, email, profile } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const nuevoUsuario = new User({
      username: username,
      password: hashedPassword,
      nombre: nombre,
      apellido: apellido,
      email: email,
      profile: profile,
    })
    await nuevoUsuario.save()

    // Después de registrar, lo mandamos al login para que se identifique
    res.redirect('/api/v2/users/login')
  } catch (error) {
    res.status(500).send('Error al registrar: ' + error.message)
  }
}

// --- Lógica de Login ---
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const usuario = await User.findOne({ username })

    if (usuario && (await bcrypt.compare(password, usuario.password))) {
      const token = jwt.sign({ id: usuario.id, username: usuario.username })

      res.cookie('token', token, { httpOnly: true })

      // CAMBIO AQUÍ: Redirigir directamente al Listado de React
      return res.redirect('http://localhost:3015')
    }
    res.status(401).send('Usuario o contraseña incorrectos')
  } catch (error) {
    res.status(500).send('Error en el servidor')
  }
}

exports.logout = (req, res) => {
  res.clearCookie('token')
  res.redirect('/api/v1/users/login')
}
