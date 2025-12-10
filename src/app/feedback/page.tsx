import { ScrollToTop } from "@/components/scroll-to-top";
import { FeedbackFilters } from "@/features/feedback/components/feedback-filters";
import { FeedbackList } from "@/features/feedback/components/feedback-list";
import { FeedbackKeys } from "@/features/feedback/constants/feedback-keys.const";
import { getFeedbacks } from "@/features/feedback/server/db/feedback";
import { isValidStatus } from "@/features/feedback/utils/is-valid-status";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import React from "react";

export default async function FeedbackPage({
  searchParams,
}: PageProps<"/feedback">) {
  const { status } = await searchParams;
  const { feedbacks, nextCursor } = await getFeedbacks(null, status);
  const queryClient = new QueryClient();

  await queryClient.setQueryData(
    FeedbackKeys.all({ status: isValidStatus(status) ? status : null }),
    {
      pages: [{ feedbacks, nextCursor }],
      pageParams: [null],
    },
  );

  return (
    <React.Fragment>
      <div className="mx-auto max-w-lg space-y-6 py-7">
        <FeedbackFilters />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FeedbackList />
        </HydrationBoundary>
        <ScrollToTop />
      </div>
    </React.Fragment>
  );
}

export const metadata: Metadata = {
  title: "Feedbacks",
  description: "View feedbacks on Feedback Board.",
};
