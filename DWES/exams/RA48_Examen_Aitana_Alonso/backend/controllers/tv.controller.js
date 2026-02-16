const axios = require("axios")

exports.getTVShow = async (req,res)=>{
    const {nombre} = req.params
    const url = "http://api.tvmaze.com/search/shows?q=" + nombre
    await axios.get(url)
    .then((datos)=>{
        res.status(200).json(datos.data)   
    }).catch((error)=>{
        res.status(500).json({err:error})
    })
}