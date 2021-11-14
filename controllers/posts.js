const Post = require('../models/Post')
const jwt = require('jsonwebtoken')

const getAllPosts = async (req, res) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            const posts = await Post.find({}).sort('-createdAt')
            return res.status(200).json({ msg: 'All users posts', posts })
        }

        const token = authHeader.split(' ')[1]

        const { id } = jwt.verify(token, process.env.SECRET)
        console.log(id)

        const posts = await Post.find({ createdBy: id })

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

        res.status(200).json({ msg: 'Post created!', post })
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
        const { id } = req.params

        // Liking and disliking comments functionality
        if (req.body.commentLiked) {
            const post = await Post.findOne({ 'comments._id': id })

            if (!post)
                return res.status(404).json({ msg: 'Post not found' })

            const comment = post.comments.find(comment => comment._id.equals(id))

            if (!comment.likes.usersId.includes(req.user)) {
                comment.likes.usersId.push(req.user)

                post.save()

                return res.status(200).json({ msg: 'Comment liked', data: comment })
            } else {
                const filtered = comment.likes.usersId.filter(id => id !== req.user)
                comment.likes.usersId = filtered

                post.save()
                return res.status(200).json({ msg: 'Comment disliked', data: comment })
            }
        }

        if (req.body.commentEdited) {
            const editedPost = await Post.findOne({ 'comment._id': id })

            if (!editedPost)
                res.status(404).json({ msg: 'Post not found' })

            const singleComment = editedPost.comments.find(comment => comment._id.equals(id))
            console.log(editedPost)

            if (singleComment.createdBy !== req.user) {
                return res.status(401).json({ msg: "Access denied" })
            }


            res.status(200).json({ msg: 'Comment edited', data: editedPost })
        }


        // Deleting comment functionality
        if (req.body.commentDeleted) {
            const post = await Post.findOne({ 'comments._id': id })

            if (!post)
                return res.status(404).json({ msg: 'Post not found' })

            const singleComment = post.comments.find(comment => comment._id.equals(id))

            if (singleComment.createdBy !== req.user) {
                return res.status(401).json({ msg: "Access denied" })
            }

            const filteredComments = post.comments.filter(comment => comment !== singleComment)

            console.log(filteredComments)

            post.comments = filteredComments

            post.save()

            return res.status(200).json({ msg: 'Comment deleted', data: post })
        }

        const currentPost = await Post.findById(id)

        if (!currentPost)
            return res.status(404).json({ msg: 'Post not found' })

        // Commenting posts functionality
        if (req.body.commentAdded) {
            const { content } = req.body
            if (!content)
                return res.status(200).json({ msg: 'Comment\'s body not provided' })

            const comment = {
                createdBy: req.user,
                content,
            }

            currentPost.comments.push(comment)
            currentPost.save()
            return res.status(200).json({ data: currentPost })
        }

        // Liking posts functionality
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
        } else {
            res.status(500).json({ msg: 'Error' })
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
    updateLikesAndComments,
}