const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const courseSchema = new mongoose.Schema({
 
    name: {
        type: String,
        required: true,
        unique:true
    },
    field: {
        type: String,
        required: true,
    }
},
    { versionKey: false },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })



const Course = mongoose.model('Course', courseSchema);
module.exports.Course = Course;