import { prisma } from "../../infrastructure/database/prisma"

export async function me(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  })

  if (!user) {
    const error = new Error("Usuário não encontrado")
    ;(error as Error & { statusCode: number }).statusCode = 404
    throw error
  }

  return user
}