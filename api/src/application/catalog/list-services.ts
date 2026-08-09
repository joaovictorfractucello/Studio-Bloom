import { prisma } from "../../infrastructure/database/prisma"

type ListServicesOptions = {
  includeInactive?: boolean
}

export async function listServices(options: ListServicesOptions = {}) {
  return prisma.service.findMany({
    where: options.includeInactive ? undefined : { active: true },
    orderBy: { name: "asc" },
  })
}