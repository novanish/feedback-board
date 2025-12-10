import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { env } from "../src/config/env/server";
import { faker } from "@faker-js/faker";
import { FeedbackStatus } from "../generated/prisma/enums";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = env.TURSO_AUTH_TOKEN
  ? new PrismaLibSql({
      url: env.DATABASE_URL,
      authToken: env.TURSO_AUTH_TOKEN,
    })
  : new PrismaBetterSqlite3({
      url: env.DATABASE_URL,
    });

const prisma = new PrismaClient({
  adapter,
});

const SEED_COUNT = 100;

async function seed() {
  console.time("Clear old data");
  await prisma.feedback.deleteMany();
  console.timeEnd("Clear old data");

  console.time("Seeding data...");
  await prisma.feedback.createMany({
    data: Array.from({ length: SEED_COUNT }).map(() => ({
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement(Object.values(FeedbackStatus)),
      upvotes: faker.number.int({ min: 0, max: 10000 }),
    })),
  });
  console.timeEnd("Seeding data...");
}

seed()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
