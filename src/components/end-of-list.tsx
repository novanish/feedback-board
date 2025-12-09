import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Coffee } from "lucide-react";

export function EndOfList() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Coffee />
        </EmptyMedia>
        <EmptyTitle>You&apos;ve reached the end!</EmptyTitle>
        <EmptyDescription>
          There&apos;s nothing more to load right now.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
