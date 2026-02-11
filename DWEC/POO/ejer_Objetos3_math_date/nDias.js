// Ejercicio 2_
// Obtener los días enteros entre dos fechas. Dadas dos fechas (cadena "YYYY-MM-DD" o
// Date), calcula cuántos días completos hay entre ellas (valor absoluto, entero).

console.log('Ejercicio 2 ----------------------------------------')

function diasEntreFechas(fecha1, fecha2) {
  const fecha1Objeto = new Date(fecha1)
  const fecha2Objeto = new Date(fecha2)

  let dias = 0

  while (fecha1Objeto <= fecha2Objeto) {
    dias++
    fecha1Objeto.setDate(fecha1Objeto.getDate() + 1)
  }

  return dias
}

const fecha1 = '2025-01-01'
const fecha2 = '2025-12-31'

console.log(
  `El número de días entre ${fecha1} y ${fecha2} es ${diasEntreFechas(
    fecha1,
    fecha2
  )}`
)
