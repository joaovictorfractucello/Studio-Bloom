import { z } from "zod"

export const createAppointmentSchema = z.object({
  serviceId: z.string().min(1, "serviceId obrigatório"),
  startsAt: z.string().datetime({ message: "startsAt deve ser ISO 8601" }),
  notes: z.string().optional(),
})

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>