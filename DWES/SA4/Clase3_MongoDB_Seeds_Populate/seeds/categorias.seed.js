const mongodbConfig = require('../utils/mongodb.config')
const categoriasModel = require('../models/categorias.model')

const ejecutar = async () => {
  try {
    //Una vez levantado el servidor, intentamos conectar con MongoDB
    await mongodbConfig
      .conectarMongoDB()
      .then(() => {
        console.log('Conectado con MongoDB!!!')
      })
      .catch(err => {
        //Si no conectamos con MongoDB, debemos tumbar el server
        console.log(`Error al conectar con MongoDB. Desc: ${err}`)
        //Tumbar el server
        process.exit(0)
      })
  } catch (error) {
    //Si no conectamos con MongoDB, debemos tumbar el server
    console.log(`Error al conectar con MongoDB. Desc: ${error}`)
    //Tumbar el server
    process.exit(0)
  }

  const categorias = [
    { nombre: 'deportes' },
    { nombre: 'moda' },
    { nombre: 'politica' },
    { nombre: 'tecnologia' },
    { nombre: 'cine' },
  ]

  await categoriasModel
    .insertMany(categorias)
    .then(res => {
      console.log('Categorias creadas con éxito')
    })
    .catch(err => {
      console.log(`Error al crear las categorias. Desc: ${err}`)
    })
    .finally(() => {
      process.exit(0)
    })
}

ejecutar()
