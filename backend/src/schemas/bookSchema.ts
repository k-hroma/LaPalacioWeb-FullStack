import { z } from "zod";

const AddBookSchema = z.object({
  isbn: z.number(),
  title: z.string().min(1),
  writer: z.string().min(1),
  editorial: z.string().min(1),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative()
});

type AddBookBody = z.infer<typeof AddBookSchema>;
export {AddBookBody, AddBookSchema }