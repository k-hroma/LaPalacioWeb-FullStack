import { Request, Response, NextFunction } from "express"
import { QueryResponse } from "../types/queryResponse"

const getBooks = async (req: Request, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  try {
    
    
  } catch (error) {
    next(error)
    return
    
  }

 }

const addBook = async (req: Request, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {

  try {
    
  } catch (error) {
    next(error)
    return
  }
 }

const updateBook = async (req: Request, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  try {
    
  } catch (error) {
    next(error)
    return
    
  }

 }

const deleteBook = async (req: Request, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  try {
    
  } catch (error) {
    next(error)
    return
  }

 }

export {getBooks, addBook, updateBook, deleteBook }