// EJERCICIOS Set/Map/WeakSet/WeakMap/Symbol
// Ejercicio 1_ Dado un array con números repetidos, crea un Set que elimine los
// duplicados.
console.log(
  'Ejercicio 1--------------------------------------------------------------------------------'
)
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const set1 = new Set(numeros)
console.log(set1)

// Ejercicio 2_ Crea un Map que almacene nombres de personas y sus edades, luego
// obtén la edad de “Juan”.
console.log(
  'Ejercicio 2--------------------------------------------------------------------------------'
)
const map1 = new Map()
map1.set('Juan', 25)
map1.set('Pedro', 30)
map1.set('Luis', 35)
console.log(map1.get('Juan'))

// Ejercicio 3_ Crea un WeakMap que guarde información privada de un objeto persona.
console.log(
  'Ejercicio 3--------------------------------------------------------------------------------'
)
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre
    this.edad = edad
  }
}

const persona = new Persona('Juan', 25)
const weakMap1 = new WeakMap()
weakMap1.set(persona, { edad: 25, nombre: 'Juan' })
console.log(weakMap1.get(persona))

// Ejercicio 4_ Crea un Symbol y úsalo como propiedad única de un objeto.
console.log(
  'Ejercicio 4--------------------------------------------------------------------------------'
)
const symbol1 = Symbol('nombre')
const persona1 = new Persona('Juan', 25)
persona1[symbol1] = 'Juan'
console.log(persona1[symbol1])

// Ejercicio 5_ Crea un Set con algunos números y comprueba si el número 5 está en él.
console.log(
  'Ejercicio 5--------------------------------------------------------------------------------'
)
const set2 = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
console.log(set2.has(5))

// Ejercicio 6_Crea un Set con nombres y elimina uno de ellos.
console.log(
  'Ejercicio 6--------------------------------------------------------------------------------'
)
const set3 = new Set(['Juan', 'Pedro', 'Luis', 'Juan'])
set3.delete('Juan')
console.log(set3)

// Ejercicio 7_Crea un Map con nombres y edades y actualiza la edad de “Ana”.
console.log(
  'Ejercicio 7--------------------------------------------------------------------------------'
)
const map2 = new Map()
map2.set('Juan', 25)
map2.set('Pedro', 30)
map2.set('Luis', 35)
map2.set('Ana', 25)
console.log(map2.get('Ana'))

// Ejercicio 8_Crea un Map con algunos datos y recorre solo las claves y luego solo los
// valores.
console.log(
  'Ejercicio 8--------------------------------------------------------------------------------'
)
const map3 = new Map()
map3.set('Juan', 25)
map3.set('Pedro', 30)
map3.set('Luis', 35)
map3.set('Ana', 25)
for (const clave of map3.keys()) {
  console.log(clave)
}
for (const valor of map3.values()) {
  console.log(valor)
}

// Ejercicio 9_ Crea un objeto con dos propiedades usando Symbol y muéstralas.
console.log(
  'Ejercicio 9--------------------------------------------------------------------------------'
)
const symbol2 = Symbol('nombre')
const symbol3 = Symbol('edad')
const persona2 = new Persona('Juan', 25)
persona2[symbol2] = 'Juan'
persona2[symbol3] = 25
console.log(persona2)

// Ejercicio 10_Dado un array con duplicados, conviértelo en un Set para eliminar
// duplicados y luego vuelve a convertirlo en un array.
console.log(
  'Ejercicio 10--------------------------------------------------------------------------------'
)
const numeros2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const set4 = new Set(numeros2)
console.log(Array.from(set4))

// Ejercicio 11_Crea un Map con productos y precios, y comprueba si existe el producto
// “Manzana”.
console.log(
  'Ejercicio 11--------------------------------------------------------------------------------'
)
const map4 = new Map()
map4.set('Manzana', 3.5)
map4.set('Platano', 2.5)
map4.set('Pera', 2)
map4.set('Kiwi', 1.5)
console.log(map4.has('Manzana'))

// Ejercicio 12_ Crea un Map con nombres y edades y elimina el nombre “Luis”.
console.log(
  'Ejercicio 12--------------------------------------------------------------------------------'
)
const map5 = new Map()
map5.set('Juan', 25)
map5.set('Pedro', 30)
map5.set('Luis', 35)
map5.set('Ana', 25)
map5.delete('Luis')
console.log(map5)

// Ejercicio 13_Crea un WeakMap que almacene la edad de un objeto persona y accede
// a ella.
console.log(
  'Ejercicio 13--------------------------------------------------------------------------------'
)
class Persona13 {
  constructor(nombre, edad) {
    this.nombre = nombre
    this.edad = edad
  }
}

const persona13 = new Persona13('Atana', 18)
const weakMap2 = new WeakMap()
weakMap2.set(persona13, { edad: 19, nombre: 'Aitana' })
console.log(weakMap2.get(persona13))

