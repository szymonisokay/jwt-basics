const mongoose = require('mongoose')

const connection = (url) => {
    mongoose.connect(url, () => console.log('Connected to database'))
}

module.exports = connection