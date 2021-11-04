const Post = require('../models/Post')

const getAllPosts = async (req, res) => {
    try {
        const { user } = req.body
        const posts = await Post.find({ createdBy: user })

        res.status(200).json({ posts })
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}

const createPost = async (req, res) => {
    try {
        const { user } = req.body

        if (!req.body.title || !req.body.content)
            return res.status(400).json({ msg: 'Title and content must be provided' })

        const post = await Post.create({ ...req.body, createdBy: user })

        res.status(200).json({ post })
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}

const getPost = async (req, res) => {
    try {
        const { id: postID } = req.params
        const { user } = req.body

        const post = await Post.findOne({ _id: postID, createdBy: user })

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
        const { user } = req.body

        const post = await Post.findOneAndDelete({ _id: postID, createdBy: user })

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
        const { user } = req.body

        const post = await Post.findOneandUpdate({ _id: postID, createdBy: user }, { ...req.body }, {
            returnOriginal: false
        })

        if (!post)
            return res.status(404).json({ msg: 'Post not found' })

        res.status(200).json({ msg: 'Post updated', data: post })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    getAllPosts,
    createPost,
    getPost,
    deletePost,
    updatePost
}