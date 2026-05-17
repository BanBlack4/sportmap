import { z } from "zod";

export const registerSchema = z.object({
  name:z.string().min(2,"Nombre muy corto"),

  email:z.email("Email inválido"),

  password:z
    .string()
    .min(6,"Mínimo 6 caracteres")
    
});
export const loginSchema=z.object({

   email:z.email(),

   password:z.string()

});