const express = require('express')
const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');
const authMiddlware = require('../middlewares/auth')

const router = express.Router();
router.post('/posts', authMiddlware.auth, async (req, res, next) => {
    //add new post
    const body = req.body;

    try {
        const newPost = new Post(body)
        newPost.userId = req.user.id;
        await newPost.save();
        res.status(201).json({ msg: "saved", newPost: newPost });
    } catch (err) {
        res.send(err);
    }

})
router.get('/posts/:courseId', authMiddlware.auth, async (req, res, next) => {
    const { courseId } = req.params;
    try {
        const posts = await Post.find({ courseId }).populate('userId');
        res.json(posts);
    }
    catch (error) {
        res.send(error);
    }
})
router.post('/posts/comments/:postId', async (req, res, next) => {
    //add new comment id to array myComments
    //send the comment in body
    //returns the updated post
    try {
        const { postId } = req.params;
        const { body } = req;
        const post = await Post.findOne({ _id: postId }).populate('userId');
        post.myComments.push(body._id);
        console.log(post.myComments);
        await post.save();
        // console.log(post);
        res.json(post);
    }
    catch (error) {
        res.send(error);
    }
})
router.get('/posts/comments/:postId', async (req, res, next) => {
    //get post by id
    try {
        const { postId } = req.params;
        const post = await Post.findOne({ _id: postId }).populate('userId');
        res.json(post);
    }
    catch (error) {
        res.send(error);
    }
})

router.post('/comments', authMiddlware.auth, async (req, res, next) => {
    //add comment to db
    const body = req.body;
    console.log({ body });
    try {
        const newComment = new Comment(body)
        newComment.userId = req.user.id;
        await newComment.save();
        console.log({ newComment });
        res.json(newComment);
    } catch (err) {
        res.send(err);
    }

})
router.post('/comments/comments/:commentId', async (req, res, next) => {
    //add new comment id to array myComments of comment
    //send the new comment in body
    //returns the updated comment
    try {
        const { commentId } = req.params;
        const { body } = req;
        const comment = await Comment.findOne({ _id: commentId }).populate('userId');
        comment.myComments.push(body._id);
        console.log(comment.myComments);

        await comment.save();
        // console.log(comment);
        res.json(comment);
    }
    catch (error) {
        res.send(error);
    }
})

router.get('/comments/:commentId', async (req, res, next) => {
    //return single comment by id
    const { commentId } = req.params;
    try {
        const comment = await Comment.findOne({ _id: commentId }).populate('userId');
        res.json(comment);
    }
    catch (error) {
        res.send(error);
    }
})

// router.get('/comments/:parentId',async(req,res,next)=>{
//     const {parentId}=req.params;
//     try {
//         const comments = await Comment.find({parentId});
//         res.json(comments);
//     }
//     catch (error) {
//         res.send(error);
//     }
// })
module.exports = router;