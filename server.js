const mongoose =require('mongoose');

const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const app=require('./app');

const connectDB= async ()=>{
    try{
        const connection =await mongoose.connect(process.env.url,{useNewUrlParser:true, useUnifiedTopology:true,})
        mongoose.connection.on('connected',()=>{
            console.log('mongoose is connected succesfully !')
        })

    }catch(error){
        console.error(`Error: ${error.message}`)

    }

}

const port=process.env.port|| 4000
app.listen(port,()=>{
    console.log(`app is Running on port ${process.env.port}`)
})