# Book Store REST API

This project is a simple REST API for managing a Book Store. It provides CRUD operations for books, including filtering, sorting, and pagination support. The API is built using Node.js, Express, and MongoDB with Mongoose ODM.

## Features

- Book schema with the following fields:
  - `title` (string, required)
  - `author` (string, required)
  - `price` (number, required)
  - `publishedDate` (date, required, defaults to current date)
- CRUD endpoints:
  - `GET /api/books` - Retrieve all books with optional filtering, sorting, and pagination
  - `POST /api/books` - Create a new book
  - `PUT /api/books/:id` - Update an existing book by ID
  - `DELETE /api/books/:id` - Delete a book by ID
- Filtering support on `GET /api/books` by:
  - `title` (partial match, case-insensitive)
  - `author` (partial match, case-insensitive)
  - `minPrice` and `maxPrice` (price range)
  - `publishedDate` (books published on a specific date)
- Sorting support on `GET /api/books` by any field in ascending or descending order using the `sortBy` query parameter (e.g., `sortBy=price:asc`)
- Pagination support on `GET /api/books` using `page` and `limit` query parameters
- Validation middleware for request bodies using `express-validator`
- Proper error handling with meaningful messages and HTTP status codes
- Postman collection included for easy API testing

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- express-validator
- dotenv
- cors
- cookie-parser

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running (local or cloud)
- Postman (optional, for API testing)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd BookStore
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your MongoDB connection string and other environment variables:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.ge1iz6h.mongodb.net
DB_NAME=bookstore
CORS_ORIGIN=http://localhost:3000
PORT=3000
```

4. Start the server:

```bash
npm run dev
```

The server will start on the port specified in `.env` (default 3000).

## API Endpoints

### Get All Books

```
GET /api/books
```

Query Parameters:

- `title` (string) - filter by book title (partial, case-insensitive)
- `author` (string) - filter by author name (partial, case-insensitive)
- `minPrice` (number) - minimum price filter
- `maxPrice` (number) - maximum price filter
- `publishedDate` (date in YYYY-MM-DD) - filter books published on this date
- `sortBy` (string) - sort by field and order, e.g., `price:asc` or `publishedDate:desc`
- `page` (number) - page number for pagination (default 1)
- `limit` (number) - number of items per page (default 10)

Response:

```json
{
  "status": 200,
  "data": {
    "total": 100,
    "page": 1,
    "pages": 10,
    "limit": 10,
    "books": [
      {
        "_id": "60f7c0f4b1d3c72f88e4a123",
        "title": "Sample Book",
        "author": "Author Name",
        "price": 19.99,
        "publishedDate": "2023-07-29"
      },
      ...
    ]
  },
  "message": "Books are fetched successfully"
}
```

### Create a Book

```
POST /api/books
```

Request Body:

```json
{
  "title": "Sample Book",
  "author": "Author Name",
  "price": 19.99,
  "publishedDate": "2023-07-29"
}
```

Response:

```json
{
  "status": 201,
  "data": {
    "_id": "60f7c0f4b1d3c72f88e4a123",
    "title": "Sample Book",
    "author": "Author Name",
    "price": 19.99,
    "publishedDate": "2023-07-29T00:00:00.000Z"
  },
  "message": "Created Successfully"
}
```

### Update a Book

```
PUT /api/books/:id
```

Request Body: (any of the book fields to update)

```json
{
  "title": "Updated Book",
  "author": "Updated Author",
  "price": 29.99,
  "publishedDate": "2023-07-30"
}
```

Response:

```json
{
  "status": 200,
  "data": {
    "_id": "60f7c0f4b1d3c72f88e4a123",
    "title": "Updated Book",
    "author": "Updated Author",
    "price": 29.99,
    "publishedDate": "2023-07-30T00:00:00.000Z"
  },
  "message": "Updated successfully"
}
```

### Delete a Book

```
DELETE /api/books/:id
```

Response:

```json
{
  "status": 200,
  "data": null,
  "message": "Book deleted successfully"
}
```

## Validation

Request bodies for creating and updating books are validated using `express-validator`. Validation errors return a 400 status with details.

## Testing

Use the included Postman collection (`postman/BookStore.postman_collection.json`) to test the API endpoints.

## Future Improvements

- Add unit and integration tests
- Add Swagger/OpenAPI documentation
- Add user authentication and authorization
- Add support for image uploads for book covers
- Add caching for improved performance

## License

This project is licensed under the MIT License.
