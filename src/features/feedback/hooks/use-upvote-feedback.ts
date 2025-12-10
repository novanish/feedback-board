import { upvoteFeedback } from "@/features/feedback/server/actions/upvote-feedback.action";
import { useMutation } from "@tanstack/react-query";

export function useUpvoteFeedback() {
  return useMutation({
    mutationFn: upvoteFeedback,
  });
}
