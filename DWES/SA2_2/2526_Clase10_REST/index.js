//npm init -y
//crear index.js
const cors = require("cors") //npm i cors
const axios = require("axios") //npm i axios
const express = require("express") //npm i express
const app = express()
const port = 3010
const path = require("path") //npm i path
const {v4:uuid} = require("uuid") //npm i uuid
const methodOverride = require("method-override") //npm i method-override

app.use(cors())

app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs") //npm i ejs (SSR)
app.use(express.static(path.join(__dirname,"public")))

//Para poder leer datos (request body) en métodos POST
app.use(express.urlencoded({extended:true}))
//Leer datos JSON en request body POST
app.use(express.json())

app.use(methodOverride("_method"))


let comentarios = [
    {
        id:uuid(), 
        usuario:"Mike",
        opinion:"Me gusta mucho DWES. Es mi módulo favorito."
    },
    {
        id:uuid(),
        usuario:"Mario",
        opinion:"Yo soy más de Despliegue. Sueño con él..."
    },
    {
        id:uuid(),
        usuario:"Aitana",
        opinion:"Me gusta más el cuarto de hora del patio."
    }
]

//RUTAS
//app.get("/",(req,res)=>{})
app.get("/tv/:nombre",async(req,res)=>{
    const { nombre } = req.params
    const url = "http://api.tvmaze.com/search/shows?q=" + nombre
    await axios.get(url)
    .then((respuesta)=>{
        const datosRes = respuesta.data
        for (let elem of datosRes){
            elem.show.url += "____HOLA"
        }        
        res.status(200).json(datosRes)
    })
    .catch((error)=>{
        res.status(500).json(error)
    })
})

app.get("/",(req,res)=>{
    res.render("index.ejs", { comentarios })
})

app.get("/comentarios",(req,res)=>{
    res.redirect("/")
})

app.get("/comentarios/new",(req,res)=>{
    res.render("new.ejs")
})

app.get("/comentarios/:id",(req,res)=>{
    //1 - Obtener el id a partir del req.params
    const { id } = req.params
    //const id = req.params.id
    //2 - Buscar, dentro del array, el objeto que tenga ese id
    const comentario = comentarios.find(c => c.id == id)    
    //3 - Renderizar (y hacer) la vista show.ejs con ese comentario
    res.render("show.ejs", {comentario})
})

app.get("/comentarios/:id/edit",(req,res)=>{
    const { id } = req.params
    const comentario = comentarios.find(c => c.id == id)
    if(comentario){
        res.render("edit.ejs", {comentario})
    }else{
        res.render("error.ejs",{mensaje:"404 NOT FOUND"})
    } 
})

app.post("/comentarios",(req,res)=>{
    //body que viene del POST
    const { usuario, opinion } = req.body
    /* Equivalente a:
    const usuario = req.body.usuario
    const opinion = req.body.opinion
    */
    const nuevoComentario = {
        id: uuid(),//comentarios.length + 1,
        usuario:usuario,
        opinion:opinion
    }

    comentarios.push(nuevoComentario)
    res.redirect("/")
    
})

//UPDATE
app.patch("/comentarios/:id",(req,res)=>{
    const { id } = req.params
    const comentarioOLD = comentarios.find(c => c.id == id)
    const { usuario, opinion } = req.body
    comentarioOLD.usuario = usuario
    comentarioOLD.opinion = opinion
    res.redirect("/")
})

//DELETE
app.delete("/comentarios/:id", (req,res)=>{
    const { id } = req.params
    comentarios = comentarios.filter(c => c.id != id)
    res.redirect("/")
})

//Ruta por defecto (*)
app.get(/.*/,(req,res)=>{
    res.redirect("/")
})

//Levantar el server
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})