/**
 * EJERCICIOS DE ASINCRONISMO
 */

// --- BLOQUE 1: CALLBACKS Y TIMEOUTS ---

// Actividad 1: Mostrar "Hola mundo" después de 1 segundo
setTimeout(() => {
  console.log('Actividad 1: Hola mundo')
}, 1000)

// Actividad 2: Mostrar tres mensajes con distintos tiempos
setTimeout(() => console.log('Actividad 2: Mensaje A (200ms)'), 200)
setTimeout(() => console.log('Actividad 2: Mensaje B (400ms)'), 400)
setTimeout(() => console.log('Actividad 2: Mensaje C (600ms)'), 600)

// Actividad 3: Función que recibe un callback
function saludoCallback(nombre, callback) {
  callback(`Actividad 3: Hola ${nombre}`)
}
saludoCallback('Estudiante', res => console.log(res))

// Actividad 4: Simular descarga de 2 segundos
function descargar(archivo, callback) {
  console.log(`Actividad 4: Descargando ${archivo}...`)
  setTimeout(() => callback('Descarga completa'), 2000)
}

// --- BLOQUE 2: PROMESAS ---

// Actividad 5: Promesa que se resuelve
const promesaOk = new Promise(resolve => resolve('Actividad 5: Resuelta'))

// Actividad 6: Promesa que falla
const promesaFail = new Promise((_, reject) =>
  reject('Actividad 6: Error provocado')
)

// Actividad 7: Simular login con promesa
const login = (u, p) =>
  new Promise((res, rej) => {
    u === 'admin' && p === '1234' ? res('Login OK') : rej('Error login')
  })

// Actividad 8: Encadenar dos .then()
promesaOk
  .then(res => res + ' - Paso 1')
  .then(final => console.log('Actividad 8:', final))

// --- BLOQUE 3: ASYNC / AWAIT ---

// Actividad 9 & 10: Función async y await simple
async function ejemploAsync() {
  const res = await promesaOk
  console.log('Actividad 10:', res)
}

// Actividad 17 & 18: Función esperar con await
const esperar = ms => new Promise(res => setTimeout(res, ms))
async function testEsperar() {
  await esperar(1500)
  console.log('Actividad 18: Espera terminada')
}

// --- BLOQUE 4: FETCH API ---

// Actividad 11, 12, 14, 16: Fetch GET, texto, ok y status
async function realizarGet() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    if (res.ok) {
      // Actividad 14
      console.log('Actividad 16: Código HTTP:', res.status)
      const texto = await res.text() // Actividad 12
      console.log('Actividad 11/12:', texto.substring(0, 50))
    }
  } catch (e) {
    console.log(e)
  }
}

// Actividad 13: Enviar datos con POST
async function enviarPost() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({ title: 'foo' }),
    headers: { 'Content-type': 'application/json' },
  })
  const data = await res.json()
  console.log('Actividad 13 (POST):', data)
}

// Actividad 19 & 20: Encadenar fetch con async/await
async function dobleFetch() {
  const post = await (
    await fetch('https://jsonplaceholder.typicode.com/posts/1')
  ).json()
  const user = await (
    await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
  ).json()
  console.log('Actividad 20 (Doble Fetch):', user.name)
}

// Actividad 22: LocalStorage antes del fetch
function fetchConStorage() {
  localStorage.setItem('ultimoAcceso', Date.now())
  realizarGet()
}

// Actividad 23, 24, 25: Tipos de respuesta y FormData
async function tiposRespuesta() {
  const resBlob = await fetch('https://via.placeholder.com/10').then(r =>
    r.blob()
  ) // Actividad 23
  const resBuffer = await fetch('https://via.placeholder.com/10').then(r =>
    r.arrayBuffer()
  ) // Actividad 24
  console.log('Actividad 23/24: Blob y Buffer recibidos')

  const form = new FormData() // Actividad 25
  form.append('clave', 'valor')
}

// --- BLOQUE 5: API REST SIMULADA Y PARALELISMO ---

// Actividad 26 & 27: Simular API REST
const apiSimulada = {
  getUsuarios: () => fetchJSON('https://jsonplaceholder.typicode.com/users'),
  deletePost: id => console.log(`Actividad 27: Borrando post ${id}...`),
}

// Actividad 28: Función reutilizable fetchJSON
async function fetchJSON(url) {
  const r = await fetch(url)
  return r.json()
}

// Actividad 29: Ejecutar promesas en paralelo
async function enParalelo() {
  const [d1, d2] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/todos/1'),
    fetch('https://jsonplaceholder.typicode.com/todos/2'),
  ])
  console.log('Actividad 29: Paralelo completado')
}

// Actividad 30: Flujo completo async moderno
async function flujoCompleto() {
  console.log('Iniciando actividad 30...')
  await enParalelo()
  await realizarGet()
  console.log('Actividad 30: Flujo finalizado')
}

// Ejecución de ejemplos seleccionados
ejemploAsync()
testEsperar()
flujoCompleto()
