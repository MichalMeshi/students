const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  info: String,
  field: String,
  myComments: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    },
],
});

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;
