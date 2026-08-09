import { z } from "zod"

export const createServiceSchema = z.object({
    name: z.string().min(2, "Nome muito curto"),
    description: z.string().optional(),
    durationMin: z.number().int().positive("Duração deve ser positiva"),
    priceCents: z.number().int().nonnegative("Preço não pode ser negativo"),
    active: z.boolean().optional(), 
  })
  export type CreateServiceInput = z.infer<typeof createServiceSchema>
  