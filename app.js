const express = require('express')
require('dotenv').config()
const authRouter = require('./routes/auth')
const mainRouter = require('./routes/posts')
const connectDB = require('./db')
const app = express()

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api', mainRouter)

const PORT = process.env.PORT || 3000


connectDB(process.env.MONGO_URI)
app.listen(PORT, () => console.log(`Server listen on http://localhost:${PORT}`))