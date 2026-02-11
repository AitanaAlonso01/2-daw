// Ejercicio 4_
// Realiza un programa en el introduzcas tu fecha de nacimiento y te indique cuántos días
// faltan para tu próximo cumpleaños.
// Detalles importantes:
// 1. Calcula tu cumpleaños para el año actual.
// 2. Si ya ha pasado este año, calcula el del año siguiente.
// 3. Muestra cuántos días faltan, redondeando hacia arriba con Math.ceil() (porque
// si faltan 3.2 días, realmente faltan 4).

console.log('Ejercicio 4 ----------------------------------------')

function diasParaCumple(fechaNacimientoStr) {
  const fechaNacimiento = new Date(fechaNacimientoStr)
  const dia = fechaNacimiento.getDate()
  const mes = fechaNacimiento.getMonth()
  const hoy = new Date()
  let cumple = new Date(hoy.getFullYear(), mes, dia)
  if (cumple < hoy) {
    cumple = new Date(hoy.getFullYear() + 1, mes, dia)
  }
  const diferenciaMs = cumple - hoy
  const diferenciaDias = diferenciaMs / (1000 * 60 * 60 * 24)
  return Math.ceil(diferenciaDias)
}

console.log(
  'Faltan ' + diasParaCumple('2006-12-24') + ' días para tu cumpleaños.'
)
