const joi=require('joi');
const envschema=joi.object({
    url:joi.string().required(),
    port:joi.number().positive().default(3000),
    jwt_cookie_expiration:joi.number,

}).unknown();

module.exports=envschema;