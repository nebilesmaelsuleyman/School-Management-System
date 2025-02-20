const User = require('../Model/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const { authService, TokenGeneration,tokenService } = require('./../services');

const register = catchAsync(async (req, res, next) => { // Use catchAsync here
    const user = await authService.signup(req.body);
    const token = TokenGeneration.generateToken(user.id);
    res.status(201).json({
        user,
        token
    });
}); 


const login = catchAsync(async (req, res) => {

    const { email, password } = req.body;
    const user = await authService.login(email, password);
    // generate token
    const token = await TokenGeneration.generateToken(user._id,res);
    res.status(200).send({ user, token });
});


module.exports = {
    register,
    login
};



