import express from 'express'
import cors from 'cors'
import { handleError } from './middleware/handleErrors'
import { bookRouter } from './routes/booksRoutes'


const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/books", bookRouter)
// app.use("/api/writers", writersRouter)
// app.use("/api/users", usersRouter)



app.use(handleError)
export { app }