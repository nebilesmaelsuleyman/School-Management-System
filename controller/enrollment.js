
const Enrollment = require('./../Model/Enrollment');
const AppError = require('../utils/AppError');

exports.createEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.create(req.body); // Using create method
        res.status(201).json({ success: true, data: enrollment });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find().populate('student course academicYear');
        res.status(200).json({ success: true, data: enrollments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getEnrollmentById = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id).populate('student course academicYear');
        if (!enrollment) {
            return res.status(404).json({ success: false, error: 'Enrollment not found' });
        }
        res.status(200).json({ success: true, data: enrollment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!enrollment) {
            return res.status(404).json({ success: false, error: 'Enrollment not found' });
        }
        res.status(200).json({ success: true, data: enrollment });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.deleteEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
        if (!enrollment) {
            return res.status(404).json({ success: false, error: 'Enrollment not found' });
        }
        res.status(200).json({ success: true, data: enrollment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};