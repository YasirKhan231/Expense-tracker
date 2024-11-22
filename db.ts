import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare the global prisma instance only in development environment
declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize the Prisma client, either from the global variable (in development) or a fresh instance (in production)
const prisma = globalThis.prisma ?? prismaClientSingleton();

// Assign the Prisma client to the global variable in non-production (development) environments
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
