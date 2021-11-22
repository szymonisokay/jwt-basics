const Comment = require("../models/Comment")
const Post = require("../models/Post")

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
    res.status(200).json({ msg: "All comments", comments })
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}

const createComment = async (req, res) => {
  try {
    const { id: postID } = req.params

    console.log(req.user)
    const comment = await Comment.create({
      ...req.body,
      createdBy: req.user,
      postId: postID,
    })

    const post = await Post.findById(postID)
    post.comments.push(comment._id)

    post.save()

    res.status(200).json({ msg: "Comment added", comment, post })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" })
  }
}

module.exports = { getAllComments, createComment }
