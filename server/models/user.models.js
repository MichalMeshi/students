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
    passwordConfirm: {
        type: String,
        required: [true, "Please retype the password"],
        /*   validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "The passwords not match",
      }, */
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
    console.log("in create passwordddddddd");
    const resetToken = crypto
        .randomBytes(32) /*32 number of characters */
        .toString("hex"); /* convert it to the hexadecimal string */

    this.passwordResetToken = crypto //saving the encrypted reset token into db
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.passwordResetExpires = Date.now() + 10 * 1000 * 60; //milliseconds 10 min
    

    return resetToken; //returning the plain hex string token to be sent by email
};

const User = mongoose.model('User', userSchema);
module.exports.User = User;