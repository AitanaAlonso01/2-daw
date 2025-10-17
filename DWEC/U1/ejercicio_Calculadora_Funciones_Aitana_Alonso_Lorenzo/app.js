//CALCULADORA WEB
//PASOS A SEGUIR
// 1. Dar la bienvenida al usuario.
// 2. Pedir la operación que desea realizar (+, -, * o /).
// 3. Solicitar dos operandos (números) separados por un espacio.
// 4. Realizar el cálculo correspondiente.
// 5. Mostrar el resultado.
// 6. Preguntar si el usuario desea hacer otra operación.
// 7. Si responde que sí, volver al paso 2.
//VALIDACIONES
// Validaciones obligatorias
// Debes comprobar que los datos introducidos son correctos:
// • La operación debe ser una de las permitidas (+, -, *, /).
// • Los operandos deben ser números válidos.
// • Si hay un error, se debe avisar al usuario y volver a pedir el dato.

// FUNCIONES
// sumar
function sumar(numero1, numero2) {
  return numero1 + numero2
}

// restar
function restar(numero1, numero2) {
  return numero1 - numero2
}

// multiplicar
function multiplicar(numero1, numero2) {
  return numero1 * numero2
}

// dividir
function dividir(numero1, numero2) {
  return numero1 / numero2
}

// 1. Dar la bienvenida al usuario.
alert('Bienvenid@ a la calculadora web')

// Declaramos la variable que controlará el bucle
let continuar = true

// Bucle principal
while (continuar) {
  // Pedir la operación
  let operacion = prompt('¿Qué operación deseas realizar? (+, -, * o /)')

  // Validar la operación
  if (
    operacion != '+' &&
    operacion != '-' &&
    operacion != '*' &&
    operacion != '/'
  ) {
    // Si la operación no es válida, avisar al usuario y volver a pedir
    alert('La operación introducida no es válida')
  } else {
    // Si la operación es válida, pedir los operandos
    let entrada = prompt(
      'Introduce los dos números separados por un espacio (ej: 5 3)' // Dos números separados por un espacio
    )
    // Declarar las variables que almacenarán los operandos
    let numero1 = ''
    let numero2 = ''
    let espacioEncontrado = false

    // Recorrer la cadena carácter por carácter
    let i = 0
    while (i < entrada.length) {
      let caracter = entrada[i]

      // Si se encuentra un espacio, se marca la variable espacioEncontrado como true
      if (caracter == ' ' && !espacioEncontrado) {
        // Si ya se ha encontrado un espacio, se ignora el carácter
        espacioEncontrado = true
      } else {
        // Si no se encuentra un espacio, se agrega el carácter al número correspondiente
        if (!espacioEncontrado) {
          // Si el carácter es un número, se agrega al número 1
          numero1 = numero1 + caracter
        } else {
          // Si el carácter es un número, se agrega al número 2
          numero2 = numero2 + caracter
        }
      }

      //Incrementar el contador
      i = i + 1
    }

    // Convertir a número
    let operando1 = parseFloat(numero1)
    let operando2 = parseFloat(numero2)

    // Validar que los operandos sean números
    if (isNaN(operando1) || isNaN(operando2)) {
      // Si los operandos no son números, avisar al usuario y volver a pedir
      alert('Los operandos deben ser números válidos')
    } else {
      // Si los operandos son números, realizar la operación
      let resultado = 0

      if (operacion == '+') {
        resultado = sumar(operando1, operando2)
      } else if (operacion == '-') {
        resultado = restar(operando1, operando2)
      } else if (operacion == '*') {
        resultado = multiplicar(operando1, operando2)
      } else if (operacion == '/') {
        resultado = dividir(operando1, operando2)
      }

      // Mostrar el resultado
      alert(
        `El resultado de la operación '${operando1} ${operacion} ${operando2}' es ${resultado}`
      )
    }
  }

  // Preguntar si desea realizar otra operación
  let seguir = confirm('¿Deseas realizar otra operación?')
  if (!seguir) {
    // Si no desea realizar otra operación, se cierra el bucle
    continuar = false
    alert('Gracias por usar la calculadora web')
    document.write('Hasta luego!<br>Saliendo del programa...')
    setTimeout(() => {
      window.close()
    }, 1500)
  }
}
