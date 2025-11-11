// Ejercicio 2 (optativo)
// Simular un juego de mesa por turnos donde varios jugadores avanzan casillas
// según el resultado de un dado virtual, utilizando arrays y sus métodos para
// gestionar el tablero y las posiciones.
// Descripción del juego
// • Hay un tablero lineal de 20 casillas (numeradas del 1 al 20).
// • Participan 4 jugadores, representados mediante un array de posiciones.
// • En cada turno, cada jugador “lanza” un dado (valor aleatorio del 1 al 6) y
// avanza ese número de casillas.
// • El primero que llega o supera la casilla 20 gana.
// • Si dos jugadores coinciden en la misma casilla, el último que llega
// “empuja” al otro de vuelta a la casilla 1.

const tablero = 20 // número de casillas
const jugadores = [0, 0, 0, 0] // posiciones iniciales de los 4 jugadores
let ganador = null
let turno = 1

// Función para lanzar el dado (1 a 6)
function lanzarDado() {
  return Math.floor(Math.random() * 6) + 1
}

// Bucle principal del juego
while (ganador === null) {
  console.log(`\n--- Turno ${turno} ---`)

  for (let i = 0; i < jugadores.length; i++) {
    const avance = lanzarDado()
    jugadores[i] += avance

    // Si supera el tablero, se queda en la última casilla y gana
    if (jugadores[i] >= tablero) {
      jugadores[i] = tablero
      console.log(`Jugador ${i + 1} avanza ${avance} → casilla ${jugadores[i]}`)
      ganador = i + 1
      break
    }

    console.log(`Jugador ${i + 1} avanza ${avance} → casilla ${jugadores[i]}`)

    // Comprobar colisiones (empujar al otro a casilla 1)
    for (let j = 0; j < jugadores.length; j++) {
      if (i !== j && jugadores[i] === jugadores[j]) {
        console.log(
          `Jugador ${i + 1} empuja al Jugador ${j + 1} de vuelta a la casilla 1`
        )
        jugadores[j] = 0
      }
    }
  }

  turno++
}

// Resultado final
console.log(`\n ¡El Jugador ${ganador} ha ganado en el turno ${turno - 1}!`)
