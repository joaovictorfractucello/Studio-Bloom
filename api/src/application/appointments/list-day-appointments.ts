import { prisma } from "../../infrastructure/database/prisma"
import { ListDayAppointmentsInput } from "./list-day-appointments.schema"

export async function listDayAppointments(input: ListDayAppointmentsInput) {
  const [year, month, day] = input.date.split("-").map(Number)
  const dayStart = new Date(year, month - 1, day, 0, 0, 0, 0)
  const dayEnd = new Date(year, month - 1, day, 23, 59, 59, 999)

  return prisma.appointment.findMany({
    where: {
      startsAt: { gte: dayStart, lte: dayEnd },
      status: { not: "CANCELLED" },
    },
    orderBy: { startsAt: "asc" },
    include: {
      service: {
        select: { id: true, name: true, durationMin: true },
      },
      client: {
        select: { id: true, name: true, email: true },
      },
    },
  })
}