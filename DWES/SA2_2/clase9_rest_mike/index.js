//npm init -y
//crear index.js
const express = require("express") //npm i express
const app = express()
const port = 3010
const path = require("path") //npm i path

app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs") //npm i ejs (SSR)
app.use(express.static(path.join(__dirname,"public")))

//Para poder leer datos (request body) en métodos POST
app.use(express.urlencoded({extended:true}))
//Leer datos JSON en request body POST
app.use(express.json())

let comentarios = [
    {
        id:1,
        usuario:"Mike",
        opinion:"Me gusta mucho DWES. Es mi módulo favorito."
    },
    {
        id:2,
        usuario:"Mario",
        opinion:"Yo soy más de Despliegue. Sueño con él..."
    },
    {
        id:3,
        usuario:"Aitana",
        opinion:"Me gusta más el cuarto de hora del patio."
    }
]

//RUTAS
//app.get("/",(req,res)=>{})
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

app.post("/comentarios",(req,res)=>{
    //body que viene del POST
    const { usuario, opinion } = req.body
    /* Equivalente a:
    const usuario = req.body.usuario
    const opinion = req.body.opinion
    */
    const nuevoComentario = {
        id: comentarios.length + 1,
        usuario:usuario,
        opinion:opinion
    }

    comentarios.push(nuevoComentario)
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