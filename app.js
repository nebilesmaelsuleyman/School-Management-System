const express=require('express');
const AppError =require('./utils/AppError')
const globalErorhandler=require('./../controller/errorController')
const app=express()



app.get('/',(req,res)=>{
    res.send('kello')
})
app.all('*',(req,res,next)=>{

    next(new AppError(`cant find ${req.originalurl} on th is server`,400))
})

app.use(globalErorhandler)

module.exports=app