// EJERCICIOS BASICOS DE
// EXPRESIONES REGULARES
// 1. Comprueba si el texto Planta 45 contiene algún número.
console.log('Ejercicio 1')
const texto1 = 'Planta 45'
const num1 = texto1.match(/\d/)
console.log(num1)

// 2. Comprueba si el texto hoja está formado solo por letras minúsculas.
console.log('Ejercicio 2')
const texto2 = 'hoja'
const letras2 = texto2.match(/[a-z]/)
console.log(letras2)

// 3. Comprueba si el texto Flor roja empieza por la palabra "Flor".
console.log('Ejercicio 3')
const texto3 = 'Flor roja'
const palabra3 = texto3.match(/^Flor/)
console.log(palabra3)

// 4. Comprueba si el nombre del archivo planta.js termina en .js.
console.log('Ejercicio 4')
const nombre4 = 'planta.js'
const ext4 = nombre4.match(/\.js$/)
console.log(ext4)

// 5. Comprueba si el texto 28080 contiene exactamente 5 números.
console.log('Ejercicio 5')
const texto5 = '28080'
const num5 = texto5.match(/\d{5}/)
console.log(num5)

// 6. Comprueba si el texto Rosa blanca contiene algún espacio.
console.log('Ejercicio 6')
const texto6 = 'Rosa blanca'
const espacio6 = texto6.match(/\s/)
console.log(espacio6)

// 7. Comprueba si la palabra girasol tiene entre 3 y 10 letras.
console.log('Ejercicio 7')
const palabra7 = 'girasol'
const longitud7 = palabra7.match(/\w+/g)
console.log(longitud7)

// 8. Comprueba si el texto 12345 está formado solo por números.
console.log('Ejercicio 8')
const texto8 = '12345'
const num8 = texto8.match(/\d+/)
console.log(num8)

// 9. Obtén todas las vocales que aparecen en el texto Planta Verde
console.log('Ejercicio 9')
const texto9 = 'Planta Verde'
const vocales9 = texto9.match(/[aeiou]/g)
console.log(vocales9)

// 10. Comprueba si el texto Raiz profunda contiene la palabra "raiz" sin importar mayúsculas.
console.log('Ejercicio 10')
const texto10 = 'Raiz profunda'
const palabra10 = texto10.match(/raiz/i)
console.log(palabra10)

// 11. Comprueba si el nombre de la planta Orquidea:
console.log('Ejercicio 11')
const nombre11 = 'Orquidea'
const nombre11Match = nombre11.match(/orquidea/i)
console.log(nombre11Match)

// 12. Comprueba si el código Planta123 tiene al menos 8 caracteres y solo letras y números.
console.log('Ejercicio 12')
const codigo12 = 'Planta123'
const codigo12Match = codigo12.match(/^[a-zA-Z0-9]{8}$/)
console.log(codigo12Match)

// 13. Comprueba si el número de registro 123456789 tiene 9 números.
console.log('Ejercicio 13')
const numero13 = '123456789'
const numero13Match = numero13.match(/\d{9}/)
console.log(numero13Match)

// 14. Comprueba si la fecha de plantación 12/03/2024 tiene el formato dd/mm/yyyy.
console.log('Ejercicio 14')
const fecha14 = '12/03/2024'
const fecha14Match = fecha14.match(/^\d{2}\/\d{2}\/\d{4}$/)
console.log(fecha14Match)

// 15. Obtén el número del lote a partir del texto Lote planta 345.
console.log('Ejercicio 15')
const texto15 = 'Lote planta 345'
const numero15 = texto15.match(/\d+/)
console.log(numero15)

// 16. Comprueba si el correo del vivero info@vivero.com es válido.
console.log('Ejercicio 16')
const correo16 = 'info@vivero.com'
const correo16Match = correo16.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/)
console.log(correo16Match)

// 17. Obtén el nombre común y el nombre científico de la planta Rosa Canina.
console.log('Ejercicio 17')
const planta17 = 'Rosa Canina'
const nombre17 = planta17.match(/Rosa\s+([a-zA-Z]+)/)
const nombreCientífico17 = planta17.match(/Rosa\s+([a-zA-Z]+)\s+Canina/)
console.log(nombre17)
console.log(nombreCientífico17)

// 18. Obtén el nombre y la familia de la planta Lavanda Lamiaceae usando identificadores.
console.log('Ejercicio 18')
const planta18 = 'Lavanda Lamiaceae'
const nombre18 = planta18.match(/([a-zA-Z]+)\s+([a-zA-Z]+)/)
const familia18 = planta18.match(/([a-zA-Z]+)\s+([a-zA-Z]+)\s+Lamiaceae/)
console.log(nombre18)
console.log(familia18)

// 19. Comprueba si el código de identificación 4321PLT tiene 4 números y 3 letras mayúsculas.
console.log('Ejercicio 19')
const codigo19 = '4321PLT'
const codigo19Match = codigo19.match(/^[A-Z0-9]{4}[A-Z]{3}$/)
console.log(codigo19Match)

// 20. Obtén todas las palabras del texto Flor amarilla de primavera.
console.log('Ejercicio 20')
const texto20 = 'Flor amarilla de primavera'
const palabras20 = texto20.match(/\w+/g)
console.log(palabras20)
