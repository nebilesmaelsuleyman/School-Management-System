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
    // const Token =signToken(user._id);
    const Token ="secrete cookies"
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

exports.forgetPassword = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // Check if user was found
    if (!user) {
        return next(new AppError('No user found with this email', 400));
    }

    // Generate the reset token
    const resetToken = user.getResetToken();
    console.log('Reset token is', resetToken);

    // Save the user with the new reset token and expiration
    await user.save({ validateBeforeSave: false }); // Await this save

    // Creating reset password URL
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`;
    const message = `Your password reset token is: ${resetPasswordUrl}`;

    try {
        // Sending the reset token to the user via email
        await sendEmail({
            email: user.email,
            subject: 'Password Reset Request',
            message,
        });

        res.status(200).json({
            status: 'success',
            message: 'Reset token sent to email!',
        });
    } catch (error) {
        // If sending email fails, reset the token fields
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        // Await the save operation to ensure it completes before moving on
        await user.save({ validateBeforeSave: false });

        return next(new AppError(`There was an error sending the email, try again please ${error.message}`, 500));
    }
};

exports.resetPassword=async (req,res,next)=>{
    try{
    console.log(req.params.Token)
    const hashedToken =crypto.createHash('sha256').update(req.params.Token).digest('hex')
  

    const user =await User.findOne({
        passwordResetToken:req.params.Token,
        passwordResetExpires:{$gt:Date.now()}
    });
    if(!user){
        return next(new AppError('token is invalid or has expired',400))
    }
    user.password =req.body.password;
    user.passwordconfirmation=req.body.passwordConfirmation;
    user.passwordResetToken=undefined;
    user.passwordResetExpires= undefined
    await user.save();

    CreateSendToken(user,200,res)
}catch(error){
    console.log(error.message)
}
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
