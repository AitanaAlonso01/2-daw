const urlAPI = "http://localhost:3010/tv/"

const getSeriesPelis = async() => {
    await fetch(urlAPI + "friends")
    .then((respuesta)=>{
        return respuesta.json()
    })
    .then((datosJSON)=>{
        console.log(datosJSON)
    })
    .catch((error)=>console.log("Error"))
}

getSeriesPelis()
