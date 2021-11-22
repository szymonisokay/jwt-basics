const mongoose = require("mongoose")

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title must be provided"],
    },
    content: {
      type: String,
      required: [true, "Content must be provided"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model("Post", postSchema)
