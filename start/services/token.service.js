const jwt = require('jsonwebtoken')
require('dotenv').config();

const generateToken = (userId,res)=>{
    const secretKey= process.env.jwt_secrate
    const options ={
        expiresIn:process.env.jwt_expiration
    }
    const payload={
        userId:userId,
    }
    const token = jwt.sign(payload,secretKey,options)
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV ==='production',
        maxAge: parseInt(process.env.jwt_expiration, 10) * 1000,
        sameSite:'lax'
    })
    return token
}


module.exports={
    generateToken
}