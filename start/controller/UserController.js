const User =require('../Model/userModel');
const AppError = require('../utils/AppError');
const joi =require('joi');

const Schema=joi.object({
    name:joi.string().required().trim().min(3).max(29),
    email:joi.string().required().email(),
    section: joi.number().required().integer().positive(),
    photo: joi.string().uri(),
    role: joi.string().valid('admin', 'Teacher', 'student', 'parent').default('student'),
    password:joi.string().min(8),
    passwordConfirmation:joi.string().valid(joi.ref('password'))



})

exports.createUser=async (req,res)=>{
    try{

    const { name, role, email, password, passwordConfirmation, passwordChangedAt } = req.body
    const newuser = await User.create({
        name,
        role,
        email,
        passwordConfirmation,
        passwordChangedAt
    })
    res.status(201).json({
        message: 'user created succesfully !,',
        newuser,

    })
    }catch(error){
        res.status(500).json({
            message:"Error creating the user "
        })

    }
}
exports.updateUser=async (req,res)=>{
    try{
    const user= await User.findByIdAndUpdate(req.params.id,req.body)
    res.status(202).json({
        message: 'user data is updated succesfully',
        user,

    })
    if(!user){
        new AppError('no user with such id ',404)
    }
    }catch(error){
        res.status(500).json({
            message: 'internal server error to update the user '
        })

    }

}
exports.getAllUser=async (req,res)=>{
    try{
    const user=await user.find();
    if(!user){
        new AppError('no user found',404)
    }
    res.status(200).json({
        message: "list of all user",
        user:user

    })
}catch(error){
    res.status(500).json({
        message: " internal server error ",
        error: error.message
    })

}
}
exports.deleteUser=async (req,res)=>{
    const user =await User.findByIdAndUpdate(req.params.id,{active:false})
    if(!user){
        new AppError('no user found',404)
    }
    res.status(200).json({
        message: "updated data ",
        user:user

    })
}