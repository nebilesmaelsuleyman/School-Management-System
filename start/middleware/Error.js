const mongoose = require('mongoose');
const AppError = require('../utils/AppError');
// No longer need httpStatus here
const logger = require('./../config/logger');
const config = require('./../config/config');

const errorConverter = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof AppError)) {
        let statusCode = error.statusCode || (error instanceof mongoose.Error ? 400 : 500); // Directly use numbers

        const message = error.message || (statusCode === 400 ? "Bad Request" : "Internal Server Error"); // Or custom messages
        error = new AppError(statusCode, message, false, err.stack);
    }
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    if (config.env === 'production' && !err.isOperational) {
        statusCode = 500; // Always 500 in production for non-operational errors
        message = "Internal Server Error"; // Generic message in production
    }

    res.locals.errorMessage = message;

    const response = {
        error: true,
        code: statusCode,
        message,
        ...(config.env === 'development' && { stack: err.stack }),
    };

    if (config.env === 'development') {
        logger.error(err);
    }

    res.status(statusCode).json(response);
};

module.exports = {
    errorConverter,
    errorHandler,
};