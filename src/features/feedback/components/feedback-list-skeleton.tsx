import { FeedbackCardSkeleton } from "@/features/feedback/components/feedback-card-skeleton";

interface Props {
  length?: number;
}

export function FeedbackListSkeleton({ length = 5 }: Props) {
  return (
    <div className="space-y-6">
      {Array.from({ length }).map((_, index) => (
        <FeedbackCardSkeleton key={index} />
      ))}
    </div>
  );
}
