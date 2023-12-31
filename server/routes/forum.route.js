const express=require('express')
const Post=require('../models/Post.model');
const Comment=require('../models/Comment.model');

const router = express.Router();
router.post('/posts',async(req,res,next)=>{
    //add new post
    const body = req.body;
    try {
        const newPost=new Post(body)
        await newPost.save();
        res.status(201).send("saved");
    } catch (err) {
        res.send(err);
    }

})
router.get('/posts',async(req,res,next)=>{
    //get all posts
    try {
        const posts = await Post.find({});
        res.json(posts);
    }
    catch (error) {
        res.send(error);
    }
})
router.post('/posts/comments/:postId',async(req,res,next)=>{
    //add new comment id to array myComments
    //send the comment in body
    //returns the updated post
    try {
        const {postId}=req.params;
        const{body}=req;
        const post = await Post.findOne({_id:postId});
        post.myComments.push(body._id);
        await post.save();
        // console.log(post);
        res.json(post);
    }
    catch (error) {
        res.send(error);
    }
})
router.get('/posts/comments/:postId',async(req,res,next)=>{
    //get post by id
    try {
        const{postId}=req.params;
        const post = await Post.findOne({_id:postId});
        res.json(post);
    }
    catch (error) {
        res.send(error);
    }
})

router.post('/comments',async(req,res,next)=>{
    //add comment to db
    const body = req.body;
    try {
        const newComment=new Comment(body)
        await newComment.save();
        res.json(newComment);
    } catch (err) {
        res.send(err);
    }

})
router.post('/comments/comments/:commentId',async(req,res,next)=>{
     //add new comment id to array myComments of comment
    //send the new comment in body
    //returns the updated comment
    try {
        const {commentId}=req.params;
        const{body}=req;
        const comment = await Comment.findOne({_id:commentId});
        comment.myComments.push(body._id);
        await comment.save();
        // console.log(comment);
        res.json(comment);
    }
    catch (error) {
        res.send(error);
    }
})

router.get('/comments/:commentId',async(req,res,next)=>{
    //return single comment by id
    const {commentId}=req.params;
    try {
        const comment = await Comment.findOne({_id:commentId});
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
module.exports=router;