const expres=require('express');
const app=express();

const AttendanceSchema=new mongoose.schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    class:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'class'
    },
    date:{
        type:Date,
        required:true
    },isPresent:{
        type:Boolean,
        default:false
    }
})
const Attendance =mongoose.model('Attendance',AttendanceSchema)

module.exports=app;