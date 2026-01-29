// --- EJERCICIOS DE CONSOLA (1 al 10) ---

// Ejercicio 1: Guardar "Ana" [cite: 2]
localStorage.setItem('usuario', 'Ana')
console.log('Ej 1 - Usuario:', localStorage.getItem('usuario'))

// Ejercicio 2: Comprobar existencia [cite: 3]
if (localStorage.getItem('usuario')) {
  console.log('Ej 2 - Usuario encontrado')
}

// Ejercicio 3: Eliminar dato [cite: 4]
localStorage.removeItem('usuario')
console.log('Ej 3 - Usuario eliminado')

// Ejercicio 4: sessionStorage "pagina" [cite: 5]
sessionStorage.setItem('pagina', 'inicio')

// Ejercicio 5: Recuperar sessionStorage [cite: 6]
console.log('Ej 5 - Página actual:', sessionStorage.getItem('pagina'))

// Ejercicio 6: Guardar número correctamente [cite: 7]
localStorage.setItem('edad', 25)
let edad = parseInt(localStorage.getItem('edad'))
console.log('Ej 6 - Edad (número):', edad)

// Ejercicio 7: Guardar objeto con JSON
const persona = { nombre: 'Luis', edad: 30 }
localStorage.setItem('perfil', JSON.stringify(persona))

// Ejercicio 8: Recuperar objeto [cite: 9]
const perfilRecuperado = JSON.parse(localStorage.getItem('perfil'))
console.log('Ej 8 - Nombre del objeto:', perfilRecuperado.nombre)

// Ejercicio 9: Guardar un array [cite: 10]
const colores = ['Rojo', 'Verde', 'Azul']
localStorage.setItem('colores', JSON.stringify(colores))
console.log(
  'Ej 9 - Array de colores:',
  JSON.parse(localStorage.getItem('colores'))
)

// Ejercicio 14: Guardar paso de asistente (sessionStorage) [cite: 15]
sessionStorage.setItem('pasoAsistente', 1)

// --- EJERCICIOS CON INTERFAZ (10 al 15) ---

// Ejercicio 10 & 11: Formulario y persistencia al recargar [cite: 11]
function guardarNombre() {
  const nombre = document.getElementById('nombreInput').value
  localStorage.setItem('nombreUsuario', nombre)
  mostrarNombre()
}

function mostrarNombre() {
  const nombreGuardado = localStorage.getItem('nombreUsuario')
  if (nombreGuardado) {
    document.getElementById('saludo').innerText = `Hola, ${nombreGuardado}`
  }
}

// Ejercicio 12: Modo oscuro persistente [cite: 12]
function toggleModoOscuro() {
  const estaActivado = document.body.classList.toggle('dark-mode')
  localStorage.setItem('modoOscuro', estaActivado)
}

function cargarModoOscuro() {
  const modoGuardado = localStorage.getItem('modoOscuro') === 'true'
  if (modoGuardado) {
    document.body.classList.add('dark-mode')
  }
}

// Ejercicio 13: Contador persistente [cite: 13]
function incrementarContador() {
  let cuenta = parseInt(localStorage.getItem('contador')) || 0
  cuenta++
  localStorage.setItem('contador', cuenta)
  document.getElementById('contadorValor').innerText = cuenta
}

// Ejercicio 14: Limpiar Web Storage [cite: 14]
function limpiarTodo() {
  localStorage.clear()
  sessionStorage.clear()
  location.reload() // Recarga para actualizar la vista
}

// Ejercicio 15: Detectar primera visita [cite: 16]
function detectarPrimeraVisita() {
  if (!localStorage.getItem('visitado')) {
    alert('¡Bienvenido por primera vez a nuestra web!')
    localStorage.setItem('visitado', 'true')
  }
}

// Inicialización al cargar la página
window.onload = () => {
  mostrarNombre()
  cargarModoOscuro()
  detectarPrimeraVisita()
  document.getElementById('contadorValor').innerText =
    localStorage.getItem('contador') || 0
}
