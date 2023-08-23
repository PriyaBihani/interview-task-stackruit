const { Router } = require("express");
const { body, param } = require("express-validator");
const {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/post");
const { expressValidator } = require("../middlewares/validation");
const { Post } = require("../db");
const router = Router();

router.get("/", getPosts);
router.get(
  "/:postId",
  param("postId").trim().not().isEmpty(),
  param("postId").isMongoId(),
  param("postId").custom(async (postId) => await Post.exists(postId)),
  expressValidator,
  getPost
);
router.post(
  "/",
  body("author").trim().not().isEmpty(),
  body("title").trim().not().isEmpty(),
  expressValidator,
  createPost
);
router.delete(
  "/:postId",
  param("postId").trim().not().isEmpty(),
  param("postId").isMongoId(),
  param("postId").custom(async (postId) => await Post.exists(postId)),
  expressValidator,
  deletePost
);
router.patch(
  "/:postId",
  param("postId").trim().not().isEmpty(),
  param("postId").isMongoId(),
  param("postId").custom(async (postId) => await Post.exists(postId)),
  expressValidator,
  updatePost
);

module.exports = router;
