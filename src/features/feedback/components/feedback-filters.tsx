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
import { useRouter } from "next/navigation";

export function FeedbackFilters() {
  const router = useRouter();
  const { status } = useFeedbackFilter();

  return (
    <div className="mx-auto mt-7 max-w-lg space-y-6">
      <Select
        value={status ?? ""}
        onValueChange={(v) => {
          router.replace(`/feedback?status=${v}`, { scroll: true });
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Feedback Status" />
        </SelectTrigger>
        <SelectContent>
          {FEEDBACK_STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
