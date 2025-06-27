import { z } from "zod";
import { WriterSchema } from "./writerSchema";


const AddBookSchema = z.object({
  isbn: z.number(),
  title: z.string().min(1),
  writer: WriterSchema,
  editorial: z.string().min(1),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative()
}).strict()

type AddBookBody = z.infer<typeof AddBookSchema>;

const UpdateBookSchema = z.object({
  isbn: z.number().optional(),
  title: z.string().min(1).optional(),
  writer: WriterSchema.optional(),
  editorial: z.string().min(1).optional(),
  price: z.number().nonnegative().optional(),
  stock: z.number().int().nonnegative().optional()
}).strict()


type UpdateBookBody = z.infer<typeof UpdateBookSchema>;

export {AddBookBody, AddBookSchema, UpdateBookSchema, UpdateBookBody }