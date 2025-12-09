import { LucideMessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useFeedbackFilter } from "@/features/feedback/hooks/use-feedback-filter";
import { statusLabels } from "@/features/feedback/constants/status-labels.const";
import Link from "next/link";

export function EmptyFeedback() {
  const { status } = useFeedbackFilter();

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <LucideMessageSquare className="text-muted-foreground h-12 w-12" />
        </EmptyMedia>
        <EmptyTitle>
          No {status ? statusLabels[status] : ""} Feedback Yet
        </EmptyTitle>
        <EmptyDescription>
          Your insights are valuable. Be the first to share your feedback.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/feedback/create">Share Feedback</Link>
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
