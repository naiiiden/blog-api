const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = mongoose.model(
    "Message",
    new Schema({
        text: { type: String, required: true },
        author: { type: String, required: true },
        added: { type: Date, required: true },
    })
);

module.exports = Message;