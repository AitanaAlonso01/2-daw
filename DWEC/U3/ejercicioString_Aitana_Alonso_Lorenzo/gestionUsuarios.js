// Declaración de datos iniciales
let nombreCompleto = ' juan pérez gonzález '
let correo = ' JUAN.PEREZ@correo.COM '

// Limpieza de datos
// Eliminar espacios sobrantes al inicio y al final
nombreCompleto = nombreCompleto.trim()
correo = correo.trim()

// Normalizar el nombre completo:
// - Dividimos por espacios
// - Filtramos posibles huecos vacíos
// - Capitalizamos cada palabra (primera letra mayúscula, resto minúscula)
let partesNombre = nombreCompleto.split(' ').filter(p => p !== '')
partesNombre = partesNombre.map(
  p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()
)
nombreCompleto = partesNombre.join(' ')

// Normalizar el correo a minúsculas
correo = correo.toLowerCase()

// Validación
let esValido = false

// Comprobamos si contiene @
if (correo.includes('@')) {
  // Dividimos en dos partes: antes y después del @
  let partesCorreo = correo.split('@')

  // Debe haber exactamente dos partes
  if (partesCorreo.length === 2) {
    let dominio = partesCorreo[1]

    // El dominio debe contener al menos un "."
    if (dominio.includes('.')) {
      esValido = true
    }
  }
}

// Extracción de datos
let usuarioCorreo = ''
let dominioCorreo = ''

if (esValido) {
  let partesCorreo = correo.split('@')
  usuarioCorreo = partesCorreo[0]
  dominioCorreo = partesCorreo[1]
}

// Presentación final
console.log('Nombre completo: ' + nombreCompleto)
console.log('Correo electrónico: ' + correo)
console.log('Usuario del correo: ' + usuarioCorreo)
console.log('Dominio del correo: ' + dominioCorreo)
console.log(esValido ? 'Correo válido' : 'Correo inválido')
