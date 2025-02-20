const catchAsync = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next); // This is the correct way
};

module.exports = catchAsync;

