//TO DO - 5 protección asíncrona
//Función para proteger funciones asíncronas
exports.wrapAsync = function(fn){
    return function(req,res,next){
        fn(req,res,next).catch(e => {
            next(e)
        })
    }
}