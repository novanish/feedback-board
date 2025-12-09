import { createFeedback } from "@/features/feedback/server/actions/create-feedback.action";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useCreateFeedback() {
  const router = useRouter();

  return useMutation({
    mutationFn: createFeedback,
    onSuccess: () => {
      toast.success("Feedback created successfully!");
      router.push("/feedback");
    },
    onError: (error) => {
      console.error("Error creating feedback:", error);
      toast.error("There was an error creating your feedback.");
    },
  });
}
