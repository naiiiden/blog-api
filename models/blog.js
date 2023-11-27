const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = mongoose.model(
    "Blog",
    new Schema(
        {   
            title: { type: String, required: true },
            body: { type: String, required: true },
            author: { type: String, required: true },
            published: { type: Boolean, required: true },
            comments: [{ body: { type: String, required: true }, date: { type: Date, default: Date.now } }],
        },
        { timestamps: true }
    )
);

module.exports = Blog;