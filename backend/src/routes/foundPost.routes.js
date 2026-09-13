const express = require('express');
const router = express.Router();
const {
  createFoundPost,
  getFoundPosts,
  getFoundPostById,
} = require('../controllers/foundPost.controller');
const { protect } = require('../middleware/auth.middleware');

// GET  /api/found-posts       — public, list all active found posts
// POST /api/found-posts       — private, create a new found post
router.route('/')
  .get(getFoundPosts)
  .post(protect, createFoundPost);

// GET  /api/found-posts/:id   — public, single found post
router.route('/:id')
  .get(getFoundPostById);

module.exports = router;
