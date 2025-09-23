//1. Declara dos variables numéricas y comprueba si son iguales con '=='. Muestra el resultado en consola.

let a = 10
let b = 5

console.log('1.- a == b: ', a == b)

//2. Declara una variable con tu edad y comprueba si es mayor o igual que 18. Muestra el resultado en consola.

let edad = 18

console.log('2.- edad >= 18: ', edad >= 18)

//3. Declara una variable con un número y comprueba si es distinto de 10.

let numero = 10

console.log('3.- numero != 10: ', numero != 10)

//4. Declara dos variables con números distintos. Comprueba cuál es mayor e imprime el mayor en consola.

let numero1 = 10
let numero2 = 5

console.log('4.- numero1 > numero2: ', numero1 > numero2)

//5. Declara una variable con la temperatura y comprueba si está entre 20 y 30 grados (inclusive).

let temperatura = 25

console.log(
  '5.- temperatura >= 20 && temperatura <= 30: ',
  temperatura >= 20 && temperatura <= 30
)

//6. Declara dos variables booleanas (true/false). Usa el operador '&&' para comprobar si ambas son verdaderas.

let esHogar = true
let esAlicante = true

console.log('6.- esHogar && esAlicante: ', esHogar && esAlicante)

//7. Declara tres variables con números distintos y comprueba cuál es el mayor de los tres.

let numero3 = 10
let numero4 = 5
let numero5 = 3

console.log(
  '7.- numero3 > numero4 && numero4 > numero5: ',
  numero3 > numero4 && numero4 > numero5
)

//8. Declara una variable con un año y comprueba si es bisiesto. (Un año es bisiesto si es divisible entre 4 y no entre 100, salvo que también sea divisible entre 400).

let anio = 2020

console.log(
  '8.- anio es bisiesto: ',
  anio % 4 === 0 || (anio % 100 !== 0 && anio % 400 === 0)
)

//9. Declara una variable con un número y comprueba si está fuera del rango 50-100 usando el operador '!'

let numero6 = 75

console.log(
  '9.- numero6 !> 50 && numero6 !< 100: ',
  numero6 !== 50 && numero6 !== 100
)
