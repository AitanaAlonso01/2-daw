//FUNCIONES
// 1. Mostrar el doble de un número
// Crea una función llamada doble(numero) que reciba un número y devuelva su doble.
console.log('1. Mostrar el doble de un número')
function doble(numero) {
  return numero * 2
}
console.log(doble(5))

// 2. Mostrar el nombre completo
// Crea una función nombreCompleto(nombre, apellido) que devuelva un texto con el formato
// 'Nombre Apellido'.
console.log('2. Mostrar el nombre completo')
function nombreCompleto(nombre, apellido) {
  return `${nombre} ${apellido}`
}
console.log(nombreCompleto('Juan', 'Perez'))

// 3. Convertir minutos a segundos
// Crea una función minutosASegundos(minutos) que reciba una cantidad de minutos y
// devuelva su equivalente en segundos.
console.log('3. Convertir minutos a segundos')
function minutosASegundos(minutos) {
  return minutos * 60
}
console.log(minutosASegundos(5))

// 4. Calcular el perímetro de un cuadrado
// Crea una función perimetroCuadrado(lado) que devuelva el perímetro de un cuadrado (4 ×
// lado).
console.log('4. Calcular el perímetro de un cuadrado')
function perimetroCuadrado(lado) {
  return 4 * lado
}
console.log(perimetroCuadrado(5))

// 5. Determinar si un número es positivo
// Crea una función esPositivo(numero) que devuelva true si el número es mayor que 0 y false
// en caso contrario.
console.log('5. Determinar si un número es positivo')
function esPositivo(numero) {
  return numero > 0
}
console.log(esPositivo(5))

// 6. Obtener el último carácter de un texto
// Enunciado:
// Crea una función ultimoCaracter(texto) que devuelva la última letra o símbolo de una
// cadena.
console.log('6. Obtener el último carácter de un texto')
function ultimoCaracter(texto) {
  return texto.slice(-1)
}
console.log(ultimoCaracter('Juan'))

// 7. Elevar un número a una potencia
// Crea una función potencia(base, exponente) que devuelva el resultado de elevar la base al
// exponente.
console.log('7. Elevar un número a una potencia')
function potencia(base, exponente) {
  return base ** exponente
}
console.log(potencia(2, 3))

// 8. Comprobar si una palabra contiene una letra
// Crea una función contieneLetra(palabra, letra) que devuelva true si la palabra contiene esa
// letra, y false si no.
console.log('8. Comprobar si una palabra contiene una letra')
function contieneLetra(palabra, letra) {
  return palabra.includes(letra)
}
console.log(contieneLetra('Juan Perez', 'P'))

// 9. Calcular el área de un triángulo
// Crea una función areaTriangulo(base, altura) que calcule el área de un triángulo usando la
// fórmula (base * altura) / 2.
console.log('9. Calcular el área de un triángulo')
function areaTriangulo(base, altura) {
  return (base * altura) / 2
}
console.log(areaTriangulo(5, 10))

// 10. Mostrar si dos números son iguales
// Crea una fun
console.log('10. Mostrar si dos números son iguales')
function sonIguales(numero1, numero2) {
  return numero1 === numero2
}
console.log(sonIguales(5, 5))
