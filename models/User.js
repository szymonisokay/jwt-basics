const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username must be provided']
    },
    email: {
        type: String,
        required: [true, 'Email must be provided'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email is incorrect'
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password must be provided'],
        minlength: 6
    }
})

module.exports = mongoose.model('User', UserSchema)