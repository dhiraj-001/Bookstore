import mongoose, { Schema } from 'mongoose'

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    publishedDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

export const Book = mongoose.model('Book', BookSchema)
