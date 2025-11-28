// 1. Crea un objeto llamado car con las propiedades y muestralo por consola
// • brand
// • model
// • year

var car = {
  brand: 'Ford',
  model: 'fiesta',
  year: 2020,
}

console.log(car)

// 2. Dado este objeto:
// const computer = { brand: "Lenovo", ram: 8, cpu: "i5" };
// Muestra:
// • La marca con notación de punto
// • La RAM con computer["ram"]
console.log('2.------------------------------')

const computer = { brand: 'Lenovo', ram: 8, cpu: 'i5' }

console.log(computer.brand)
console.log(computer['ram'])

// 3. Crea un objeto vacío llamado movie y añádele:
// • title
// • duration
// • genre
// Imprime el resultado
console.log('3.------------------------------')

var movie = {}

movie.title = 'Joker'
movie.duration = 120
movie.genre = 'thriller'

console.log(movie)

// 4. Dado:
// const account = { user: "pepe", balance: 100 };
// Cambia el balance a 250.
console.log('4.------------------------------')

const account = { user: 'pepe', balance: 100 }
account.balance = 250

console.log(account)

// 5. Dado:
// const book = { title: "IT", pages: 1200, author: "Stephen King" };
// Elimina la propiedad pages.
console.log('5.------------------------------')

const book = { title: 'IT', pages: 1200, author: 'Stephen King' }
delete book.pages
console.log(book)

// 6. Crea un objeto circle con:
// • radius
// • método area() que devuelva el área (π * r²)
console.log('6.------------------------------')

var circle = {
  radius: 10,
  area: function () {
    return Math.PI * this.radius * this.radius
  },
}

console.log(circle.area())

// 7. Crea un objeto player con:
// • name
// • points
// Crea un método toString() que devuelva: "<name> tiene <points> puntos"
// Prueba concatenando el objeto en un console.log.
console.log('7.------------------------------')

var player = {
  name: 'Pepe',
  points: 100,
  toString: function () {
    return this.name + ' tiene ' + this.points + ' puntos'
  },
}

console.log(player)
console.log(player.toString())

// 8. Convierte este JSON a objeto:
// const json = '{"product":"Teclado","price":25}';
// Muestra sus propiedades.
console.log('8.------------------------------')

const json = '{"product":"Teclado","price":25}'
const objeto = JSON.parse(json)

console.log(objeto)

// 9. Convierte este objeto en JSON:
// const teacher = { name: "Laura", subject: "DWEC" };
console.log('9.------------------------------')

const teacher = { name: 'Laura', subject: 'DWEC' }

console.log(JSON.stringify(teacher))

// 10. Dado:
// const settings = { theme: "dark", sound: true };
// Crea un nuevo objeto copySettings usando spread y añade la propiedad:
// • language: "es"
console.log('10.------------------------------')

const settings = { theme: 'dark', sound: true }
const copySettings = { ...settings, language: 'es' }

console.log(copySettings)

// 11. Dado el siguiente objeto, extrae name y city mediante desestructuración
// const user = { name: "Carlos", age: 22, city: "Sevilla" };
console.log('11.------------------------------')

const user = { name: 'Carlos', age: 22, city: 'Sevilla' }

const { name: nameUser, city } = user

console.log(nameUser, city)

// 12. Dado:
// const product = { name: "Monitor" };
// Extrae:
// • name
// • price (con valor por defecto 0)
console.log('12.------------------------------')

const product = { name: 'Monitor' }

const { name, price = 0 } = product

console.log(name)

// 13. Dado el siguiente objeto, Extrae nombre y mete el resto de propiedades en un
// objeto otros
// const alumno = {
//  nombre: "Marta",
//  curso: "2º DAW",
//  edad: 20,
//  nota: 9
// };
console.log('13.------------------------------')

const alumno = {
  nombre: 'Marta',
  curso: '2º DAW',
  edad: 20,
  nota: 9,
}

const { nombre, ...otros } = alumno

console.log(nombre)
console.log(otros)

// 14. Dado el siguiente objeto, muestra la vida (life) y la energía (energy)
// const game = {
//  name: "Zelda",
//  stats: {
//  life: 5,
//  energy: 90
//  }
// };
console.log('14.------------------------------')

const game = {
  name: 'Zelda',
  stats: {
    life: 5,
    energy: 90,
  },
}

console.log(game.stats.life)
console.log(game.stats.energy)

// 15. Dado el siguiente objeto, grupa los alumnos por su grupo
// const alumnos = [
//  { name: "Ana", group: "A" },
//  { name: "Luis", group: "B" },
//  { name: "Marta", group: "A" },
//  { name: "Pedro", group: "B" }
// ];
console.log('15.------------------------------')

const alumnos = [
  { name: 'Ana', group: 'A' },
  { name: 'Luis', group: 'B' },
  { name: 'Marta', group: 'A' },
  { name: 'Pedro', group: 'B' },
]

// const grupos = alumnos.reduce((acc, alumno) => {
//   if (!acc[alumno.group]) {
//     acc[alumno.group] = []
//   }
//   acc[alumno.group].push(alumno.name)
//   return acc
// }, {})

/* USANDO GROUP BY */
const grupos = Object.groupBy(alumnos, alumno => alumno.group)

console.log(grupos)
