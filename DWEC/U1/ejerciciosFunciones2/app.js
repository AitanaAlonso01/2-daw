// 1. Contar cuántos números pares hay en un array
// Crea una función que reciba un array de números y devuelva cuántos de ellos son pares
console.log('Ejercicio 1 - Contar cuántos números pares hay en un array')
let numeros1 = [1, 2, 3, 4, 5, 6]
function cuantosPares(numeros1) {
  let cuantos = 0
  for (let i = 0; i < numeros1.length; i++) {
    if (numeros1[i] % 2 === 0) {
      cuantos++
    }
  }
  return cuantos
}
console.log(cuantosPares(numeros1))

// 2. Sumar todos los elementos de un array.
// Crea una función que reciba un array de números y devuelva la suma total
console.log('Ejercicio 2 - Sumar todos los elementos de un array')
let numeros2 = [1, 2, 3, 4, 5, 6]
function sumarNumeros(numeros2) {
  let suma = 0
  for (let i = 0; i < numeros2.length; i++) {
    suma += numeros2[i]
  }
  return suma
}
console.log(sumarNumeros(numeros2))

// 3. Encontrar el número mayor (necesitarás utilizar el método Math.max)
// Crea una función numeroMayor(a, b, c) que devuelva el número más grande de los tres.
console.log('Ejercicio 3 - Encontrar el número mayor')
function numeroMayor(a, b, c) {
  return Math.max(a, b, c)
}
console.log(numeroMayor(1, 2, 3))

// 4. Crear una función que devuelva si una frase contiene una palabra (necesitaras utilizar el método .includes)
// Crea una función que devuelva true si la palabra está dentro de la frase
console.log(
  'Ejercicio 4 - Crear una función que devuelva si una frase contiene una palabra'
)
function palabraPresente(frase, palabra) {
  return frase.includes(palabra)
}
console.log(palabraPresente('Esto es una frase', 'frase'))

// 5. Repetir una cadena varias veces (necesitaras utilizar el método.repeat() )
// Crea una función que devuelva el texto repetido tantas veces como se indique.
console.log('Ejercicio 5 - Repetir una cadena varias veces')
function repetir(texto, veces) {
  texto = texto + ' '
  return texto.repeat(veces)
}
console.log(repetir('Esto es una frase', 3))

// 6. Comprobar si todos los números de un array son positivos
// Crea una función todosPositivos(lista) que devuelva true si todos los números del array son mayores que 0..
console.log(
  'Ejercicio 6 - Comprobar si todos los números de un array son positivos'
)
function todosPositivos(lista) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] <= 0) {
      return false
    }
  }
  console.log('Todos los números son positivos')
  return true
}
console.log(todosPositivos([1, 2, 3, 4, 5, 6]))

// 7. Calcular el factorial de un número
// Crea una función factorial que devuelva el resultado de multiplicar todos los números desde 1 hasta n.
console.log('Ejercicio 7 - Calcular el factorial de un número')
function factorial(n) {
  let resultado = 1
  for (let i = 1; i <= n; i++) {
    resultado *= i
  }
  return resultado
}
console.log(factorial(5))

// 8. Crear una función que calcule el promedio de un array (necesitaras utilizar el metodo. length)
// Crea una función que calcule el promedio de unos números. Que reciba un array con varios números y devuelva su media aritmética.
console.log(
  'Ejercicio 8 - Crear una función que calcule el promedio de un array'
)
function promedio(numeros) {
  let suma = 0
  for (let i = 0; i < numeros.length; i++) {
    suma += numeros[i]
  }
  return suma / numeros.length
}
console.log(promedio([1, 2, 3, 4, 5, 6]))

// 9. Comprobar si un número es primo
// Crea una función que reciba un número y devuelva true si es primo (solo divisible por 1 y por sí mismo), o false en caso contrario
console.log('Ejercicio 9 - Comprobar si un número es primo')
function esPrimo(numero) {
  if (numero === 1) {
    return false
  }
  for (let i = 2; i < numero; i++) {
    if (numero % i === 0) {
      return false
    }
  }
  return true
}
console.log(esPrimo(5))

// 10. Contar cuántas veces aparece un número en un array
// Crea una función que reciba un array y un número, y devuelva cuántas veces aparece ese número en el array
console.log('Ejercicio 10 - Contar cuántas veces aparece un número en un array')
function cuantasVeces(array, numero) {
  let cuantas = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i] === numero) {
      cuantas++
    }
  }
  return cuantas
}
console.log(cuantasVeces([1, 5, 3, 4, 5, 6, 7, 8, 5, 10], 5))

// 11. Invertir un número
// Crea una función que reciba un número y devuelva sus cifras invertidas. Por ejemplo, si recibe 1234, debe devolver 4321.
console.log('Ejercicio 11 - Invertir un número')
function invertirNumero(numero) {
  let invertido = ''
  for (let i = numero.length - 1; i >= 0; i--) {
    invertido += numero[i]
  }
  return invertido
}
console.log(invertirNumero(1234))

// 12. Calcular el número de dígitos de un número
// Crea una función que reciba un número entero y devuelva cuántas cifras tiene, sin convertirlo en texto
console.log('Ejercicio 12 - Calcular el número de dígitos de un número')
function numeroDigitos(numero) {
  let numeroString = numero.toString()
  return numeroString.length
}
console.log(numeroDigitos(1234))

// 13. Comprobar si una palabra es palíndroma (sin usar métodos de texto)
// Crea una función que reciba una palabra y devuelva true si se lee igual al derecho que al revés
console.log('Ejercicio 13 - Comprobar si una palabra es palíndroma')
function palindromo(palabra) {
  let palabraReversa = ''
  for (let i = palabra.length - 1; i >= 0; i--) {
    palabraReversa += palabra[i]
  }
  return palabra === palabraReversa
}
console.log(palindromo('radar'))

// 14. Sumar solo los números impares de un array (necesitaras utilizar .length)
// Crea una función que reciba un array y devuelva la suma de todos los números impares.
console.log('Ejercicio 14 - Sumar solo los números impares de un array')
function sumarImpares(array) {
  let suma = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 !== 0) {
      suma += array[i]
    }
  }
  return suma
}
console.log(sumarImpares([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
