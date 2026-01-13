// Seleccionamos los elementos del DOM
const boton = document.getElementById('boton-color')
const textoColor = document.getElementById('texto-color')

// Función para generar un color hexadecimal aleatorio
function generarColorAleatorio() {
  const caracteres = '0123456789ABCDEF'
  let colorHex = '#'

  for (let i = 0; i < 6; i++) {
    colorHex += caracteres[Math.floor(Math.random() * 16)]
  }
  return colorHex
}

// Evento de clic para cambiar el color
boton.addEventListener('click', () => {
  const nuevoColor = generarColorAleatorio()

  // Cambiamos el color de fondo del body
  document.body.style.backgroundColor = nuevoColor

  // Actualizamos el texto mostrado
  textoColor.textContent = nuevoColor
})
