const express = require("express")

const { getAllComments, createComment } = require("../controllers/comments")
const authMiddleware = require("../middleware/auth")

const router = express.Router()

router.get("/", getAllComments)
router.post("/:id", authMiddleware, createComment)
// router.post('/register', Register)
// router.post('/login', Login)

module.exports = router
