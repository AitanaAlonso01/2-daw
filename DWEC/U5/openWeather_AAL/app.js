//  CONFIGURACIÓN INICIAL
const API_KEY = '427d1381b126c7ea56e4d0548f312fa3' // Regístrate en openweathermap.org para obtenerla
const mainContent = document.getElementById('main-content')
const authContainer = document.getElementById('auth-container')

//  1. GESTIÓN DE USUARIOS (WebStorage)

function manejarRegistro() {
  const user = document.getElementById('reg-user').value
  const pass = document.getElementById('reg-pass').value

  if (user && pass) {
    localStorage.setItem(user, pass) // Almacena en localStorage
    alert('Usuario registrado. Ya puedes iniciar sesión.')
  } else {
    alert('Por favor, rellena todos los campos.')
  }
}

function manejarLogin() {
  const user = document.getElementById('login-user').value
  const pass = document.getElementById('login-pass').value
  const storedPass = localStorage.getItem(user)

  if (storedPass && storedPass === pass) {
    authContainer.style.display = 'none'
    mainContent.style.display = 'block'
    iniciarApp() // Carga las ciudades por defecto
  } else {
    alert('Usuario o contraseña incorrectos.')
  }
}

//  2. PETICIONES A LA API (Fetch & Asincronismo)

async function consultarClima(ciudad, esDefault = false) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`

  try {
    // 1. Hacemos la petición (asincronismo)
    const respuesta = await fetch(url)

    // 2. Gestionamos los errores según el estado de la respuesta
    if (!respuesta.ok) {
      if (respuesta.status === 401) {
        throw new Error('API Key no activa o incorrecta. Espera un poco.')
      } else if (respuesta.status === 404) {
        throw new Error('La ciudad no existe.')
      } else {
        throw new Error('Error inesperado en la API.')
      }
    }

    // 3. Si todo está bien, convertimos a JSON
    const datos = await respuesta.json()

    // 4. Pintamos los datos en el HTML
    renderizarClima(datos, esDefault)
  } catch (error) {
    // Aquí capturamos fallos de conexión o los errores lanzados arriba
    alert('Atención: ' + error.message)
  }
}

//  3. RENDERIZADO EN EL DOM

function renderizarClima(datos, esDefault) {
  const contenedor = esDefault
    ? document.getElementById('default-cities')
    : document.getElementById('search-output')

  const html = `
        <div class="weather-card">
            <h3>${datos.name}</h3>
            <p>Temperatura: <strong>${datos.main.temp}°C</strong></p>
            <p>Cielo: ${datos.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${datos.weather[0].icon}.png" alt="icon">
        </div>
    `

  if (!esDefault) contenedor.innerHTML = html
  else contenedor.innerHTML += html
}

// 4. LÓGICA DE INICIO Y BÚSQUEDA

function iniciarApp() {
  // Al cargar, muestra Barcelona y Madrid automáticamente
  consultarClima('Barcelona', true)
  consultarClima('Madrid', true)
}

// Evento para el botón de búsqueda
document.getElementById('search-btn').addEventListener('click', () => {
  const ciudad = document.getElementById('city-input').value
  if (ciudad) {
    consultarClima(ciudad)
  }
})
