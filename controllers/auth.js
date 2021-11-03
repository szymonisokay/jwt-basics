const User = require('../models/User')
const jwt = require('jsonwebtoken')

const Register = async (req, res) => {
    try {
        const user = await User.create({ ...req.body })
        res.status(201).json({ msg: 'User created successfully!', data: user })
    } catch (error) {
        res.status(400).json({ msg: 'User cannot be created' })
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email, password })
        if (!user)
            res.status(404).json({ msg: 'User not found' })

        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1d' })

        res.status(200).json({ msg: 'Login succesfully', token })

    } catch (error) {
        // res.status(404).json({ msg: 'Something went wrong' })
    }
}

module.exports = {
    Register,
    Login
}