"use client";

import { Button } from "@/components/ui/button";
import { statusLabels } from "@/features/feedback/constants/status-labels.const";
import { statusStyles } from "@/features/feedback/constants/status-styles.const";
import { useFeedbackFilter } from "@/features/feedback/hooks/use-feedback-filter";
import { useUpvoteFeedback } from "@/features/feedback/hooks/use-upvote-feedback";
import { optimisticUpdateFeedback } from "@/features/feedback/utils/update-feedbacks-cache";
import type { Feedback } from "@/generated/prisma/client";
import { cn, formatUpvotes } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { ThumbsUp } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useMemo } from "react";

interface Props {
  feedback: Omit<Feedback, "createdAt" | "updatedAt">;
  upvotedFeedbackIds: string[];
  setUpvotedFeedbackIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export function FeedbackCard({
  feedback,
  setUpvotedFeedbackIds,
  upvotedFeedbackIds,
}: Props) {
  const upvoteMutation = useUpvoteFeedback();
  const queryClient = useQueryClient();
  const filter = useFeedbackFilter();
  const isUpvoted = useMemo(() => {
    return upvotedFeedbackIds.includes(feedback.id);
  }, [feedback.id, upvotedFeedbackIds]);

  const handleUpvoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUpvotedFeedbackIds((prev) => [...prev, feedback.id]);
    upvoteMutation.mutate({ feedbackId: feedback.id });
    optimisticUpdateFeedback(queryClient, filter, feedback.id, (fb) => ({
      ...fb,
      upvotes: fb.upvotes + 1,
    }));
  };

  const statusStyle = statusStyles[feedback.status];

  return (
    <div className="group border-border bg-card hover:border-primary/50 relative rounded-lg border p-4 transition-all duration-200 hover:shadow-md">
      <div className="flex justify-end">
        <span
          className={cn(
            "flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
            statusStyle.badge,
          )}
        >
          <span className={cn("size-2 rounded-full", statusStyle.dot)} />
          {statusLabels[feedback.status]}
        </span>
      </div>
      <h3 className="text-card-foreground group-hover:text-primary text-base font-semibold transition-colors">
        {feedback.title}
      </h3>

      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
        {feedback.description}
      </p>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={isUpvoted ? undefined : handleUpvoteClick}
          className={cn("gap-2 transition-colors", {
            "text-primary bg-primary/10 hover:bg-primary/20": isUpvoted,
            "text-muted-foreground hover:text-primary hover:bg-primary/10":
              !isUpvoted,
          })}
        >
          <ThumbsUp className="h-4 w-4" />
          <span className="text-sm font-medium">
            {formatUpvotes(feedback.upvotes)}
          </span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent transition-all"
          asChild
        >
          <Link href={`/feedback/${feedback.id}/edit`}>Edit</Link>
        </Button>
      </div>
    </div>
  );
}
