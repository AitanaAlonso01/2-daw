// 1. Datos base
let verbs = ['viaja a', 'descubre', 'explora', 'recorre', 'vive']
let destinations = ['París', 'Roma', 'Tokio', 'Lisboa', 'Berlín', 'Londres']
let inspirations = [
  'y vive la aventura',
  'antes de que sea tarde',
  'con quien más quieras',
  'como nunca antes',
  'al mejor precio',
]

// 2. Generación de un slogan
function generarSlogan(nombre = '') {
  let verbo = verbs[Math.floor(Math.random() * verbs.length)]
  let destino = destinations[Math.floor(Math.random() * destinations.length)]
  let inspiracion =
    inspirations[Math.floor(Math.random() * inspirations.length)]

  let slogan = `${verbo} ${destino} ${inspiracion}`
  if (nombre) slogan += `, ${nombre}`
  return limpiarSlogan(slogan)
}

// 3. Limpieza y formato
function limpiarSlogan(slogan) {
  let limpio = slogan.replace(/\s+/g, ' ').trim()
  return limpio.charAt(0).toUpperCase() + limpio.slice(1)
}

// 4. Generación de varios slogans únicos
function generarVariosSlogans(n, nombre = '') {
  let slogans = []
  while (slogans.length < n) {
    let slogan = generarSlogan(nombre)
    if (!slogans.includes(slogan)) {
      slogans.push(slogan)
    }
  }
  return slogans
}

// 5. Interacción con el usuario
function iniciarGenerador() {
  alert('Bienvenido al generador de slóganes de VuelaMás')

  while (true) {
    // Preguntar cantidad con reintento si es inválida
    let cantidadStr = prompt('¿Cuántos slóganes deseas generar? (1-10)')
    if (cantidadStr === null) {
      alert('Gracias por usar el generador de VuelaMás. ¡Buen viaje! 🌍✈️')
      return
    }

    let cantidad = parseInt(cantidadStr, 10)
    if (isNaN(cantidad) || cantidad < 1 || cantidad > 10) {
      alert('Error: número de slóganes incorrecto. Debe ser entre 1 y 10.')
      continue // vuelve a preguntar la cantidad
    }

    // Preguntar si añade nombre
    let respuesta = prompt('¿Quieres añadir tu nombre a los slóganes? (s/n)')
    if (respuesta === null) {
      alert('Gracias por usar el generador de VuelaMás. ¡Buen viaje! 🌍✈️')
      return
    }

    let nombre = ''
    if (respuesta.toLowerCase() === 's') {
      nombre = prompt('¿Cuál es tu nombre?') || ''
    }

    // Generar y mostrar
    let slogans = generarVariosSlogans(cantidad, nombre)
    let mensaje = 'Slóganes generados:\n\n'
    slogans.forEach((s, i) => {
      mensaje += `${i + 1}. ${s}\n`
    })
    alert(mensaje)

    // Preguntar si repetir
    let repetir = prompt('¿Quieres generar nuevos slóganes? (s/n)')
    if (!repetir || repetir.toLowerCase() !== 's') {
      alert('Gracias por usar el generador de VuelaMás. ¡Buen viaje! 🌍✈️')
      break
    }
    // Si repite, el while(true) reinicia desde pedir cantidad otra vez
  }
}

// Ejecutar
iniciarGenerador()
