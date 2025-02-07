const winston=require('winston')
const config=require('./config')
const {format, createLogger,transports}=winston;
const {combine, timestamp,printf,colorize,uncolorize}=format;
const winstonForm= printf(({level,message,timestamp,stack})=>{
    return `${timestamp}:${level}:${stack || message}`
})

const logger =createLogger({
    level:'info',
    format:combine(timestamp(),winstonForm,config.env ==='development'?colorize() :uncolorize()),
    transports:[new transports.Console()]
});
module.exports =logger
