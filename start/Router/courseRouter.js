const express =require('express');
const courseController= require('../controller/courseController')
const Router =express.Router();

Router
    .post("/createCourse",courseController.createCourses)
    .get("/getAllcourses",courseController.getAllCourses)
    .get("/getcourse/:id",courseController.getCourse)

module.exports=Router