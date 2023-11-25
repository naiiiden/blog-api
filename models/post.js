const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = mongoose.model(
    "Post",
    new Schema(
        {   
            title: { type: String, required: true },
            text: { type: String, required: true },
            author: { type: String, required: true },
            published: { type: Boolean, required: true },
        },
        { timestamps: true }
    )
);

module.exports = Post;