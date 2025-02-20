const AppError= require('./../utils/AppError.js')
const {User} = require( './../Model')

const authenticate= async (req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return new AppError('no such token found in the cookie',401)
    }
    try{
        const secrate= process.env.jwt_secrate
        const decode = await jwt.verify(token,secrate);
        const user = await User.findOne({decode})

    }catch(err){
        console.error(err)
    }
}

module.exports={
    authenticate
}