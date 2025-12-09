import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
        <span className="text-primary-foreground text-lg font-bold">F</span>
      </span>
      <span className="text-foreground hidden text-lg font-bold sm:inline">
        FeedbackHub
      </span>
    </Link>
  );
}
