const express = require("express")

const {
  getAllPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
} = require("../controllers/posts")
const authMiddleware = require("../middleware/auth")

const router = express.Router()

router.get("/", getAllPosts)
router.post("/", authMiddleware, createPost)
router.get("/:id", getPost)
router.delete("/:id", authMiddleware, deletePost)
router.put("/:id", authMiddleware, updatePost)

module.exports = router
