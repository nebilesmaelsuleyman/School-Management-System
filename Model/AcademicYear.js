
const mongoose = require('mongoose');
const academicYearSchema = new mongoose.Schema({
    year: { type: String, required: true, unique: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
});