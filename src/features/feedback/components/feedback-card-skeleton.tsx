import { Skeleton } from "@/components/ui/skeleton";

export function FeedbackCardSkeleton() {
  return (
    <div className="border-border bg-card rounded-lg border p-4">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <Skeleton className="h-6 w-3/4 rounded" />
        </div>
        <Skeleton className="h-6 w-24 shrink-0 rounded-full" />
      </div>

      <div className="mb-4 space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-20 rounded-md" />
        <Skeleton className="h-9 w-16 rounded-md" />
      </div>
    </div>
  );
}
