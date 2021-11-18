const mongoose = require("mongoose");

// let today = new Date();
// let start = new Date().getTime() + (3600000 * 9)
let end = new Date().getTime() + (3600000 * 9)

const { Schema } = mongoose;
const boardSchema = new Schema({
    boardId: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    regDate: {
        type: Date,
        required: true,
        default: end
    }
})

module.exports = mongoose.model("Boards", boardSchema)

