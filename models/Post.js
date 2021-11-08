const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    createdBy: {
        type: String,
    },
    content: {
        type: String,
        required: [true, 'Please provide comment\'s content']
    },
    likes: {
        usersId: {
            type: [String],
            default: []
        }
    },
}, { timestamps: true })

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title must be provided']
    },
    content: {
        type: String,
        required: [true, 'Content must be provided']
    },
    createdBy: {
        type: String,
        required: true
    },
    likes: {
        usersId: {
            type: [String],
            default: []
        }
    },
    comments: [CommentSchema]
}, { timestamps: true })



module.exports = mongoose.model('Post', postSchema)