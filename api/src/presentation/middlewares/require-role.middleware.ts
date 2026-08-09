import { Response, NextFunction } from "express"
import { Role } from "../../generated/prisma/client"
import { AuthRequest } from "../../shared/types/auth-request"

export function requireRole(...allowedRoles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "Não autenticado" })
      return
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ message: "Sem permissão" })
      return
    }

    next()
  }
}