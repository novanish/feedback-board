import { FeedbackFilters } from "@/features/feedback/types/feedback-filters.type";

export const FeedbackKeys = {
  root: "feedbacks" as const,

  all: (filters: FeedbackFilters) =>
    [FeedbackKeys.root, "all", filters] as const,
  details: (feedbackId: string) => [FeedbackKeys.root, feedbackId] as const,
};
