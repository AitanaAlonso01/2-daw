// --- ACTIVIDAD 1: Validar un solo campo ---
document.getElementById('formAct1').addEventListener('submit', function (e) {
  e.preventDefault() // [cite: 7]
  const user = document.getElementById('inputUser').value.trim()
  const msg = document.getElementById('msg1')

  if (user === '') {
    msg.innerHTML =
      '<span style="color:red">El campo NO puede estar vacío</span>' // [cite: 4, 5]
  } else {
    msg.innerHTML = `<span style="color:green">Bienvenido/a, ${user}</span>` // [cite: 6]
  }
})

// --- ACTIVIDAD 2: Formulario con nombre y edad + reseteo ---
document.getElementById('formAct2').addEventListener('submit', function (e) {
  e.preventDefault()
  const nombre = document.getElementById('nombre2').value.trim()
  const edad = parseInt(document.getElementById('edad2').value) // [cite: 12]
  const msg = document.getElementById('msg2')

  if (nombre !== '' && edad > 0) {
    // [cite: 11, 12]
    msg.innerHTML = `<span class="success">Hola ${nombre}, tienes ${edad} años</span>` // [cite: 13]
    this.reset() // Vaciar ambos campos [cite: 14]
  } else {
    msg.innerHTML =
      '<span class="error">Por favor, rellena los campos correctamente.</span>'
  }
})

// --- ACTIVIDAD 3: Validar email y contraseña ---
document.getElementById('formAct3').addEventListener('submit', function (e) {
  e.preventDefault()
  const email = document.getElementById('email3').value
  const pass = document.getElementById('pass3').value
  const errEmail = document.getElementById('errEmail')
  const errPass = document.getElementById('errPass')
  const msg = document.getElementById('msg3')

  // Resetear mensajes previos
  errEmail.textContent = ''
  errPass.textContent = ''
  msg.textContent = ''

  let error = false

  if (!email.includes('@')) {
    // [cite: 20]
    errEmail.textContent = 'El email debe contener @' // [cite: 22]
    error = true
  }
  if (pass.length < 6) {
    // [cite: 21]
    errPass.textContent = 'La contraseña debe tener mínimo 6 caracteres' // [cite: 22]
    error = true
  }

  if (!error) {
    msg.innerHTML = '<span class="success">Acceso permitido</span>' // [cite: 23]
  }
})

// --- ACTIVIDAD 4: Radio + Select ---
document.getElementById('formAct4').addEventListener('submit', function (e) {
  e.preventDefault()
  const nombre = document.getElementById('nombre4').value.trim()
  const genero = document.querySelector('input[name="genero"]:checked').value // [cite: 27]
  const ciudad = document.getElementById('ciudad4').value // [cite: 28]

  if (nombre === '') {
    alert('El nombre es obligatorio') // [cite: 30]
  } else {
    document.getElementById(
      'msg4'
    ).textContent = `Hola ${nombre}, género ${genero}, ciudad ${ciudad}` // [cite: 32]
  }
})

// --- ACTIVIDAD 5: Registro completo + tabla dinámica ---
document.getElementById('formAct5').addEventListener('submit', function (e) {
  e.preventDefault() // Evitar refresco [cite: 40]

  const nombre = document.getElementById('regNombre').value
  const email = document.getElementById('regEmail').value
  const edad = document.getElementById('regEdad').value

  // Validación básica antes de insertar [cite: 41]
  if (nombre && email && edad) {
    const tbody = document.querySelector('#tablaRegistros tbody')
    const nuevaFila = tbody.insertRow() // Añadir fila [cite: 42]

    nuevaFila.innerHTML = `
            <td>${nombre}</td>
            <td>${email}</td>
            <td>${edad}</td>
        `

    this.reset() // Limpia el formulario [cite: 43]
  }
})
