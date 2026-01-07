let opcion

do {
  opcion = prompt(
    'MENÚ VALIDACIONES REGEXP\n\n' +
      '1. Comprobar si el texto es una palabra sin números\n' +
      '2. Comprobar si es un número entero positivo\n' +
      '3. Ver si contiene una fecha DD/MM/AAAA\n' +
      '4. Validar un correo electrónico sencillo\n' +
      "5. Comprobar si una palabra termina en 'ción'\n" +
      '0. Salir\n\n' +
      'Elige una opción:'
  )

  switch (opcion) {
    case '1':
      let palabra = prompt('Introduce una palabra sin números:')
      // Solo letras (mayúsculas o minúsculas)
      let reg1 = /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/
      alert(reg1.test(palabra) ? 'Es una palabra válida' : 'No es válido')
      break

    case '2':
      let numero = prompt('Introduce un número entero positivo:')
      let reg2 = /^[0-9]+$/
      alert(reg2.test(numero) ? 'Es un entero positivo' : 'No es válido')
      break

    case '3':
      let fecha = prompt('Introduce una fecha (DD/MM/AAAA):')
      let reg3 = /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/ // DD/MM/AAAA - EXP: 31/12/2020
      alert(reg3.test(fecha) ? 'La fecha es válida' : 'Fecha no válida')
      break

    case '4':
      let correo = prompt('Introduce un correo electrónico:')
      let reg4 = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/
      alert(reg4.test(correo) ? 'Correo válido' : 'Correo no válido')
      break

    case '5':
      let palabraCion = prompt("Introduce una palabra que termine en 'ción':")
      let reg5 = /[a-z]+ción$/i
      alert(
        reg5.test(palabraCion) ? "Termina en 'ción'" : "No termina en 'ción'"
      )
      break

    case '0':
      alert('Saliendo del programa...')
      break

    default:
      alert('Opción no válida')
      break
  }
} while (opcion !== '0')
