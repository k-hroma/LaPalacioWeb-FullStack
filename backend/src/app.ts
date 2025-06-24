import express from 'express'
import cors from 'cors'
import { handleError } from './middleware/handleErrors'

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/books", () => { })
app.use("/api/writers", () => { })
app.use("/api/auth", () => { })

app.use(handleError)
export { app }