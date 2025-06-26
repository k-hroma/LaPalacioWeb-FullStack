import { z } from 'zod'

const RegisterSchemaUser = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Debe ser un email válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número")
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "La contraseña debe contener al menos un carácter especial")
    .regex(/^\S*$/, "La contraseña no debe contener espacios")
}).strict()

type registerUserBody = z.infer<typeof RegisterSchemaUser>;

export { registerUserBody, RegisterSchemaUser }

const LoginSchemaUser = z.object({
  email: z.string().email("Debe ser un email válido"),
  password: z.string().min(1, "La contraseña es obligatoria")
}).strict();

type loginUserBody = z.infer<typeof LoginSchemaUser>;

export { loginUserBody, LoginSchemaUser };
