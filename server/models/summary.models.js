const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SummarySchema = new mongoose.Schema({
 
    url: {
        type: String,
        required: true,
        unique:true
    },
    userId: {
        type: String,
        required: true,
    },
        courseId: {
        type: String,
        required: true,
    }

    },


    { versionKey: false },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })



const Summary = mongoose.model('Summary', SummarySchema);
module.exports.Summary = Summary;