import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, "Nome muito curto"),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
})

export type RegisterSchema = z.infer<typeof registerSchema>