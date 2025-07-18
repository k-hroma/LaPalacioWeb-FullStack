import { Request, Response, NextFunction } from "express"
import { QueryResponse } from "../types/queryResponse"
import { Book } from "../models/bookModel"
import { AddBookBody, AddBookSchema, UpdateBookBody, UpdateBookSchema } from "../schemas/bookSchema";
import { IBook } from "../types/bookInterface";
import mongoose from "mongoose";

const getBooks = async (req: Request, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  try {
    const books:IBook[] = await Book.find()
    
    res.status(200).json({
      success: true,
      message: books.length > 0 ? "Books found: " : "Database is empty",
      data: books
    });
    return
    
  } catch (error:unknown) {
    next(error)
    return
  }
};

const addBook = async (req: Request<{}, {}, AddBookBody>, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  const parseResult = AddBookSchema.safeParse(req.body)
  
 if (!parseResult.success) {
    res.status(400).json({
      success: false,
      message: "Invalid input data",
      error: parseResult.error.errors
    });
    return;
  }

  const dataBook = parseResult.data;

  try {
    const newBook = await new Book(dataBook).save()
    
    res.status(201).json({
      success: true,
      message: "Book successfully created.",
      data: newBook
    });
    return

  } catch (error:unknown) {
    if ((error as any ).code === 11000) {
    res.status(409).json({
      success: false,
      message: "The ISBN already exists in the database",
      error: 11000
  });
  return;
}
    next(error)
    return
  }
 }

const updateBook = async (req: Request<{ id: string }, {}, UpdateBookBody>, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  const { id } = req.params
    if (!id) {
    const errMsg = "Book ID is required."
    res.status(400).json({
      success: false,
      message: errMsg
    })
    console.error(errMsg)
    return
  };

  // verificar que el ID tenga el formato correcto
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
    success: false,
    message: "Invalid ID format"
  })
  return
  };
  const parseResult = UpdateBookSchema.safeParse(req.body);
   if (!parseResult.success) {
    res.status(400).json({
      success: false,
      message: "Invalid input data",
      error: parseResult.error.errors
    });
    return;
  }

  const updateDataBook = parseResult.data;
  
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updateDataBook, { new: true });
    if (!updatedBook) {
      res.status(404).json({
        success: false,
        message: `Book with ID ${id} not found.`}
      );
    return;
    };

    res.status(200).json({
      success: true,
      message: "Book successfully updated",
      data: updatedBook
    });
    return
    
  } catch (error:unknown) {
    next(error)
    return
    
  }

 }

const deleteBook = async (req: Request<{ id: string }>, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  const { id } = req.params
  if (!id) { 
    const errMsg = "Book ID is required."
    res.status(400).json({
      success: false,
      message: errMsg
    })
    console.error(errMsg)
    return
  };
    
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
    success: false,
    message: "Invalid ID format"
  })
  return
  };
  
  try {

    const deletedBook = await Book.findByIdAndDelete(id)
    if (!deletedBook) {
        res.status(404).json({
        success: false,
        message: `Book with ID ${id} not found.`
        });
      return;
      }
    res.status(200).json({
      success: true,
      message: "🗑️ Book successfully deleted.",
      data: deletedBook
    })
    
  } catch (error) {
    next(error)
    return
  }

 }

export {getBooks, addBook, updateBook, deleteBook }