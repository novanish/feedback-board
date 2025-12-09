import { FeedbackKeys } from "@/features/feedback/constants/feedback-keys.const";
import { feedbackService } from "@/features/feedback/services/feedback-service";
import { useQuery } from "@tanstack/react-query";

export function useFeedback(feedbackId: string) {
  return useQuery({
    queryKey: FeedbackKeys.details(feedbackId),
    queryFn: () => feedbackService.getFeedback(feedbackId),
  });
}