// Ejercicio 14_Crea un Set con algunos colores y recórrelo usando forEach.
console.log(
  'Ejercicio 14--------------------------------------------------------------------------------'
)
const set6 = new Set(['Rojo', 'Verde', 'Azul', 'Amarillo'])
set6.forEach(color => {
  console.log(color)
})

// Ejercicio 15_Set + Map – Dado un array de palabras, usa Set y Map para contar
// cuántas veces aparece cada palabra.
console.log(
  'Ejercicio 15--------------------------------------------------------------------------------'
)

const palabrasRepeatidas = [
  'harry',
  'hogwarts',
  'varita',
  'gryffindor',
  'harry',
  'potter',
  'quidditch',
  'varita',
  'dumbledore',
  'harry',
  'hechizo',
]

const set7 = new Set(palabrasRepeatidas)
const map8 = new Map()

palabrasRepeatidas.forEach(palabra => {
  map8.set(palabra, (map8.get(palabra) || 0) + 1)
})

console.log(map8)

// Ejercicio 16_ Map + Symbol –Crea un usuario con ID único usando Symbol y
// guárdalo en un Map.
console.log(
  'Ejercicio 16--------------------------------------------------------------------------------'
)
class Usuario16 {
  constructor(id) {
    this.id = id
  }
}

const map9 = new Map()
const symbol4 = Symbol('id')
const usuario = new Usuario16(1)
usuario[symbol4] = 1
map9.set(usuario, usuario)
console.log(map9)

// Ejercicio 17_ WeakMap avanzado –Guarda información privada de varias
// personas en un WeakMap y elimina uno.
console.log(
  'Ejercicio 17--------------------------------------------------------------------------------'
)
const infoPrivada = new WeakMap()

const persona17_1 = { nombre: 'Ana' }
const persona17_2 = { nombre: 'Luis' }
const persona17_3 = { nombre: 'Marta' }

infoPrivada.set(persona17_1, { edad: 30, clave: 'A1' })
infoPrivada.set(persona17_2, { edad: 25, clave: 'B2' })
infoPrivada.set(persona17_3, { edad: 28, clave: 'C3' })

infoPrivada.delete(persona17_2)

console.log(infoPrivada.has(persona17_1))
console.log(infoPrivada.has(persona17_2))
console.log(infoPrivada.has(persona17_3))

// Ejercicio 18_Ejercicio integrador – Set + Map + WeakMap + Symbol:
// Crea un sistema simple de usuarios evitando duplicados, asignando ID único y datos
// privados.
console.log(
  'Ejercicio 18--------------------------------------------------------------------------------'
)

const usuarios = new Map()
const set8 = new Set()
const weakMap3 = new WeakMap()
const symbol5 = Symbol('id')

class Usuario18 {
  constructor(nombre, edad) {
    this.nombre = nombre
    this.edad = edad
    this[symbol5] = crypto.randomUUID()
  }
}

function crearUsuario(nombre, edad) {
  for (const u of set8) {
    if (u.nombre === nombre && u.edad === edad) {
      return u
    }
  }

  const usuario = new Usuario18(nombre, edad)

  weakMap3.set(usuario, {
    creado: Date.now(),
    privado: true,
  })

  set8.add(usuario)
  usuarios.set(usuario[symbol5], usuario)

  return usuario
}

function obtenerId(usuario) {
  return usuario[symbol5]
}

function obtenerDatos(usuario) {
  return weakMap3.get(usuario)
}

function obtenerUsuario(id) {
  return usuarios.get(id)
}

function obtenerUsuarios() {
  return [...usuarios.values()]
}

function obtenerUsuariosSinEdad(edad) {
  return [...usuarios.values()].filter(u => u.edad !== edad)
}

function obtenerUsuariosConEdad(edad) {
  return [...usuarios.values()].filter(u => u.edad === edad)
}

function obtenerUsuariosConNombre(nombre) {
  return [...usuarios.values()].filter(u => u.nombre === nombre)
}

// -------------------------
// PRUEBAS EN CONSOLA
// -------------------------

const u1 = crearUsuario('Ana', 30)
const u2 = crearUsuario('Luis', 25)
const u3 = crearUsuario('Ana', 30) // duplicado → devuelve u1

console.log('Usuarios creados:')
console.log(u1)
console.log(u2)
console.log(u3)

console.log('ID de u1:', obtenerId(u1))
console.log('ID de u2:', obtenerId(u2))

console.log('Datos privados de u1:', obtenerDatos(u1))

console.log('Buscar usuario por ID de u2:', obtenerUsuario(obtenerId(u2)))

console.log('Todos los usuarios:', obtenerUsuarios())

console.log('Usuarios con edad 30:', obtenerUsuariosConEdad(30))
console.log('Usuarios sin edad 25:', obtenerUsuariosSinEdad(25))

console.log("Usuarios con nombre 'Ana':", obtenerUsuariosConNombre('Ana'))
