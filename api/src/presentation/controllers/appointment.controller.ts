import { Request, Response } from "express"
import { listSlotsSchema } from "../../application/appointments/list-slots.schema"
import { listSlots } from "../../application/appointments/list-slots"
import { AuthRequest } from "../../shared/types/auth-request"
import { createAppointmentSchema } from "../../application/appointments/create-appointment.schema"
import { createAppointment } from "../../application/appointments/create-appointment"
import { listMyAppointments } from "../../application/appointments/list-my-appointments"
import { listDayAppointmentsSchema } from "../../application/appointments/list-day-appointments.schema"
import { listDayAppointments } from "../../application/appointments/list-day-appointments"
import { cancelAppointment } from "../../application/appointments/cancel-appointment"

export class AppointmentController {
    async listSlots(req: Request, res: Response) {
        try {
            const parsed = listSlotsSchema.safeParse({
                serviceId: req.query.serviceId,
                date: req.query.date,
            })

            if (!parsed.success) {
                return res.status(400).json({
                    message: "Dados inválidos",
                    errors: parsed.error.issues,
                })
            }

            const result = await listSlots(parsed.data)

            return res.status(200).json(result)
        } catch (error) {
            const err = error as Error & { statusCode?: number }

            if (err.statusCode === 404 || err.statusCode === 400) {
                return res.status(err.statusCode).json({ message: err.message })
            }

            console.error(error)
            return res.status(500).json({ message: "Erro interno do servidor" })
        }
    }

    async create(req: AuthRequest, res: Response) {
        try {
            const parsed = createAppointmentSchema.safeParse(req.body)
            if (!parsed.success) {
                return res.status(400).json({
                    message: "Dados inválidos",
                    errors: parsed.error.issues,
                })
            }
            const appointment = await createAppointment({
                ...parsed.data,
                clientId: req.user.id,
            })
            return res.status(201).json({
                message: "Agendamento criado com sucesso",
                appointment,
            })
        } catch (error) {
            const err = error as Error & { statusCode?: number }
            if (err.statusCode === 404 || err.statusCode === 400) {
                return res.status(err.statusCode).json({ message: err.message })
            }
            if (err.statusCode === 409) {
                return res.status(409).json({ message: err.message })
            }
            console.error(error)
            return res.status(500).json({ message: "Erro interno do servidor" })
        }
    }

    async listMine(req: AuthRequest, res: Response) {
        try {
            const appointments = await listMyAppointments(req.user.id)

            return res.status(200).json({ appointments })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Erro interno do servidor" })
        }
    }

    async listDay(req: AuthRequest, res: Response) {
        try {
            const parsed = listDayAppointmentsSchema.safeParse({
                date: req.query.date,
            })

            if (!parsed.success) {
                return res.status(400).json({
                    message: "Dados inválidos",
                    errors: parsed.error.issues,
                })
            }

            const appointments = await listDayAppointments(parsed.data)

            return res.status(200).json({ appointments })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Erro interno do servidor" })
        }
    }

    async cancel(req: AuthRequest, res: Response) {
        try {
          const id = req.params.id as string
          const appointment = await cancelAppointment({
            appointmentId: id,
            userId: req.user.id,
            userRole: req.user.role,
          })
          return res.status(200).json({
            message: "Agendamento cancelado com sucesso",
            appointment,
          })
        } catch (error) {
          const err = error as Error & { statusCode?: number }
          if (err.statusCode === 404 || err.statusCode === 400 || err.statusCode === 403) {
            return res.status(err.statusCode).json({ message: err.message })
          }
          console.error(error)
          return res.status(500).json({ message: "Erro interno do servidor" })
        }
      }
}
