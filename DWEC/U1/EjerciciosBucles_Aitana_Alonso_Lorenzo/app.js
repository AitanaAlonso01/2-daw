// EJERCICIO 1

let intentos = 0
const contraseñaCorrecta = '1234'
let accesoConcedido = false

while (intentos < 3) {
  let entrada = prompt('Introduce la contraseña:')
  if (entrada === contraseñaCorrecta) {
    alert('Acceso concedido')
    accesoConcedido = true
    break
  } else {
    intentos++
    alert('Contraseña incorrecta')
  }
}

if (!accesoConcedido) {
  alert('Acceso bloqueado tras 3 intentos fallidos')
}

// EJERCICIO 2

const numeroSecreto = Math.floor(Math.random() * 100) + 1
let adivinado = false

while (!adivinado) {
  let intento = parseInt(prompt('Adivina el número entre 1 y 100:'))

  if (intento < numeroSecreto) {
    alert('Más alto')
  } else if (intento > numeroSecreto) {
    alert('Más bajo')
  } else if (intento === numeroSecreto) {
    adivinado = true
    alert(' ¡Correcto! Lo has adivinado')
  } else {
    alert('Introduce un número válido')
  }
}
