exports.isAuthenticated = (req,res,next) => {
    if(!req.session.user){
        return res.redirect(res.locals.baseUrlUsers + "/login")
    }
    next()
}