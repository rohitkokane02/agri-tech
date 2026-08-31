const express = require('express');
const router = express.Router();
const { getForumPosts, createForumPost, addReply, likePost } = require('../controllers/forumController');

router.get('/', getForumPosts);
router.post('/', createForumPost);
router.post('/:id/reply', addReply);
router.put('/:id/like', likePost);

module.exports = router;
