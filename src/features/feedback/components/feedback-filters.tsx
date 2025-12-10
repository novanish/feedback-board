"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FEEDBACK_STATUS_OPTIONS } from "@/features/feedback/constants/feedback-status-options.const";
import { useFeedbackFilter } from "@/features/feedback/hooks/use-feedback-filter";

export function FeedbackFilters() {
  const { status } = useFeedbackFilter();

  function handleStatusChange(newStatus: string) {
    const url = new URL(window.location.href);
    url.searchParams.set("status", newStatus);
    window.history.pushState(null, "", url.toString());
  }

  return (
    <div className="mx-auto mt-7 max-w-lg space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm font-medium">
          Filter by status:
        </span>
        <Select value={status ?? "All"} onValueChange={handleStatusChange}>
          <SelectTrigger className="min-w-[130px]">
            <SelectValue placeholder="Feedback Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {FEEDBACK_STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
