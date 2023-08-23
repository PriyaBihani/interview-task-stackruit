const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  publicationDate: Date,
}, {
  timestamps: true
});

// static method
PostSchema.statics.exists = async function(id){
  try{
      const post = await this.findById(id)
      if(!post) throw new Error('Post does not exists')
      return post
  }catch(error){
      throw error
  }
}

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
