import { FeedbackKeys } from "@/features/feedback/constants/feedback-keys.const";
import { FeedbackFilters } from "@/features/feedback/types/feedback-filters.type";
import { GetFeedbacksResponse } from "@/features/feedback/types/response.type";
import { InfiniteData, QueryClient } from "@tanstack/react-query";

type Feedback = GetFeedbacksResponse["feedbacks"][number];

export function optimisticUpdateFeedback(
  queryClient: QueryClient,
  filter: FeedbackFilters,
  id: string,
  updater: (fb: Feedback) => Feedback,
) {
  const key = FeedbackKeys.all(filter);
  const previousData = queryClient.getQueryData(key);

  queryClient.setQueryData<InfiniteData<GetFeedbacksResponse>>(key, (old) => {
    if (!old) return old;

    return {
      ...old,
      pages: old.pages.map((p) => ({
        ...p,
        feedbacks: p.feedbacks.map((fb) => (fb.id === id ? updater(fb) : fb)),
      })),
    };
  });

  return { previousData, key };
}
