const mates = require('./mates')
//npm (Node Package Module)
const figlet = require('figlet') //npm i figlet
const colores = require('colors') //npm i colors

console.log(mates.s(10, 4))
console.log(mates.c(5))

figlet('Hello everybody!', (error, datos) => {
  if (error) {
    console.log(colores.red(error))
  } else {
    console.log(colores.trap(datos))
  }
})
