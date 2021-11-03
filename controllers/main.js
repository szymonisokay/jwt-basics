const jwt = require('jsonwebtoken')
const User = require('../models/User')

const Dashboard = async (req, res) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer '))
        res.status(401).json({ msg: 'Unauthorized access' })


    const token = authHeader.split(' ')[1]

    const { id } = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(id)

    res.status(200).json({ user })
}

module.exports = {
    Dashboard
}