const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// 등록일 셋팅
//var res_start = new Date(start);
//var res_end = new Date(end);
let start = new Date().getTime() + (3600000 * 9)
let end = new Date().getTime() + (3600000 * 9)
console.log(end);

const { Schema } = mongoose;
const boardSchema = new Schema({
    /* AutoIncrement 사용함 */
    // boardId: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    // },
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

boardSchema.plugin(AutoIncrement, { inc_field: "boardId" });
module.exports = mongoose.model("Boards", boardSchema)

