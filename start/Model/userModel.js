const mongoose= require('mongoose');
const validator= require('validator');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');
const { required } = require('joi');

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
        section:{
            type: Number,
            require:true
            
        },
        teacherInfo:{
            teacherId:String,
            subjectTaught:[String],
            qualifications:[String],
            yearsofExperience:Number
        },
        adminInfo:{
            position:String,
            adminId:String


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
        program:{
            type:String
        },
        passwordconfirmation:{
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

        },
        active:{
            type:Boolean,
            default:true,
            select:false     
        }

    }, {timestamps:true}
)


userSchema.pre('save',async function(next){

    if(!this.isModified('password')){
        return next();
    }
    try{
        this.password= await bcrypt.hash(this.password,12);
        next()
    }catch(err){
        return next(err)

    }
})


userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword,this.password)
        return isMatch

    }catch(err){
        console.log('error while comparing password')
        throw err;

    }

}

var User= mongoose.model('user',userSchema)
module.exports=User;