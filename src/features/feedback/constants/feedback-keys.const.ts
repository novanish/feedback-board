import { FeedbackFilters } from "@/features/feedback/types/feedback-filters.type";

export const FeedbackKeys = {
  all: (filters: FeedbackFilters) => ["feedbacks", filters] as const,
  details: (feedbackId: string) => ["feedbacks", feedbackId] as const,
};
