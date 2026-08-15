import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Vercel se DATABASE_URL le kar connection pool banayein
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter }); // <-- Adapter yahan pass kiya gaya hai

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;