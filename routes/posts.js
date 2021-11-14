const express = require('express')

const { getAllPosts, createPost, getPost, deletePost, updatePost, updateLikesAndComments } = require('../controllers/posts')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router.get('/', getAllPosts)
router.post('/', authMiddleware, createPost)
router.get('/:id', authMiddleware, getPost)
router.delete('/:id', authMiddleware, deletePost)
router.put('/:id', authMiddleware, updatePost)
router.patch('/:id', authMiddleware, updateLikesAndComments)

module.exports = router;