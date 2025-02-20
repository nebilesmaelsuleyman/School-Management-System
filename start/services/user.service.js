const {User}=require('./../Model')
const AppError =require('../utils/AppError')

const getUserByEmail =async (email)=>{
    return await User.findOne({email});
}


module.exports={
    getUserByEmail
}