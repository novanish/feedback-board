"use client";

import React from "react";
import { InView } from "react-intersection-observer";

import { EndOfList } from "@/components/end-of-list";
import { Spinner } from "@/components/ui/spinner";
import { EmptyFeedback } from "@/features/feedback/components/empty-feedback";
import { FeedbackCard } from "@/features/feedback/components/feedback-card";
import { FeedbackListError } from "@/features/feedback/components/feedback-list-error";
import { useFeedbacks } from "@/features/feedback/hooks/use-feedbacks";

export function FeedbackList() {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isFetchNextPageError,
    refetch,
    hasNextPage,
    isFetching,
  } = useFeedbacks();

  const feedbacks = data?.pages.flatMap((page) => page.feedbacks) ?? [];

  const isEmpty =
    feedbacks.length === 0 && !hasNextPage && !isFetching && !isError;

  if (isEmpty) {
    return <EmptyFeedback />;
  }

  return (
    <div className="space-y-6">
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
                <FeedbackCard key={feedback.id} feedback={feedback} />
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
      {!(isFetchingNextPage || isFetching) &&
      (isError || isFetchNextPageError) ? (
        <FeedbackListError
          onRetry={() => {
            if (hasNextPage) {
              fetchNextPage();
            } else {
              refetch();
            }
          }}
        />
      ) : null}
    </div>
  );
}
