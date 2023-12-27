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
        address: Joi.string(),
        college: Joi.string(),
        // image: Joi.string()
    })
}

exports.register = asyncWrap(async (req, res, next) => {
    const { password, email, name, address, college } = req.body;
    const validate = userJoiSchema.register.validate({ password, email, name, address, college });
    if (validate.error) return next(new AppError(400, validate.error));

    const user = await checkIfUserExist(email);
    if (user) return next(new AppError(401, 'User already exist'));

    const newUser = new User({ password, email, name, address, college });
    await newUser.save();
    //token
    const token = generateToken(user);

    res.status(201).json({ newUser, token });
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
    res.status(200).json({ message: "Login successful", user, token });
})

exports.getUser = asyncWrap(async (req, res, next) => {
    const token = req.headers["authorization"]; // Assuming you're using a library like cookie-parser to parse cookies
    if (!token) return next(new AppError(401, "Please login"));
    const payload = decodeToken(token);
    const id = payload._doc.id;

    const user = await User.findById(id);
    if (!user) return next(new AppError(400, "User not exist"));
    // console.log("in get user in server", user);

    res.status(200).json(user);
});

exports.updateUser = asyncWrap(async (req, res, next) => {
    const userId = req.user.id;
    const body = req.body;

    const user = await User.findByIdAndUpdate(userId, body, { new: true });
    if (!user) {
        return res.status(401).send("User noe exist");
    }
    if (user)
        res.status(200).json({ msg: "User updates successfully", user });
    else {
        res.status(500).json({ msg: "Failed to update user" });
    }
})

