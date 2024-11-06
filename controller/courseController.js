const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const Course = require('./../Model/courseModel');

exports.createCourses= async(req,res, next)=>{
    const course = await course.create(req.body)
    res.status(200).json({
        status:'succes',
        data:{
            data:course
        }
    })
}
exports.getAllCourses=async(req,res,next)=>{
    const allcourses=await Course.find();
    res.status(200).json({
        status:'succes',
        data:{
            data:allcourses
        }
    })
exports.deleteCourse=async (req,res,next)=>{
    const destroy= await Course.findByIdandDelete(req.params.id)
    res.status(204).json({
        status:'success',
        data:null
    });
    next()

}
}
