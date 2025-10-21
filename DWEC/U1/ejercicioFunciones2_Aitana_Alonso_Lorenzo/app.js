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

// 2.     Modifica la función del ejercicio 1 para que reciba otro parámetro, que será el primero de los tres, y que servirá para indicar la operación que se desea realizar (+, -, *, /).
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
