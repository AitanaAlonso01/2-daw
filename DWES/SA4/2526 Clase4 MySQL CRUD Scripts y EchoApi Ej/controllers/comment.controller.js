require("dotenv").config()
const categorias = require("../models/categorias.model.json")
const commentModel = require("../models/comment.model")

exports.findAllComments = async(req,res) => {
    //CSR
    await commentModel.findAll({},function(err,datosComentarios){
        if(err){            
            res.status(500).json({"err":err})
        }else{
            res.status(200).json(datosComentarios)
        }
    })    
}

exports.showAllComments = async(req,res) => {
    //SSR    
    res.locals.tituloEJS = "LIST Comentarios"
    const {cat, user} = req.query    
    let filtro = {}
    //EJS Extensión
    let categoriaValorFiltro = ""
    let usuarioValorFiltro = ""

    if(cat && user){
        filtro = { categoria:cat, usuario:user }        
        categoriaValorFiltro = cat
        usuarioValorFiltro = user        
    }else if(cat && !user){
        filtro = { categoria:cat }
        categoriaValorFiltro = cat
        
    }else if(!cat && user){
        filtro = { usuario:user }
        usuarioValorFiltro = user
    }
    
    
    await commentModel.findAll(filtro,function(err,datosComentarios){
        if(err){
            console.log(err)
            res.render("error.ejs",{err:err.error})
        }else{
            res.render("index.ejs",{comentarios:datosComentarios, categorias, categoriaValorFiltro, usuarioValorFiltro})
        }
    })    
}

exports.showNewComment = (req,res)=>{
    //SSR
    res.render("new.ejs", {categorias})
}

exports.showCommentById = async(req,res)=>{
    //SSR
    const { id } = req.params
    //const comentario = comentarios.find(c => c.id == id)
    await commentModel.findCommentById(id,function(err,comentario){
        if(err){
            res.render("error.ejs",{err:err.error})
        }else{
            res.render("show.ejs", { comentario })
        }
    })    
}

exports.showEditComment = async(req,res) => {
    //SSR
    const { id } = req.params
    //const comentario = comentarios.find(c => c.id == id)    
    await commentModel.findCommentById(id,function(err,comentario){
        if(err){
            res.render("error.ejs",{err:err.error})
        }else{
            res.render("edit.ejs", { comentario, categorias })
        }
    })    
}


exports.createComment = async(req,res)=>{
    /*const { usuario, opinion } = req.body     
    
    const nuevoComentario = {
        id: comentarios.length + 1,
        usuario:usuario,
        opinion:opinion
    }
    
    comentarios.push(nuevoComentario)*/
    await commentModel.createComment(req.body, function(err,commentCreated){
        if(err){
            console.log(err)
            res.render("error.ejs", {err})
        }else{
            console.log(commentCreated)
            res.redirect(`/api/${process.env.API_VERSION}/comments/`)
        }
    })

    
}

exports.editComment = async(req,res) => {
    const { id } = req.params
    //const comentario = comentarios.find(c=>c.id==id)    
    const { usuario, opinion, valoracion, categoria } = req.body
    const comentarioActualizado = {
        usuario:usuario,
        opinion:opinion,
        valoracion:valoracion,
        categoria:categoria
    }
    await commentModel.updateCommentById(id,comentarioActualizado,function(err,datosActualizados){
        if(err){
            res.render("error.ejs", {err})
        }else{
            console.log(datosActualizados)
            res.redirect(`/api/${process.env.API_VERSION}/comments/`)
        }
    })        
}

exports.deleteComment = async(req,res)=>{
    const {id} = req.params
    //comentarios = comentarios.filter(c => c.id != id)
    await commentModel.deleteCommentById(id,function(err,datosEliminados){
        if(err){
            res.render("error.ejs", {err})
        }else{
            res.redirect(`/api/${process.env.API_VERSION}/comments/`)
        }
    })    
}



//exports.otherSites = (req,res) => {
    //res.redirect("/")
//    res.status(500).json({err:"No existe la ruta"})
//}