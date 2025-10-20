const urlAPi = 'http://localhost:3010'

const getSeriesPelis = async () => {
  await fetch(urlAPi + '/tv/friends')
    .then(respuesta => {
      return respuesta.json()
    })
    .then(datosJSON => {
      console.log(datosJSON)
    })
    .catch(error => console.log(error))
}

getSeriesPelis()
