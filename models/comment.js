const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = mongoose.model(
    "Comment",
    new Schema(
        {
            text: { type: String, required: true },
            author: { type: String, required: true, default: "Anonymous Author" },
        },
        { timestamps: true }
    )
);

module.exports = Comment;