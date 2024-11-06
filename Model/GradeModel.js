const mongoose =require('mongoose');
const gradeSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear' },
    grade: { type: string, required: true }
});


var Grade= mongoose.model('Grade',gradeSchema)
module.exports=Grade;