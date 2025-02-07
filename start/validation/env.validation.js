const joi=require('joi');
const envschema=joi.
object({
    URL:joi.string().required(),
    PORT:joi.number().positive().default(3000),

}).unknown();

module.exports=envschema;  