import { Schema, model } from "mongoose";
import { IBook } from "../types/bookInterface";

const bookSchema = new Schema<IBook>({
  isbn: {type: Number, required:true, unique: true},
  title: {type: String, required:true, trim: true},
  writer: {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true }
  },
  editorial: { type: String, required: true, trim: true },
  price: {type:Number, required:true},
  stock: {type: Number, required:true,}
}, {versionKey:false,  timestamps: true,})

const Book = model<IBook>("BooK", bookSchema)

export { Book }