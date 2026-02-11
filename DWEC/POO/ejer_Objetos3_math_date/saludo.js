// Ejercicio 1_
// Saludar según la hora. Realiza un programa en el que el ordenador te saluda por consola
// con "Buenos días", "Buenas tardes" o "Buenas noches" según la hora actual.
// • De 06:00 (inclusive) a 12:00 (exclusivo) → Buenos días.
// • De 12:00 (inclusive) a 20:00 (exclusivo) → Buenas tardes.
// • De 20:00 (inclusive) a 06:00 (exclusivo) → Buenas noches.

console.log('Ejercicio 1 ----------------------------------------')

const hora = new Date().getHours()

if (hora >= 6 && hora < 12) {
  console.log('Buenos días')
} else if (hora >= 12 && hora < 20) {
  console.log('Buenas tardes')
} else {
  console.log('Buenas noches')
}
