const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = mongoose.model(
  "Comment",
  new Schema(
    {
      author: { type: String, default: "Anonymous Author" },
      body: { type: String, required: true },
      date: { type: Date, default: Date.now },
      blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    },
    { timestamps: true }
  )
);

module.exports = Comment;
