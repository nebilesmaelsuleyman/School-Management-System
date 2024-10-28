const user =require('./../Model/userModel')

const signToken= async(req,res,next)=>{
    return jwt.sign({id},process.env.jwt_secrate,{
        expiresIn: '1hr'
    })
}
const CreateSendToken=(user, statusCode ,res)=>{
    const Token =signToken(user._id);
    const cookieOptions ={
        expires:new Date(Date.now()+ process.env.jwt_cookie_expiration),
        httponly:true,
        secure:false 
    }

    res.cookie('jwt',Token,cookieOptions)
    user.password=undefined
    res.status(statusCode).json({
        status:'succces',
        Token,
        data:{
            user:user
        }
    })
}

exports.signup= async (req,res,next)=>{
    try{
    const { name ,email,role ,password, passwordConfirmation, passwordChangedAt}= req.body;
    const newuser =await user.create({
        name,
        role, password,passwordConfirmation,passwordChangedAt
    })
    CreateSendToken(newuser,201,res)
}catch(error){
    res.status(400).json({error:error.message})

}
}