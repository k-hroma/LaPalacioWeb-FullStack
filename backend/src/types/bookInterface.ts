import { IWriter } from "./writerInterface"

interface IBook {
  isbn: number,
  title: string,
  writer: IWriter,
  editorial: string,
  price: number,
  stock: number
}
 
export { IBook }