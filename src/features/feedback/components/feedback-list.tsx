"use client";

import React from "react";
import { InView } from "react-intersection-observer";

import { EndOfList } from "@/components/end-of-list";
import { Spinner } from "@/components/ui/spinner";
import { EmptyFeedback } from "@/features/feedback/components/empty-feedback";
import { FeedbackCard } from "@/features/feedback/components/feedback-card";
import { FeedbackListError } from "@/features/feedback/components/feedback-list-error";
import { useFeedbacks } from "@/features/feedback/hooks/use-feedbacks";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { FeedbackListSkeleton } from "@/features/feedback/components/feedback-list-skeleton";

export function FeedbackList() {
  const [upovotedFeedbackIds, setUpvotedFeedbackIds] = useLocalStorage<
    Array<string>
  >("upvotes", []);

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    refetch,
    hasNextPage,
    isPending,
    isFetching,
  } = useFeedbacks();

  const feedbacks = data?.pages.flatMap((page) => page.feedbacks) ?? [];
  if (isError && feedbacks.length === 0) {
    return <FeedbackListError onRetry={refetch} />;
  }

  if (isPending) {
    return <FeedbackListSkeleton />;
  }

  if (feedbacks.length === 0) {
    return <EmptyFeedback />;
  }

  return (
    <div className={"space-y-6"}>
      <InView
        rootMargin="300px"
        onChange={(inView) => {
          if (inView && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
      >
        {({ ref }) => {
          return (
            <React.Fragment>
              {feedbacks.map((feedback) => (
                <FeedbackCard
                  key={feedback.id}
                  feedback={feedback}
                  setUpvotedFeedbackIds={setUpvotedFeedbackIds}
                  upvotedFeedbackIds={upovotedFeedbackIds}
                />
              ))}

              {hasNextPage ? (
                <div ref={ref} />
              ) : isFetching ? null : (
                <EndOfList />
              )}

              {isFetchingNextPage ? (
                <Spinner className="mx-auto size-10" />
              ) : null}
            </React.Fragment>
          );
        }}
      </InView>

      {isError && feedbacks.length > 0 && (
        <FeedbackListError onRetry={refetch} />
      )}
    </div>
  );
}
