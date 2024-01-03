const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  info: String,
  field: String,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  myComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments"
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  dateCreated: {
    type: Date,
    // default: Date.now()
  }
});

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;
