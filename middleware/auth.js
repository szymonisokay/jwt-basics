const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer '))
        res.status(401).json({ msg: 'Authentication failed' })

    const token = authHeader.split(' ')[1]

    const { id } = jwt.verify(token, process.env.SECRET)

    req.user = id
    next()
}

module.exports = authMiddleware