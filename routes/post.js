const { Router } = require('express');
const { body } = require("express-validator");
const { getPosts, createPost, getPost, updatePost, deletePost } = require('../controllers/post');
const { expressValidator } = require('../middlewares/validation');
const router = Router();

router.get('/', getPosts);
router.get('/:postId', getPost);
router.post('/', 
    body("author").trim().not().isEmpty(),
    body("title").trim().not().isEmpty(),
    expressValidator,
    createPost
);
router.delete('/:postId', deletePost);
router.patch('/:postId', updatePost);

module.exports = router;