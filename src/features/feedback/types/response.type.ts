import { Feedback } from "@/generated/prisma/browser";

export type GetFeedbacksResponse = {
  feedbacks: Array<Omit<Feedback, "createdAt" | "updatedAt">>;
  nextCursor: string | null;
};

export type GetFeedbackResponse = Record<
  "feedback",
  Omit<Feedback, "createdAt" | "updatedAt">
>;
