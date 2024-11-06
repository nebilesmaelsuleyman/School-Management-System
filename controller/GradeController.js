const Grade= require('./../Model/GradeModel');
const AppError = require('../utils/AppError');

exports.createGrade = async (req, res) => {
    try {
        const grade = await Grade.create(req.body); // Using create method
        res.status(201).json({ success: true, data: grade });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getAllGrades = async (req, res) => {
    try {
        const grades = await Grade.find().populate('enrollment'); // Assuming Grade model has an enrollment reference
        res.status(200).json({ success: true, data: grades });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getGradeById = async (req, res) => {
    try {
        const grade = await Grade.findById(req.params.id).populate('enrollment');
        if (!grade) {
            return res.status(404).json({ success: false, error: 'Grade not found' });
        }
        res.status(200).json({ success: true, data: grade });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateGrade = async (req, res) => {
    try {
        const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!grade) {
            return res.status(404).json({ success: false, error: 'Grade not found' });
        }
        res.status(200).json({ success: true, data: grade });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}