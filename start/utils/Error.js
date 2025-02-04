const mongoose =require('mongoose')
const AppError=require('./AppError')
const httpStatus= require('http-status')

const errorConverter=(err,req,res,next)=>{
    let error =err

    if(!(error instanceof AppError)){
        const statusCode= error.statusCode|| error instanceof mongoose.Error ? httpStatus.BAD_REQUEST:  httpStatus.INTERNAL_SERVER_ERROR;
        const message= error.message || httpStatus[statusCode];
        error = new AppError(statusCode , message, false, error.stack)
    }
    next(error);
}
module.exports=errorConverter;
