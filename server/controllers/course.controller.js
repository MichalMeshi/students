const Joi = require('joi');
const { Course } = require('../models/Course.models');
exports.addNewCourse=async(req,res,next)=>{
    const {body}=req;
    const newCourse=new Course(body);
    try{
    await newCourse.save();
    res.send("saved")
    }
    catch(err){
        res.send(err.message)
    }
}
exports.getCourses=async(req,res,next)=>{
    try {
        
        const courses = await Course.find({})
        res.json(courses);
    }
    catch (error) {
        next(error);
    }

}