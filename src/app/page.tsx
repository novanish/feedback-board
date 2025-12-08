import prisma from "@/database";
import { sql } from "@prisma/client-runtime-utils";

export default async function Home() {
  console.log(await prisma.$queryRaw(sql`SELECT 1`));
  return null;
}
