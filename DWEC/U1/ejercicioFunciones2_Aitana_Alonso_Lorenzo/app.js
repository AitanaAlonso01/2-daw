// 1. Crear una función que reciba 2 parámetros y los sume. Se piden 3 versiones:
// a. Declaración de función.
function suma(a, b) {
  return a + b
}

//b. Expresión de función
const suma2 = function (a, b) {
  return a + b
}

//c. Función flecha
const suma3 = (a, b) => a + b

// 2.  Modifica la función del ejercicio 1 para que reciba otro parámetro, que será el primero de los tres, y que servirá para indicar la operación que se desea realizar (+, -, *, /).
function suma4(a, b, operacion) {
  if (operacion === '+') {
    return a + b
  } else if (operacion === '-') {
    return a - b
  } else if (operacion === '*') {
    return a * b
  } else if (operacion === '/') {
    return a / b
  }
}

//3. Modifica el ejercicio 2 para que las operaciones se realicen usando subfunciones.

function suma5(a, b) {
  return suma5.suma(a, b)
}
suma5.suma = function (a, b) {
  return a + b
}

//4. Crea una función modificando el ejericico 3 que reciba dos números y una función como parámetro.
// La función que se pase como parámetro se usará para realizar la operación (sumar, restar y multiplicar)con los dos números.
// Llama a tres veces usando:
// Una declaración de función (sumar)
// Una expresión de función (restar)
// Una función flecha(multiplicar)

function operacion(a, b, funcion) {
  return funcion(a, b)
}

operacion(10, 5, function (a, b) {
  return a + b
})

operacion(10, 5, function (a, b) {
  return a - b
})

operacion(10, 5, function (a, b) {
  return a * b
})

//5. Crea una función llamada que pueda recibir cualquier cantidad de números como parámetros.
// La función debe sumar todos los números y devolver el resultado (Utilizar el operador  rest)

function sumar(...numeros) {
  let total = 0
  for (const n of numeros) {
    total += n
  }
  return total
}
console.log(sumar(1, 2, 3, 4))
console.log(sumar(5, 10))
