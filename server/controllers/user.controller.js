const { User } = require('../models/user.models');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const { generateToken, decodeToken } = require('../utils/jwt');
const asyncWrap = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');


const userJoiSchema = {
    login: Joi.object().keys({
        password: Joi.string(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).error(() => Error('Email is not valid'))
    }),
    register: Joi.object().keys({
        password: Joi.string().max(20).required(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).error(() => Error('Email is not valid')),
        name: Joi.string().required(),
        role: Joi.string()
    })
}

exports.register = asyncWrap(async (req, res, next) => {
    const body = req.body;
    const validate = userJoiSchema.register.validate(body);
    if (validate.error) return next(new AppError(400, validate.error));

    const user = await checkIfUserExist(body.email);
    if (user) return next(new AppError(401, 'User already exist'));

    const newUser = new User(body);
    await newUser.save();

    res.status(201).json(newUser);
});

const checkIfUserExist = async (email) => {
    const user = await User.findOne({ email: email })/*.populate('toys')*/;
    return user;
}

exports.login = asyncWrap(async (req, res, next) => {
    const body = req.body;
    const validate = userJoiSchema.login.validate(body);
    if (validate.error) return next(new AppError(400, validate.error));

    const user = await checkIfUserExist(body.email);
    if (!user) return next(new AppError(404, 'User not exist, please register before login'));

    const passwordMatch = await bcrypt.compare(body.password.trim(), user.password);
    if (!passwordMatch) return next(new AppError(400, 'Oops, Incorrect password'));

    //token
    const token = generateToken(user);
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 10,
    });
    res.status(200).json({ message: "Login successful", user });
})

