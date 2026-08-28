import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is missing. Add it to your environment configuration.",
  );
}

const adapter = new PrismaPg({
  connectionString,
});

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.__saiPrisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__saiPrisma = prisma;
}

export default prisma;
