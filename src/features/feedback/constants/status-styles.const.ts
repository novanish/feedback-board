import { FeedbackStatus } from "@/generated/prisma/enums";

type StatusStyle = {
  badge: string;
  dot: string;
};

export const statusStyles: Record<FeedbackStatus, StatusStyle> = {
  OPEN: {
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    dot: "bg-blue-500",
  },
  IN_PROGRESS: {
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  DONE: {
    badge: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    dot: "bg-green-500",
  },
};
