const Post = require('../models/Post')

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({ createdBy: req.user })

        res.status(200).json({ posts })
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}

const createPost = async (req, res) => {
    try {
        if (!req.body.title || !req.body.content)
            return res.status(400).json({ msg: 'Title and content must be provided' })

        const post = await Post.create({ ...req.body, createdBy: req.user })

        res.status(200).json({ post })
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}

const getPost = async (req, res) => {
    try {
        const { id: postID } = req.params
        const post = await Post.findOne({ _id: postID, createdBy: req.user })

        if (!post)
            return res.status(404).json({ msg: 'Post not found' })

        res.status(200).json({ post })


    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const deletePost = async (req, res) => {
    try {
        const { id: postID } = req.params
        const post = await Post.findOneAndDelete({ _id: postID, createdBy: req.user })

        if (!post)
            return res.status(404).json({ msg: 'Post not found' })

        res.status(200).json({ msg: 'Post deleted', data: post })

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const updatePost = async (req, res) => {
    try {
        const { id: postID } = req.params

        const post = await Post.findOneAndUpdate({ _id: postID, createdBy: req.user }, { ...req.body }, {
            returnOriginal: false
        })

        if (!post)
            return res.status(404).json({ msg: 'Post not found' })

        res.status(200).json({ msg: 'Post updated', data: post })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const updateLikesAndComments = async (req, res) => {
    try {
        const { id: postID } = req.params
        const currentPost = await Post.findById(postID)

        if (!currentPost)
            return res.status(404).json({ msg: 'Post not found' })

        if (req.body.liked) {
            if (!currentPost.likes.usersId.includes(req.user)) {
                currentPost.likes.usersId.push(req.user)

                currentPost.save()

                res.status(200).json({ msg: 'Post liked', data: currentPost })
            } else {
                const filtered = currentPost.likes.usersId.filter(id => id !== req.user)
                currentPost.likes.usersId = filtered

                currentPost.save()

                res.status(200).json({ msg: 'Post disliked', data: currentPost })
            }
        }
    } catch (error) {
        res.status(500).json({ error })
    }






}

module.exports = {
    getAllPosts,
    createPost,
    getPost,
    deletePost,
    updatePost,
    updateLikesAndComments
}