import { z } from "zod"

export const listDayAppointmentsSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use a data no formato YYYY-MM-DD"),
})

export type ListDayAppointmentsInput = z.infer<typeof listDayAppointmentsSchema>