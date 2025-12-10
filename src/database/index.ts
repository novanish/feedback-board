import { env } from "@/config/env/server";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = env.TURSO_AUTH_TOKEN
  ? new PrismaLibSql({
      url: env.DATABASE_URL,
      authToken: env.TURSO_AUTH_TOKEN,
    })
  : new PrismaBetterSqlite3({
      url: env.DATABASE_URL,
    });

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
