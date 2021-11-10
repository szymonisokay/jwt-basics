const User = require('../models/User')

const getUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(id).select('-password -__v')

        if (!user)
            return res.status(404).json({ msg: 'User not found' })

        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ msg: 'User not found' })
    }

}

module.exports = {
    getUser,
}