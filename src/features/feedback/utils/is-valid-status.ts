import { FeedbackStatus } from "@/generated/prisma/enums";

export function isValidStatus(status: unknown): status is FeedbackStatus {
  return [
    FeedbackStatus.OPEN,
    FeedbackStatus.IN_PROGRESS,
    FeedbackStatus.DONE,
  ].includes(status as FeedbackStatus);
}
