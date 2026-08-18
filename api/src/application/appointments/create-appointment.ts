import { prisma } from "../../infrastructure/database/prisma"
import { CreateAppointmentInput } from "./create-appointment.schema"

function httpError(message: string, statusCode: number) {
  const error = new Error(message) as Error & { statusCode: number }
  error.statusCode = statusCode
  return error
}
type CreateAppointmentParams = CreateAppointmentInput & {
  clientId: string
}
export async function createAppointment(params: CreateAppointmentParams) {
  const service = await prisma.service.findFirst({
    where: { id: params.serviceId, active: true },
  })
  if (!service) {
    throw httpError("Serviço não encontrado ou inativo", 404)
  }
  const startsAt = new Date(params.startsAt)
  if (Number.isNaN(startsAt.getTime())) {
    throw httpError("startsAt inválido", 400)
  }
  const endsAt = new Date(startsAt.getTime() + service.durationMin * 60 * 1000)
  const dayOfWeek = startsAt.getDay()
  const hours = await prisma.businessHours.findUnique({
    where: { dayOfWeek },
  })
  if (!hours || hours.isClosed) {
    throw httpError("Salão fechado neste dia", 400)
  }

  const pad = (n: number) => String(n).padStart(2, "0")
  const slotStart = `${pad(startsAt.getHours())}:${pad(startsAt.getMinutes())}`
  const slotEnd = `${pad(endsAt.getHours())}:${pad(endsAt.getMinutes())}`
  if (slotStart < hours.openTime || slotEnd > hours.closeTime) {
    throw httpError("Horário fora do expediente", 400)
  }
  const overlapping = await prisma.appointment.findFirst({
    where: {
      status: { not: "CANCELLED" },
      startsAt: { lt: endsAt },
      endsAt: { gt: startsAt },
    },
  })
  if (overlapping) {
    throw httpError("Horário indisponível", 409)
  }
  return prisma.appointment.create({
    data: {
      clientId: params.clientId,
      serviceId: service.id,
      startsAt,
      endsAt,
      notes: params.notes?.trim(),
    },
  })
}