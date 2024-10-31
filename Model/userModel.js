const mongoose= require('mongoose');
const validator= require('validator');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');

const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            unique:true,
            index:true,
            require:true
        },
        email:{
            type:String,
            require:true,
            unique:true,
            lowerCase:true,
            validation:[validator.isEmail,'please probide a valid email']
        },
        class:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Class'
        },
        photo:String,
        role:{
            type:String,
            enum:['admin','Teacher','student','parent'],
            default:'student'
        },
        password:{
            type:String,
            require:true,
            minlength:8
        },
        passwrodconfirmation:{
            type:String,
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

userSchema.pre('save', async function(next){
    this.password =await bcrypt.hash(this.password,12)
    this.passwrodconfirmation= undefined;
    next()
    
})
userSchema.pre('save',function(next){
    this.passwordChangedAt=Date.now()
 next()
})
userSchema.methods.comparePassword= async function(candidatePassword){
    console.log(candidatePassword)

    return  await bcrypt.compare(candidatePassword,this.password)
}
userSchema.methods.ResetToken =async function(){
    const resetToken =crypto.randomBytes(32).toString('hex');
    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires =Date.now()+10*60*1000;
    return resetToken
}


var User= mongoose.model('user',userSchema)
module.exports=User;