const express = require('express')

const { Dashboard } = require('../controllers/main')

const router = express.Router()

router.get('/dashboard', Dashboard)

module.exports = router;