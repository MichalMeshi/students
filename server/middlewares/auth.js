const { decodeToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');
const { User } = require('../models/user.models');
const asyncWrap = require('../utils/asyncWrapper');

exports.auth = asyncWrap(async (req, res, next) => {
    console.log({
        "Incoming Authorization header:": req.headers["authorization"],
        url: req.url
    }); // Ensure it logs correctly.
    if (!req.headers["authorization"])
        return next(new AppError(403, "Please login"));
    const token = req.headers["authorization"];
    if (!token) return next(new AppError(401, "Please login, no token"));


    // try {
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
    // } catch (error) {
    //     // Handle any errors that might occur during token decoding or user retrieval.
    //     return next(new AppError(500, "Internal Server Error"));
    // }
})

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(new AppError(403, "You do not have permission to perform this action"));
        next();
    };
};