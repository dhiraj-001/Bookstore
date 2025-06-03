import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

import bookRoutes from './routes/book.routes.js';

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
)  // cors setting
app.use(express.json({ limit: '20kb' }))  // json data limit
app.use(express.urlencoded({ extended: true, limit: '20kb' })) // url data 
app.use(express.static("public")) // public assets to store image, files temporarily
app.use(cookieParser())

app.use('/api', bookRoutes);

export { app }
