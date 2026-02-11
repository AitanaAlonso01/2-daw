// Ejercicio 3_
// Realiza un programa en el que el usuario introduce su fecha de nacimiento en formato
// "YYYY-MM-DD", y tiene que calcular:
// 1. La edad exacta que tiene hoy (en años).
// 2. Además, según la edad obtenida, el programa mostrará el siguiente mensaje:
// o Si tiene menos de 18 → "Eres menor, ¡disfruta mientras
// puedas!"
// o Si tiene entre 18 y 30 → "Estás en la flor de la vida."
// o Si tiene más de 30 → "Ya vas teniendo experiencia, muy bien."

console.log('Ejercicio 3 ----------------------------------------')

function edad(fechaNacimiento) {
  const fechaNacimientoObjeto = new Date(fechaNacimiento)
  const hoy = new Date()

  const edad = hoy.getFullYear() - fechaNacimientoObjeto.getFullYear()

  if (edad < 18) {
    console.log('Eres menor, ¡disfruta mientras puedas!')
  } else if (edad >= 18 && edad < 30) {
    console.log('Estás en la flor de la vida.')
  } else {
    console.log('Ya vas teniendo experiencia, muy bien.')
  }
}

edad('2006-11-01')
