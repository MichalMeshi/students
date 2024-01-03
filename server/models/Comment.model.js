const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    // parentId:String,
    content: String,
    myComments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        },],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    dateCreated: {
        type: Date,
        default: new Date()
    }

});

const Comment = mongoose.model('Comments', commentSchema);

module.exports = Comment;
