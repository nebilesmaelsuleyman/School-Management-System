const express =require('express');
const authController= require('../controller/authController')
const Router =express.Router();

Router
.post('/signup',authController.signup)
.get("/allusers",authController.getAllusers)
.post("/login",authController.login)
.post('/forgotpassword',authController.forgetpassword )
// Router.post('/login',authController.login)

module.exports=Router