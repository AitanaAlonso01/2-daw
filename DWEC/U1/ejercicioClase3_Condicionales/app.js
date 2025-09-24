//IMPORTANTE: No utilizar funciones. Resolver todo con estructuras básicas (if, if else, else if, switch).
//Ejercicios con IF
//1. Declara una variable numérica y comprueba si es mayor que 10. Si lo es, muestra por consola 'Es mayor que 10'.
var num = 11
if (num > 10) {
  console.log('Es mayor que 10')
}

//2. Declara dos variables numéricas. Comprueba si la primera es divisible por la segunda. Si lo es, muestra 'Es divisible'.
var num1 = 10
var num2 = 5
if (num1 % num2 == 0) {
  console.log('Es divisible')
}

//3. Declara una variable con una edad. Comprueba si la edad es mayor o igual a 18 y menor o igual a 65. Si cumple la condición, muestra 'Edad válida para trabajar'.
var edad = 25
if (edad >= 18 && edad <= 65) {
  console.log('Edad válida para trabajar')
}

//Ejercicios con IF ELSE
// 4. Declara una variable con un número. Si es positivo muestra 'Número positivo', si no muestra 'Número negativo o cero'.
var num = 10
if (num > 0) {
  console.log('Número positivo')
} else {
  console.log('Número negativo o cero')
}

//5. Declara una variable con una nota del 0 al 10. Si la nota es mayor o igual a 5 muestra 'Aprobado', en caso contrario 'Suspenso'
var nota = 8
if (nota >= 5) {
  console.log('Aprobado')
} else {
  console.log('Suspenso')
}

//6. Declara una variable con la temperatura. Si es menor a 0 muestra 'Hace frío', en caso contrario muestra 'Temperatura positiva'.
var temperatura = 10
if (temperatura < 0) {
  console.log('Hace frío')
} else {
  console.log('Temperatura positiva')
}

//Ejercicios con ELSE IF
//7. Declara una variable con un número del 1 al 7 y muestra el día de la semana correspondiente (1 = Lunes, 7 = Domingo).
var diaSemana = 3
if (diaSemana == 1) {
  console.log('Lunes')
} else if (diaSemana == 2) {
  console.log('Martes')
} else if (diaSemana == 3) {
  console.log('Miércoles')
} else if (diaSemana == 4) {
  console.log('Jueves')
} else if (diaSemana == 5) {
  console.log('Viernes')
} else if (diaSemana == 6) {
  console.log('Sábado')
} else if (diaSemana == 7) {
  console.log('Domingo')
}

//8. Declara una variable con una nota del 0 al 10. Muestra: 'Suspenso' (<5), 'Aprobado' (5-6), 'Notable' (7-8), 'Sobresaliente' (9-10).
var nota = 8
if (nota >= 5) {
  console.log('Aprobado')
} else if (nota >= 7) {
  console.log('Notable')
} else if (nota >= 9) {
  console.log('Sobresaliente')
} else {
  console.log('Suspenso')
}

//9. Declara una variable con la edad de una persona. Clasifícala en: 'Niño' (0-12), 'Adolescente' (13-17), 'Adulto' (18-64), 'Mayor' (65+).
var edad = 25
if (edad >= 0 && edad <= 12) {
  console.log('Niño')
} else if (edad >= 13 && edad <= 17) {
  console.log('Adolescente')
} else if (edad >= 18 && edad <= 64) {
  console.log('Adulto')
} else {
  console.log('Mayor')
}

//Ejercicios con SWITCH
//10. Declara una variable con un número del 1 al 3 y muestra en consola 'Uno', 'Dos' o 'Tres'.
var numero = 2
switch (numero) {
  case 1:
    console.log('Uno')
    break
  case 2:
    console.log('Dos')
    break
  case 3:
    console.log('Tres')
    break
  default:
    console.log('Error')
}

//11. Declara una variable con el nombre de un color ('rojo', 'azul', 'verde') y muestra un mensaje distinto para cada color
var color = 'rojo'
switch (color) {
  case 'rojo':
    console.log('El color es rojo')
    break
  case 'azul':
    console.log('El color es azul')
    break
  case 'verde':
    console.log('El color es verde')
    break
  default:
    console.log('El color es invalido')
}

//12. Declara una variable con un número del 1 al 12 y muestra el mes correspondiente.
var mes = 3
switch (mes) {
  case 1:
    console.log('Enero')
    break
  case 2:
    console.log('Febrero')
    break
  case 3:
    console.log('Marzo')
    break
  case 4:
    console.log('Abril')
    break
  case 5:
    console.log('Mayo')
    break
  case 6:
    console.log('Junio')
    break
  case 7:
    console.log('Julio')
    break
  case 8:
    console.log('Agosto')
    break
  case 9:
    console.log('Septiembre')
    break
  case 10:
    console.log('Octubre')
    break
  case 11:
    console.log('Noviembre')
    break
  case 12:
    console.log('Diciembre')
    break
  default:
    console.log('Error')
}
