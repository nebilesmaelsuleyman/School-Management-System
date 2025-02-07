require('dotenv').config()
const logger=require('./logger')
const envschema=require('./../validation/env.validation');
const {value: envars,error}= envschema.validate(process.env)
// logger.info(envars.URL)
if(error)logger.error(error)

module.exports={
    url:envars.URL,
    port:envars.PORT,
    jwt_cookie_expiration:envars.jwt_cookie_expiration
}
