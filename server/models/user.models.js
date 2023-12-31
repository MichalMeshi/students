const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    college: {
        type: String
    },
    role: {
        type: String,
        enum: {
            values: ["admin", "user"],
            message: "The value must be either 'admin'/'user'",
        },
        default: "user",
    },
    myCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        },
    ],
    rate: {
        type: Number,
        default: 2
    },
    image: {
        type: String,
        default: ''
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},
    { versionKey: false },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })

userSchema.pre('save', function (next) {
    this.id = this._id.toString();
    next();
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.createPasswordResetToken = function () {
    // Generate a random 5-digit number between 10000 and 99999
    const resetToken = Math.floor(Math.random() * 90000) + 10000;

    // Hash the 5-digit number
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken.toString())
        .digest("hex");

    this.passwordResetExpires = Date.now() + 10 * 1000 * 60; // 10 minutes in milliseconds

    return resetToken.toString();
};
const User = mongoose.model('User', userSchema);
module.exports.User = User;