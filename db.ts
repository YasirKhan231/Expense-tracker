import { PrismaClient } from '@prisma/client'

console.log("inside db.ts file ")
const prismaClientSingleton = () => {
  console.log("inside instance prisma ")
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma