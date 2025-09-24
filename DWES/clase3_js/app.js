// 1 - Función DECLARACIÓN - Se puede llamar antes y después de su declaración
sumar(2, 3)
function sumar(a, b) {
  let suma = a + b
  console.log(suma)
  //return undefined implícito
  return suma
}
sumar(15, 2)
console.log(sumar(3, 4))

const SALUDANDO = saludar('Jimmy', 'Hopkins')
console.log(SALUDANDO)
function saludar(nombre, apellidos) {
  return `Hola ${nombre} ${apellidos}`
}
console.log(saludar('Jimmy', 'Hopkins'))

//Ámbitos (scope)
let nombre = 'Aitana' //ámbito global

function saludarAitana() {
  let nombre = 'Paco' //ámbito local
  console.log(nombre)
  if (nombre === 'Paco') {
    let nombre = 'Juan' //ámbito local al IF
    console.log(nombre)
  }
}
saludarAitana()
console.log(nombre)

//2 - Función EXPRESSION - Sólo se pueden utilizar una vez inicializadas
/*
  function cuadradoNum(num) {
    return num ** 2
  }
  console.log(cuadradoNum(7))
*/

//console.log(cuadradoNum(7)) -- no se podria llamar antes de inicializar la función abajo
const cuadradoNum = function (num) {
  return num ** 2
}
console.log(cuadradoNum(7))

//Operaciones entre funciones
//Funciones son, como los arrays, objetos...
//Podemos pasar una funcion como PARÁMETRO de otra FUNCIÓN
const decirHola = function (num) {
  console.log(`Hola! ${num}`)
}

function holaVariasVeces(f) {
  for (let i = 0; i < 10; i++) {
    f(i)
  }
}

holaVariasVeces(decirHola)

//Devolver una función dentro de otra (return function)
function multiplicar(x, y) {
  //return x*y
  return function (res) {
    return (res = x * y)
  }
}

let resultado = multiplicar(3, 4)
console.log(resultado())

function makeBetweenFunc(min, max) {
  return function (val) {
    return val >= min && val <= max
  }
}
const enRango = makeBetweenFunc(18, 100)
console.log(enRango(15))
console.log(enRango(18))
console.log(enRango(101))

//Objetos y Funciones
const equipo = {
  nombre: 'Madrid',
  anyoFundacion: 1895,
  vida() {
    return new Date().getFullYear() - this.anyoFundacion + ' años'
  },
  anyosVida: function () {
    return new Date().getFullYear() - this.anyoFundacion + ' años'
  },
}
console.log(equipo.vida())
console.log(equipo.anyosVida())

//Operaciones FUNCTION con ARRAYs
//Funciones CALLBACK
//Función anónima que se pasa por parámetro y que se ejecuta una vez por cada elemento del array
const numeros = [1, 2, 3, 4, 5]
const numerosNegativos = numeros.forEach(function (item) {
  console.log(item * -1)
})

const nombres = ['Aitana', 'Paco', 'Juan']
const aMayusculas = nombres.map(function (item) {
  return item.toUpperCase()
})
console.log(aMayusculas)

//3 - Funciones ARROW (Flecha) --> Expresiones LAMBDA
const cuadrado = x => {
  return x ** 2
}
console.log(cuadrado(7))

const suma = (x, y) => {
  console.log(x + y)
}
console.log(suma(2, 4)) //Undefined

const suma2 = (x, y) => x + y //Return inplícito de la única linea de código que hay
console.log(suma2(2, 4))

const suma3 = (x, y) => {
  x + y
}
console.log(suma3(2, 4)) //Undefined

const cuadrado2 = x => x ** 2
console.log(cuadrado2(5))

const hola = () => 'Hola!'
console.log(hola())

//RESUMEN
console.log(
  '--------------------------------------- RESUMEN ---------------------------------------'
)
//1 - Declaración
console.log(esPar(5))
function esPar(num) {
  return num % 2 === 0
}
console.log(esPar(2))

//2 - Expresión
const esPar2 = function (num) {
  return num % 2 === 0
}
console.log(esPar2(2))

//3 - Arrow LAMBDA
const esPar3 = num => {
  return num % 2 == 0
}
const esPar4 = num => num % 2 == 0

//Funciones ANÓNIMAS
/*function(){
}*/ //Las funciones declaración NO pueden ser anónimas, necesitan un identificador
const digaHola = function () {
  console.log('Hola!')
}
const digaHolaLambda = () => 'Hola!'
const digaHolaLamda2 = () => {
  return 'Hola!'
}

//Más funciones con ARRAYs y LAMBDA
const nombres2 = ['Aurelio', 'Laudelino', 'Dolores', 'Lourdes']
const buscarLambda = nombres2.find(item => item.indexOf('L') === 0)
console.log(buscarLambda)
const buscarLambda2 = nombres2.find(item => {
  item.indexOf('L') === 0
})

const aMayusculas2 = nombres2.map(item => item.toUpperCase())
console.log(aMayusculas2)

//filter --> Obtened TODAS las ocurrencias que incluyan la letra L
const buscarLambdaTodas = nombres2.filter(item => item.indexOf('L') === 0)
console.log(buscarLambdaTodas)
const buscarLambdaTodas2 = nombres2.filter(item =>
  item.toUpperCase().includes('L')
)
console.log(buscarLambdaTodas2)

const everyName = nombres2.every(item => item.includes('o'))
console.log(everyName)
const someName = nombres2.some(item => item.toUpperCase().includes('L'))
console.log(someName)

console.log(
  '------------------------------------------------------------------------------'
)

// Operador ternario
let edad = 21
if (edad >= 18) {
  console.log('Eres mayor de edad')
} else {
  console.log('Eres menor de edad')
}

edad >= 18 // condición
  ? console.log('Eres mayor de edad') // if
  : console.log('Eres menor de edad') // else

// Parámetros por defecto
function multiplicarDefecto(a = 0, b = 0) {
  console.log(a * b)
}
multiplicarDefecto(2, 4)
multiplicarDefecto()

const numeros1 = [1, 2, 3]
const numeros2 = [4, 5, 6]
// ... Operador Spread o Rest
const resultadoNum = ['Paco', 'Juan', ...numeros1, ...numeros2, 7, 8, 9]
console.log(resultadoNum)

// function sumaTotal1(a, b, c) {}
// function sumaTotal1(a, b, c, d, e) {}

// Número indefinido de parámetros
// Alternativa a la sobrecarga de operadores o polimorfismo
function sumaTotal(...numeros) {
  let total = 0
  for (let n of numeros) {
    total += n
  }
  console.log(total)
}
sumaTotal(1, 2, 3)
sumaTotal(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
