const asyncWrap = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');
const { TutoringPost } = require('../models/tutoring.models');

exports.addTutoring = asyncWrap(async (req, res, next) => {
    const ownerId = req.user.id;
    const ownerName = req.user.name;
    const { body } = req;
    const newPost = new TutoringPost(body);
    newPost.ownerId = ownerId;
    newPost.ownerName = ownerName;
    await newPost.save();
    res.status(200).json({ msg: "added successfully" })
})

exports.getTutoringPosts = asyncWrap(async (req, res, next) => {
    const posts = await TutoringPost.find({}).populate('ownerId')
    res.json(posts);
})
