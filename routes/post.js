const { Router } = require('express');
const { getPosts, createPost, getPost, updatePost, deletePost } = require('../controllers/post');
const router = Router();

router.get('/', getPosts);
router.get('/:postId', getPost);
router.post('/', createPost);
router.patch('/:postId', updatePost);
router.delete('/:postId', deletePost);

module.exports = router;