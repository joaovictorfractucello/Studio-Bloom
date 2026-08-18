import { z } from "zod"

export const listSlotsSchema = z.object({
  serviceId: z.string().min(1, "serviceId obrigatório"),

  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use a data no formato YYYY-MM-DD"),
})

export type ListSlotsInput = z.infer<typeof listSlotsSchema>