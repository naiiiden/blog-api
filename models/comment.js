const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = mongoose.model(
    "Comment",
    new Schema(
        {
            author: { type: String, required: true, default: "Anonymous Author" },
            body: { type: String, required: true },
            date: { type: Date, default: Date.now }
        },
        { timestamps: true }
    )
);

module.exports = Comment;