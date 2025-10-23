//STRINGS
// Ejercicio 1: Longitud de una cadena; Crea una variable con un texto y muestra por consola cuántos caracteres tiene.
console.log('Ejercicio 1 - Longitud de una cadena')
let texto = 'Hola Mundo'
console.log(texto.length)

// Ejercicio 2: Convertir a mayúsculas:Dado un texto en minúsculas, transforma todas las letras a mayúsculas y muestra el resultado.
console.log('Ejercicio 2 - Convertir a mayúsculas')
let texto2 = 'hola mundo'
console.log(texto2.toUpperCase())

// Ejercicio 3: Convertir a minúsculas:Dado un texto en mayúsculas, convierte todas las letras a minúsculas.
console.log('Ejercicio 3 - Convertir a minúsculas')
let texto3 = 'HOLA MUNDO'
console.log(texto3.toLowerCase())

// Ejercicio 4: Obtener un carácter por índice: Accede al carácter que está en la posición 4 de la palabra "JavaScript" y muéstralo.
console.log('Ejercicio 4 - Obtener un carácter por índice')
let texto4 = 'JavaScript'
console.log(texto4[4])

// Ejercicio 5: Concatenar cadenas: Crea dos variables, nombre y apellido, y muéstralas juntas en una sola cadena.
console.log('Ejercicio 5 - Concatenar cadenas')
let nombre = 'Ana'
let apellido = 'Hernandez'
console.log(nombre + ' ' + apellido)

// Ejercicio 6: Buscar índice de un carácter: Encuentra la posición de la letra "M" en la cadena "Hola Mundo".
console.log('Ejercicio 6 - Buscar índice de un carácter')
let texto6 = 'Hola Mundo'
console.log(texto6.indexOf('M'))

// Ejercicio 7: Reemplazar texto: Sustituye "Juan" por "Ana" en la frase "Hola Juan" y muestra el resultado.
console.log('Ejercicio 7 - Reemplazar texto')
let texto7 = 'Hola Juan'
console.log(texto7.replace('Juan', 'Ana'))

// Ejercicio 8: Extraer una subcadena: Extrae las primeras 4 letras de "JavaScript" y muéstralas.
console.log('Ejercicio 8 - Extraer una subcadena')
let texto8 = 'JavaScript'
console.log(texto8.substring(0, 4))

// Ejercicio 9: Comprobar si contiene un texto: Verifica si la cadena "Hola Mundo" contiene la palabra "Mundo".
console.log('Ejercicio 9 - Comprobar si contiene un texto')
let texto9 = 'Hola Mundo'
console.log(texto9.includes('Mundo'))

// Ejercicio 10: Separar en un array:Separa la cadena "manzana,banana,pera" en un array de frutas usando la coma como separador.
console.log('Ejercicio 10 - Separar en un array')
let texto10 = 'manzana,banana,pera'
console.log(texto10.split(','))

// Ejercicio 11: Eliminar espacios al inicio y al final:Dado un texto con espacios al inicio y al final, quítalos y muestra la cadena limpia.
console.log('Ejercicio 11 - Eliminar espacios al inicio y al final')
let texto11 = '  Hola Mundo  '
console.log(texto11.trim())

// Ejercicio 12: Repetir una cadena:Repite el texto "Hola! " tres veces y muéstralo.
console.log('Ejercicio 12 - Repetir una cadena')
let texto12 = 'Hola! '
console.log(texto12.repeat(3))

// Ejercicio 13: Comprobar inicio de cadena: Comprueba si la cadena "JavaScript" comienza con "Java".
console.log('Ejercicio 13 - Comprobar inicio de cadena')
let texto13 = 'JavaScript'
console.log(texto13.startsWith('Java'))

// Ejercicio 14: Comprobar final de cadena: Comprueba si la cadena "archivo.txt" termina con ".txt".
console.log('Ejercicio 14 - Comprobar final de cadena')
let texto14 = 'archivo.txt'
console.log(texto14.endsWith('.txt'))

// Ejercicio1 5: Obtener el carácter en una posición: Muestra el carácter que está en la posición 2 de "Hola".
console.log('Ejercicio 1 5 - Obtener el carácter en una posición')
let texto15 = 'Hola'
console.log(texto15[2])

// Ejercicio 16: Reemplazar todas las apariciones:Cambia todas las palabras "perro" por "conejo" en "perro gato perro".
console.log('Ejercicio 16 - Reemplazar todas las apariciones')
let texto16 = 'perro gato perro'
console.log(texto16.replaceAll('perro', 'conejo'))

// Ejercicio 17: Convertir string a array de caracteres:Convierte la cadena "Hola" en un array con cada letra como elemento.
console.log('Ejercicio 17 - Convertir string a array de caracteres')
let texto17 = 'Hola'
console.log(texto17.split(''))

// Ejercicio 18: Invertir una cadena: Invierte el texto "Hola" para que se lea al revés.
console.log('Ejercicio 18 - Invertir una cadena')
let texto18 = 'Hola'
console.log(texto18.split('').reverse().join(''))

// Ejercicio 19: Contar cuántas veces aparece un carácter: Cuenta cuántas veces aparece la letra "a" en "banana".
console.log('Ejercicio 19 - Contar cuántas veces aparece un carácter')
let texto19 = 'banana'
console.log(texto19.includes('a'))

// Ejercicio 20: Formatear un string con plantilla: Usa plantillas literales para mostrar: "Hola, mi nombre es Ana y tengo 25 años." usando variables nombre y edad.
console.log('Ejercicio 20 - Formatear un string con plantilla')
let texto20 = 'Hola, mi nombre es Ana y tengo 25 años.'
console.log(texto20.replace('Ana', 'Ana'))
