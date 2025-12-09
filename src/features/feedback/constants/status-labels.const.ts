import { FeedbackStatus } from "@/generated/prisma/enums";

export const statusLabels: Record<FeedbackStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};
