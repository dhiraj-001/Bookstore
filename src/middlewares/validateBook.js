import { body, validationResult } from 'express-validator';

export const validateBook = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('publishedDate').optional().isISO8601().toDate().withMessage('PublishedDate must be a valid date'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
