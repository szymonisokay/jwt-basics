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
        minlength: [6, 'Password must be at least 6 characters long']
    },
    image: {
        type: String,
        default: 'https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg'
    }
})

module.exports = mongoose.model('User', UserSchema)