const {User} = require('./../Model'); // Make sure you have the correct path
const catchAsync= require('./../utils/catchAsync')
const AppError= require('./../utils/AppError')
const {userService}= require('./user.service')

const signup = async (userBody) => {
    try {
        const user = await User.create(userBody); // Correct method name: create()
        return user;
    } catch (error) {
        // Handle errors properly!  Don't just re-throw.
        console.error("Error creating user:", error); // Log the error
        throw error; // Or handle it more gracefully (e.g., custom error message)
    }
};

const login = async (email, password,) => {
    const user = await User.findOne({email})

    if (!user || !(await user.comparePassword(password))) {
        throw new ApiError(401, 'Incorrect email or password');
    }
    return user;
    };

module.exports = {
    signup ,
    login
};