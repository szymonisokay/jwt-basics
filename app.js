const express = require("express")
const cors = require("cors")
require("dotenv").config()
const authRouter = require("./routes/auth")
const postsRouter = require("./routes/posts")
const usersRouter = require("./routes/users")
const commentsRouter = require("./routes/comments")
const connectDB = require("./db")
const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)
app.use("/api/posts", postsRouter)
app.use("/api/comments", commentsRouter)
app.use("/api/users", usersRouter)

const PORT = process.env.PORT || 5000

connectDB(process.env.MONGO_URI)
app.listen(PORT, () => console.log(`Server listen on http://localhost:${PORT}`))
