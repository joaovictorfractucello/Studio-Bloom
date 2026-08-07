import { prisma } from "../../infrastructure/database/prisma"
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../infrastructure/auth/token"
import { hashRefreshToken } from "../../infrastructure/auth/refresh-token-hash"
import { RefreshInput } from "./refresh.schema"

function unauthorizedError(message = "Refresh token inválido") {
  const error = new Error(message)
  ;(error as Error & { statusCode: number }).statusCode = 401
  return error
}

export async function refresh(input: RefreshInput) {
  let payload

  try {
    payload = verifyRefreshToken(input.refreshToken)
  } catch {
    throw unauthorizedError()
  }

  const tokenHash = hashRefreshToken(input.refreshToken)

  const stored = await prisma.refreshToken.findUnique({
    where: { tokenHash },
  })

  if (!stored) {
    throw unauthorizedError()
  }

  if (stored.expiresAt.getTime() < Date.now()) {
    await prisma.refreshToken.delete({ where: { id: stored.id } })
    throw unauthorizedError("Refresh token expirado")
  }

  if (stored.userId !== payload.sub) {
    throw unauthorizedError()
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
  })

  if (!user) {
    throw unauthorizedError()
  }

  // Rotação: invalida o refresh antigo
  await prisma.refreshToken.delete({ where: { id: stored.id } })

  const newPayload = {
    sub: user.id,
    role: user.role,
  }

  const accessToken = signAccessToken(newPayload)
  const refreshToken = signRefreshToken(newPayload)

  const newHash = hashRefreshToken(refreshToken)
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)

  await prisma.refreshToken.create({
    data: {
      tokenHash: newHash,
      userId: user.id,
      expiresAt,
    },
  })

  return {
    accessToken,
    refreshToken,
  }
}