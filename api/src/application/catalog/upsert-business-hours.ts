import { prisma } from "../../infrastructure/database/prisma"
import { UpsertBusinessHoursInput } from "./upsert-business-hours.schema"

export async function upsertBusinessHours(input: UpsertBusinessHoursInput) {
  return prisma.businessHours.upsert({
    where: { dayOfWeek: input.dayOfWeek },
    create: {
      dayOfWeek: input.dayOfWeek,
      openTime: input.openTime,
      closeTime: input.closeTime,
      isClosed: input.isClosed ?? false,
    },
    update: {
      openTime: input.openTime,
      closeTime: input.closeTime,
      isClosed: input.isClosed ?? false,
    },
  })
}