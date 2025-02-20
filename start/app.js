const express=require('express');
const AppError =require('./utils/AppError')
const {errorConverter,errorHandler}= require('./middleware/Error')
const userRouter=require('./Router/userRouter')
const courseRouter=require('./Router/courseRouter')
const globalErorhandler=require('./controller/errorController')
const cookieParser= require('cookie-parser')
const app=express()

//reading data form the body in to req.body
app.get('/',(req,res)=>{
    res.send('hellow')
})


app.use(express.json())
app.use(cookieParser())


app.use("/api/users",userRouter)
app.use("/api/course",courseRouter);

app.all('*', (req,res,next)=>{ 
    next(new AppError(`can't find ${req.originalUrl} on this server`,400))
})


app.use(errorConverter);
app.use(errorHandler);

// app.use(globalErorhandler)
module.exports=app