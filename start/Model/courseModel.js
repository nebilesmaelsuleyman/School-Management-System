const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: 
    { type: String,
        required: true },
    description: 
    { type: String 

    },
    credits: {
        type: Number, 
        required: true },
    teacher: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User ',
        },
    assesment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Asssesment"
    }]
});
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;