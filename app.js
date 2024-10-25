const express=require('express');
const AppError =require('./utils/AppError')
const app=express()


app.get('/',(req,res)=>{
    res.send('kello')
})
app.all('*',(req,res,next)=>{

    next(new AppError(`cant find ${req.originalurl} on th is server`,400))
})

app.use((err,req,res,next)=>{
    err.statusCode =err.statusCode ||500 
    err.status =err.status || 'error';
    
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
})

module.exports=app