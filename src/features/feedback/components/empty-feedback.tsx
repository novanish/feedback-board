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

export function EmptyFeedback() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <LucideMessageSquare className="text-muted-foreground h-12 w-12" />
        </EmptyMedia>
        <EmptyTitle>No Feedback Yet</EmptyTitle>
        <EmptyDescription>
          Your insights are valuable. Be the first to share your feedback.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Share Feedback</Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
