// EJERCICIOS CLASE ARRAYS

// Conceptos básicos
// 1. Crear un array y mostrarlo
// Crea un array llamado frutas con tres frutas y muestra cada una por consola
// usando un for clásico.

console.log('📌 - Ejercicio 1: Crear un array y mostrarlo')

var frutas = ['manzana', 'pera', 'fresa']

for (var i = 0; i < frutas.length; i++) {
  console.log(frutas[i])
}

// 2. Añadir y eliminar elementos
// Crea un array con nombres de tres animales.
// • Añade uno nuevo al final con .push().
// • Añade otro al principio con .unshift().
// • Elimina el último con .pop().
// • Muestra el array final.

console.log('📌 - Ejercicio 2: Añadir y eliminar elementos')

var animales = ['gato', 'perro', 'zorro']

animales.push('cuervo')
animales.unshift('pato')
animales.pop()

console.log(animales)

// 3. Invertir y unir
// Crea un array numeros = [1, 2, 3, 4, 5]
// • Invierte el orden con .reverse().
// • Une todos los elementos en una cadena con .join("-").

console.log('📌 - Ejercicio 3: Invertir y unir')

var numeros = [1, 2, 3, 4, 5]

numeros.reverse()
console.log(numeros.join('-'))

// 4. Convertir a cadena
// Crea un array con 4 colores. Convierte el array en una cadena con .toString() y
// muestra el resultado.

console.log('📌 - Ejercicio 4: Convertir a cadena')

var colores = ['morado', 'negro', 'rojo', 'amarillo']

console.log(colores.toString())

// 5. Buscar elementos
// Crea un array de nombres y usa:
// • .indexOf() para encontrar la posición de un nombre.
// • .includes() para comprobar si existe un nombre concreto.

console.log('📌 - Ejercicio 5: Buscar elementos')

var nombres = ['Aitana', 'Ainhoa', 'Amador', 'Ernesto', 'Miguel Ángel']

console.log(nombres.indexOf('Aitana'))
console.log(nombres.includes('Ainhoa'))

// Recorridos y condiciones
// 6. Recorrer con distintos bucles
// Dado el array let frutas = ["manzana", "pera", "plátano"]:
// • Recorre con for clásico.
// • Recorre con for...of.
// • Recorre con .forEach().

console.log('📌 - Ejercicio 6: Recorrer con distintos bucles')

var frutas = ['manzana', 'pera', 'plátano']

for (var i = 0; i < frutas.length; i++) {
  console.log(`For: ${frutas[i]}`)
}

for (var fruta of frutas) {
  console.log(`For...of: ${fruta}`)
}

frutas.forEach(function (fruta) {
  console.log(`ForEach: ${fruta}`)
})

// 7. Filtrar elementos
// Crea un array edades = [12, 18, 25, 30, 15].
// Usa .filter() para obtener solo las edades mayores o iguales a 18.

console.log('📌 - Ejercicio 7: Filtrar elementos')

var edades = [12, 18, 25, 30, 15]

var mayores18 = edades.filter(function (edad) {
  return edad >= 18
})

console.log(`+18?: ${mayores18}`)

// 8. Comprobar condiciones
// Usa el array anterior y aplica:
// .some(e => e < 18);
// .every(e => e >= 18);
// Explica qué devuelve cada uno.

console.log('📌 - Ejercicio 8: Comprobar condiciones')

var mayores18 = edades.some(function (edad) {
  return edad < 18
})

console.log(`+18?: ${mayores18}`)

mayores18 = edades.every(function (edad) {
  return edad >= 18
})

console.log(`+18?: ${mayores18}`)

// 9. Sumar valores
// Crea un array precios = [10, 15, 20].
// Usa .reduce() para obtener la suma total.

console.log('📌 - Ejercicio 9: Sumar valores')

var precios = [10, 15, 20]

var total = precios.reduce(function (acum, valor) {
  return acum + valor
})

console.log(`Total: ${total}`)

// 10. Ordenar correctamente
// Crea un array numeros = [10, 5, 2, 20].
// Ordénalo con .sort() primero sin función, luego con (a, b) => a - b.
// Compara los resultados.

console.log('📌 - Ejercicio 10: Ordenar correctamente')

var numeros = [10, 5, 2, 20]

numeros.sort()
console.log(`Sorted: ${numeros}`)

numeros.sort(function (a, b) {
  return a - b
})

console.log(`Sorted: ${numeros}`)

// Arrays de objetos y métodos combinados
// 11. Filtrar objetos
// Crea un array de objetos:
// let alumnos = [
//  { nombre: "Ana", nota: 8 },
//  { nombre: "Luis", nota: 4 },
//  { nombre: "Marta", nota: 6 }
// ];
// Usa .filter() para obtener solo los alumnos con nota mayor o igual a 5.

console.log('📌 - Ejercicio 11: Filtrar objetos')

var alumnos = [
  { nombre: 'Ana', nota: 8 },
  { nombre: 'Luis', nota: 4 },
  { nombre: 'Marta', nota: 6 },
]

var aprobados = alumnos.filter(function (alumno) {
  return alumno.nota >= 5
})

console.log(`Mayores 5: ${aprobados}`)

// 12. Buscar objeto
// Con el mismo array de alumnos, usa .find() para encontrar el alumno con nombre
// "Marta".

console.log('📌 - Ejercicio 12: Buscar objeto')

console.log(
  alumnos.find(function (alumno) {
    return alumno.nombre === 'Marta'
  })
)

// 13. Comprobar todos o alguno
// Con el array alumnos anterior:
// • Usa .every() para comprobar si todos aprobaron.
// • Usa .some() para comprobar si alguno suspendió.

console.log('📌 - Ejercicio 13: Comprobar todos o alguno')

var aprobados = alumnos.every(function (alumno) {
  return alumno.nota >= 5
})

console.log(`Todos: ${aprobados}`)

aprobados = alumnos.some(function (alumno) {
  return alumno.nota < 5
})

console.log(`Alguno: ${aprobados}`)

// 14. Transformar datos
// Crea un array notas = [4, 6, 8, 10]
// Usa .map() para crear un nuevo array con cada nota multiplicada por 2.
// Muestra ambos arrays.

console.log('📌 - Ejercicio 14: Transformar datos')

var notas = [4, 6, 8, 10]

var notasDos = notas.map(function (nota) {
  return nota * 2
})

console.log(`Original: ${notas}`)
console.log(`Multiplicadas por 2: ${notasDos}`)

// 15. Arrays combinados
// Crea dos arrays:
// let frutas1 = ["manzana", "pera"];
// let frutas2 = ["plátano", "naranja"];
// Une ambos en un nuevo array con .concat() y muestra el resultado.

console.log('📌 - Ejercicio 15: Arrays combinados')

var frutas1 = ['manzana', 'pera']
var frutas2 = ['plátano', 'naranja']

var frutasCombinadas = frutas1.concat(frutas2)

console.log(`Combinadas: ${frutasCombinadas}`)

// Arrays multidimensionales
// 16. Array bidimensional
// Crea una matriz de 3x3:
// let matriz = [
//  [1, 2, 3],
//  [4, 5, 6],
//  [7, 8, 9]
// ];
// Muestra cada fila y cada elemento con dos bucles for.

console.log('📌 - Ejercicio 16: Array bidimensional')

var matriz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

for (var fila of matriz) {
  console.log(`Fila: ${fila}`)
}

for (var i = 0; i < matriz.length; i++) {
  console.log(`Elemento ${i}: ${matriz[i]}`)
}
