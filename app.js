const express=require('express');
const AppError =require('./utils/AppError')
const userRouter=require('./Router/userRouter')
const globalErorhandler=require('./controller/errorController')
const app=express()

//reading data form the body in to req.body
app.get('/',(req,res)=>{
    res.send('hellow')
})


app.use(express.json())

app.use("/api/users",userRouter)

 
app.all('*', (req,res,next)=>{
    
    next(new AppError(`can't find ${req.originalUrl} on this server`,400))
})

app.use(globalErorhandler)
module.exports=app