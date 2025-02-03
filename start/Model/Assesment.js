const mongoose= require('mongoose')
const AssesmentSchema =new mongoose.Schema({
    mid_Exam:{
        type :Number,
        max:25,

    },
    Individual_Assignment:{
        type:Number,
        max:10,


    },
    project:{
        type:Number,
        max:15,
        
    },
    final_Exam:{
        type:Number,
        max:50,
        

    },
    Total:{
        type:Number
    },
    Grade:{
        type:String
    }

})

AssesmentSchema.pre('save',async function(next){
    

    this.Total=this.mid_Exam+this.Individual_Assignment+ this.project+this.final_Exam;
    next()

})

AssesmentSchema.pre('save',async function(next){
    const totalpoints= this.Total;
    if(totalpoints>=90){
        this.Grade="A+"
    }else if( totalpoints>=85){
        this.Grade="A"

    }else if(totalpoints>=80){
        this.Grade="A-"
    }
    else if(totalpoints>=75){
        this.Grade="B+"
    }else if(totalpoints>=70){
        this.Grade="B"
    }else if(totalpoints>=65){
        this.Grade="B-"
    }
    else if(totalpoints>=60){
        this.Grade="c+"
    }else if(totalpoints>=55){
        this.Grade="c"
    }else if(totalpoints>=50){
        this.Grade="c-"
    }
    next();
})

const Assesment=mongoose.Model('Assesment',AssesmentSchema)
module.exports=Assesment;
