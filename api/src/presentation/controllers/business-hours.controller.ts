import { Request, Response } from "express"
import { AuthRequest } from "../../shared/types/auth-request"
import { listBusinessHours } from "../../application/catalog/list-business-hours"
import { upsertBusinessHoursSchema } from "../../application/catalog/upsert-business-hours.schema"
import { upsertBusinessHours } from "../../application/catalog/upsert-business-hours"

export class BusinessHoursController {
  async list(_req: Request, res: Response) {
    try {
      const businessHours = await listBusinessHours()
      return res.status(200).json({ businessHours })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Erro interno do servidor" })
    }
  }

  async upsert(req: AuthRequest, res: Response) {
    try {
      const parsed = upsertBusinessHoursSchema.safeParse(req.body)

      if (!parsed.success) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors: parsed.error.issues,
        })
      }

      const businessHours = await upsertBusinessHours(parsed.data)

      return res.status(200).json({
        message: "Horário salvo com sucesso",
        businessHours,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Erro interno do servidor" })
    }
  }
}