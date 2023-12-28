const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    // parentId:String,
 content: String,
 myComments: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    },]
});

const Comment = mongoose.model('Comments', commentSchema);

module.exports = Comment;
