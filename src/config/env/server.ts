import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url(),
  TURSO_AUTH_TOKEN: z.string().optional().nullable(),
});

export type Env = z.infer<typeof envSchema>;
export const env = envSchema.parse(process.env);
