import { z } from "zod"

export const updateServiceSchema = z
  .object({
    name: z.string().min(2, "Nome muito curto").optional(),
    description: z.string().optional().nullable(), 
    durationMin: z.number().int().positive("Duração deve ser positiva").optional(),
    priceCents: z.number().int().nonnegative("Preço não pode ser negativo").optional(),
    active: z.boolean().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    { message: "Envie ao menos um campo para atualizar" }
  )

export type UpdateServiceInput = z.infer<typeof updateServiceSchema>