//npm i mongoose
const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    //_id --> NO es String, sino ObjectID (similar a la PK. Va de serie. Se crea automáticamente como UUID en MongoDB)
    usuario:{
        type:String,
        required:true //NOT NULL SQL
    },
    opinion:{
        type:String,
        required:true
    },
    categoria:{
        type:String,
        lowercase:true,
        enum:["deportes","moda","política"]
    },
    valoracion:{
        type:Number,
        required:true,
        min:0,
        max:5
    }
})

//Creamos el MODELO a partir del ESQUEMA MONGOOSE
const comment = mongoose.model("comment", commentSchema)

comment.createComment = async(commentData,result) => {
    const newComment = new comment(commentData)
    await newComment.save() //INSERT(SQL) - InsertOne(MongoDB alternativa)
        .then((datos) => {
           result(null,datos) 
        })
        .catch((err) => {
           result(err,null) 
        })
}

comment.findAll = async(filter={},result)=>{
    //SELECT * from Comments
    //WHERE categoria = cat
    /*let filter = {}
    if(cat){
        filter = {categoria:cat}
    }*/
    //const datos = await comment.find({})
    const datos = await comment.find(filter)
    if(datos && datos.length > 0){
        result(null,datos)
    }else{
        result({"error":"No hay datos"},null)
    }
}

comment.findCommentById = async(id, result)=>{
    //const idObj = mongoose.Types.ObjectId(id)
    const datos = await comment.findById(id)
    //const datos = await comment.find({_id:ObjectId(id)})
    if(datos){
        result(null,datos)
    }else{
        result({"error":"No hay datos"},null)
    }
}

comment.updateCommentById = async(id,commentData,result)=>{
    //runValidators:true --> comprueba validaciones del modelo
    //new:true --> Si no existe el documento, lo crea
    await comment.findByIdAndUpdate(id,commentData, {runValidators:true, new:true})
    .then((datosResultado)=>{
        result(null,datosResultado)
    })
    .catch((err)=>{
        result(err,null)
    })
}

comment.deleteCommentById = async(id,result)=>{
    await comment.findByIdAndDelete(id)
    .then((datos)=>{
        //console.log(datos)
        result(null,datos)
    })
    .catch((err)=>{
        result(err,null)
    })
}

//Ejercicio
//https://www.mongodb.com/docs/manual/reference/method/db.collection.find/
comment.findCommentByUser = async(user, result)=>{
    //const idObj = mongoose.Types.ObjectId(id)
    //Select * from comment where usuario = user
    const datos = await comment.find({usuario:user})
    //const datos = await comment.find({_id:ObjectId(id)})
    if(datos){
        result(null,datos)
    }else{
        result({"error":"No hay datos"},null)
    }
}

//Exportamos para poderlo usar en el CONTROLLER
module.exports = comment