const express = require('express')

const { getAllPosts, createPost, getPost, deletePost, updatePost, updateLikesAndComments, likingComments } = require('../controllers/posts')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router.get('/posts', authMiddleware, getAllPosts)
router.post('/posts', authMiddleware, createPost)
router.get('/posts/:id', authMiddleware, getPost)
router.delete('/posts/:id', authMiddleware, deletePost)
router.put('/posts/:id', authMiddleware, updatePost)
router.patch('/posts/:id', authMiddleware, updateLikesAndComments)

module.exports = router;