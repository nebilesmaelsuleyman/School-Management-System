const User =require('../Model/userModel');
const AppError = require('../utils/AppError');
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken')
const crypto =require('crypto');
const sendEmail= require('../utils/sendEmail');


const signToken= id =>{
    return jwt.sign({id},process.env.jwt_secrate,{ expiresIn: '1h'
    })
}

const CreateSendToken=(user, statusCode ,res)=>{
    const Token =signToken(user._id);
    const cookieOptions ={
        expires:new Date(Date.now()+ process.env.jwt_cookie_expiration*1),
        httponly:true,
        secure:false 
    }

    res.cookie('jwt',Token,cookieOptions)
    user.password=undefined
    res.status(statusCode).json({
        status:'succces',
        message:'token created succesfully',
        Token,
        data:{
            user:user
        }
    })
}

exports.signup= async (req,res,next)=>{
    const { name,role, email, password, passwordConfirmation , passwordChangedAt } = req.body;
    try{
    const newuser =await User.create({
        name,
        email,
        role,
        password,
        passwordConfirmation,
        passwordChangedAt
    })
    console.log(req.body)
    CreateSendToken(newuser,201,res)
    
}catch(error){
    console.log(error.message)
}
}


exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return next(new AppError('No email or password provided', 400));
    }

    // Find the user by email and include the password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new AppError('No user found with this email', 401));
    }

    // Compare the provided password with the stored hashed password
    const isMatch=  await user.comparePassword(password)
    if (isMatch) {
        return CreateSendToken(user, 200, res);
    } else {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid email or password',
            data: {
                user: null
            }
        });
    }
};

exports.forgetpassword =async(req,res)=>{
    const {email}=req.body
    const user= User.findOne({email})
    if(!user){
        return next(new AppError('no user found with this email',400))
    }
    const resetToken =await user.ResetToken();
    // sendign the resetToken to users via email

    user.save({calidateBeforeSave:false});
    
    //creating reset password url
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}//api/users/resetPassword/${resetToken}`
    const message =`your password reset token is : ${resetPasswordUrl}`;

    try{
        await sendEmail({
            email:user.email,
            subject:'password Reset Request',
            message,
        })
        res.status(200).json({
            status:'succes',
            message:'Reset token sent to email !',
        })
    }catch(error){
        user.passwordResetToken= undefined;
        user.passwordResetExpires=undefined;
        await user.save({validateBeforeSavee:false});

        return next(new AppError('there was an error sendig the email, try again please',500))

    }
    
    res.status(200).json({
        status:'success',
        resetToken,
        message:'reset token generated succesfully!'
    })


}
exports .getAllusers= async (req,res, next)=>{
    const alluser =await User.find();
    if(!alluser)return next(new AppError('no user found',404))
    res.status(200).json({
status:'succes',
data:{
    alluser
}})
}