import { z } from "zod";

export const UpvoteSchema = z.object({
  feedbackId: z.cuid(),
});

export type UpvoteInput = z.infer<typeof UpvoteSchema>;
