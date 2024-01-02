const { decodeToken, generateToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');
const { User } = require('../models/user.models');
const asyncWrap = require('../utils/asyncWrapper');
const sendEmail = require('../utils/email');
const getEmailTemplate = require('../utils/emailTemplate');

const crypto = require('crypto');
exports.auth = asyncWrap(async (req, res, next) => {
    // console.log({
    //     "Incoming Authorization header:": req.headers["authorization"],
    //     url: req.url
    // }); // Ensure it logs correctly.
    const token = req.headers["authorization"];
    if (!token) return next(new AppError(401, "Please login, no token"));

    const payload = decodeToken(token);
    const id = payload._doc.id;

    const user = await User.findById(id);
    if (!user) {
        return next(new AppError(403, "Please login, no user"));
    }

    req.user = user;
    console.log("id:::::::::", req.user.id);
    // Call next only after all the processing is done.
    next();
})

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(new AppError(403, "You do not have permission to perform this action"));
        next();
    };
};




exports.forgotPassword = asyncWrap(async (req, res, next) => {
    const { email } = req.body;
    console.log({ email });
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) return next(new AppError(401, "There is no user "));

    ///generate reset token
    const resetToken = user.createPasswordResetToken();
    const emailTemplate = getEmailTemplate(); // Get the HTML content from email.html
    if (!emailTemplate) {
        console.error('Failed to load email template.');
        return;
    }
    console.log({ resetToken });
    await user.save({ validateBeforeSave: false });
    console.log("after create password reset token");
    const formattedEmail = emailTemplate.replace('{{RESET_TOKEN}}', resetToken);

    const message = `<h1>Code: ${resetToken}</h1>`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Your password reset link valid for 10 min",
            text: message,
            htmlContent: formattedEmail
        }, "students@stud.com", formattedEmail);  // Provide the HTML content here

    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new AppError(500, err.message));
    }

    res.status(200).json({
        status: "success",
        msg: "Reset link has been sent to the users email",
    });
});
exports.verifyToken = asyncWrap(async (req, res, next) => {
    const { resetToken } = req.params;
    console.log({ "reset token in verify: ": resetToken });

    const encryptedResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const user = await User.findOne({
        passwordResetToken: encryptedResetToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(404).json({ status: 'failed' });
    }

    return res.status(202).json({ status: 'success' });
});

exports.resetPassword = asyncWrap(async (req, res, next) => {
    const { resetToken } = req.params;
    console.log({ "reset token in the resetToken": resetToken });

    const encryptedResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const { confirmPassword, password } = req.body;

    const user = await User.findOne({ passwordResetToken: encryptedResetToken });

    if (!user) {
        return next(new AppError(404, 'User not found or token expired'));
    }

    user.password = password;
    user.confirmPassword = confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.passwordChangedAt = Date.now();

    await user.save();

    const token = generateToken(user);
    res.status(200).json({ user, token });
});
