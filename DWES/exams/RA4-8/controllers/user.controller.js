const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// --- VISTAS EJS ---
exports.renderRegistro = (req, res) => res.render('register')
exports.renderLogin = (req, res) => res.render('login')

// --- LÓGICA AAA (RA4) ---
// --- Lógica de Registro ---
exports.registrar = async (req, res) => {
  try {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const nuevoUsuario = new User({ username, password: hashedPassword })
    await nuevoUsuario.save()

    // Después de registrar, lo mandamos al login para que se identifique
    res.redirect('/api/v1/users/login')
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
      const token = jwt.sign(
        { id: usuario._id, role: usuario.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      res.cookie('token', token, { httpOnly: true })

      // CAMBIO AQUÍ: Redirigir directamente al Listado de React
      return res.redirect('http://localhost:5173')
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

// --- LÓGICA API PARA REACT (RA8) ---
exports.getUsersJSON = async (req, res) => {
  try {
    const users = await User.find({}, '-password') // No enviamos la contraseña
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error' })
  }
}
