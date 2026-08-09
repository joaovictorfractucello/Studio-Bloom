import { prisma } from "../../infrastructure/database/prisma"
import { UpdateServiceInput } from "./update-service.schema"

export async function updateService(id: string, input: UpdateServiceInput) {
  const existing = await prisma.service.findUnique({ where: { id } })

  if (!existing) {
    const error = new Error("Serviço não encontrado")
    ;(error as Error & { statusCode: number }).statusCode = 404
    throw error
  }

  return prisma.service.update({
    where: { id },
    data: {
      name: input.name?.trim(),
      description:
        input.description === undefined
          ? undefined
          : input.description === null
            ? null
            : input.description.trim(),
      durationMin: input.durationMin,
      priceCents: input.priceCents,
      active: input.active,
    },
  })
}