// src/lib/prisma.ts
import { PrismaClient } from "../app/generated/prisma/client"; // ✅ حتماً باید شامل /client در انتها باشد
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  process.env.NODE_ENV === "production"
    ? globalForPrisma.prisma || new PrismaClient({ adapter })
    : new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
