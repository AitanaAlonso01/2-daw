console.log('Hola'.toUpperCase())
String.prototype.toUpperCase = () => 'Lo siento no furula la vaina'
console.log('Hola'.toUpperCase())

String.prototype.holaTodos = function () {
  return 'Hola a todos!'
}
console.log('Hola'.holaTodos())

//Objetos son tratados como funciones en JS
console.log(String) // [Function: String]

Array.prototype.pop = function () {
  return this.length
}
const arr = [1, 2, 3, 4, 5]
console.log(arr)
console.log(arr.pop())
console.log(arr)

//Distintas formas de crear Objetos JS
//1 - Constantes y variables
//Creación inicial, que luego se puede variar...
const equipo = {
  nombre: 'Villena CF',
  anyo: 1920,
  diasActivo: function () {
    return ''
  },
}
equipo.estadio = 'La Solana'
console.log(equipo)

//2 - Factory Function - Necesitamos un objeto a retornar SIEMPRE (siempre hay RETURN)
//CLASE
function crearColor(r, v, a) {
  //Parecido a un constructor parametrizado
  const color = {}
  color.rojo = r
  color.verde = v
  color.azul = a
  color.imprimirColor = function () {
    console.log(`rgb(${this.rojo}, ${this.verde}, ${this.azul})`)
  }
  //Siempre tendremos un RETURN
  return color
}

//OBJETOS
let rojo = crearColor(255, 0, 0)
let verde = crearColor(0, 255, 0)
let azul = crearColor(0, 0, 255)
rojo.imprimirColor()
verde.imprimirColor()
azul.imprimirColor()

//3 - Función Constructor - No implica un retorno, todas las modificaciones se pueden hacer a traves del prototype. NEW
function colorNuevo(r, v, a) {
  this.rojo = r
  this.verde = v
  this.azul = a
  this.imprimirColor = function () {
    console.log(`RVA(${this.rojo}, ${this.verde}, ${this.azul})`)
  }
  //No necesitamos un RETURN
}
// Utilizamos NEW para crear nuevos objetos
let colorRojo = new colorNuevo(255, 0, 0)
let colorVerde = new colorNuevo(0, 255, 0)
let colorAzul = new colorNuevo(0, 0, 255)
colorRojo.imprimirColor()
console.log(colorNuevo)

colorNuevo.prototype.imprimirColor2 = () =>
  console.log('Pus no hay colorinchis')
colorAzul.imprimirColor2()

//4 - P.O.O. JS
class Animal {}
