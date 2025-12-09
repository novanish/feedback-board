import { FeedbackStatus } from "@/generated/prisma/enums";
import { z } from "zod";

export const CreateFeedBackSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .min(5, "Title must be at least 5 characters long")
    .max(200, "Title must be at most 200 characters long"),
  description: z
    .string({ error: "Description is required" })
    .min(10, "Description must be at least 10 characters long")
    .max(1000, "Description must be at most 1000 characters long"),
  status: z.enum(FeedbackStatus).default(FeedbackStatus.OPEN),
});

export type CreateFeedbackInput = z.infer<typeof CreateFeedBackSchema>;
