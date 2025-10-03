//BUCLES for, for in, for of

// 1.Contar del 1 al 10. Haz un programa que muestre los números del 1 al 10 usando un bucle for.
console.log('1.Contar del 1 al 10:')
for (let i = 1; i <= 10; i++) {
  console.log(i)
}

// 2.Números pares. Muestra los números pares del 2 al 20 usando un bucle for.
console.log('2.Números pares:')
for (let i = 2; i <= 20; i++) {
  if (i % 2 === 0) {
    console.log(i)
  }
}

// 3.Tabla de multiplicar del 5.Usando for, muestra la tabla de multiplicar del 5 (desde 5×1 hasta 5×10).
console.log('3.Tabla de multiplicar del 5:')
for (let i = 1; i <= 10; i++) {
  console.log(`5 x ${i} = ${5 * i}`)
}

// 4.Suma de números.Calcula la suma de los números del 1 al 100 usando un bucle for.
console.log('4.Suma de números:')
let suma = 0
for (let i = 1; i <= 100; i++) {
  suma += i
}
console.log(suma)

// 5.Índices de un array Dado el array ["Lunes", "Martes", "Miércoles"], muestra por consola los índices con for...in.
console.log('5.Índices de un array:')
const array = ['Lunes', 'Martes', 'Miércoles']
for (let i in array) {
  console.log(i)
}

// 6.Índice y valor.Con el array ["Rojo", "Verde", "Azul"], muestra el índice y el color en cada vuelta.
console.log('6.Índice y valor:')
const array2 = ['Rojo', 'Verde', 'Azul']
for (let i in array2) {
  console.log(`${i}: ${array2[i]}`)
}

// 7.Posiciones de letras.Con la palabra "HOLA", muestra la posición de cada letra.
console.log('7.Posiciones de letras:')
const palabra = 'HOLA'
for (let i in palabra) {
  console.log(`${palabra[i]} esta en la posición ${i}`)
}

// 8.Contar elementos. Usando for...in, cuenta cuántos elementos tiene el array [10, 20, 30, 40].
console.log('8.Contar elementos:')
const array3 = [10, 20, 30, 40]
let contador = 0
for (let i in array3) {
  contador++
}
console.log(contador)

// 9. Valores de un array.Dado el array ["Manzana", "Naranja", "Plátano"], muestra cada fruta con for...of.
console.log('9. Valores de un array:')
const array4 = ['Manzana', 'Naranja', 'Plátano']
for (let fruta of array4) {
  console.log(fruta)
}

// 10.Recorrer una palabra. Con la palabra "JAVASCRIPT", muestra cada letra con for...of.
console.log('10.Recorrer una palabra:')
const palabra2 = 'JAVASCRIPT'
for (let letra of palabra2) {
  console.log(letra)
}

// 11. Suma de números.Dado el array [1, 2, 3, 4, 5], calcula la suma total usando for...of.
console.log('11. Suma de números:')
const array5 = [1, 2, 3, 4, 5]
let suma2 = 0
for (let numero of array5) {
  suma2 += numero
}
console.log(suma2)

// 12. Encontrar el mayor núm
console.log('12. Encontrar el mayor núm:')
const array6 = [5, 2, 8, 3, 9, 4, 10, 7]
let mayor = array6[0]
for (let numero of array6) {
  if (numero > mayor) {
    mayor = numero
  }
}
console.log(mayor)
