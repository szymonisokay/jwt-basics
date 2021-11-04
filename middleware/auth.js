const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer '))
        res.status(401).json({ msg: 'No token passed' })

    const token = authHeader.split(' ')[1]
    const { id } = jwt.verify(token, process.env.SECRET)

    req.body.user = id
    next()
}

module.exports = authMiddleware