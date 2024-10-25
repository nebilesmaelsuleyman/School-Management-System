const mongoose= require('mongoose')
const EnrollmentSchema=new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    // Additional fields:
    // - Enrollment status (e.g., 'active', 'inactive', 'dropped')
    // - Fee details
    // - Academic year
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
