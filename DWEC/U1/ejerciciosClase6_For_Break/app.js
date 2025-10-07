//EJERCICIOS CLASE (FOR Y BREAK)
//SIN USAR FUNCIONES

// 1. El programa pedirá introducir un nº desde una ventana de prompt y calculará el factorial de dicho nº. El factorial de un nº se representa matemáticamente con el símbolo! y es el resultado de multiplicar ese nº por todos los que le preceden. Por ejemplo 5!=5x4x3x2x1, es decir, 5!=120. El programa debe utilizar un bucle for para hallar el resultado y mostrar este en el documento web.
const numero = prompt('Ej.1: Introduce un número')
let factorial = 1
for (let i = 1; i <= numero; i++) {
  factorial = factorial * i
}
document.write(`El factorial de ${numero} es ${factorial}.<br><br>`)

// 2. Crea un programa que pida mediante ventanas de prompt 2 números. El
// programa debe mostrar los 3 primeros números primos comprendidos en el
// rango de los números introducidos. Por ejemplo: Si introducimos como
// primer número un 5 y como segundo número un 20, el programa debe
// mostrar los 3 primeros números primos comprendidos entre 5 y 20, es
// decir, “5 7 11”. Debes incluir en tu programa la instrucción “break”. En la
// página siguiente, una de las posibles soluciones

const numero1 = prompt('Ej.2: Introduce un número')
const numero2 = prompt('Ej.2: Introduce otro número')
let primos = []
for (let i = numero1; i <= numero2; i++) {
  let esPrimo = true
  for (let j = 2; j <= Math.sqrt(i); j++) {
    if (i % j === 0) {
      esPrimo = false
      break
    }
  }
  if (esPrimo) {
    if (primos.length < 3) {
      primos.push(i)
    } else {
      break
    }
  }
}

document.write(
  `Los ${primos.length} primeros números primos comprendidos entre ${numero1} y ${numero2} son: ${primos}.`
)
