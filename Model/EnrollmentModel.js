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
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    academicYear: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'AcademicYear' 
    },


})
const Enrollment = mongoose.model('Enrollment',EnrollmentSchema);

module.exports = Enrollment;
