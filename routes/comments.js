const express = require("express")

const {
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments")
const authMiddleware = require("../middleware/auth")

const router = express.Router()

router.post("/:id", authMiddleware, createComment)
router.put("/:id", authMiddleware, updateComment)
router.delete("/:id", authMiddleware, deleteComment)

module.exports = router
