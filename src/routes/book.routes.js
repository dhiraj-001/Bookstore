import express from 'express';
import { getBooks, createBook, updateBook, deleteBook } from '../controllers/book.controller.js';
import { validateBook } from '../middlewares/validateBook.js';

const router = express.Router();

router.get('/books', getBooks);
router.post('/books', validateBook, createBook);
router.put('/books/:id', validateBook, updateBook);
router.delete('/books/:id', deleteBook);

export default router;
