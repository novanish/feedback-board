import { CreateFeedBackSchema } from "@/features/feedback/schema/create-feedback.schema";
import { z } from "zod";

export const UpdateFeedBackSchema = CreateFeedBackSchema.partial().extend({
  id: z.cuid(),
});

export type UpdateFeedbackInput = z.infer<typeof UpdateFeedBackSchema>;
