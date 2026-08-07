import { prisma } from "../../infrastructure/database/prisma"
import { hashPassword } from "../../infrastructure/auth/password"
import { RegisterSchema } from "./register.schema"

export async function register(input: RegisterSchema) {
  const email = input.email.toLowerCase().trim()

  const existing = await prisma.user.findUnique({
    where: { email },
  })

  if (existing) {
    const error = new Error("E-mail já cadastrado")
    ;(error as Error & { statusCode: number }).statusCode = 409
    throw error
  }

  const passwordHash = await hashPassword(input.password)

  const user = await prisma.user.create({
    data: {
      name: input.name.trim(),
      email,
      passwordHash,
      // role fica CLIENT pelo default do schema
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  })

  return user
}