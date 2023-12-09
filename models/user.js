const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.model(
    "User",
    new Schema(
        {
            username: { type: String, required: true },
            password: { type: String, required: true },
            blogs: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Blog'
                }
            ]
        }
    )
);

module.exports = User;