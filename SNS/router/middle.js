const {User} = require('../models')

exports.isLogged = async(req,res,next)=>{
    if(req.signedCookies['id']){
        const user = await User.findOne({
            where:{
                id:req.signedCookies['id']
            }
        })
        if(user){
            return next()
        }
    }
    res.redirect('/login')
}