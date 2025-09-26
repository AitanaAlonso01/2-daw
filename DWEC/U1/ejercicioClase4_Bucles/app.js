//BUCLES (WHILE, DO WHILE)
//1. Escribe un programa que muestre por consola los números del 1 al 10 usando un bucle while.
console.log(
  '1.---------------------------------------------------------------------------------'
)
let i1 = 1
while (i1 <= 10) {
  console.log(i1)
  i1++
}

//2. Muestra en pantalla los números del 10 al 1 usando un bucle while.

console.log(
  '2.---------------------------------------------------------------------------------'
)
let i2 = 10
while (i2 >= 1) {
  console.log(i2)
  i2--
}

//3. Calcula la suma de todos los números del 1 al 100 y muestra el resultado final en consola.

console.log(
  '3.---------------------------------------------------------------------------------'
)
let suma3 = 0
let i3 = 1
do {
  suma3 += i3
  i3++
} while (i3 <= 100)

console.log(suma3)

//4. Declara una variable inicial en 0. Utiliza un bucle do...while para ir sumándole 10 y mostrar su valor en cada iteración. El bucle debe terminar cuando el número sea mayor que 50.

console.log(
  '4.---------------------------------------------------------------------------------'
)
let suma4 = 0
let i4 = 0

do {
  suma4 += i4
  i4++
} while (i4 <= 50)

console.log(suma4)

//5. Simula que el programa pide un número al usuario (para este ejercicio se puede asignar manualmente en una variable con un array que se llame entradas [-3,-8-2,5]. El bucle debe repetirse mientras el número sea negativo, y debe terminar cuando se introduzca un número positivo.

console.log(
  '5.---------------------------------------------------------------------------------'
)
let entradas = [-3, -8, -2, 5]
let i5 = 0

do {
  if (entradas[i5] < 0) {
    console.log('El número es negativo')
    break
  }
  i5++
} while (i5 < entradas.length)

if (i5 === entradas.length) {
  console.log('El número es positivo')
}

//6. Muestra los primeros 10 múltiplos de 3 utilizando un bucle while.

console.log(
  '6.---------------------------------------------------------------------------------'
)
let i6 = 1
while (i6 <= 10) {
  console.log(i6 * 3)
  i6++
}

//7. Mostrar la tabla de multiplicar del número 7, desde 7 x 1 hasta 7 x 10.

console.log(
  '7.---------------------------------------------------------------------------------'
)
let i7 = 1
while (i7 <= 10) {
  console.log(i7 + 'x7 = ' + i7 * 7)
  i7++
}

//8. Calcular la suma de los primeros 20 números pares (2, 4, 6, …, 40).

console.log(
  '8.---------------------------------------------------------------------------------'
)
let i8 = 0
let suma8 = 0

while (i8 <= 20) {
  if (i8 % 2 === 0) {
    suma8 += i8
  }
  i8++
}

console.log(suma8)

//9. Dado un número entero positivo, mostrar sus cifras en orden inverso. Por ejemplo, si el número es 1234, mostrar 4321. (Nota: necesitaras utilizar el método Math.floor(x)  (siendo x un número) Devuelve el máximo entero menor o igual a un número)

console.log(
  '9.---------------------------------------------------------------------------------'
)
let i9 = 0
let suma9 = 0

while (i9 <= 10) {
  suma9 += i9 * 7
  i9++
}

console.log(suma9)

//10. Dado un número entero, contar cuántas cifras tiene. Por ejemplo el numero 98765. (Nota: necesitaras utilizar el método Math.floor(x)  (siendo x un número) Devuelve elmáximo entero menor o igual a un número)

console.log(
  '10.---------------------------------------------------------------------------------'
)
let i10 = 0
let suma10 = 0

while (i10 <= 10) {
  suma10 += i10 * 7
  i10++
}

console.log(suma10)
