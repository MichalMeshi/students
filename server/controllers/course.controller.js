const Joi = require('joi');
const { Course } = require('../models/Course.models');
exports.addNewCourse=(req,res,next)=>{
    const {body}=req;
    const newCourse=new Course(body);
    try{
    newCourse.save();
    res.send("saved")
    }
    catch(err){
        res.send(err)
    }
}