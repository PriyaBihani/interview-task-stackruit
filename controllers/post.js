const { Post } = require('../db');

const getPosts = async (req, res) => {
    try {
        const { _page = 1, _limit=20, _search } = req.query;
        // page size = 10
        if(_search && _search.length>0) {
          const posts = await Post.find({title: {$regex: _search, $options: 'i'}})
          .limit(_limit)
          .skip((_page - 1) * 10)
          .sort({ createdAt: -1 })
          return res.status(200).json({
            message: "Posts fetched successfully",
            success: true,
            data: posts,
          });
        }
        const offset = (_page - 1) * 10;
        const posts = await Post.find()
          .limit(_limit)
          .skip(offset)
          .sort({ createdAt: -1 })
        
        return res.status(200).json({
          message: "Posts fetched successfully",
          success: true,
          data: posts,
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
          success: false,
        });
      }
};

const createPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const publicationDate = new Date();
        const blogPost = new Post({ title, content, author, publicationDate });
        await blogPost.save();
        res.status(201).json({
          message: "Posts created successfully",
          success: true,
          data: blogPost
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
          success: false,
        });
      }
}

const getPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const blogPost = await Post.findById(postId);
        res.status(200).json({
          message: "Posts fetched successfully",
          success: true,
          data: blogPost
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
          success: false,
        });
      }
}
const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const blogPost = await Post.findByIdAndUpdate(
          postId,
          req.body,
          { new: true }
        );
        res.status(201).json({
          message: "Posts Updated successfully",
          success: true,
          data: blogPost
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
          success: false,
        });
      }
}

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        await Post.findByIdAndDelete(postId);
        res.status(204).json({
          message: "Posts deleted successfully",
          success: true
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
          success: false,
        });
      }
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}