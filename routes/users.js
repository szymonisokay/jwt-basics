const express = require('express')

const { getUser } = require('../controllers/users')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router.get('/:id', authMiddleware, getUser)

module.exports = router