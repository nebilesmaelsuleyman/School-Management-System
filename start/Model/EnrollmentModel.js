const mongoose= require('mongoose')
const EnrollmentSchema=new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    classLevel:{
        type:Number
    },
    enrollmentDate: {
        type: Date,
    },
    academicYear: {
        type:Number
    },


})
EnrollmentSchema.pre("save", async function(next){
    const now = Date.now()
    const day=String(now.getDate().padStart(2,'0'))
    const month=String(now.getMonth()+1).padStart(2,"0")
    const year=string(now.getFullYear());
    this.academicYear=`${year}`;
    this.enrollmentDate=`${day}/${month}`
    next();

})

const Enrollment = mongoose.model('Enrollment',EnrollmentSchema);

module.exports = Enrollment;
