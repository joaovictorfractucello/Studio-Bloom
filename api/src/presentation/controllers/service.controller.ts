import { Request, Response } from "express"
import { AuthRequest } from "../../shared/types/auth-request"
import { createServiceSchema } from "../../application/catalog/create-service.schema"
import { createService } from "../../application/catalog/create-service"
import { listServices } from "../../application/catalog/list-services"
import { updateServiceSchema } from "../../application/catalog/update-service.schema"
import { updateService } from "../../application/catalog/update-service"

export class ServiceController {
    async create(req: AuthRequest, res: Response) {
        try {
            const parsed = createServiceSchema.safeParse(req.body)

            if (!parsed.success) {
                return res.status(400).json({
                    message: "Dados inválidos",
                    errors: parsed.error.issues,
                })
            }
            
            const service = await createService(parsed.data)

            return res.status(201).json({
                message: "Serviço criado com sucesso",
                service,
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: "Erro interno do servidor",
            })
        }
    }

    async list(req: Request, res: Response) {
        try {
          const includeInactive = req.query.all === "true"
      
          const services = await listServices({ includeInactive })
          return res.status(200).json({ services })
        } catch (error) {
          console.error(error)
          return res.status(500).json({ message: "Erro interno do servidor" })
        }
      }

      async update(req: AuthRequest, res: Response) {
        try {
            const id = req.params.id as string 

            const parsed = updateServiceSchema.safeParse(req.body)

            if (!parsed.success) {
                return res.status(400).json({
                    message: "Dados inválidos",
                    errors: parsed.error.issues,
                })
            }

            const service = await updateService(id, parsed.data)

            return res.status(200).json({
                message: "Serviço atualizado com sucesso",
                service,
            })
        } catch (error) {
            const err = error as Error & { statusCode?: number }

            if (err.statusCode === 404) {
                return res.status(404).json({ message: err.message })
            }

            console.error(error)
            return res.status(500).json({ message: "Erro interno do servidor" })
        }
      }
}