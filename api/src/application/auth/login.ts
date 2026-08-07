import { prisma } from "../../infrastructure/database/prisma"
import { comparePassword } from "../../infrastructure/auth/password"
import {
    signAccessToken,
    signRefreshToken,
} from "../../infrastructure/auth/token"
import { hashRefreshToken } from "../../infrastructure/auth/refresh-token-hash"
import { LoginInput } from "./login.schema"

function unauthorizedError() {
    const error = new Error("Credenciais inválidas")
    ;(error as Error & { statusCode: number }).statusCode = 401
    return error
  }

  export async function login(input: LoginInput) {
    const email = input.email.toLowerCase().trim()
    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (!user) {
      throw unauthorizedError()
    }
    const passwordOk = await comparePassword(input.password, user.passwordHash)
    if (!passwordOk) {
      throw unauthorizedError()
    }
    const payload = {
      sub: user.id,
      role: user.role,
    }
    const accessToken = signAccessToken(payload)
    const refreshToken = signRefreshToken(payload)
    const refreshTokenHash = hashRefreshToken(refreshToken)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)
    await prisma.refreshToken.create({
      data: {
        tokenHash: refreshTokenHash,
        userId: user.id,
        expiresAt,
      },
    })
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    }
  }