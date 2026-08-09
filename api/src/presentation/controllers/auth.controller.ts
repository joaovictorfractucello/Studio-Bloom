import { Request, Response } from "express"
import { registerSchema } from "../../application/auth/register.schema"
import { register } from "../../application/auth/register"
import { loginSchema } from "../../application/auth/login.schema"
import { login } from "../../application/auth/login"
import { AuthRequest } from "../../shared/types/auth-request"
import { me } from "../../application/auth/me"
import { refreshSchema } from "../../application/auth/refresh.schema"
import { refresh } from "../../application/auth/refresh"

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const parsed = registerSchema.safeParse(req.body)

            if (!parsed.success) {
                return res.status(400).json({
                    message: "Dados inválidos",
                    errors: parsed.error.issues,
                })   
            }

            const user = await register(parsed.data)

            res.status(201).json({
                message: "Usuário cadastrado com sucesso",
                user,
            })
        } catch (error) {
            const err = error as Error & { statusCode?: number }

            if (err.statusCode === 409) {
                res.status(409).json({ message: err.message })
                return
            }

            console.error(error)
            res.status(500).json({ message: "Erro interno do servidor" })
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
          const parsed = loginSchema.safeParse(req.body)
          if (!parsed.success) {
            res.status(400).json({
              message: "Dados inválidos",
              errors: parsed.error.issues,
            })
            return
          }
          const result = await login(parsed.data)
          res.status(200).json({
            message: "Login realizado com sucesso",
            ...result,
          })
        } catch (error) {
          const err = error as Error & { statusCode?: number }
          if (err.statusCode === 401) {
            res.status(401).json({ message: err.message })
            return
          }
          console.error(error)
          res.status(500).json({ message: "Erro interno do servidor" })
        }
      }

      async me(req: AuthRequest, res: Response): Promise<void> {
        try {
            const user = await me(req.user.id)

            res.status(200).json({ user })
        } catch (error) {
            const err = error as Error & { statusCode?: number }

            if (err.statusCode === 404) {
                res.status(404).json({ message: err.message })
                return
            }
            console.error(error)
            res.status(500).json({ message: "Erro interno do servidor" })
        }
      }

      async refresh(req: Request, res: Response): Promise<void> {
        try {
          const parsed = refreshSchema.safeParse(req.body)
          if (!parsed.success) {
            res.status(400).json({
              message: "Dados inválidos",
              errors: parsed.error.issues,
            })
            return
          }
          const tokens = await refresh(parsed.data)
          res.status(200).json({
            message: "Tokens renovados com sucesso",
            ...tokens,
          })
        } catch (error) {
          const err = error as Error & { statusCode?: number }
          if (err.statusCode === 401) {
            res.status(401).json({ message: err.message })
            return
          }
          console.error(error)
          res.status(500).json({ message: "Erro interno do servidor" })
        }
      }

}

