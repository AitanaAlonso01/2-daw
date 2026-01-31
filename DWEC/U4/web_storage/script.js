// Crear una clase llamada User
class User {
  constructor(nombre, password) {
    this.nombre = nombre
    this.password = password
  }
}

const inputUser = document.getElementById('username')
const inputPass = document.getElementById('password')
const mensajeDisplay = document.getElementById('mensaje')

function registrar() {
  const nombre = inputUser.value
  const pass = inputPass.value

  // Comprobar si el nombre ya está registrado en localStorage [cite: 7]
  if (localStorage.getItem(nombre)) {
    // Si el usuario ya existe [cite: 9]
    mensajeDisplay.textContent = 'Este usuario ya está registrado.'
  } else {
    // Si no existe, crear instancia y guardar en localStorage [cite: 11]
    const nuevoUsuario = new User(nombre, pass)
    localStorage.setItem(nombre, JSON.stringify(nuevoUsuario))
    mensajeDisplay.textContent = 'Usuario registrado con éxito.'
  }
}

function login() {
  const nombre = inputUser.value
  const pass = inputPass.value

  const datosGuardados = localStorage.getItem(nombre)

  if (datosGuardados) {
    const usuario = JSON.parse(datosGuardados)

    // Si el nombre y la contraseña son correctos [cite: 14]
    if (usuario.nombre === nombre && usuario.password === pass) {
      mensajeDisplay.textContent = 'Login exitoso. ¡Bienvenido!'
    } else {
      // Si no son correctos [cite: 16]
      mensajeDisplay.textContent = 'Nombre o contraseña incorrectos.'
    }
  } else {
    // Si el usuario ni siquiera existe en el sistema
    mensajeDisplay.textContent = 'Nombre o contraseña incorrectos.'
  }
}
