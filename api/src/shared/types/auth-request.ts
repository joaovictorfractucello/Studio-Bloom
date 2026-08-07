import { Request } from "express"
import { Role } from "../../generated/prisma/client"

export type AuthUser = {
    id: string
    role: Role
  }
  export type AuthRequest = Request & {
    user: AuthUser
  }