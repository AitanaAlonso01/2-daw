// 1. Mostrar el título del documento
// Muestra por consola el título de la pestaña utilizando document.title.
console.log(document.title)

// 2. Cambiar el título del documento
// Cambia el título de la pestaña a “Mi primera práctica DOM”.
document.title = 'Mi primera práctica DOM'

// 3. Seleccionar un elemento por ID
// HTML:
//<p id="mensaje">Hola</p>
// Guarda el párrafo en una variable.
let mensaje = document.getElementById('mensaje')

// 4. Cambiar el texto de un elemento
// Cambia el texto del párrafo anterior a “Texto actualizado”.
mensaje.textContent = 'Texto actualizado'

// 5. Seleccionar elementos por clase
// HTML:
//<li class="item">A</li>
//<li class="item">B</li>
// Selecciona todos los elementos con clase item.
let items = document.getElementsByClassName('item')

// 6. Contar elementos por clase
// Muestra cuántos .item hay en la página.
console.log(items.length)

// 7. Seleccionar por etiqueta
// Selecciona todos los <p> de un documento y muéstralos por consola.
let p = document.getElementsByTagName('p')
console.log(p)

// 8. Usar querySelector
// HTML:
//<h1 id="titulo">Hola</h1>
// Selecciona el elemento con id="titulo" usando querySelector.
let titulo = document.querySelector('#titulo')

// 9. Usar querySelectorAll
// HTML:
/* <p class="text">Uno</p> */
/* <p class="text">Dos</p> */
// Selecciona todos los elementos .text.
let textos = document.querySelectorAll('.text')

// 10. Cambiar el primer elemento .text
// Cambia el contenido del primer .text a “Cambiado”.
textos[0].textContent = 'Cambiado'

/* LOS OTROS 10 EJERCICIOS -----------------------------------------------------------------------------------------------------------------------------------*/
// 11. Recorrer un NodeList
// HTML:
/* <p class="linea">A</p> */
/* <p class="linea">B</p> */
/* <p class="linea">C</p> */
// Recorre todos los .linea e imprime su texto.
for (let linea of document.querySelectorAll('.linea')) {
  console.log(linea.textContent)
}

// 12. Cambiar todos los elementos de una clase
// Modifica cada .linea y añade - modificado.
for (let linea of document.querySelectorAll('.linea')) {
  linea.textContent += ' - modificado'
}

// 13. Usar matches()
// HTML:
/* <button class="btn activo">Enviar</button> */
// Detecta si el botón tiene la clase .activo.
let boton = document.querySelector('.btn')
console.log(boton.matches('.activo'))

// 14. Usar closest()
// HTML:
/* <section> */
/* <div> */
/* <p id="demo">Texto</p> */
/* </div> */
/* </section> */
// Desde el p, encuentra el ancestro section.
let p14 = document.querySelector('#demo')
let section = p14.closest('section')
console.log(section)

// 15. Mostrar padre e hijos
// HTML:
/* <div id="contenedor"> */
/* <p>Uno</p> */
/* <p>Dos</p> */
/* </div> */
// Muestra el padre del primer <p> y sus hermanos.
let p15 = document.querySelector('#contenedor p')
let padre = p15.parentNode
console.log(padre)

// 16. Siguiente hermano
// HTML:
/* <p id="a">Primero</p> */
/* <p id="b">Segundo</p> */
// Selecciona el párrafo a y muestra su hermano siguiente.
let a = document.querySelector('#a')
let siguiente = a.nextSibling
console.log(siguiente)

// 17. Contar etiquetas
// Cuenta cuántos <li> hay en una lista.
// HTML:
/* <ul> */
/* <li>A</li> */
/* <li>B</li> */
/* <li>C</li> */
/* </ul> */
let lista = document.querySelector('ul')
console.log(lista.children.length)

// 18. Cambiar estilos con classList
// HTML:
/* <p id="msg">Hola</p> */
// Añade la clase resaltado al párrafo.
let msg = document.querySelector('#msg')
msg.classList.add('resaltado')

// 19. Navegar al último hijo
// HTML:
/* <div id="box"> */
/* <span>1</span> */
/* <span>2</span> */
/* <span>3</span> */
/* </div> */
// Muestra el último hijo de #box
let box = document.querySelector('#box')
let ultimo = box.lastChild
console.log(ultimo)

// 20. Diferenciar texto y HTML
// HTML:
/* <div id="caja">Texto <b>negrita</b></div> */
// Obtén el mismo elemento y muestra:
// a) textContent
// b) innerHTML
let caja = document.querySelector('#caja')
console.log(caja.textContent)
console.log(caja.innerHTML)
