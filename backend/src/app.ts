import express from 'express'
import cors from 'cors'
import { handleError } from './middleware/handleErrors'
import { bookRouter } from './routes/booksRoutes'
import { usersRouter } from './routes/authRoutes'
import { authMiddleware } from './middleware/authMiddleware'

const app = express()
app.use(express.json())
app.use(cors())

// ✅ Middleware condicional por método HTTP
app.use("/api/books", (req, res, next) => {
  const protectedMethods = ["POST", "PATCH", "DELETE"];
  if (protectedMethods.includes(req.method)) {
    return authMiddleware(req, res, next);
  }
  next();
}, bookRouter);

// app.use("/api/writers", writersRouter)
app.use("/api/auth", usersRouter)

app.use(handleError)
export { app }
