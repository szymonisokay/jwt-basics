const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const checkUser = await User.findOne({ email })
        if (checkUser)
            return res.status(400).json({ msg: 'User with this email already exists!' })

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const user = await User.create({ ...req.body, password: hashed })

        const token = jwt.sign({ id: user._id, username }, process.env.SECRET, { expiresIn: '1d' })
        res.status(201).json({ msg: 'User created successfully!', user: { token, username } })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user)
            return res.status(404).json({ msg: 'User not found' })

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch)
            return res.status(401).json({ msg: 'Wrong password!' })

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET, { expiresIn: '1d' })
        res.status(200).json({ msg: 'Logged in succesfully', user: { token, username: user.username } })

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    Register,
    Login
}