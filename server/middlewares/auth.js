const { decodeToken, generateToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');
const { User } = require('../models/user.models');
const asyncWrap = require('../utils/asyncWrapper');
const sendEmail = require('../utils/email');
const crypto = require('crypto');
exports.auth = asyncWrap(async (req, res, next) => {
    console.log({
        "Incoming Authorization header:": req.headers["authorization"],
        url: req.url
    }); // Ensure it logs correctly.
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
    console.log("in server------------------------");
    //get user based on the posted email
    const { email } = req.body;
    console.log({ email });
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) return next(new AppError(401, "There is no user "));

    ///generate reset token
    const resetToken = user.createPasswordResetToken();
    console.log({ resetToken });
    await user.save({ validateBeforeSave: false });
    console.log("after create password reset token");

    ///send to users email
    // const resetURL = `${req.protocol}://${req.get(
    //     "host"
    // )}/users/reset-password/${resetToken}`;
    // const message = `Forgot your password? 
    // Submit a patch request with a new password and
    //  password confirm to :${resetURL}  
    //   \n if you havent forgotten your password ignore this email`;
    const message = `Token: ${resetToken}`;
    try {
        //here we use the try  n catch because need do more then just sending the error to the user
        await sendEmail({
            email: user.email,
            subject: "Your password reset link valid for 10 min",
            text: message,
        });
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
    console.log("in verifyyyyyyyyy");
    ///1 get user based on the token
    const { resetToken } = req.params;
    console.log({ "reset token in verify: ": resetToken });
    const encryptedResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    console.log({ "the encrypted token: ": encryptedResetToken });
    const user = await User.findOne({
        passwordResetToken: encryptedResetToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    ///2 if token not expired and there is user set the new password
    // next(new AppError(400, "Token is expired or wrong"));
    if (!user)
        return res.status(404).json({ status: 'failed' });
    return res.status(202).json({ status: 'success' });
})
exports.resetPassword = asyncWrap(async (req, res, next) => {
    const { resetToken } = req.params;
    console.log({"reset token in the resetToken":resetToken});
    const encryptedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    console.log({"encrypt token in the resetToken":encryptedResetToken});

    const { confirmPassword, password } = req.body;
    const user = await User.findOne({ passwordResetToken: encryptedResetToken })
    console.log({user});
    user.password = password;
    user.passwordConfirm = confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.passwordChangedAt = Date.now();
    await user.save();

    const token = generateToken(user);
    res.status(200).json({ user, token });
});
