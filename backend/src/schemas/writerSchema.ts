import { z } from 'zod'

const WriterSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export {WriterSchema}