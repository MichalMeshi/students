const mongoose = require('mongoose');
const tutoringSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    ownerName: String,
    subject: String,
    field: String,
    city: String,
    message: String,
    dateCreated: {
        type: Date,
        // default: new Date()
    },
    contactInfo: String
},
    { versionKey: false },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })

const TutoringPost = mongoose.model('TutoringPost', tutoringSchema);
module.exports.TutoringPost = TutoringPost;