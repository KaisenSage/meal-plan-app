// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Create a global reference to avoid multiple instances in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Initialize Prisma client
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

// Only assign to global object in development to avoid hot reload issues
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// ✅ Named export as `db` to match usage everywhere else
export const db = prisma;