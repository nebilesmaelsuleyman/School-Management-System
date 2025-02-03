const Course = require('./../Model/courseModel');
const AppError=require('./../utils/AppError')

exports.createCourses = async (req, res, next) => {
    try {
        const newCourse = await Course.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                data: newCourse
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find();
        res.status(200).json({
            status: 'success',
            data: {
                data: courses
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

exports.getCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                status: 'fail',
                message: 'Course not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                data: course
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
exports.deleteCourse=async(req,res,next)=>{
    const deletecourse=await Course.findByIdAndDelete(req.params.id)
    if(!deletecourse){
        new AppError("course with this id is not available",404)
    }
}