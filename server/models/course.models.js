const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const courseSchema = new mongoose.Schema({
 
    name: {
        type: String,
        required: true
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


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const Course = mongoose.model('Course', courseSchema);
module.exports.Course = Course;