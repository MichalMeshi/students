const Joi = require('joi');
const { Course } = require('../models/Course.models');
const { User } = require('../models/user.models');
const asyncWrap = require('../utils/asyncWrapper');
exports.addNewCourse = async (req, res, next) => {
    const { body } = req;
    const newCourse = new Course(body);
    try {
        await newCourse.save();
        res.send("saved")
    }
    catch (err) {
        res.send(err.message)
    }
}
exports.getCourses = async (req, res, next) => {
    try {

        const courses = await Course.find({})
        res.json(courses);
    }
    catch (error) {
        next(error);
    }

}

exports.getMyCourses = asyncWrap(async (req, res, next) => {
    const userId = req.user.id;

    const userWithCourses = await User.findById(userId).populate('myCourses');
    if (!userWithCourses)
        return res.status(401).send("no user");


    const myCourses = userWithCourses.myCourses;
    console.log({ myCourses });
    if (!myCourses || !Array.isArray(myCourses)) {
        return res.status(400).send("Courses not found or not an array");
    }
    res.status(200).send(myCourses);
})

exports.addFavoriteCourse = asyncWrap(async (req, res, next) => {
    const userId = req.user.id;
    const courseId = req.params.courseId;

    const user = await User.findById(userId);
    if (!user)
        return res.status(401).send("No user");
    if (!user.myCourses.includes(courseId)) {
        user.myCourses.push(courseId);
        await user.save();
        return res.status(201).json({ msg: "course add to user successfully" });
    }
    res.status(200).json({ msg: "Course already favorite" });
})

exports.removeFavoriteCourse = asyncWrap(async (req, res, next) => {
    const userId = req.user.id;
    const courseId = req.params.courseId;
    const user = await User.findByIdAndUpdate(userId, { $pull: { myCourses: { $in: [courseId] } } }, { new: true });
    console.log("in remove tje update user", user);
    if (!user) {
        return res.status(401).send("No user");
    }
    return res.status(200).json({ msg: "Course removed from user successfully"});
});
