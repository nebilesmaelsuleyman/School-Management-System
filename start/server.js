const mongoose =require('mongoose');

const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const app=require('./app');
const config =require('./config/config')


        mongoose.connect(config.url);
        mongoose.connection.on('connected',()=>{
        console.log('mongoose is connected succesfully !')})


const port=process.env.port|| 4000
app.listen(port,()=>{
    console.log(`app is Running on port ${process.env.port}`)
})