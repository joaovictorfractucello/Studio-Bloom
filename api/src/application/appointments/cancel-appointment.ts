import { prisma } from "../../infrastructure/database/prisma"
import { Role } from "../../generated/prisma/client"

const MIN_HOURS_BEFORE_CANCEL = 2

function httpError(message: string, statusCode: number) {
  const error = new Error(message) as Error & { statusCode: number }
  error.statusCode = statusCode
  return error
}

type CancelAppointmentParams = {
  appointmentId: string
  userId: string
  userRole: Role
}

export async function cancelAppointment(params: CancelAppointmentParams) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: params.appointmentId },
  })

  if (!appointment) {
    throw httpError("Agendamento não encontrado", 404)
  }

  if (appointment.status === "CANCELLED") {
    throw httpError("Agendamento já cancelado", 400)
  }

  const isStaff = params.userRole === "ADMIN" || params.userRole === "PROFESSIONAL"
  const isOwner = appointment.clientId === params.userId

  if (!isStaff && !isOwner) {
    throw httpError("Sem permissão para cancelar este agendamento", 403)
  }

  if (!isStaff) {
    const msUntilStart = appointment.startsAt.getTime() - Date.now()
    const minMs = MIN_HOURS_BEFORE_CANCEL * 60 * 60 * 1000
    if (msUntilStart < minMs) {
      throw httpError(
        `Cancelamento permitido até ${MIN_HOURS_BEFORE_CANCEL} horas antes`,
        400
      )
    }
  }

  return prisma.appointment.update({
    where: { id: appointment.id },
    data: { status: "CANCELLED" },
  })
}