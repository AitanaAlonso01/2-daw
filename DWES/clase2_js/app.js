let div = 0 / 0
console.log(div)

// NaN = Not a Number
if (isNaN(div)) {
  console.log('Error al dividir por cero')
} else {
  console.log('OK')
}

// null vs undefined
let user
console.log(user) // valor por defecto es undefined

if (user === undefined) {
  console.log('Variable no definida')
} else {
  console.log('OK')
}

let userLogueado = null
if (userLogueado === null) {
  console.log('Abrir pantalla de LOGIN')
  //Simulamos el proceso de Login
  userLogueado = 'Manolito'
} else {
  console.log(`Bienvenido ${userLogueado}`)
}

if (!userLogueado) {
  //(userLogueado===null) o (userLogueado===undefined)
  console.log('Abrir pantalla de LOGIN')
  //Simulamos el proceso de Login
  userLogueado = 'Manolito'
} else {
  console.log(`Bienvenido ${userLogueado}`)
}

if (userLogueado) {
  //(userLogueado != null) o (userLogueado != undefined)
  console.log(`Bienvenido ${userLogueado}`)
} else {
  console.log('Abrir pantalla de LOGIN')
  //Simulamos el proceso de Login
  userLogueado = 'Manolito'
}

/*
let num = prompt("Ingrese un numero");
console.log(num);
console.log(parseInt(num)); //parseInt devuelve un numero entero
console.log(parseFloat(num)); //parseFloat devuelve un numero decimal */

/*
let condition = false;

do{
  let num = prompt("Ingrese un numero");
  if(isNaN(parseInt(num))){
    condition = false;
    console.log("El numero ingresado no es un numero");
  }else{
    console.log(`El numero ingresado es: ${parseInt(num)}`);
    condition = true;
  }
}while(condition===false); */

let aa = 2
let bb = '2'

if (aa == bb) {
  //!=
  console.log('Iguales')
} else {
  console.log('Distintos')
}

if (aa === bb) {
  console.log('Iguales')
} else {
  console.log('Distintos')
}

let cc = 3 //!==
// aa = cc;
if ((aa = cc)) {
  //Típico error (utilizar la asignación como comparación)
  console.log('Iguales')
} else {
  console.log('Distintos')
}
console.log(aa)

let puntuacion = 6
if (puntuacion <= 5) {
  console.log('Insuficiente')
} else if (puntuacion >= 5 && puntuacion <= 8) {
  console.log('Notable')
} else {
  console.log('Excelente')
}

//condicion AND (aa == bb && aa == cc)
//condicion OR (aa == bb || aa == cc)
//condicion NOR (!=)

switch (puntuacion) {
  case 0:
  case 1:
  case 2:
  case 3:
  case 4:
    console.log('Insuficiente')
    break
  case 5:
    console.log('Suficiente')
    break
  case 6:
    console.log('Bien')
    break
  case 7:
  case 8:
    console.log('Notable')
    break
  default:
    console.log('Sobresaliente')
}

// ARRAYS...
let array1 = []
console.log(array1)

let colores = ['Rojo', 'Verde', 'Azul', 'Amarillo']
console.log(colores)
console.log(colores[0])

let numeros = [1, 2, 3, 4, 5]
console.log(numeros)
console.log(numeros[3])

let varios = ['Hola', 2, true, null, undefined, 'Adios']
console.log(varios)

varios.push('Manolito') //Añadir un elemento al final del array
console.log(varios)

varios.pop() //Eliminar el último elemento del array
console.log(varios)

varios.unshift('Inicio') //Agregar un elemento al principio del array
console.log(varios)

varios.shift() //Eliminar el primer elemento del array
console.log(varios)

console.log(numeros.sort()) //Ordenar un array
console.log(varios.sort())

// MATRICES...
const tablero = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]
console.log(tablero)
console.log(tablero[2])
console.log(tablero[1][2])
tablero[1][2] = 36
console.log(tablero)
tablero[3] = [10, 11, 12]
console.log(tablero)
// tablero = no se puede hacer, por ser asignación CONST
tablero[0][1] = 'Manolito'
console.log(tablero)

let arr = [1, 2, 3]
console.log(arr)
arr = [111, 222, 333]
console.log(arr)

const equipos = ['Barcelona', 'Real Madrid', 'Betis']
console.log(equipos.length) //propiedad, no función
console.log(equipos[2])

const equipos2 = new Array(3)
console.log(equipos2)
equipos2[1] = 'Caudetano'
console.log(equipos2)

// OBJECTS - JSON (JavaScript Object Notation)
// BSON (Binary JSON)
const equipoFutbol = {
  nombre: 'Sevilla CF',
  ciudad: 'Sevilla, España',
  anyoFundacion: 1900,
  esPrimera: true,
  presupuesto: 1000000.79,
  jugadores: [
    {
      nombreJugador: 'Navas',
      edad: 35,
    },
    {
      nombreJugador: 'Romeu',
      edad: 20,
    },
  ],
  palmares: {
    ligas: 7,
    copas: 10,
    uefas: 12,
    champions: null,
  },
}
console.log(equipoFutbol)
console.log(equipoFutbol.ciudad)
console.log(equipoFutbol.jugadores)
console.log(equipoFutbol.jugadores[1])
console.log(equipoFutbol.jugadores[1].nombreJugador)
console.log(equipoFutbol.palmares)
equipoFutbol.palmares.uefas++ // incrementar con ++ o = (asignación) 13
console.log(equipoFutbol.palmares)

const equiposPrimera = [
  {
    nombre: 'Real Madrid CF',
    champions: 15,
    jugadores: ['Vinicius', 'Mbappe', 'Bellingham'],
  },
  {
    nombre: 'FC Barcelona',
    champions: 5,
    estadio: 'Johan Cruyff',
  },
  {
    nombre: 'Atlético de Madrid',
    champions: null,
  },
]
console.log(equiposPrimera)

// recorrer un array
for (let i = 0; i < equiposPrimera.length; i++) {
  console.log(equiposPrimera[i])
}

equiposPrimera[2].estadio = 'Metropolitano'
console.log('FOR EACH-----------------------------')
for (let equipo of equiposPrimera) {
  // console.log(equipo)
}
