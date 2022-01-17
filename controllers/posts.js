const Post = require('../models/Post')
const Comment = require('../models/Comment')

const getAllPosts = async (req, res) => {
  try {
    if (!req.query.user) {
      // fetch all posts from database
      const posts = await Post.find({})
        .sort('-createdAt')
        .select('-__v')
        .populate({ path: 'createdBy', select: 'username image email' })
        .populate({
          path: 'comments',
          populate: { path: 'likes', select: 'username image email' },
        })
        .populate({
          path: 'comments',
          populate: { path: 'createdBy', select: 'username image email' },
        })
        .populate({ path: 'likes', select: 'username image email' })

      return res.status(200).json({ msg: 'All posts', posts })
    }

    // fetch posts from specific user from database
    const posts = await Post.find({ createdBy: req.query.user })
      .sort('-createdAt')
      .select('-__v')
      .populate({ path: 'createdBy', select: 'username image email' })
      .populate({
        path: 'comments',
        populate: { path: 'likes', select: 'username image email' },
      })
      .populate({
        path: 'comments',
        populate: { path: 'createdBy', select: 'username image email' },
      })
      .populate({ path: 'likes', select: 'username image email' })

    res.status(200).json({ msg: 'User posts', posts })
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

const createPost = async (req, res) => {
  try {
    if (!req.body.title || !req.body.content)
      return res.status(400).json({ msg: 'Title and content must be provided' })

    const post = await Post.create({ ...req.body, createdBy: req.user })

    res.status(200).json({ msg: 'Post created!', post })
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

const getPost = async (req, res) => {
  try {
    const { id: postID } = req.params

    const post = await Post.findOne({ _id: postID })
      .select('-__v')
      .populate({ path: 'createdBy', select: 'username image email' })
      .populate({
        path: 'comments',
        populate: { path: 'createdBy', select: 'username image email' },
      })
      .populate({ path: 'likes', select: 'username image email' })

    if (!post) return res.status(404).json({ msg: 'Post not found' })

    res.status(200).json({ post })
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

const deletePost = async (req, res) => {
  try {
    const { id: postID } = req.params
    const post = await Post.findOneAndDelete({
      _id: postID,
      createdBy: req.user,
    })

    if (!post) return res.status(404).json({ msg: 'Post not found' })

    res.status(200).json({ msg: 'Post deleted', data: post })
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

const updatePost = async (req, res) => {
  try {
    const { id: postID } = req.params

    const post = await Post.findOneAndUpdate(
      { _id: postID },
      { ...req.body },
      {
        new: true,
      }
    ).populate({
      path: 'likes',
      select: '-image',
    })

    if (req.body.liked) {
      if (!post.likes.some((like) => like._id.toString() === req.user)) {
        post.likes.push(req.user)

        post.populate({ path: 'createdBy', select: 'username image email' })
        post.populate({
          path: 'comments',
          populate: { path: 'createdBy', select: 'username image email' },
          populate: { path: 'likes', select: 'username image email' },
        })
        post.populate('likes')
        post.save()

        console.log(post)

        return res.status(200).json({ msg: 'Post liked', post })
      } else {
        const removeLike = post.likes.filter((like) => {
          like._id.toString() !== req.user
        })

        post.likes = removeLike
        post.save()

        return res.status(200).json({ msg: 'Post disliked', post })
      }
    }

    if (!post) return res.status(404).json({ msg: 'Post not found' })

    res.status(200).json({ msg: 'Post updated', data: post })
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

module.exports = {
  getAllPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
}
