const Comment = require("../models/Comment")
const Post = require("../models/Post")

const createComment = async (req, res) => {
  try {
    const { id: postID } = req.params

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
    res.status(500).json({ error: "Something went wrong" })
  }
}

const updateComment = async (req, res) => {
  try {
    const { id } = req.params

    const comment = await Comment.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    )

    if (req.body.liked) {
      if (!comment.likes.includes(req.user)) {
        comment.likes.push(req.user)
        comment.save()

        return res.status(200).json({ msg: "Comment liked", comment })
      } else {
        const filteredLikes = comment.likes.filter(
          (id) => id.toString() !== req.user
        )
        comment.likes = filteredLikes
        comment.save()
        return res.status(200).json({ msg: "Comment disliked", comment })
      }
    }

    res.status(200).json({ msg: "Post updated", comment })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" })
  }
}

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params
    const comment = await Comment.findOneAndDelete({
      _id: id,
      createdBy: req.user,
    })

    res.status(200).json({ msg: "Comment deleted", comment })
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
}
module.exports = { createComment, updateComment, deleteComment }
