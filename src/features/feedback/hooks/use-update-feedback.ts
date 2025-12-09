import { FeedbackKeys } from "@/features/feedback/constants/feedback-keys.const";
import { updateFeedback } from "@/features/feedback/server/actions/update-feedback.action";
import { GetFeedbackResponse } from "@/features/feedback/types/response.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useUpdateFeedback() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFeedback,
    onSuccess: (_, input) => {
      queryClient.setQueryData<GetFeedbackResponse>(
        FeedbackKeys.details(input.id),
        (oldData) => {
          if (!oldData) return { feedback: input } as GetFeedbackResponse;
          return { feedback: { ...oldData.feedback, ...input } };
        },
      );

      toast.success("Feedback updated successfully!");
      router.push("/feedback");
    },
    onError: (error) => {
      console.error("Error updating feedback:", error);
      toast.error("There was an error updating your feedback.");
    },
  });
}
