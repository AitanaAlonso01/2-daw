// Ejercicio 1: Crea tu primer objeto
// Crea un objeto llamado car con estas propiedades:
// • brand → “Toyota”
// • model → “Corolla”
// • year → 2020
// Muestra el objeto por consola.

let car = {
  brand: 'Toyota',
  model: 'Corolla',
  year: 2020,
}

console.log(car)

// Ejercicio 2: Declaración literal
// Crea un objeto vacío usando {} y añade después las propiedades:
// • title → “El Quijote”
// • pages → 863
// Imprímelo por consola.

let book = {}

book.title = 'El Quijote'
book.pages = 863

console.log(book)

// Ejercicio 3: Acceso con punto y con corchetes
// Dado este objeto:
// const student = {
//  name: "Laura",
//  grade: 9
// };
// 1. Muestra student.name
// 2. Muestra student["grade"]

const student = {
  name: 'Laura',
  grade: 9,
}

console.log(student.name)
console.log(student['grade'])

// Ejercicio 4: Añade nuevas propiedades
// Crea un objeto movie con las propiedades:
// • title
// • year
// Después añade:
// • director
// • duration
// Muestra el objeto final.

const movie = {
  title: 'Cómo entrenar a tu dragón',
  year: 2010,
}

movie.director = 'Chris Sanders, Dean DeBlois'
movie.duration = '1h 38m'

console.log(movie)

// Ejercicio 5: Añade un método
// Crea un objeto calculator con:
// • a: 10
// • b: 5
// • sum(): devuelve a + b
// Muestra por consola calculator.sum().

const calculator = {
  a: 10,
  b: 5,
  sum() {
    return this.a + this.b
  },
}

console.log(calculator.sum())

// Ejercicio 6: toString heredado
// Crea un objeto vacío y muestra:
// console.log(objeto.toString())
// Explica qué aparece y por qué.

const object = {}
console.log(object.toString())

// Ejercicio 7: Sobrescribir toString
// Crea un objeto player con:
// • name: "Alex"
// • life: 7
// • totalLife: 12
// • Un método toString() personalizado que muestre:
// "Alex (7/12)"
// Prueba:
// console.log("Jugador: " + player);

const player = {
  name: 'Alex',
  life: 7,
  totalLife: 12,
  toString() {
    return `${this.name} (${this.life}/${this.totalLife})`
  },
}

console.log('Jugador: ' + player)

// Ejercicio 8: Convertir JSON a objeto
// Convierte este string JSON en objeto:
// const json = `{
//  "name": "Mario",
//  "coins": 150
// }`;
// Accede a sus propiedades.

const json = `{
  "name": "Mario",
  "coins": 150
}`

const object1 = JSON.parse(json)

console.log(object.name)
console.log(object.coins)

// Ejercicio 9: Convertir objeto a JSON
// Convierte a JSON el objeto:
// const book = {
//  title: "1984",
//  author: "George Orwell",
//  pages: 328
// };
// Muestra el JSON resultante.

const book1 = {
  title: '1984',
  author: 'George Orwell',
  pages: 328,
}

const json1 = JSON.stringify(book1)

console.log(json1)

// Ejercicio 10: Filtrado e indentado
// Usa JSON.stringify() para:
// 1. Devolver solo la propiedad title
// 2. Devolver todas las propiedades pero indentado a 4 espacios

const book2 = {
  title: '1984',
  author: 'George Orwell',
  pages: 328,
}

const json2 = JSON.stringify(book2, null, 4)

console.log(json2)

// Ejercicio 11: Extraer propiedades
// Dado:
// const user = {
//  name: "Pepe",
//  role: "admin",
//  active: true
// };
// Usa desestructuración para extraer name y role.

const user = {
  name: 'Pepe',
  role: 'admin',
  active: true,
}

const { name1, role } = user

console.log(name1)
console.log(role)

// Ejercicio 12
// Renombra role como type durante la desestructuración.

const user1 = {
  name: 'Pepe',
  role: 'admin',
  active: true,
}

const { name2, type: role1 } = user1

console.log(name2)
console.log(role1)

// Ejercicio 13
// Desestructura el objeto:
// const product = { name: "Laptop" };
// Y asigna valores por defecto:
// • price = 0
// • stock = true

const product = {
  name: 'Laptop',
}

const { name: name3, price = 0, stock = true } = product

console.log(name3)
console.log(price)
console.log(stock)
