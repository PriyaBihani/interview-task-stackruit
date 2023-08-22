const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  publicationDate: Date,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
