/*
ACTIVIDAD JS - LLAMADA ASINCRONA A API REST
--------------------------------------------

DOCUMENTACION DE LA API DE STAR WARS

  https://swapi.dev/documentation


TAREAS:

Crea una función ASINCRONA, llamada "getStarWarsPeople" que realice lo siguiente:

  1 - La función tendrá un único parámetro de entrada llamado "name".

  2 - Se hará una petición inicial GET a "https://swapi.dev/api/people/" para devolver un listado de todos
  los personajes de STAR WARS.

  3 - Se debe gestionar la devolución de la promesa (PROMISE) retornada. Si ha habido error, se debe mostrar
  por consola.

  4 - Si la promesa (PROMISE) ha sido correcta, se deben filtrar los resultados para obtener aquel personaje
  cuyo nombre (campo "name" del JSON de resultados) empieza por el valor del parámetro "name" de la función.

  5 - Si lo encuentra, se debe realizar una nueva invocación, tipo GET, a la URL devuelta por el valor
  del campo "homeworld" del JSON (es una URL del planeta donde vive).

  6 - Si la petición GET del planeta es correcta, se debe invocar a una nueva función ASINCRONA, que debes
  crear (punto 7), llamada "GetPlanetInfo", donde debes pasarle todos los datos del personaje como parámetro
  en un objeto (datos del JSON devuelto --> "name","url","homeworld").

  7 - Crea la función ASINCRONA "GetPlanetInfo", que recibirá, como UNICO parámetro, un objeto "datosPersonaje"
  con los datos del personaje descritos en el punto 6. De esos datos, con ayuda del valor del campo "homeworld",
  el cual almacena la URL del planeta donde vive el personaje, haremos una invocación GET a dicha URL.

  8 - Si la PROMESA es satisfactoria, al objeto, pasado por parámetro, le añadiremos más información:
  nombre del planeta (campo "name" del JSON) y las urls de todos los residentes del planeta (array "residents"
  del JSON)

  9 - Como último cálculo, tendremos que ver cuántos "paisanos" tiene nuestro personaje dentro de su planeta.
  Para ello tendremos que FILTRAR el array de residentes con todas aquellas URL que sean distintas a la del
  personaje.

  10 - Por último, deberemos mostrar la salida por consola. Si el personaje no tiene "paisanos" deberemos indicarlo.

  Según el ejemplo de estas 3 llamadas (que están en el código de la invocación)

    getStarWarsPeople("Obi-Wan");
    getStarWarsPeople("Darth");
    getStarWarsPeople("Leia");

  Las salidas deberían ser:

    El personaje Obi-Wan Kenobi vive en el planeta Stewjon como Han... Solo...
    El personaje Leia Organa vive en el planeta Alderaan con 2 paisanos
    El personaje Darth Vader vive en el planeta Tatooine con 9 paisanos

*/
const url = 'https://swapi.dev/api/people/'

//Función async llamada "getStarWarsPeople"
const getStarWarsPeople = async name => {
  try {
    //Petición inicial
    const response = await fetch(url)
    const data = await response.json()

    //Filtrar personaje
    const personaje = data.results.find(p => p.name.startsWith(name))

    if (!personaje) {
      console.log(`No se encontró ningún personaje que empiece por "${name}"`)
      return
    }

    //Obtener datos del planeta
    const planetaResponse = await fetch(personaje.homeworld)
    const planetaData = await planetaResponse.json()

    //Crear objeto 'datosPersonaje'
    const datosPersonaje = {
      name: personaje.name,
      url: personaje.url,
      homeworld: personaje.homeworld,
    }

    await GetPlanetInfo(datosPersonaje, planetaData)
  } catch (error) {
    console.log('Error en getStarWarsPeople:', error)
  }
}

//Función async llamada "GetPlanetInfo"
const GetPlanetInfo = async (datosPersonaje, planetaData) => {
  try {
    //Añadir nombre planeta y residentes
    datosPersonaje.planetName = planetaData.name
    datosPersonaje.residents = planetaData.residents

    //Filtrar paisanos (excluyendo al personaje)
    const paisanos = datosPersonaje.residents.filter(
      url => url !== datosPersonaje.url
    )

    //Mostrar result
    if (paisanos.length === 0) {
      console.log(
        `El personaje ${datosPersonaje.name} vive en el planeta ${datosPersonaje.planetName} como Han...Solo.`
      )
    } else {
      console.log(
        `El personaje ${datosPersonaje.name} vive en el planeta ${datosPersonaje.planetName} con ${paisanos.length} paisanos.`
      )
    }
  } catch (error) {
    console.log('Error en GetPlanetInfo:', error)
  }
}
//LLAMADA - NO TOCAR!!!
const buscandoGenteStarWars = () => {
  getStarWarsPeople('Obi')
  getStarWarsPeople('Darth')
  getStarWarsPeople('Leia')
}

buscandoGenteStarWars()
