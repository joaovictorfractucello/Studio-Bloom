import { prisma } from "../../infrastructure/database/prisma"
import { ListSlotsInput } from "./list-slots.schema"
import {
  timeToMinutes,
  combineDateAndTime,
  intervalsOverlap,
} from "./time"

function httpError(message: string, statusCode: number) {
  const error = new Error(message) as Error & { statusCode: number }
  error.statusCode = statusCode
  return error
}

export async function listSlots(input: ListSlotsInput) {
  // Serviço
  const service = await prisma.service.findFirst({
    where: { id: input.serviceId, active: true },
  })
  if (!service) {
    throw httpError("Serviço não encontrado ou inativo", 404)
  }

  // Dia da semana + horário de funcionamento
  const [year, month, day] = input.date.split("-").map(Number)
  const dayDate = new Date(year, month - 1, day) 
  const dayOfWeek = dayDate.getDay()

  const hours = await prisma.businessHours.findUnique({
    where: { dayOfWeek },
  })
  if (!hours || hours.isClosed) {
    throw httpError("Salão fechado neste dia", 400)
  }

  // Candidatas
  const openMin = timeToMinutes(hours.openTime)
  const closeMin = timeToMinutes(hours.closeTime)
  const duration = service.durationMin

  const candidates: { startsAt: Date; endsAt: Date }[] = []

  for (let startMin = openMin; startMin + duration <= closeMin; startMin += duration) {
    const hh = String(Math.floor(startMin / 60)).padStart(2, "0")
    const mm = String(startMin % 60).padStart(2, "0")
    const startsAt = combineDateAndTime(dayDate, `${hh}:${mm}`)
    const endsAt = new Date(startsAt.getTime() + duration * 60 * 1000)
    candidates.push({ startsAt, endsAt })
  }

  // Agendamentos do dia (ocupam espaço)
  const dayStart = new Date(year, month - 1, day, 0, 0, 0, 0)
  const dayEnd = new Date(year, month - 1, day, 23, 59, 59, 999)

  const appointments = await prisma.appointment.findMany({
    where: {
      status: { not: "CANCELLED" },
      startsAt: { lt: dayEnd },
      endsAt: { gt: dayStart },
    },
  })

  // Só os que não sobrepõem
  const slots = candidates.filter((slot) => {
    const conflict = appointments.some((appt) =>
      intervalsOverlap(slot.startsAt, slot.endsAt, appt.startsAt, appt.endsAt)
    )
    return !conflict
  })

  return {
    serviceId: service.id,
    date: input.date,
    durationMin: duration,
    slots: slots.map((s) => ({
      startsAt: s.startsAt.toISOString(),
      endsAt: s.endsAt.toISOString(),
    })),
  }
}