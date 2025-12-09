import { FeedbackKeys } from "@/features/feedback/constants/feedback-keys.const";
import { useFeedbackFilter } from "@/features/feedback/hooks/use-feedback-filter";
import { feedbackService } from "@/features/feedback/services/feedback-service";
import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";

export function useFeedbacks() {
  const filters = useFeedbackFilter();

  return useInfiniteQuery({
    queryKey: FeedbackKeys.all(filters),
    queryFn: async ({ pageParam }) => {
      return feedbackService.getFeedbacks(pageParam, filters);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
    refetchOnWindowFocus: false,
    initialPageParam: null as string | null,
    staleTime: ms("5 minutes"),
  });
}
