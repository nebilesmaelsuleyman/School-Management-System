const express =require('express');
const authController= require('./../controller/authController')
const Router =express.Router();

Router
    .post("/register",authController.register)
    .get("/login",authController.login)

module.exports=Router
