"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyTitle,
  EmptyHeader,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { FeedbackForm } from "@/features/feedback/components/feedback-form";
import { useFeedback } from "@/features/feedback/hooks/use-feedback";
import Link from "next/link";

interface Props {
  feedbackId: string;
}

export function EditFeeback({ feedbackId }: Props) {
  const { isPending, data, error, refetch } = useFeedback(feedbackId);

  if (isPending) {
    return <Spinner className="size-10" />;
  }

  if (error) {
    const isNotFoundError = error.name === "NotFoundError";

    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>
            {isNotFoundError ? "Feedback Not Found" : "Something went wrong"}
          </EmptyTitle>
          <EmptyDescription>
            {isNotFoundError
              ? "The feedback you are trying to edit does not exist."
              : "An unexpected error occurred. Please try again later."}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          {isNotFoundError ? (
            <Button asChild>
              <Link href="/feedback">Go back to Feedback</Link>
            </Button>
          ) : (
            <Button
              onClick={() => {
                refetch();
              }}
            >
              Retry
            </Button>
          )}
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <FeedbackForm
      type="update"
      feedbackId={feedbackId}
      defaultValues={data?.feedback}
    />
  );
}
