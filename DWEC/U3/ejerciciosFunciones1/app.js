// 1. Mostrar el doble de un número
// Crea una función llamada doble(numero) que reciba un número y devuelva su doble.

console.log('\x1b[34m1. Mostrar el doble de un número\x1b[0m')

function doble(numero) {
  return numero * 2
}

console.log(doble(5))

// 2. Mostrar el nombre completo
// Crea una función nombreCompleto(nombre, apellido) que devuelva un texto con el formato
// 'Nombre Apellido'.

console.log('\x1b[34m2. Mostrar el nombre completo\x1b[0m')

function nombreCompleto(nombre, apellido) {
  return `${nombre} ${apellido}`
}

console.log(nombreCompleto('Aitana', 'Alonso'))

// 3. Convertir minutos a segundos
// Crea una función minutosASegundos(minutos) que reciba una cantidad de minutos y
// devuelva su equivalente en segundos.

console.log('\x1b[34m3. Convertir minutos a segundos\x1b[0m')

function minutosASegundos(minutos) {
  return minutos * 60
}

console.log(minutosASegundos(5))

// 4. Calcular el perímetro de un cuadrado
// Crea una función perimetroCuadrado(lado) que devuelva el perímetro de un cuadrado (4 ×
// lado).

console.log('\x1b[34m4. Calcular el perímetro de un cuadrado\x1b[0m')

function perimetroCuadrado(lado) {
  return 4 * lado
}

console.log(perimetroCuadrado(5))

// 5. Determinar si un número es positivo
// Crea una función esPositivo(numero) que devuelva true si el número es mayor que 0 y false
// en caso contrario.

console.log('\x1b[34m5. Determinar si un número es positivo\x1b[0m')

function esPositivo(numero) {
  return numero > 0
}

console.log(esPositivo(5))
console.log(esPositivo(-5))

// 6. Obtener el último carácter de un texto
// Crea una función ultimoCaracter(texto) que devuelva la última letra o símbolo de una
// cadena.

console.log('\x1b[34m6. Obtener el último carácter de un texto\x1b[0m')

function ultimoCaracter(texto) {
  return texto.slice(-1)
}

console.log('Hola: ' + ultimoCaracter('Hola'))
console.log('Adios: ' + ultimoCaracter('Adios'))

// 7. Elevar un número a una potencia
// Crea una función potencia(base, exponente) que devuelva el resultado de elevar la base al
// exponente.

console.log('\x1b[34m7. Elevar un número a una potencia\x1b[0m')

function potencia(base, exponente) {
  return Math.pow(base, exponente)
}

console.log(potencia(2, 3))

// 8. Comprobar si una palabra contiene una letra
// Crea una función contieneLetra(palabra, letra) que devuelva true si la palabra contiene esa
// letra, y false si no.

console.log('\x1b[34m8. Comprobar si una palabra contiene una letra\x1b[0m')

function contieneLetra(palabra, letra) {
  return palabra.includes(letra)
}

console.log('Hola: ' + contieneLetra('Hola', 'a'))
console.log('Adios: ' + contieneLetra('Adios', 'a'))

// 9. Calcular el área de un triángulo
// Crea una función areaTriangulo(base, altura) que calcule el área de un triángulo usando la
// fórmula (base * altura) / 2.

console.log('\x1b[34m9. Calcular el área de un triángulo\x1b[0m')

function areaTriangulo(base, altura) {
  return (base * altura) / 2
}

console.log(areaTriangulo(5, 10))

// 10. Mostrar si dos números son iguales
// Crea una función sonIguales(a, b) que devuelva true si los dos números son iguales y false si
// no lo son.

console.log('\x1b[34m10. Mostrar si dos números son iguales\x1b[0m')

function sonIguales(a, b) {
  return a === b
}

console.log(sonIguales(5, 5))
console.log(sonIguales(5, 10))
