const { Post } = require('../db');

const getPosts = async (req, res) => {
    try {
        const blogPosts = await Post.find();
        res.json(blogPosts);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
};

const createPost = async (req, res) => {
    try {
        console.log("GERE \n" + req.body)
        const { title, content, author } = req.body;
        const publicationDate = new Date();
        const blogPost = new Post({ title, content, author, publicationDate });
        await blogPost.save();
        res.status(201).json(blogPost);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
}

const getPost = async (req, res) => {
    try {
        if(req.params.postId == "undefined") throw new Error("Post not found");
        const blogPost = await Post.findById(req.params.postId);
        res.json(blogPost);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
}
const updatePost = async (req, res) => {
    try {
        if(req.params.postId == "undefined") throw new Error("Post not found");
        const blogPost = await Post.findByIdAndUpdate(
          req.params.postId,
          req.body,
          { new: true }
        );
        res.json(blogPost);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
}

const deletePost = async (req, res) => {
    try {
        if(req.params.postId == "undefined") throw new Error("Post not found");
        await Post.findByIdAndDelete(req.params.postId);
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}