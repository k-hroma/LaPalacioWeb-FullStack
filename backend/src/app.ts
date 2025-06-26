import express from 'express'
import cors from 'cors'
import { handleError } from './middleware/handleErrors'
import { bookRouter } from './routes/booksRoutes'
import { usersRouter } from './routes/authRoutes'
import { authMiddleware } from './middleware/authMiddleware'


const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/books", authMiddleware, bookRouter)
// app.use("/api/writers", writersRouter)
app.use("/api/auth", usersRouter)



app.use(handleError)
export { app }