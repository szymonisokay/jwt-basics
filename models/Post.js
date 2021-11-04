const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title must be provided']
    },
    content: {
        type: String,
        required: [true, 'Content must be provided']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        type: String,
        required: true
    },
    likes: {
        usersId: {
            type: [String]
        },
        numberOfLikes: {
            type: Number
        }
    }
})

module.exports = mongoose.model('Post', postSchema)