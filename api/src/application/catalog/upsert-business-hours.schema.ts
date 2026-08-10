import { z } from "zod"

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/ // HH:MM 00:00–23:59

export const upsertBusinessHoursSchema = z
  .object({
    dayOfWeek: z.number().int().min(0).max(6),
    openTime: z.string().regex(timeRegex, "Use HH:MM (ex: 09:00)"),
    closeTime: z.string().regex(timeRegex, "Use HH:MM (ex: 18:00)"),
    isClosed: z.boolean().optional(),
  })
  .refine(
    (data) => data.isClosed === true || data.openTime < data.closeTime,
    { message: "openTime deve ser anterior a closeTime", path: ["closeTime"] }
  )

export type UpsertBusinessHoursInput = z.infer<typeof upsertBusinessHoursSchema>