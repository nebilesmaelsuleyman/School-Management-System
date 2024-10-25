const mongoose= require('mongoose');
const userSchema= new mongoose.schema(
    {
        name:{
            type:string,
            unique:true,
            index:true,
            require:true
        },
        email:{
            type:string,
            require:true,
            unique:true,
            lowerCase:true,
            validation:[validator.isEmail,'please probide a valid email']
        },
        class:{
            type:mongoose.schema.Types.ObjectId,
            ref:'Class'
        },
        photo:string,
        role:{
            type:string,
            enum:['admin','Teacher','student','parent'],
            default:student
        },
        password:{
            type:string,
            require:true,
            minlength:8
        },
        passwrodconfirmation:{
            type:string,
            require:[true, 'please confirm your password'],
            validate:{
                validator:function(el){
                    return el === this.password;
                }, message:'password are not the same'
            },
            passwordChangedAt:{
                type:Date
            },
            passwordResetToken: String,
            passwordResetExpires:Date,

        }

    }
)
var user= mongoose.model('user',userSchema)
module.exports=user;