import { Response, NextFunction } from "express"
import { verifyAccessToken } from "../../infrastructure/auth/token"
import { AuthRequest } from "../../shared/types/auth-request"

export function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
):  void {
    const header = req.headers.authorization
    if (!header || !header.startsWith("Bearer ")) {
      res.status(401).json({ message: "Token não informado" })
      return
    }
    const token = header.slice("Bearer ".length).trim()
    try {
      const payload = verifyAccessToken(token)
      req.user = {
        id: payload.sub,
        role: payload.role,
      }
      next()
    } catch {
      res.status(401).json({ message: "Token inválido ou expirado" })
    }
  }