import { prisma } from "../../infrastructure/database/prisma"

export async function listBusinessHours() {
  return prisma.businessHours.findMany({
    orderBy: { dayOfWeek: "asc" },
  })
}