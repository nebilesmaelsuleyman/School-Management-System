require('dotenv').config()
const logger=require('./logger')
const envschema=require('./..validation/env.validation');
const {values: envars,error}= envschema.validate(process.env)
if(error)logger.error(error)

module.exports={
    url:envars.url,
    port:envars.port,
    jwt_cookie_expiration:envars.jwt_cookie_expiration
}