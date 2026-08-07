import { Request, Response } from "express"
import { prisma } from "../../infrastructure/database/prisma"

export class HealthController {
  async check(_req: Request, res: Response): Promise<void> {
    try {
      const usersCount = await prisma.user.count()

      res.json({
        status: "ok",
        message: "Studio Bloom API no ar",
        database: "connected",
        usersCount,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        status: "error",
        message: "API no ar, mas o banco não respondeu",
      })
    }
  }
}