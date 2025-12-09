"use client";

import { Spinner } from "@/components/ui/spinner";
import { FeedbackForm } from "@/features/feedback/components/feedback-form";
import { useFeedback } from "@/features/feedback/hooks/use-feedback";

interface Props {
  feedbackId: string;
}

export function EditFeeback({ feedbackId }: Props) {
  const { isLoading, data } = useFeedback(feedbackId);

  if (isLoading) {
    return <Spinner className="size-10" />;
  }

  return (
    <FeedbackForm
      type="update"
      feedbackId={feedbackId}
      defaultValues={data?.feedback}
    />
  );
}
