const express = require('express')

const { getAllPosts, createPost, getPost, deletePost, updatePost } = require('../controllers/posts')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router.get('/posts', authMiddleware, getAllPosts)
router.post('/posts', authMiddleware, createPost)
router.get('/posts/:id', authMiddleware, getPost)
router.delete('/posts/:id', authMiddleware, deletePost)
router.patch('/posts/:id', authMiddleware, updatePost)

module.exports = router;