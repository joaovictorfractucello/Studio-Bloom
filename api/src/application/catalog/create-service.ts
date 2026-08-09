import { prisma } from "../../infrastructure/database/prisma"
import { CreateServiceInput } from "./create-service.schema"

export async function createService(input: CreateServiceInput) {
  const service = await prisma.service.create({
    data: {
      name: input.name.trim(),
      description: input.description?.trim(),
      durationMin: input.durationMin,
      priceCents: input.priceCents,
      active: input.active ?? true,
    },
  })

  return service
}