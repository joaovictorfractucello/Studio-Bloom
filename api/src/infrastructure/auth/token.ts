import jwt from "jsonwebtoken"
import { Role } from "../../generated/prisma/client"

export type AccessTokenPayload = {
  sub: string
  role: Role
}

function getAccessSecret(): string {
  const secret = process.env.JWT_ACCESS_SECRET
  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET não definida no .env")
  }
  return secret
}

function getRefreshSecret(): string {
  const secret = process.env.JWT_REFRESH_SECRET
  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET não definida no .env")
  }
  return secret
}

export function signAccessToken(payload: AccessTokenPayload): string {
  const expiresIn = process.env.JWT_ACCESS_EXPIRES_IN ?? "15m"

  return jwt.sign(payload, getAccessSecret(), {
    expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
  })
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const decoded = jwt.verify(token, getAccessSecret())

  if (
    typeof decoded !== "object" ||
    decoded === null ||
    typeof decoded.sub !== "string" ||
    typeof decoded.role !== "string"
  ) {
    throw new Error("Access token inválido")
  }

  return {
    sub: decoded.sub,
    role: decoded.role as Role,
  }
}

export function signRefreshToken(payload: AccessTokenPayload): string {
  const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN ?? "7d"

  return jwt.sign(payload, getRefreshSecret(), {
    expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
  })
}

export function verifyRefreshToken(token: string): AccessTokenPayload {
  const decoded = jwt.verify(token, getRefreshSecret())

  if (
    typeof decoded !== "object" ||
    decoded === null ||
    typeof decoded.sub !== "string" ||
    typeof decoded.role !== "string"
  ) {
    throw new Error("Refresh token inválido")
  }

  return {
    sub: decoded.sub,
    role: decoded.role as Role,
  }
}