import { Router } from "express";
import { addBook, deleteBook, getBooks, updateBook } from "../controllers/booksControllers";


const bookRouter = Router()

bookRouter.get("/", getBooks)
bookRouter.post("/", addBook)
bookRouter.patch("/:id", updateBook)
bookRouter.delete("/:id", deleteBook)

export { bookRouter }