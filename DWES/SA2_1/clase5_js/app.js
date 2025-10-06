//CALL STACK (pila de llamadas en JS)
//JS - SINGLE THREADED (no es multi-hilo)
//JS Utiliza sólo un hilo de ejecución. NO ES multi-hilo
const multplicacion = (x, y) => x * y
const calcularCuadrado = num => multplicacion(num, num)
const esRectanguloRecto = (a, b, c) =>
  calcularCuadrado(a) + calcularCuadrado(b) == calcularCuadrado(c)

console.log(esRectanguloRecto(3, 4, 5))
console.log(esRectanguloRecto(5, 1, 5))

//CALLBACK
console.log('Primero')
setTimeout(function () {
  console.log('Segundo')
}, 0)
console.log('Tercero')

/******************************************************************************/
//AJAX --> Asynchronous JavaScript and XML
//AJAJ --> Asynchronous JavaScript and JSON
//REQUEST --> Petición
//XMLHttpRequest --> Objeto de petición - NO soportaba PROMISES... Peticiones SOAP(XML)
//FETCH --> Soporta PROMISES --> Nativo JS ES6 -- Trabaja con XML y JSON (API Restful)
//AXIOS --> Soporta PROMISES --> Librería Externa que trabaja directamente con un objeto 'data', que es JSON
/******************************************************************************/

const url = 'http://api.tvmaze.com/search/shows?q='

const consultarPeliSerie = async nombre => {
  /*
    Fetch es una función callback de JS (nativo)
    ES6 que devuelve, en texto plano, los resultados obtenidos de una URL.
    Resultados devueltos mediante PROMISE (resolve o reject)
  */
  await fetch(url + nombre)
    //RESOLVE
    .then(function (datos) {
      console.log('RESOLVE')
      //Convertimos el formato plano por deecto devuelto por fetch a JSON
      return datos.json()
    })
    .then(function (datosJSON) {
      //Datos formateados en JSON (o el formato que queramos)
      console.log(datosJSON)
    })
    //REJECT
    .catch(function (error) {
      console.log('REJECT')
      console.log(error)
    })
}

consultarPeliSerie('breaking')

const consultarPeliSerieAxios = async nombre => {
  await axios
    .get(url + nombre)
    .then(datos => {
      console.log('RESOLVE')
      console.log(datos.data)
    })
    .catch(error => {
      console.log('REJECT')
      console.log(error)
    })
}

consultarPeliSerieAxios('los misterios de laura')
