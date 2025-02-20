const express =require('express');
const courseController= require('../controller/courseController')
const Router =express.Router();
const authorization= require('./../middleware')

Router
    .post("/createCourse",courseController.createCourses)
    .get("/getAllcourses",authorization.auth, courseController.getAllCourses)
    .get("/getcourse/:id",courseController.getCourse)

module.exports=Router