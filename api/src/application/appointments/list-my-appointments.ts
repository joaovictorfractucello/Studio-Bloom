import { prisma } from "../../infrastructure/database/prisma"

export async function listMyAppointments(clientId: string) {
  return prisma.appointment.findMany({
    where: { clientId },
    orderBy: { startsAt: "asc" },
    include: {
      service: {
        select: { id: true, name: true, durationMin: true, priceCents: true },
      },
    },
  })
}