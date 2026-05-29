const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        description: {
            type: String
        },
        stock: {
            type: Number,
            default: 1
        }
    },
    {
        versionKey: false, 
        timestamps: true 
    }
)

const book = mongoose.model("book", bookSchema)

module.exports = book