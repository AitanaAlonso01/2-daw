const commentModel = require("../models/comment.model")
const mongodbConfig = require("../utils/mongodb.config")

const ejecutar = async() => {
    await mongodbConfig.conectarMongoDB()
    .then(()=>{
        console.log("Conectado con MongoDB!!!")
    })
    .catch((err)=>{
        //Si no conectamos con MongoDB, debemos tumbar el server
        console.log(`Error al conectar. Desc: ${err}`)
        process.exit(0)
    })
    
    const comments = [
        {
            usuario:"Mike",
            categoria:"deportes",
            valoracion:2,
            opinion:"lorem ipsum..."
        },
        {
            usuario:"Manolo",
            categoria:"moda",
            valoracion:4,
            opinion:"lorem ipsum ipsum..."
        },
        {
            usuario:"Ana",
            categoria:"política",
            valoracion:5,
            opinion:"lorem lorem ipsum..."
        }
    ]

    await commentModel.insertMany(comments)
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })
    
    process.exit()
}


ejecutar()