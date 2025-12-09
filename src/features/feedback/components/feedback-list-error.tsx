"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onRetry: () => void;
}

export function FeedbackListError({ onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-semibold">Failed to load feedbacks</h3>
        <p className="text-muted-foreground max-w-md">
          Something went wrong while fetching feedbacks.
        </p>
      </div>
      <Button
        onClick={onRetry}
        variant="outline"
        className="gap-2 bg-transparent"
      >
        <RefreshCw className="h-4 w-4" />
        Try again
      </Button>
    </div>
  );
}
