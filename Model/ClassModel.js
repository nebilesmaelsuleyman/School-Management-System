const mongoose =require('mongoose');
const classSchema =new mongoose.Schema({
    name:{
        type:string,
        required:true,
        unique:true,
    },
    section:{
        type:String,
        required:true
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    student:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }]

})
const Class= mongoose.model('class',classSchema);
module.exports =Class;