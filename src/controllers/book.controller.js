import { Book } from '../models/Book.model.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import AsyncHandler from '../utils/AsyncHandeler.js'

// Get all books
export const getBooks = AsyncHandler(async (req, res) => {
    const { title, author, minPrice, maxPrice, publishedDate, sortBy, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (title) {
        filter.title = { $regex: title, $options: 'i' };
    }
    if (author) {
        filter.author = { $regex: author, $options: 'i' };
    }
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (publishedDate) {
        // Filter books published on the given date (ignoring time)
        const start = new Date(publishedDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(publishedDate);
        end.setHours(23, 59, 59, 999);
        filter.publishedDate = { $gte: start, $lte: end };
    }

    let sort = {};
    if (sortBy) {
        const parts = sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Book.countDocuments(filter);
    const books = await Book.find(filter).sort(sort).skip(skip).limit(Number(limit));
    const booksWithFormattedDate = books.map((book) => {
        const bookObj = book.toObject();
        if (bookObj.publishedDate) {
            bookObj.publishedDate = bookObj.publishedDate
                .toISOString()
                .split('T')[0];
        }
        return bookObj;
    });

    res.status(200).json(
        new ApiResponse(
            200,
            {
                total,
                page: Number(page),
                pages: Math.ceil(total / Number(limit)),
                limit: Number(limit),
                books: booksWithFormattedDate,
            },
            'Books are fetched successfully'
        )
    );
});

// Create a new book
export const createBook = AsyncHandler(async (req, res) => {
    const { title, author, price, publishedDate } = req.body
    if (!title || !author || !price) {
        throw new ApiError(400, 'title, author and price required')
    }
    const newBook = await Book.create({
        title,
        author,
        price,
        publishedDate,
    })
    return res
        .status(201)
        .json(new ApiResponse(201, newBook, 'Created Successfully'))
})

// Update a book by id
export const updateBook = AsyncHandler(async (req, res, next) => {
    const { id } = req.params
    if (!id) {
        throw new ApiError(404, 'Book not found')
    }
    const book = await Book.findById(id)
    if (!book) {
        throw new ApiError(404, 'Book not found')
    }
    const { title, author, price, publishedDate } = req.body
    if (title) book.title = title
    if (author) book.author = author
    if (price) book.price = price
    if (publishedDate) book.publishedDate = publishedDate

    const result = await book.save()
    console.log(result)
    res.status(200).json(new ApiResponse(200, result, 'Updated successfully'))
})

// Delete a book by id
export const deleteBook = AsyncHandler(async (req, res, next) => {
    const { id } = req.params
    if (!id) {
        throw new ApiError(404, 'Book not found')
    }
    const book = await Book.findById(id)
    if (!book) {
        throw new ApiError(404, 'Book not found')
    }

    await book.deleteOne()
    return res.status(200).json(new ApiResponse(200, null, 'Book deleted successfully'))
})
