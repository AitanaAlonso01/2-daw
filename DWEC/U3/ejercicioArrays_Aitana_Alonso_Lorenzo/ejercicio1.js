// Ejercicio 1
// Una tienda registra sus ventas diarias durante 30 días.
// Cada venta se mide en euros, y tienes que analizar el comportamiento de esas
// ventas mediante diferentes cálculos estadísticos.
// Tienes que desarrollar un programa en JavaScript que:
// a) Genere automáticamente un array de 30 ventas aleatorias con valores
// comprendidos entre 100 y 1000 euros.
// b) Muestre todas las ventas del mes, indicando el día correspondiente.
// c) Calcule y muestre:
// o El total mensual (suma de todas las ventas).
// o La media de ventas del mes.
// o La venta máxima y el día en que ocurrió.
// o La venta mínima y el día en que ocurrió.
// o El número de días en los que las ventas estuvieron por encima de
// la media.
// d) (Opcional )
// Permita calcular las estadísticas anteriores para un rango de días (por
// ejemplo, del día 10 al 20).

// a) Genere automáticamente un array de 30 ventas aleatorias con valores comprendidos entre 100 y 1000 euros.

const ventas = Array.from(
  { length: 30 },
  () => Math.floor(Math.random() * 1000) + 100
)

// b) Mostrar todas las ventas del mes indicando el día correspondiente

ventas.forEach((venta, index) => {
  const dia = index + 1 // Día del mes (1 a 30)
  console.log(`Día ${dia}: ${venta} €`)
})

// c) Calcule y muestre:
// o El total mensual (suma de todas las ventas).
// o La media de ventas del mes.
// o La venta máxima y el día en que ocurrió.
// o La venta mínima y el día en que ocurrió.
// o El número de días en los que las ventas estuvieron por encima de la media.

const totalMensual = ventas.reduce((acum, venta) => acum + venta, 0)
const mediaMensual = totalMensual / ventas.length
const maximo = Math.max(...ventas)
const maximoDia = ventas.indexOf(maximo) + 1
const minimo = Math.min(...ventas)
const minimoDia = ventas.indexOf(minimo) + 1
const diasPorMenorMedia = ventas.filter(venta => venta < mediaMensual).length

console.log(`Total mensual: ${totalMensual} €`)
console.log(`Media mensual: ${mediaMensual} €`)
console.log(`Dia máximo: ${maximoDia}: ${maximo} €`)
console.log(`Dia mínimo: ${minimoDia}: ${minimo} €`)
console.log(`Dias por debajo de la media: ${diasPorMenorMedia}`)

// d) Calcular estadísticas para un rango de días
function calcularEstadisticasRango(ventas, inicio, fin) {
  // Validar rango
  if (inicio < 1 || fin > ventas.length || inicio > fin) {
    console.log('Rango inválido')
    return
  }

  // Extraer las ventas del rango
  const rangoVentas = ventas.slice(inicio - 1, fin)

  // Calcular estadísticas
  const total = rangoVentas.reduce((acum, venta) => acum + venta, 0)
  const media = total / rangoVentas.length
  const max = Math.max(...rangoVentas)
  const diaMax = rangoVentas.indexOf(max) + inicio
  const min = Math.min(...rangoVentas)
  const diaMin = rangoVentas.indexOf(min) + inicio
  const diasPorEncimaMedia = rangoVentas.filter(v => v > media).length

  // Mostrar resultados
  console.log(`Estadísticas del día ${inicio} al ${fin}:`)
  console.log(`Total: ${total} €`)
  console.log(`Media: ${media.toFixed(2)} €`)
  console.log(`Máximo: Día ${diaMax} con ${max} €`)
  console.log(`Mínimo: Día ${diaMin} con ${min} €`)
  console.log(`Días por encima de la media: ${diasPorEncimaMedia}`)
}

// Ejemplo de uso: del día 10 al 20
calcularEstadisticasRango(ventas, 10, 20)
